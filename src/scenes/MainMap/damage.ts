import { Mesh, ImageProcessingPostProcess, Color4 } from '@babylonjs/core';
import { TextBlock, AdvancedDynamicTexture } from '@babylonjs/gui';

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
export default class MyScript extends Mesh {
  /**
   * Override constructor.
   * @warn do not fill.
   */
  // @ts-ignore ignoring the super call as we don't want to re-init
  protected constructor() {}
  advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

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
    // if(get one shot){
    //   this.getDamage();
    // }
    // ...
  }

  public getDamage(): void {
    const postProcess = new ImageProcessingPostProcess('processing', 1.0, this._scene.activeCamera);
    postProcess.vignetteWeight = 7;
    postProcess.vignetteStretch = 0.01;
    postProcess.vignetteColor = new Color4(1, 0, 0, 0);
    postProcess.vignetteEnabled = true;
  }

  public youLose(): void {
    const resulttext = new TextBlock();
    resulttext.text = 'YOU LOSE';
    resulttext.fontSizeInPixels = 80;
    resulttext.shadowBlur = 30;
    resulttext.shadowColor = 'black';
    resulttext.color = 'white';
    this.advancedTexture.addControl(resulttext);
  }

  public youWin(): void {
    const resulttext = new TextBlock();
    resulttext.text = 'YOU WIN';
    resulttext.fontSizeInPixels = 80;
    resulttext.shadowBlur = 30;
    resulttext.shadowColor = 'white';
    resulttext.color = 'white';
    this.advancedTexture.addControl(resulttext);
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
