import { Mesh, Scene, Texture, VolumetricLightScatteringPostProcess } from '@babylonjs/core';
import SceneScriptBase from '../GameScripts/sceneScriptBase';
import { fromScene, visibleInInspector } from '../decorators';
import { Env } from '../GameScripts/environment';
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

export default class MainMapScript extends SceneScriptBase {
  @visibleInInspector('string', 'In sceneScript', 'Hello world!')
  private _testLocalString: string;

  @fromScene('ScattalingLight')
  private _vlsMesh: Mesh;
  private _vlsPostProcess: VolumetricLightScatteringPostProcess;
  // private _scene: Scene;

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
    if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log('main map oninit');
    // ...
  }

  /**
   * Called on the scene starts.
   */
  public onStart(): void {
    super.onStart();
    if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log('main map onstart');
    this._vlsPostProcess = new VolumetricLightScatteringPostProcess(
      'vlspp',
      '1.0',
      this._scene.activeCamera,
      this._vlsMesh,
      100,
      Texture.BILINEAR_SAMPLINGMODE,
      this._scene.getEngine(),
      false
    );
    this._scene = Env.currentScene;

    // this._scene.createDefaultEnvironment();
    // super._scene;
    // ...
  }

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
    switch (name) {
      case 'myMessage':
        // Do something...
        break;
    }
  }
}
