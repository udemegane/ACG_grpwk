import {
  BlurPostProcess,
  Camera,
  Constants,
  GeometryBufferRenderer,
  Mesh,
  MultiRenderTarget,
  PBRMaterial,
  PostProcess,
  RenderTargetTexture,
  Scene,
  Vector3,
  Effect,
  ArcRotateCamera,
  FreeCamera,
  PostProcessRenderPipeline,
  GlowLayer,
} from '@babylonjs/core';
import SceneScriptBase from '../GameScripts/sceneScriptBase';
import { visibleInInspector, fromScene, fromChildren } from '../decorators';
import { SscPostProcess } from '../../postProcess/effects/ssc';
import { GameManager } from '../GameScripts/gameManager';
import { SsaoPostProcess } from '../../postProcess/effects/ssao_old';
import { MSSAOPipeline } from '../../postProcess/mssaoPipeline';
import { FastSSGIPipeline } from '../../postProcess/fastSSGIPipeline';
import normalsrc from '../../postProcess/effects/shader/worldNormal.frag.glsl';
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */

export default class SceneScript extends SceneScriptBase {
  @fromScene('MainCamera')
  private _camera: Camera;
  @fromScene('Ground')
  private _ground: Mesh;
  @visibleInInspector('string', 'In sceneScript', 'Hello world!')
  private _testLocalString: string;
  private _scene: Scene;
  private _gbuffer: GeometryBufferRenderer;
  private _rtt: RenderTargetTexture;
  private _pipeline: PostProcessRenderPipeline;
  /**
   * Override constructor.
   * @warn do not fill.
   */
  // @ts-ignore ignoring the super call as we don't want to re-init
  protected constructor() {}

  /**
   * Called on the node is being initialized.
   * This function is called immediatly after the constructor has been called.
   */
  public onInitialize(): void {
    super.onInitialize();
    this._scene = GameManager.getScene();
    this._gbuffer = this._scene.enableGeometryBufferRenderer();
    this._gbuffer.enablePosition = true;
    /*


    this._gbuffer.enableReflectivity = true;
    this._gbuffer.enablePosition = true;
    if (!this._gbuffer) {
      console.error('Geometry Buffer is not supported');
    }
    console.log(
      `ScreenSize: ${this._scene.getEngine().getRenderWidth()} , ${this._scene.getEngine().getRenderHeight()} `
    );
    const multiRenderTarget = new MultiRenderTarget(
      'SSBuffer',
      { width: this._scene.getEngine().getRenderWidth(), height: this._scene.getEngine().getRenderHeight() },
      2,
      this._scene,
      {
        generateMipMaps: false,
        generateDepthTexture: false,
        generateStencilBuffer: false,
        defaultType: Constants.TEXTURETYPE_FLOAT,
      }
    );
    this._scene.customRenderTargets.push(multiRenderTarget);
    this._rtt = new RenderTargetTexture('ao', 1.0, this._scene);
    this._scene.customRenderTargets.push(this._rtt);
    */

    // ...
  }

  /**
   * Called on the scene starts.
   */
  public onStart(): void {
    super.onStart();
    const gloeLayer = new GlowLayer('glow', this._scene);
    // this._pipeline = new MSSAOPipeline('testssao', this._scene);
    this._pipeline = new FastSSGIPipeline('ssgi', this._scene);
    // this._scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline('ssgi', this._camera);

    Effect.ShadersStore['worldnormalFragmentShader'] = normalsrc;
    const normalpp = new PostProcess(
      'worldnormal',
      'worldnormal',
      ['texelSize'],
      ['positionSampler'],
      1.0,
      this._camera
    );
    normalpp.onApply = (effect) => {
      effect.setFloat2('texelSize', 1.0 / normalpp.width, 1.0 / normalpp.height);
      effect.setTexture('positionSampler', this._gbuffer.getGBuffer().textures[2]);
    };
    /*
    console.log(
      this._gbuffer.getGBuffer().textures[0].getSize() ===
        this._scene.enableGeometryBufferRenderer(0.5).getGBuffer().textures[0].getSize()
    );
    console.log(this._gbuffer.getGBuffer().textures[0].getSize());
    console.log(this._scene.enableGeometryBufferRenderer(0.5).getGBuffer().textures[0].getSize());
    if (this._ground.material instanceof PBRMaterial) {
      const tmp = this._ground.material as PBRMaterial;
      tmp.useLogarithmicDepth = true;
    }
    if (!this._camera) {
      throw new Error(`No camera defined in the scene. ${this._camera}`);
    }
    this._rtt.addPostProcess(new SsaoPostProcess('mySSAO', this._gbuffer, this._camera));
    // const sscpp = new SscPostProcess('SSCurvature', this._gbuffer, this._camera);
    // const ssao = new SsaoPostProcess('mySSAO', this._gbuffer, this._camera);
    Effect.ShadersStore['finalFragmentShader'] = `
        precision highp float;


        varying vec2 vUV;

        uniform sampler2D textureSampler;
        uniform sampler2D AOSampler;

        void main(void)
        {
            vec4 main = texture2D(textureSampler, vUV);
            vec4 ao = texture2D(AOSampler, vUV);
            // mixes colors
            gl_FragColor = ao;
        }
    `;

    const finalPass = new PostProcess('final render', 'final', [], ['AOSampler'], 1, this._camera);
    finalPass.onApply = (effect) => {
      effect.setTexture('AOSampler', this._rtt);
    };

    console.log(`normal: ${this._gbuffer.getTextureIndex(GeometryBufferRenderer.DEPTHNORMAL_TEXTURE_TYPE)}`);
    console.log(`position: ${this._gbuffer.getTextureIndex(GeometryBufferRenderer.POSITION_TEXTURE_TYPE)}`);
    console.log(`roughness: ${this._gbuffer.getTextureIndex(GeometryBufferRenderer.REFLECTIVITY_TEXTURE_TYPE)}`);
    console.log(`depthtex type: ${this._gbuffer.getGBuffer().textures[0].textureType}`);
    console.log(`pos type: ${this._gbuffer.getGBuffer().textures[2].textureType}`);
    // ...
    *
     */
  }
  // RTTにはaddpostprocessできるのでそこに突っ込む
  /**
   * Called each frame.
   */
  public onUpdate(): void {
    super.onUpdate();
    // ...
  }

  /**
   * Called on a message has been received and sent from a graph.
   * @param message defines the name of the message sent from the graph.
   * @param data defines the data sent in the message.
   * @param sender defines the reference to the graph class that sent the message.
   */
  public onMessage(name: string, data: any, sender: any): void {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'myMessage':
        // Do something...
        break;
    }
  }
}
