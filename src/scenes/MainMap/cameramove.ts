import {
  FreeCamera,
  PointerEventTypes,
  PointerInfo,
  KeyboardInfo,
  Ray,
  Vector3,
  Animation,
  CircleEase,
  EasingFunction,
  KeyboardEventTypes,
  RayHelper,
  MeshBuilder,
  PowerEase,
} from '@babylonjs/core';

import { TextBlock, AdvancedDynamicTexture } from '@babylonjs/gui';
import { clearInterval } from 'timers';
import { count } from 'console';
import { Env } from '../GameScripts/environment';
import { fromChildren, visibleInInspector, onPointerEvent, onKeyboardEvent } from '../tools';

export default class PlayerCamera extends FreeCamera {
  @visibleInInspector('KeyMap', 'Forward Key', 'w'.charCodeAt(0))
  private _forwardKey: number;

  @visibleInInspector('KeyMap', 'Backward Key', 's'.charCodeAt(0))
  private _backwardKey: number;

  @visibleInInspector('KeyMap', 'Strafe Left Key', 'a'.charCodeAt(0))
  private _strafeLeftKey: number;

  @visibleInInspector('KeyMap', 'Strafe Right Key', 'd'.charCodeAt(0))
  private _strafeRightKey: number;

  @visibleInInspector('number', 'Jump Value', 10)
  private _jumpvalue: number;

  @visibleInInspector('number', 'Run Speed', 0.5)
  private _runSpeed: number;

  @visibleInInspector('number', 'Walk Speed', 0.3)
  private _walkSpeed: number;

  @visibleInInspector('number', 'Range', 100)
  private _range: number;

  private _jumping = false;
  private _hook = false;
  private _shift = false;
  private _shot = false;
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
    if (this._shift) {
      this.speed = this._runSpeed;
    } else {
      this.speed = this._walkSpeed;
    }
  }

  @onKeyboardEvent([74], KeyboardEventTypes.KEYUP)
  private _jump(): void {
    if (this._jumping) {
      return;
    }
    this._jumping = true;
    this.cameraJump();
  }

  public cameraJump(): void {
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

  public Shot(): void {
    const shotse = this._scene.getSoundByName('files/Rifle.mp3');
    shotse.play();
    let forward = new Vector3(0, 0, 1);
    const m = this.getWorldMatrix();
    forward = Vector3.TransformCoordinates(forward, m);

    let direction = forward.subtract(this.position);
    direction = Vector3.Normalize(direction);

    const ray = new Ray(this.position, direction, this._range);

    const hit = this._scene.pickWithRay(ray);
    if (hit.pickedMesh.name === 'player') {
      // Env.hit = true?
    }
  }

  public makeHook() {
    let forward = new Vector3(0, 0, 1);
    const m = this.getWorldMatrix();
    forward = Vector3.TransformCoordinates(forward, m);

    let direction = forward.subtract(this.position);
    direction = Vector3.Normalize(direction);

    const ray = new Ray(this.position, direction, this._range);

    const hit = this._scene.pickWithRay(ray);
    if (hit.pickedMesh) {
      this.moveToMesh(hit.pickedPoint);
    } else {
      this._hook = false;
      this._jumping = false;
    }
    // const cone = MeshBuilder.CreateCylinder('hook', {});
    // cone.position = this.position.add(forward);
    // cone.rotation = direction;
  }

  public moveToMesh(point: Vector3) {
    const movese = this._scene.getSoundByName('files/move.mp3');
    movese.play();
    Animation.CreateAndStartAnimation(
      'hook',
      this._scene.activeCamera,
      'position',
      15,
      5,
      this.position,
      point,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
      new PowerEase(1),
      () => {
        this._hook = false;
        this._jumping = false;
      }
    );
  }

  /**
   * Called on the user clicks on the canvas.
   * Used to request pointer lock and launch a new ball.
   */
  @onPointerEvent(PointerEventTypes.POINTERDOWN, false)
  private _onPointerEvent(info: PointerInfo): void {
    this._enterPointerLock();
    if (!this._shot) {
      this._shot = true;
      let t = 10;
      const countdown = new TextBlock();
      const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
      countdown.top = -100;
      countdown.color = 'white';
      countdown.text = t.toString();
      countdown.isVisible = true;
      advancedTexture.addControl(countdown);
      const handle = setInterval(async () => {
        t -= 1;
        countdown.text = t.toString();
        if (t === 0) {
          clearInterval(handle);
          countdown.dispose();
          countdown.isVisible = false;
          this._shot = false;
        }
      }, 1000);
      this.Shot();
    }
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

  @onKeyboardEvent([72], KeyboardEventTypes.KEYUP)
  private _onHkey(): void {
    if (!this._hook) {
      this._hook = true;
      this._jumping = true;
      this.makeHook();
    }
  }

  @onKeyboardEvent([16], KeyboardEventTypes.KEYDOWN)
  private _onShiftdown(info: KeyboardInfo): void {
    this._shift = true;
  }

  @onKeyboardEvent([16], KeyboardEventTypes.KEYUP)
  private _onShiftup(info: KeyboardInfo): void {
    this._shift = false;
  }

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
