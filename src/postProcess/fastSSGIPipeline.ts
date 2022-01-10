import {
  Camera,
  Effect,
  MultiRenderTarget,
  PassPostProcess,
  PostProcess,
  PostProcessRenderEffect,
  PostProcessRenderPipeline,
  RenderTargetTexture,
  Scene,
  Texture,
} from '@babylonjs/core';
import ssgiSource from './effects/shader/ssgi.frag.glsl';
import compositeSource from './effects/shader/compositeSSGI.frag.glsl';
import PassTexturePostprocess from './effects/passTexturePostprocess';
import passTexSource from './effects/shader/passTexture.frag.glsl';

export class FastSSGIPipeline extends PostProcessRenderPipeline {
  private _scene: Scene;
  private _originalColorPostProcess: PassPostProcess;
  private _downSampledOriginalColorPostProcess: PassTexturePostprocess;
  private _downSampledPositionPostProcess: PassTexturePostprocess;
  private _ssgiPostProcess: PostProcess;
  private _compositePostProcess: PostProcess;
  private _testPostProcess: PostProcess;
  private _gbuffer: MultiRenderTarget;
  private _textureCache: MultiRenderTarget;
  private _downSampleRatio = 0.0625;
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
        return [
          this._originalColorPostProcess,
          // this._downSampledOriginalColorPostProcess,
          // this._downSampledPositionPostProcess,
          // this._testPostProcess,
          this._ssgiPostProcess,
        ];
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
  private _createSSGIPostProcess(ratio: number): void {
    Effect.ShadersStore['ssgiFragmentShader'] = ssgiSource;
    this._ssgiPostProcess = new PostProcess(
      'ssgi',
      'ssgi',
      ['texelSize'],
      ['positionSampler', 'originalColorSampler', 'roughnessSampler'],
      ratio,
      null,
      Texture.NEAREST_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._ssgiPostProcess.onApply = (effect: Effect) => {
      effect.setFloat2('texelSize', 1.0 / this._ssgiPostProcess.width, 1.0 / this._ssgiPostProcess.height);
      console.log(`w: ${this._ssgiPostProcess.width}, h: ${this._ssgiPostProcess.height}`);
      effect.setTextureFromPostProcess('originalColorSampler', this._originalColorPostProcess);
      // effect.setTextureFromPostProcess('positionSampler', this._downSampledPositionPostProcess);
      effect.setTexture('positionSampler', this._gbuffer.textures[2]);
      effect.setTexture('roughnessSampler', this._gbuffer.textures[3]);
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
      effect.setTextureFromPostProcessOutput('ssgiColor', this._ssgiPostProcess);
    };
  }
}
