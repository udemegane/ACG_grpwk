import { AdvancedDynamicTexture, Button, InputText, TextBlock } from '@babylonjs/gui';
import { Mesh, KeyboardEventTypes } from '@babylonjs/core';
import { onKeyboardEvent } from '../tools';
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
export default class MyScript extends Mesh {
  private _SpaceKey: number;

  advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

  time = 0;

  ispressed = false;
  selectup = true;
  nowscene = 0;

  button = new TextBlock();
  multiplay = new TextBlock();
  singleplay = new TextBlock();
  inputusername = new InputText();
  inputpassword = new InputText();
  welcome = new TextBlock();
  waiting = new TextBlock();
  errortext = new TextBlock();
  enterbutton = Button.CreateSimpleButton('Enter', 'OK');
  returnbutton = Button.CreateSimpleButton('Return', 'Return');
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
    this.createbuttonGUI();
    this.createsingleplayGUI();
    this.createmultiplayGUI();
    this.createinputGUI();
    this.createenterbuttonGUI();
    this.welcomecommentGUI();
    this.createloadingGUI();
    this.waitinganimation();
    this.createreturnbuttonGUI();
    // ...
  }

  @onKeyboardEvent([32], KeyboardEventTypes.KEYUP)
  private _onSpaceKey(): void {
    let size = 30;
    let t = 200;
    switch (this.nowscene) {
      case 0:
        if (this.ispressed === false) {
          this.playSound('files/decide21.mp3');
          this.ispressed = true;
          this.button.alpha = 1.0;
          this.button.shadowBlur = 10;
          const handle = setInterval(async () => {
            t -= 1;
            size += 0.01;
            this.button.alpha -= 0.005;
            this.button.fontSize = size;
            if (t === 0) {
              clearInterval(handle);
              this.button.dispose();
              if (await Env.checkToken()) {
                this.nowscene = 2;
                this.welcome.text = `Welcome ${Env.getUsername()} !`;
              } else {
                this.nowscene = 1;
                this.inputusername.isVisible = true;
              }
            }
          }, 10);
        }
        break;
      case 2:
        if (this.selectup === false) this.nowscene = 3;
        else Env.switchScene('./scenes/scene/');
        break;
      default:
        break;
    }
  }
  @onKeyboardEvent([87], KeyboardEventTypes.KEYUP)
  private _onWKey(): void {
    if (this.nowscene === 2) {
      this.playSound('files/button57.mp3');
      this.selectup = true;
    }
  }

  @onKeyboardEvent([83], KeyboardEventTypes.KEYUP)
  private _onSKey(): void {
    if (this.nowscene === 2) {
      this.playSound('files/button57.mp3');
      this.selectup = false;
    }
  }

  @onKeyboardEvent([90], KeyboardEventTypes.KEYUP)
  private _onZKey(): void {
    if (this.nowscene !== 1 && this.nowscene !== 4) {
      this.nowscene -= 1;
    }
  }

  /**
   * Called each frame.
   */
  public onUpdate(): void {
    if (this.ispressed === false) this.button.alpha = Math.sin(this.time++ / 30) * 0.5 + 0.5;
    if (this.nowscene === 1) {
      this.inputusername.isVisible = true;
      this.inputpassword.isVisible = true;
      this.enterbutton.isVisible = true;
    } else {
      this.inputusername.isVisible = false;
      this.inputpassword.isVisible = false;
      this.enterbutton.isVisible = false;
    }
    if (this.nowscene === 2) {
      this.singleplay.isVisible = true;
      this.multiplay.isVisible = true;
      this.welcome.isVisible = true;
    } else {
      this.singleplay.isVisible = false;
      this.multiplay.isVisible = false;
      this.welcome.isVisible = false;
    }
    if (this.nowscene === 3) {
      this.waiting.isVisible = true;
    } else {
      this.waiting.isVisible = false;
    }
    if (this.nowscene === 4) {
      this.returnbutton.isVisible = true;
      this.errortext.isVisible = true;
    } else {
      this.returnbutton.isVisible = false;
      this.errortext.isVisible = false;
    }
    this.selectbutton();
    // ...
  }

  public welcomecommentGUI(): void {
    this.welcome.text = 'welcome ';
    this.welcome.top = 200;
    this.welcome.shadowBlur = 0;
    this.welcome.shadowColor = '#FFFFFF';
    this.welcome.color = '#C0C0C0';
    this.welcome.fontSizeInPixels = 30;
    this.welcome.isVisible = false;
    this.advancedTexture.addControl(this.welcome);
  }

  public createbuttonGUI(): void {
    this.button.text = 'PRESS [SPACE] TO PLAY';
    this.button.fontSizeInPixels = 30;
    this.button.top = 110;
    this.button.shadowBlur = 0;
    this.button.shadowColor = '#FFFFFF';
    this.button.color = '#C0C0C0';
    this.advancedTexture.addControl(this.button);
  }

  public createsingleplayGUI(): void {
    this.singleplay.text = '  SINGLE PLAY';
    this.singleplay.fontSizeInPixels = 30;
    this.singleplay.top = 100;
    this.singleplay.left = -10;
    this.singleplay.color = '#C0C0C0';
    this.singleplay.shadowBlur = 0;
    this.singleplay.shadowColor = '#FFFFFF';
    this.singleplay.isVisible = false;
    this.advancedTexture.addControl(this.singleplay);
  }

  public createmultiplayGUI(): void {
    this.multiplay.text = '  MULTI PLAY';
    this.multiplay.fontSizeInPixels = 30;
    this.multiplay.top = 140;
    this.multiplay.left = -10;
    this.multiplay.shadowBlur = 0;
    this.multiplay.shadowColor = '#FFFFFF';
    this.multiplay.color = '#C0C0C0';
    this.multiplay.isVisible = false;
    this.advancedTexture.addControl(this.multiplay);
  }

  public selectbutton(): void {
    if (this.selectup === true) {
      this.singleplay.text = '▷ SINGLE PLAY';
      this.multiplay.text = '  MULTI PLAY';
      this.multiplay.shadowBlur = 0;
      this.singleplay.shadowBlur = 10;
    } else {
      this.singleplay.text = '  SINGLE PLAY';
      this.multiplay.text = '▷ MULTI PLAY';
      this.multiplay.shadowBlur = 10;
      this.singleplay.shadowBlur = 0;
    }
  }

  public createinputGUI(): void {
    this.inputusername.top = 90;
    this.inputusername.width = 0.25;
    this.inputusername.maxWidth = 0.25;
    this.inputusername.height = 0.075;
    this.inputusername.fontSize = 30;
    this.inputusername.text = 'username';
    this.inputusername.color = 'white';
    this.inputusername.isVisible = false;
    this.advancedTexture.addControl(this.inputusername);

    this.inputpassword.top = 150;
    this.inputpassword.width = 0.25;
    this.inputpassword.maxWidth = 0.25;
    this.inputpassword.height = 0.075;
    this.inputpassword.fontSize = 30;
    this.inputpassword.text = 'password';
    this.inputpassword.color = 'white';
    this.inputpassword.isVisible = false;
    this.advancedTexture.addControl(this.inputpassword);
  }

  public createenterbuttonGUI(): void {
    this.enterbutton.color = 'white';
    this.enterbutton.background = 'black';
    this.enterbutton.isVisible = false;
    this.enterbutton.top = 250;
    this.enterbutton.width = 0.1;
    this.enterbutton.height = 0.075;
    this.enterbutton.onPointerClickObservable.add(async () => {
      this.playSound('files/button57.mp3');
      const a = await Env.login(this.inputusername.text, this.inputpassword.text);
      if (!a.success) {
        this.nowscene = 4;
      } else {
        this.nowscene = 2;
        this.welcome.text = `Welcome ${this.inputusername.text} !`;
      }
    });
    this.advancedTexture.addControl(this.enterbutton);
  }

  public createreturnbuttonGUI(): void {
    this.returnbutton.color = 'white';
    this.returnbutton.background = 'black';
    this.returnbutton.isVisible = false;
    this.returnbutton.top = 250;
    this.returnbutton.width = 0.1;
    this.returnbutton.height = 0.075;

    this.errortext.color = 'white';
    this.errortext.text = 'Either the username or password is invalid';
    this.errortext.isVisible = false;
    this.errortext.fontSize = 20;
    this.errortext.top = 200;
    this.advancedTexture.addControl(this.errortext);
    this.returnbutton.onPointerClickObservable.add(() => {
      this.playSound('files/button57.mp3');
      this.nowscene = 1;
    });
    this.advancedTexture.addControl(this.returnbutton);
  }

  public createloadingGUI(): void {
    this.waiting.color = 'white';
    this.waiting.top = 150;
    this.waiting.fontSize = 30;
    this.waiting.text = 'Waiting';
    this.waiting.isVisible = false;
    this.advancedTexture.addControl(this.waiting);
  }

  public waitinganimation(): void {
    let t = 0;
    this.waiting.text = 'Waiting';
    const handle = setInterval(() => {
      t += 1;
      switch (t % 4) {
        case 0:
          this.waiting.text = 'Waiting';
          break;
        case 1:
          this.waiting.text = 'Waiting.';
          break;
        case 2:
          this.waiting.text = 'Waiting..';
          break;
        case 3:
          this.waiting.text = 'Waiting...';
          break;
        default:
          break;
      }
      // if (matching is success){
      //   clearInterval(handle);
      //   Env.switchScene('./scenes/scene/');
      // }
      if (t === 1000) {
        clearInterval(handle);
        this.nowscene = 2;
      }
    }, 1000);
  }

  public playSound(name): void {
    const selectse = this._scene.getSoundByName(name);
    selectse.setVolume(0.5);
    selectse.play();
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
