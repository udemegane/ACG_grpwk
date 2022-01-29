import {
  FreeCamera,
  PointerEventTypes,
  PointerInfo,
  KeyboardInfo,
  Ray,
  Vector3,
  Animation,
  KeyboardEventTypes,
  PowerEase,
  PickingInfo,
  TransformNode,
} from '@babylonjs/core';

import { TextBlock, AdvancedDynamicTexture, Image } from '@babylonjs/gui';
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

  @visibleInInspector('boolean', 'Jump Forever', true)
  private _devJump: boolean;

  private _forward = false;
  private _backward = false;
  private _toRight = false;
  private _toLeft = false;
  private _jumping = false;
  private _vy: number;
  private _hook = false;
  private _shift = false;
  private _shot = false;

  private hp = 100;

  // @ts-ignore ignoring the super call as we don't want to re-init
  private constructor() {}

  public onStart(): void {
    this.displayScope();
    console.log(Env.isMulti);
    if (Env.isMulti) {
      new Promise((resolve) => {
        const interval = setInterval(() => {
          if (Env.gameStarted) {
            clearInterval(interval);
            resolve(Env.isHost);
          }
        }, 1000);
      }).then((isHost) => {
        const { parent } = this;
        const sign = (b) => (b ? 1 : -1);
        if (parent) {
          // @ts-ignore
          parent.position.set(39.6 * sign(isHost), 15.34, 52.3 * sign(isHost));
          this.position.set(0, 3, 0);
        }
      });
    }
  }

  public onUpdate(): void {
    const deltaFrames = this._scene.getAnimationRatio();
    this.speed = this._shift ? this._runSpeed : this._walkSpeed;
    const moveVec = Vector3.Zero();
    Vector3.Zero()
      .add(Vector3.Forward().scale(+this._forward - +this._backward))
      .add(Vector3.Right().scale(+this._toRight - +this._toLeft))
      .rotateByQuaternionToRef(this.absoluteRotation, moveVec);
    moveVec.y = 0;
    if (moveVec.length()) this.position.addInPlace(moveVec.normalize().scale((this.speed * deltaFrames) / 60));
    moveVec.copyFrom(moveVec.normalize().scale(0.1));
    const detectGround = this._floorRaycast(moveVec.x, moveVec.z, 0.6);
    if (detectGround.length() === 0) {
      this._jumping = true;
      if (!this._hook) this._vy -= (9.8 * deltaFrames) / 60;
      this._applyGravity(deltaFrames);
    } else {
      this._jumping = this._hook;
      this._vy = 0;
      this.position.y = detectGround.y;
    }
    // if (!this._isGrounded() && !this._hook) {
    //   this._jumping = true;
    //   this._vy -= (9.8 * deltaFrames) / 60;
    // } else {
    //   this._jumping = this._hook;
    //   this._vy = 0;
    // }

    // connection
    Env.sendMyStatus(this.globalPosition, this.absoluteRotation);

    while (true) {
      const nextShot = Env.getNewShot();
      if (!nextShot) break;
      const pick = this._scene.pickWithRay(nextShot, (mesh) => mesh.isEnabled());
      if (pick !== null && pick.hit && pick.pickedPoint !== null) {
        if (pick.pickedMesh.name === 'playerCollision' /* TODO: is me */) {
          this.hp -= 100; // according to where it hit
          Env.updateHp(this.hp);
          if (this.hp <= 0) {
            this.youLose();
          }
        }
      }
    }

    Env.sendMoveKeys(this._forward, this._toLeft, this._backward, this._toRight, this._shift);
  }

  private _applyGravity(deltaFrames?: number) {
    const d = deltaFrames || this._scene.getAnimationRatio();
    let scale = (this._vy * d) / 60;
    if (this.position.y + scale < 0) scale = -this.position.y;
    this.position.addInPlace(Vector3.Up().scale(scale));
  }

  private _isGrounded(): boolean {
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
    if (this._jumping && !(process.env.ACG_PRODUCTION_STAGE !== 'production' && this._devJump)) return;
    this._jumping = true;
    this._vy = this._jumpForce;
    this._applyGravity(10 / this._vy);
  }

  public Shot(): void {
    const shotSE = this._scene.getSoundByName('files/Rifle.mp3');
    shotSE.setVolume(0.5);
    shotSE.play();

    const ray = this.getForwardRay(this._shotRange);
    Env.sendShot(ray.origin, ray.direction, ray.length);
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
    this._hook = true;
    this._jumping = true;
    const moveSE = this._scene.getSoundByName('files/move.mp3');
    moveSE.setVolume(0.5);
    moveSE.play();
    Animation.CreateAndStartAnimation(
      'hook',
      this,
      'position',
      15,
      Math.max(5, dest.distance / 2) * this._shotMoveSpeed,
      this.position,
      dest.pickedPoint,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
      new PowerEase(1),
      callback
    );
  }

  public displayScope() {
    const scope = new Image('scope', '../../../scenes/MainMap/files/scope.png');
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    scope.height = '70px';
    scope.width = '70px';
    advancedTexture.addControl(scope);
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

  public youLose(): void {
    const losetext = new TextBlock();
    losetext.text = 'YOU LOSE';
    losetext.fontSizeInPixels = 80;
    losetext.shadowBlur = 30;
    losetext.shadowColor = 'black';
    losetext.color = 'white';
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    advancedTexture.addControl(losetext);
    setTimeout(() => {
      Env.switchScene('../../scenes/welcomescreen');
    }, 5 * 1000);
  }
}
