import { Mesh } from '@babylonjs/core';

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
export default class move extends Mesh {
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
    // ...
  }

  /**
   * Called on the scene starts.
   */
  public onStart(): void {
    // ...
  }

  /**
   * Called each frame.
   */
  public onUpdate(): void {
    if (this._scene.activeCamera.name === 'Camera2') {
      if (this.position.x <= 0.0) {
        let t = 20;
        const handle = setInterval(() => {
          this._scene.fogDensity += 0.00025;
          t -= 1;
          if (t === 0) {
            clearInterval(handle);
            this.position.x = 5.0;
            this._scene.activeCamera = this._scene.getCameraByName('Camera1');
          }
        }, 100);
      } else {
        this.position.x -= 0.01;
        this._scene.fogDensity = 0.0;
      }
    }
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
