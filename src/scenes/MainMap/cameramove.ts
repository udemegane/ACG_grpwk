import {
  FreeCamera,
  PointerEventTypes,
  Mesh,
  PointerInfo,
  PhysicsImpostor,
  Vector3,
  Animation,
  CircleEase,
  EasingFunction,
  KeyboardEventTypes,
} from '@babylonjs/core';

import { fromChildren, visibleInInspector, onPointerEvent, onKeyboardEvent } from '../tools';
import { Env } from '../GameScripts/environment';

export default class PlayerCamera extends FreeCamera {
  @visibleInInspector('KeyMap', 'Forward Key', 'w'.charCodeAt(0))
  private _forwardKey: number;

  @visibleInInspector('KeyMap', 'Backward Key', 's'.charCodeAt(0))
  private _backwardKey: number;

  @visibleInInspector('KeyMap', 'Strafe Left Key', 'a'.charCodeAt(0))
  private _strafeLeftKey: number;

  @visibleInInspector('KeyMap', 'Strafe Right Key', 'd'.charCodeAt(0))
  private _strafeRightKey: number;

  @visibleInInspector('number', 'Jump Value', 5)
  private _jumpvalue: number;

  private _jumping = false;
  /**
   * Override constructor.
   * @warn do not fill.
   */
  // @ts-ignore ignoring the super call as we don't want to re-init
  private constructor() {}

  /**
   * Called on the scene starts.
   */
  public onStart(): void {
    // For the example, let's configure the keys of the camera using the @visibleInInspector decorator.
    this.keysUp = [this._forwardKey];
    this.keysDown = [this._backwardKey];
    this.keysLeft = [this._strafeLeftKey];
    this.keysRight = [this._strafeRightKey];
  }

  /**
   * Called each frame.
   */
  public onUpdate(): void {
    // Nothing to do now...
  }

  @onKeyboardEvent([74], KeyboardEventTypes.KEYUP)
  private _jump(): void {
    if (this._jumping) {
      return;
    }
    this._jumping = true;
    this.cameraJump();
  }

  public cameraJump() {
    const cam = this._scene.activeCamera;
    cam.animations = [];
    const a = new Animation('a', 'position.y', 50, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    const keys = [];
    keys.push({ frame: 0, value: cam.position.y });
    keys.push({ frame: 25, value: cam.position.y + this._jumpvalue });
    keys.push({ frame: 50, value: cam.position.y });
    a.setKeys(keys);

    const easingFunction = new CircleEase();
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    a.setEasingFunction(easingFunction);

    cam.animations.push(a);
    this._scene.beginAnimation(cam, 0, 50, false, 1, () => {
      this._jumping = false;
    });
  }

  /**
   * Called on the user clicks on the canvas.
   * Used to request pointer lock and launch a new ball.
   */
  @onPointerEvent(PointerEventTypes.POINTERDOWN, false)
  private _onPointerEvent(info: PointerInfo): void {
    this._enterPointerLock();
  }

  /**
   * Called on the escape key (key code 27) is up.
   * Used to exit pointer lock.
   */
  @onKeyboardEvent([27], KeyboardEventTypes.KEYUP)
  private _onEscapeKey(): void {
    const engine = this.getEngine();
    if (engine.isPointerLock) {
      engine.exitPointerlock();
    }
  }

  // キー0をシーン切り替えデバッグ用にした
  //   @onKeyboardEvent([48], KeyboardEventTypes.KEYUP)
  //   private _onZeroKey(): void {
  //     Env.switchScene('./scenes/MainMap/');
  //   }

  /**
   * Requests the pointer lock.
   */
  private _enterPointerLock(): void {
    const engine = this.getEngine();
    if (!engine.isPointerLock) {
      engine.enterPointerlock();
    }
  }
}
