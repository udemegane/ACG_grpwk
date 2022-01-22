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

import { visibleInInspector, onKeyboardEvent } from '../tools';

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
  @visibleInInspector('KeyMap', 'Forward Key', 'z'.charCodeAt(0))
  private _forwardKey: number;

  @visibleInInspector('KeyMap', 'Backward Key', 's'.charCodeAt(0))
  private _backwardKey: number;

  @visibleInInspector('KeyMap', 'Left Key', 'q'.charCodeAt(0))
  private _leftKey: number;

  @visibleInInspector('KeyMap', 'Right Key', 'd'.charCodeAt(0))
  private _rightKey: number;

  @visibleInInspector('number', 'Walk Speed', 1)
  private _walkSpeed: number;

  @visibleInInspector('number', 'Run Speed', 2)
  private _runSpeed: number;

  @visibleInInspector('number', 'Transition Speed', 1)
  private _transitionSpeed: number;

  @visibleInInspector('number', 'Animation Speed', 1)
  private _animationSpeed: number;

  private _actions: IPlayerActions = {};
  private _shift = false;
  private _targetBone: Bone = null;

  private _jumping = false;
  private _jumpValue = 0;

  private _moveAxis: Vector3 = Vector3.Zero();
  private _moveDirection: Vector3 = Vector3.Zero();

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
      [this._forwardKey]: {
        name: 'run',
        range: this.skeleton.getAnimationRange('YBot_Run'),
        direction: new Vector3(0, 0, 1),
        shift: 'walk',
      },
      [this._backwardKey]: {
        name: 'back',
        range: this.skeleton.getAnimationRange('YBot_Walk'),
        direction: new Vector3(0, 0, -1),
        invert: true,
      },
      [this._leftKey]: {
        name: 'left',
        range: this.skeleton.getAnimationRange('YBot_LeftStrafeWalk'),
        direction: new Vector3(-1, 0, 0),
      },
      [this._rightKey]: {
        name: 'right',
        range: this.skeleton.getAnimationRange('YBot_RightStrafeWalk'),
        direction: new Vector3(1, 0, 0),
      },
    };

    const boneIndex = this.skeleton.getBoneIndexByName('mixamorig:Spine');
    this._targetBone = this.skeleton.bones[boneIndex];

    this._doAction(this._actions.idle);
  }

  public onUpdate(): void {
    let actionsCount = 0;
    let speed = 0;

    this._moveAxis.set(0, 0, 0);

    for (const key in this._actions) {
      const a = this._actions[key];
      if (!a.action || !a.direction.length()) {
        continue;
      }

      const { weight } = a.action;

      this._moveAxis = this._moveAxis.addInPlace(a.direction.multiplyByFloats(weight, weight, weight));
      speed += weight * (!this._shift && a.name === 'run' ? this._runSpeed : this._walkSpeed);

      if (weight > 0.5) {
        actionsCount += 1;
      }
    }

    speed *= this._scene.getAnimationRatio();

    if (actionsCount > 0) {
      speed /= actionsCount;

      this._moveAxis.divideInPlace(new Vector3(actionsCount, actionsCount, actionsCount));
      this.getDirectionToRef(this._moveAxis, this._moveDirection);
    } else {
      this._moveDirection.set(0, 0, 0);
    }

    this._moveDirection.x *= speed;
    this._moveDirection.z *= speed;
    this._moveDirection.y = this._scene.gravity.y + this._jumpValue;
    this.moveWithCollisions(this._moveDirection);
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

  private _syncRotation(targetRotation: number): void {
    const distance = this.rotation.y - targetRotation;
    const currentRotation =
      (distance * 0.1 - this.getEngine().getDeltaTime() * 0.001) * this._scene.getAnimationRatio();
    const amount = distance > 0 ? Math.max(currentRotation, 0) : Math.min(currentRotation, 0);

    this.rotate(new Vector3(0, 1, 0), -amount);
    this.rotation.y -= amount;
  }

  @onKeyboardEvent([32], KeyboardEventTypes.KEYUP)
  private _jump(): void {
    if (this._jumping) {
      return;
    }

    const a = new Animation(
      'jump',
      '_jumpValue',
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_RELATIVE,
      false
    );
    a.setKeys([
      { frame: 0, value: -this._scene.gravity.y },
      { frame: 25, value: -this._scene.gravity.y + 5 },
      { frame: 50, value: 0 },
    ]);

    this._jumping = true;
    this._scene.beginDirectAnimation(this, [a], 0, 120, false, 1.0, () => {
      this._jumping = false;
    });
  }

  @onKeyboardEvent([], KeyboardEventTypes.KEYDOWN)
  private _onKeyboardDown(info: KeyboardInfo): void {
    if (info.event.key === 'Shift') {
      return this._shiftDown();
    }

    const key = info.event.keyCode;

    let action = this._actions[key];
    if (!action) {
      return;
    }

    if (this._shift && action.shift) {
      action = this._actions[action.shift];
    }
    if (!action) {
      return;
    }

    if (!action.running) {
      this._cancelAction(this._actions.idle);
      this._doAction(action);
    }
  }

  @onKeyboardEvent([], KeyboardEventTypes.KEYUP)
  private _onKeyboardUp(info: KeyboardInfo): void {
    if (info.event.key === 'Shift') {
      return this._shiftUp();
    }

    const key = info.event.keyCode;

    let action = this._actions[key];
    if (!action) {
      return;
    }

    if (this._shift && action.shift) {
      action = this._actions[action.shift];
    }
    if (!action) {
      return;
    }

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
}
