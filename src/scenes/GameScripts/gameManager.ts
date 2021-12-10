import { Observable } from '@babylonjs/core';

export class GameManager {
  public static onSwitchSceneObservable: Observable<GameManager> =
    new Observable();

  public static switchScene(sceneRootUrl: string) {
    GameManager.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }
}
