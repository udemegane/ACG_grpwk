import { Observable, Scene } from '@babylonjs/core';

export class GameManager {
  private static _scene: Scene;
  public static readonly onSwitchSceneObservable: Observable<GameManager> = new Observable();
  public static switchScene(sceneRootUrl: string) {
    GameManager.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }
  public static getScene() {
    return this._scene;
  }
  public static setScene(scene: Scene) {
    this._scene = scene;
  }
}
