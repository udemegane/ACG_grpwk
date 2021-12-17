import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { KeyboardEventTypes } from '@babylonjs/core';
import { clearInterval } from 'timers';
import { onKeyboardEvent } from '../tools';
import { GameManager } from '../GameScripts/gameManager';
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
export default class MyScript extends Node {
  private _SpaceKey: number;

  advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

  time = 0;

  ispressed = false;

  button = new TextBlock();

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
    this.createTitleGUI();
    this.createbuttonGUI();
    // ...
  }

  @onKeyboardEvent([32], KeyboardEventTypes.KEYUP)
  private _onSpaceKey(): void {
    this.ispressed = true;
    let size = 20;
    let t = 100;
    this.button.alpha = 1.0;
    const handle = setInterval(() => {
      t -= 1;
      size += 0.01;
      this.button.alpha -= 0.01;
      this.button.fontSize = size;
      if (t === 0) {
        clearInterval(handle);
        this.button.dispose();
        GameManager.switchScene('./scenes/graphs');
      }
    }, 10);
  }

  /**
   * Called each frame.
   */
  public onUpdate(): void {
    if (this.ispressed === false)
      this.button.alpha = Math.sin(this.time++ / 30) * 0.5 + 0.5;
    // ...
  }

  public createTitleGUI(): void {
    const textblock = new TextBlock();
    textblock.text = 'AGC\nSample\nGame';
    textblock.fontSize = 50;
    textblock.top = -50;
    textblock.color = 'white';
    textblock.fontFamily = 'Impact';
    this.advancedTexture.addControl(textblock);
  }

  public createbuttonGUI(): void {
    this.button.text = 'PRESS [SPACE] TO PLAY';
    this.button.fontSizeInPixels = 20;
    this.button.top = 100;
    this.button.color = '#C0C0C0';
    this.advancedTexture.addControl(this.button);
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
