import { Scene } from '@babylonjs/core';
import { Pane } from 'tweakpane';
import { visibleInInspector } from '../decorators';
import { Env } from './environment';
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
export default class SceneScriptBase extends Scene {
  @visibleInInspector('string', 'In gameModeBase', 'Hello World!')
  private _testString: string;

  @visibleInInspector('boolean', 'Show Debug menu', true)
  private _isVisibleDebugMenu: boolean;

  public static pane: Pane;
  /**
   * Override constructor.
   * @warn do not fill.
   */
  // @ts-ignore ignoring the super call as we don't want to re-init
  protected constructor() {}

  private static setDebugMenu(): void {
    if (!this.pane) {
      this.pane = new Pane();
      const PARAMS = {
        prodStage: process.env.ACG_PRODUCTION_STAGE,
        serverURL: process.env.ACG_BACKSERVER_URL,
      };
      // this.pane.addInput(PARAMS, 'factor');
      this.pane.addInput(PARAMS, 'prodStage');
      this.pane.addInput(PARAMS, 'serverURL');
      // this.pane.addInput(PARAMS, 'color');
    }
  }

  /**
   * Called on the node is being initialized.
   * This function is called immediatly after the constructor has been called.
   */
  public onInitialize(): void {
    Env.onInitialize();
  }

  /**
   * Called on the scene starts.
   */
  public onStart(): void {
    if (this._isVisibleDebugMenu) {
      SceneScriptBase.setDebugMenu();
    }
    // ...
  }

  /**
   * Called each frame.
   */
  public onUpdate(): void {
    // ...
  }
}
