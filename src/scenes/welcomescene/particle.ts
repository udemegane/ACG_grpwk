import { ParticleSystem } from '@babylonjs/core';

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
export default class MyScript extends ParticleSystem {
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
    const particle1 = this._scene.getParticleSystemByID('2c33517a-bbec-466e-8c8b-913c7f8ad909');
    const particle2 = this._scene.getParticleSystemByID('c2382c35-aaca-49c5-b1f2-5ccdecc0dba3');
    if (this._scene.activeCamera.name === 'Camera1') {
      particle1.start();
      particle2.stop();
    } else {
      particle1.stop();
      particle2.start();
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
