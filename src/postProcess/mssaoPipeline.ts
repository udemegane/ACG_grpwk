import {
  Camera,
  Effect,
  GeometryBufferRenderer,
  MultiRenderTarget,
  PassPostProcess,
  PostProcess,
  PostProcessRenderEffect,
  PostProcessRenderPipeline,
  RenderTargetTexture,
  Scene,
  Texture,
} from '@babylonjs/core';
import { compositeSource } from './effects/shader/multiplyIntensity.frag.glsl';
import { ssaoSource } from './effects/shader/ssao.frag.glsl';

export class MSSAOPipeline extends PostProcessRenderPipeline {
  private _scene: Scene;
  private _originalColorPostProcess: PassPostProcess;
  private _ssaoPostProcess: PostProcess;
  private _compositePostProcess: PostProcess;
  private _testPostProcess: PostProcess;
  private _gbuffer: MultiRenderTarget;
  constructor(name: string, scene: Scene, cameras?: Camera[]) {
    super(scene.getEngine(), name);
    this._scene = scene;
    const gbr = scene.enableGeometryBufferRenderer(1.0);
    gbr.enablePosition = true;
    gbr.enableReflectivity = true;
    // scene.geometryBufferRenderer.enablePosition = true;
    // scene.geometryBufferRenderer.enableReflectivity = true;
    this._gbuffer = gbr.getGBuffer();
    console.log(`GBufferNormalTexSize: ${this._gbuffer.textures[1].getSize()}`);

    this._originalColorPostProcess = new PassPostProcess(
      'ssaoCache',
      1.0,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      scene.getEngine(),
      false
    );
    this._createTestPostProcess();
    // this._createSSAOPostProcess(1);
    // this._createCompositePostProcess();
    /*
    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'ssaoppcontainter', () => {
        return [this._originalColorPostProcess, this._ssaoPostProcess, this._compositePostProcess];
      })
    );
    */
    this.addEffect(
      new PostProcessRenderEffect(scene.getEngine(), 'test', () => {
        return [this._originalColorPostProcess, this._testPostProcess];
      })
    );
    scene.postProcessRenderPipelineManager.addPipeline(this);
  }
  private _createTestPostProcess(): void {
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
      1,
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

  private _createSSAOPostProcess(ratio: number): void {
    Effect.ShadersStore['ssaoFragmentShader'] = ssaoSource;
    this._ssaoPostProcess = new PostProcess(
      'mssao',
      'ssao',
      ['texelSize'],
      ['normalSampler', 'positionSampler'],
      1,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._ssaoPostProcess.onApply = (effect: Effect) => {
      effect.setFloat2('texelSize', 1.0 / this._ssaoPostProcess.width, 1.0 / this._ssaoPostProcess.height);
      effect.setTexture('normalSampler', this._gbuffer.textures[1]);
      effect.setTexture('positionSampler', this._gbuffer.textures[2]);
    };
  }
  private _createCompositePostProcess(): void {
    Effect.ShadersStore['ssaoCompositeFragmentShader'] = compositeSource;
    this._compositePostProcess = new PostProcess(
      'ssaoComposite',
      'ssaoComposite',
      [],
      ['originalColor'],
      1,
      null,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._compositePostProcess.onApply = (effect: Effect) => {
      effect.setTextureFromPostProcess('originalColor', this._originalColorPostProcess);
    };
  }
}
