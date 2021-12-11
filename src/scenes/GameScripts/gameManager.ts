import { Observable } from '@babylonjs/core';

export class GameManager {
  public static readonly onSwitchSceneObservable: Observable<GameManager> =
    new Observable();

  public static switchScene(sceneRootUrl: string) {
    GameManager.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }
}
