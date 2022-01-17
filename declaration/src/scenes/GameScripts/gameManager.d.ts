import { Observable, Scene } from '@babylonjs/core';
export declare class GameManager {
    private static _scene;
    static readonly onSwitchSceneObservable: Observable<GameManager>;
    static switchScene(sceneRootUrl: string): void;
    static getScene(): Scene;
    static setScene(scene: Scene): void;
}
