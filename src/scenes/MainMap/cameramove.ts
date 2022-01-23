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
  PowerEase,
  PickingInfo,
} from '@babylonjs/core';

import { TextBlock, AdvancedDynamicTexture } from '@babylonjs/gui';
import { visibleInInspector, onPointerEvent, onKeyboardEvent } from '../tools';
import { Env } from '../GameScripts/environment';

export default class PlayerCamera extends FreeCamera {
  @visibleInInspector('number', 'Jump Force', 10)
  private _jumpForce: number;

  @visibleInInspector('number', 'Run Speed', 0.5)
  private _runSpeed: number;

  @visibleInInspector('number', 'Walk Speed', 0.3)
  private _walkSpeed: number;

  @visibleInInspector('number', 'Shot Move Speed', 0.9)
  private _shotMoveSpeed: number;

  @visibleInInspector('number', 'Shot Range', 100)
  private _shotRange: number;

  @visibleInInspector('number', 'Hook Range', 100)
  private _hookRange: number;

  private _forward = false;
  private _backward = false;
  private _toRight = false;
  private _toLeft = false;
  private _jumping = false;
  private _vy: number;
  private _hook = false;
  private _shift = false;
  private _shot = false;

  // @ts-ignore ignoring the super call as we don't want to re-init
  private constructor() {}

  public onStart(): void {
    this.keysUp = [];
    this.keysDown = [];
    this.keysLeft = [];
    this.keysRight = [];
    new Promise((resolve) => {
      // disable move with keys until game is started
      const interval = setInterval(() => {
        if (Env.gameStarted || process.env.ACG_PRODUCTION_STAGE !== 'production') {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    }).then(() => {
      // this.keysUp = [this._forwardKey];
      // this.keysDown = [this._backwardKey];
      // this.keysLeft = [this._strafeLeftKey];
      // this.keysRight = [this._strafeRightKey];
      // this.keysUpward = [74];
    });
  }

  public onUpdate(): void {
    const deltaTime = this.getEngine().getDeltaTime();
    if (this._shift) {
      this.speed = this._runSpeed;
    } else {
      this.speed = this._walkSpeed;
    }
    if (!this._isGrounded() && !this._hook) {
      this._jumping = true;
      this._vy -= 9.8 * 0.001 * deltaTime;
    } else {
      this._jumping = this._hook;
      this._vy = 0;
    }
    this._applyGravity(deltaTime);
    const moveVec = Vector3.Zero();
    Vector3.Zero()
      .add(Vector3.Forward().scale(+this._forward - +this._backward))
      .add(Vector3.Right().scale(+this._toRight - +this._toLeft))
      .rotateByQuaternionToRef(this.absoluteRotation, moveVec);
    if (moveVec.length()) this.position.addInPlace(moveVec.normalize().scale(this.speed));

    Env.sendMyStatus(this.globalPosition, this.absoluteRotation);
  }

  private _applyGravity(deltaTime?: number) {
    const d = deltaTime || this.getEngine().getDeltaTime();
    this.position.addInPlace(Vector3.Up().scale(this._vy * d * 0.001));
  }

  private _isGrounded(): boolean {
    // console.log(this.position);
    if (this._floorRaycast(0, 0, 0.6).equals(Vector3.Zero())) return false;
    return true;
  }

  private _floorRaycast(offsetx: number, offsetz: number, raycastlen: number): Vector3 {
    const raycastFloorPos = new Vector3(this.position.x + offsetx, this.position.y + 0.5, this.position.z + offsetz);
    const ray = new Ray(raycastFloorPos, Vector3.Up().scale(-1), raycastlen);
    const pick = this._scene.pickWithRay(ray, (mesh) => mesh.isPickable && mesh.isEnabled());
    if (pick !== null && pick.hit && pick.pickedPoint !== null) {
      return pick.pickedPoint;
    }
    return Vector3.Zero();
  }

  @onKeyboardEvent([74], KeyboardEventTypes.KEYDOWN) // j
  private _jump(): void {
    // if (this._jumping) {
    //   return;
    // }
    this._jumping = true;
    this._vy = this._jumpForce;
    this._applyGravity(200 / this._vy);
  }

  public cameraJump(): void {
    const cam = this._scene.activeCamera;
    cam.animations = [];
    const a = new Animation('a', 'position.y', 50, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

    const keys = [];
    keys.push({ frame: 0, value: cam.position.y });
    keys.push({ frame: 25, value: cam.position.y + this._jumpForce });
    keys.push({ frame: 50, value: cam.position.y + this._jumpForce });
    a.setKeys(keys);

    const easingFunction = new CircleEase();
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    a.setEasingFunction(easingFunction);

    cam.animations.push(a);
    console.log(this.globalPosition);
    this._scene.beginAnimation(cam, 0, 50, false, 1, () => {
      this._jumping = false;
      console.log(this.globalPosition);
    });
  }

  public Shot(): void {
    const shotSE = this._scene.getSoundByName('files/Rifle.mp3');
    shotSE.setVolume(0.5);
    shotSE.play();
    let forward = new Vector3(0, 0, 1);
    const m = this.getWorldMatrix();
    forward = Vector3.TransformCoordinates(forward, m);

    let direction = forward.subtract(this.globalPosition);
    direction = Vector3.Normalize(direction);

    const ray = new Ray(this.globalPosition, direction, this._shotRange);
    const hit = this._scene.pickWithRay(ray, (mesh) => mesh.isPickable && mesh.isEnabled());
    console.log('shot:', hit);
    if (hit !== null && hit.hit && hit.pickedMesh.name === 'EnemyNode') {
      console.log('You shot enemy!!');
    }
  }

  public makeHook() {
    const ray = this.getForwardRay(this._hookRange);
    const hit = this._scene.pickWithRay(ray);
    console.log('hook:', hit);
    if (hit !== null && hit.hit && hit.pickedMesh.name !== 'EnemyNode') {
      this.moveToMesh(hit, () => {
        this._hook = false;
        this._jumping = false;
      });
    } else {
      this._hook = false;
      this._jumping = false;
    }
  }

  public moveToMesh(dest: PickingInfo, callback: () => void) {
    if (dest.distance <= 4) {
      callback();
      return;
    }
    const moveSE = this._scene.getSoundByName('files/move.mp3');
    moveSE.setVolume(0.5);
    moveSE.play();
    Animation.CreateAndStartAnimation(
      'hook',
      this,
      'position',
      15,
      Math.floor(dest.distance / this._shotMoveSpeed / 2),
      this.position,
      this.position.add(dest.pickedPoint.subtract(this.globalPosition).scale(0.9)),
      Animation.ANIMATIONLOOPMODE_CONSTANT,
      new PowerEase(1),
      callback
    );
  }

  @onPointerEvent(PointerEventTypes.POINTERDOWN, false)
  private _onPointerEvent(_info: PointerInfo): void {
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
      const handle = setInterval(() => {
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

  @onKeyboardEvent([27], KeyboardEventTypes.KEYUP) // escape
  private _onEscapeKey(): void {
    const engine = this.getEngine();
    if (engine.isPointerLock) {
      engine.exitPointerlock();
    }
  }

  @onKeyboardEvent([72], KeyboardEventTypes.KEYDOWN) // h
  private _onHkey(): void {
    if (!this._hook) {
      this._hook = true;
      this._jumping = true;
      this.makeHook();
    }
  }

  @onKeyboardEvent([16], KeyboardEventTypes.KEYDOWN) // shift
  private _onShiftdown(_info: KeyboardInfo): void {
    this._shift = true;
  }

  @onKeyboardEvent([16], KeyboardEventTypes.KEYUP) // shift
  private _onShiftup(_info: KeyboardInfo): void {
    this._shift = false;
  }

  @onKeyboardEvent([87], KeyboardEventTypes.KEYDOWN)
  private _forwardDown(): void {
    this._forward = true;
  }

  @onKeyboardEvent([87], KeyboardEventTypes.KEYUP)
  private _forwardUp(): void {
    this._forward = false;
  }

  @onKeyboardEvent([83], KeyboardEventTypes.KEYDOWN)
  private _backwardDown(): void {
    this._backward = true;
  }

  @onKeyboardEvent([83], KeyboardEventTypes.KEYUP)
  private _backwardUp(): void {
    this._backward = false;
  }

  @onKeyboardEvent([68], KeyboardEventTypes.KEYDOWN)
  private _toRightDown(): void {
    this._toRight = true;
  }

  @onKeyboardEvent([68], KeyboardEventTypes.KEYUP)
  private _toRightUp(): void {
    this._toRight = false;
  }

  @onKeyboardEvent([65], KeyboardEventTypes.KEYDOWN)
  private _toLeftDown(): void {
    this._toLeft = true;
  }

  @onKeyboardEvent([65], KeyboardEventTypes.KEYUP)
  private _toLeftUp(): void {
    this._toLeft = false;
  }

  private _enterPointerLock(): void {
    const engine = this.getEngine();
    if (!engine.isPointerLock) {
      engine.enterPointerlock();
    }
  }
}
