import {
  Mesh,
  AnimationRange,
  Animatable,
  Animation,
  Vector3,
  Bone,
  KeyboardInfo,
  KeyboardEventTypes,
} from '@babylonjs/core';
import { TextBlock, AdvancedDynamicTexture } from '@babylonjs/gui';

import { visibleInInspector, onKeyboardEvent } from '../tools';
import { Env } from '../GameScripts/environment';

export interface IAction {
  range: AnimationRange;
  direction: Vector3;
  name: string;

  running?: boolean;
  invert?: boolean;
  shift?: string;

  action?: Animatable;
  interpolation?: Animation;
}

export interface IPlayerActions {
  [keyChar: string]: IAction;
  [keyCode: number]: IAction;
}

export default class Player extends Mesh {
  @visibleInInspector('number', 'Transition Speed', 1)
  private _transitionSpeed: number;

  @visibleInInspector('number', 'Animation Speed', 1)
  private _animationSpeed: number;

  private _actions: IPlayerActions = {};
  private _shift = false;
  private _targetBone: Bone = null;

  public hp = 100;

  // @ts-ignore ignoring the super call as we don't want to re-init
  private constructor() {}

  public onStart(): void {
    Animation.AllowMatricesInterpolation = true;

    this.ellipsoid.set(20, 100, 20);
    this.ellipsoidOffset.set(0, 100, 0);

    this._actions = {
      idle: {
        name: 'idle',
        range: this.skeleton.getAnimationRange('YBot_Idle'),
        direction: Vector3.Zero(),
      },
      walk: {
        name: 'walk',
        range: this.skeleton.getAnimationRange('YBot_Walk'),
        direction: new Vector3(0, 0, 1),
      },
      87: {
        name: 'run',
        range: this.skeleton.getAnimationRange('YBot_Run'),
        direction: new Vector3(0, 0, 1),
        shift: 'walk',
      },
      83: {
        name: 'back',
        range: this.skeleton.getAnimationRange('YBot_Walk'),
        direction: new Vector3(0, 0, -1),
        invert: true,
      },
      65: {
        name: 'left',
        range: this.skeleton.getAnimationRange('YBot_LeftStrafeWalk'),
        direction: new Vector3(-1, 0, 0),
      },
      68: {
        name: 'right',
        range: this.skeleton.getAnimationRange('YBot_RightStrafeWalk'),
        direction: new Vector3(1, 0, 0),
      },
    };

    const boneIndex = this.skeleton.getBoneIndexByName('mixamorig:Spine');
    this._targetBone = this.skeleton.bones[boneIndex];

    this._doAction(this._actions.idle);

    new Promise((resolve) => {
      const interval = setInterval(() => {
        if (Env.gameStarted) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    }).then(() => {
      this._updateStatusFromPeer();
    });
  }

  public onUpdate(): void {
    if (!Env.gameStarted) return;
    this.hp = Env.getOpHp();
    if (this.hp <= 0) {
      this.youWin();
    }

    this._updateStatusFromPeer();

    const isNewShot = Env.peekNextShot();
    if (isNewShot) {
      const cooldownTime = 10; //
      // TODO: put the enemy gun down
      this._scene.getMeshByName('enemyGun').addRotation(0, 5, 0);
      // console.log('hit');
      //       and play the 'files/Rifle.mp3' from the enemy's location
      setTimeout(() => {
        // TODO: reaim the enemy gun
        this._scene.getMeshByName('enemyGun').addRotation(0, -5, 0);
      }, cooldownTime * 1000);
    }

    const keys = Env.getOpKeys();
    if (keys.shift) this._shiftDown();
    else this._shiftUp();

    Object.entries(Env.getOpKeys()).forEach(([key, value]) => {
      if (key === 'shift') {
        if (value) this._shiftDown();
        else this._shiftUp();
      } else if (value) this._onKeyboardDown(key.charCodeAt(0));
      else this._onKeyboardUp(key.charCodeAt(0));
    });
    // old code - should be useless

    // let actionsCount = 0;
    // let speed = 0;
    // this._moveAxis.set(0, 0, 0);
    // for (const key in this._actions) {
    //   const a = this._actions[key];
    //   if (!a.action || !a.direction.length()) continue;
    //   const { weight } = a.action;
    //   this._moveAxis = this._moveAxis.addInPlace(a.direction.multiplyByFloats(weight, weight, weight));
    //   speed += weight * (!this._shift && a.name === 'run' ? this._runSpeed : this._walkSpeed);
    //   if (weight > 0.5) actionsCount += 1;
    // }

    // speed *= this._scene.getAnimationRatio();
    // if (actionsCount > 0) {
    //   speed /= actionsCount;
    //   this._moveAxis.divideInPlace(new Vector3(actionsCount, actionsCount, actionsCount));
    //   this.getDirectionToRef(this._moveAxis, this._moveDirection);
    // } else {
    //   this._moveDirection.set(0, 0, 0);
    // }
    // this._moveDirection.x *= speed;
    // this._moveDirection.z *= speed;
    // this._moveDirection.y = this._scene.gravity.y + this._jumpValue;
    // this.moveWithCollisions(this._moveDirection);
  }

  private _doAction(playerAction: IAction): void {
    if (playerAction.running) {
      return;
    }

    if (!playerAction.action) {
      const from = playerAction.invert ? playerAction.range.to : playerAction.range.from;
      const to = playerAction.invert ? playerAction.range.from : playerAction.range.to;

      playerAction.action = this._scene.beginWeightedAnimation(this.skeleton, from, to, 0, true, this._animationSpeed);
    }

    playerAction.running = true;
    this._interpolateAction(playerAction, 1);
  }

  private _updateStatusFromPeer() {
    this.setAbsolutePosition(Env.getOpAbsPos());
    this.rotationQuaternion.copyFrom(Env.getOpAbsDir());
  }

  private _cancelAction(playerAction: IAction): void {
    if (!playerAction.action || !playerAction.interpolation || !playerAction.running) {
      return;
    }

    playerAction.running = false;
    this._interpolateAction(playerAction, 0);
  }

  private _interpolateAction(playerAction: IAction, to: number): void {
    if (!playerAction.interpolation) {
      playerAction.interpolation = new Animation(
        'weight',
        'weight',
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_RELATIVE,
        false
      );
    }

    playerAction.interpolation.setKeys([
      { frame: 0, value: playerAction.action.weight },
      { frame: 60, value: to },
    ]);

    this._scene.stopAnimation(playerAction.action);
    this._scene.beginDirectAnimation(
      playerAction.action,
      [playerAction.interpolation],
      0,
      60,
      false,
      this._transitionSpeed
    );
  }

  private _onKeyboardDown(keyCode: number): void {
    let action = this._actions[keyCode];
    if (!action) return;

    if (this._shift && action.shift) {
      action = this._actions[action.shift];
    }
    if (!action) return;

    if (!action.running) {
      this._cancelAction(this._actions.idle);
      this._doAction(action);
    }
  }

  private _onKeyboardUp(keyCode: number): void {
    let action = this._actions[keyCode];
    if (!action) return;

    if (this._shift && action.shift) {
      action = this._actions[action.shift];
    }
    if (!action) return;

    if (action.running) {
      this._cancelAction(action);
    }
    const runningActions = Object.values(this._actions).find((a) => a.running);
    if (!runningActions) {
      this._doAction(this._actions.idle);
    }
  }

  private _shiftDown(): void {
    this._shift = true;

    Object.values(this._actions).forEach((a) => {
      if (!a.shift || !a.running) {
        return;
      }

      this._cancelAction(a);

      const shiftAction = this._actions[a.shift];
      if (shiftAction) {
        this._doAction(shiftAction);
      }
    });
  }

  private _shiftUp(): void {
    this._shift = false;

    const shiftActions = Object.values(this._actions).filter((a) => a.shift);
    shiftActions.forEach((sa) => {
      const action = this._actions[sa.shift];
      if (!action || !action.running) {
        return;
      }

      this._cancelAction(action);
      this._doAction(sa);
    });
  }

  public youWin(): void {
    const resulttext = new TextBlock();
    resulttext.text = 'YOU WIN';
    resulttext.fontSizeInPixels = 80;
    resulttext.shadowBlur = 30;
    resulttext.shadowColor = 'white';
    resulttext.color = 'white';
    AdvancedDynamicTexture.CreateFullscreenUI('UI').addControl(resulttext);
  }
}
