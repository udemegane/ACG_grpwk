import { Observable } from '@babylonjs/core';
export declare class GameManager {
    static readonly onSwitchSceneObservable: Observable<GameManager>;
    static switchScene(sceneRootUrl: string): void;
}
