import {
  BlurPostProcess,
  Camera,
  Constants,
  DynamicTexture,
  Effect,
  MultiRenderTarget,
  PassPostProcess,
  PostProcess,
  PostProcessRenderEffect,
  PostProcessRenderPipeline,
  RenderTargetTexture,
  Scene,
  Texture,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import ssgiSource from './effects/shader/ssgi.frag.glsl';
import compositeSource from './effects/shader/compositeSSGI.frag.glsl';
import PassTexturePostprocess from './effects/passTexturePostprocess';
import passTexSource from './effects/shader/passTexture.frag.glsl';

export class FastSSGIPipeline extends PostProcessRenderPipeline {
  private _scene: Scene;
  private _randomTexture: DynamicTexture;
  private _originalColorPostProcess: PassPostProcess;
  private _downSampledOriginalColorPostProcess: PassTexturePostprocess;
  private _downSampledPositionPostProcess: PassTexturePostprocess;
  private _ssgiPostProcess: PostProcess;
  private _compositePostProcess: PostProcess;
  private _testPostProcess: PostProcess;
  private _blurHPostProcess: BlurPostProcess;
  private _blurVPostProcess: BlurPostProcess;
  private _gbuffer: MultiRenderTarget;
  private _textureCache: MultiRenderTarget;
  private _downSampleRatio = 0.25;
  constructor(name: string, scene: Scene, cameras?: Camera[]) {
    super(scene.getEngine(), name);
    this._scene = scene;
    const gbr = scene.enableGeometryBufferRenderer(1.0);
    gbr.enablePosition = true;
    gbr.enableReflectivity = true;
    this._gbuffer = gbr.getGBuffer();
    this._textureCache = new MultiRenderTarget('renderCache', 512, 3, scene);
    const test = new RenderTargetTexture('test', 512, scene);
    this._originalColorPostProcess = new PassPostProcess(
      'ssaoCache',
      1.0,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      scene.getEngine(),
      false
    );
    this._downSampledPositionPostProcess = new PassTexturePostprocess(
      'downsamplePos',
      this._downSampleRatio,
      this._gbuffer.textures[2],
      null,
      scene.getEngine()
    );
    this._downSampledOriginalColorPostProcess = new PassTexturePostprocess(
      'downsampleColor',
      this._downSampleRatio,
      null,
      this._originalColorPostProcess,
      scene.getEngine()
    );
    this._downSampledOriginalColorPostProcess.onAfterRender = (effect: Effect) => {};

    /*
    this._downSampledPositionPostProcess.onApply = (effect: Effect) => {
      effect.setFloat2(
        'texelSize',
        1.0 / this._downSampledPositionPostProcess.width,
        1.0 / this._downSampledPositionPostProcess.height
      );
      effect.setTexture('targetSampler', this._gbuffer.textures[1]);
    };
     */

    // this._createDownSampledPositionPostProcess(this._downSampleRatio);
    this._createBlurPostProcess(this._downSampleRatio);
    this._createRandomTexture();
    this._createSSGIPostProcess(this._downSampleRatio);
    this._createCompositePostProcess(1.0, this._downSampleRatio);
    this._createTestPostProcess(this._downSampleRatio);
    this._createCompositePostProcess(1.0, this._downSampleRatio);
    /*
    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'originalColorCache', () => {
        return [this._originalColorPostProcess];
      })
    );
    /*
    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'originalColorCache2', () => {
        return [this._downSampledOriginalColorPostProcess];
      })
    );
     */

    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'positionCache', () => {
        return [this._originalColorPostProcess, this._ssgiPostProcess, this._blurHPostProcess, this._blurVPostProcess];
      })
    );
    /*
    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'ssgi', () => {
        return [this._ssgiPostProcess];
      })
    );
     */

    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'ssgiComposite', () => {
        return [this._compositePostProcess];
      })
    );

    scene.postProcessRenderPipelineManager.addPipeline(this);
  }
  private ssgiStart;
  private ssgiEnd;
  private start;
  private end;
  private ssgiCalcTime;
  private ssgiGlobalTime;
  public getPerformance() {
    this._ssgiPostProcess.onBeforeRender = (effect) => {
      this.ssgiStart = performance.now();
    };
    this._ssgiPostProcess.onAfterRender = (effect) => {
      this.ssgiEnd = performance.now();
    };
    this._originalColorPostProcess.onBeforeRender = (effect) => {
      this.start = performance.now();
    };
    this._compositePostProcess.onAfterRender = (effect) => {
      this.end = performance.now();
      this.ssgiCalcTime = this.ssgiEnd - this.ssgiStart;
      this.ssgiGlobalTime = this.end - this.start;
      console.log(`end: ${this.ssgiEnd - this.ssgiStart}, ${this.end - this.start}`);
    };

    return { ssgipp: this.ssgiCalcTime, ssgiline: this.ssgiGlobalTime };
  }

  private _createBlurPostProcess(ratio: number): void {
    const size = 32;

    this._blurHPostProcess = new BlurPostProcess(
      'BlurH',
      new Vector2(1, 0),
      size,
      ratio,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
      // Constants.TEXTURETYPE_UNSIGNED_INT
    );
    this._blurVPostProcess = new BlurPostProcess(
      'BlurV',
      new Vector2(0, 1),
      size,
      ratio,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
      // Constants.TEXTURETYPE_UNSIGNED_INT
    );

    this._blurHPostProcess.onActivateObservable.add(() => {
      const dw = this._blurHPostProcess.width / this._scene.getEngine().getRenderWidth();
      this._blurHPostProcess.kernel = size * dw;
    });

    this._blurVPostProcess.onActivateObservable.add(() => {
      const dw = this._blurVPostProcess.height / this._scene.getEngine().getRenderHeight();
      this._blurVPostProcess.kernel = size * dw;
    });
  }

  private _createSSGIPostProcess(ratio: number): void {
    Effect.ShadersStore['ssgiFragmentShader'] = ssgiSource;
    this._ssgiPostProcess = new PostProcess(
      'ssgi',
      'ssgi',
      ['texelSize'],
      ['positionSampler', 'originalColorSampler', 'roughnessSampler', 'normalSampler', 'randomSampler'],
      ratio,
      null,
      Texture.NEAREST_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._ssgiPostProcess.onApply = (effect: Effect) => {
      effect.setFloat2('texelSize', 1.0 / this._ssgiPostProcess.width, 1.0 / this._ssgiPostProcess.height);
      effect.setTextureFromPostProcess('originalColorSampler', this._originalColorPostProcess);
      effect.setTexture('normalSampler', this._gbuffer.textures[1]);
      effect.setTexture('positionSampler', this._gbuffer.textures[2]);
      effect.setTexture('roughnessSampler', this._gbuffer.textures[3]);
      effect.setTexture('randomSampler', this._randomTexture);
    };
  }

  private _createTestPostProcess(ratio: number): void {
    Effect.ShadersStore['testFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform vec2 testVec2;
    uniform sampler2D textureSampler;
    uniform sampler2D orgColor;
    uniform sampler2D normalSampler;
    void main(void){
    gl_FragColor = texture2D(orgColor, vUV) + texture2D(normalSampler, vUV);
    }
    `;
    this._testPostProcess = new PostProcess(
      'test',
      'test',
      ['testVec2'],
      ['orgColor', 'normalSampler'],
      ratio,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._testPostProcess.onApply = (effect: Effect) => {
      effect.setFloat2('testVec2', 1.0, 2.0);
      effect.setTextureFromPostProcess('orgColor', this._originalColorPostProcess);
      effect.setTexture('normalSampler', this._gbuffer.textures[2]);
    };
  }

  private _createCompositePostProcess(ratio: number, downSampleRatio: number): void {
    Effect.ShadersStore['ssgiCompositeFragmentShader'] = compositeSource;
    this._compositePostProcess = new PostProcess(
      'ssgiComposite',
      'ssgiComposite',
      [],
      ['originalColor', 'ssgiColor'],
      1,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._compositePostProcess.onApply = (effect: Effect) => {
      effect.setTextureFromPostProcess('originalColor', this._originalColorPostProcess);
      effect.setTextureFromPostProcessOutput('ssgiColor', this._blurVPostProcess);
    };
  }

  private _createRandomTexture(): void {
    const size = 512;

    this._randomTexture = new DynamicTexture(
      'SSAORandomTexture',
      size,
      this._scene,
      false,
      Texture.TRILINEAR_SAMPLINGMODE
    );
    this._randomTexture.wrapU = Texture.WRAP_ADDRESSMODE;
    this._randomTexture.wrapV = Texture.WRAP_ADDRESSMODE;

    const context = this._randomTexture.getContext();

    const rand = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const randVector = Vector3.Zero();

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        randVector.x = Math.floor(rand(-1.0, 1.0) * 255);
        randVector.y = Math.floor(rand(-1.0, 1.0) * 255);
        randVector.z = Math.floor(rand(-1.0, 1.0) * 255);

        context.fillStyle = 'rgb(' + randVector.x + ', ' + randVector.y + ', ' + randVector.z + ')';
        context.fillRect(x, y, 1, 1);
      }
    }

    this._randomTexture.update(false);
  }
}
