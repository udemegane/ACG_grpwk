import { Engine, Scene, SceneLoader } from '@babylonjs/core';
import '@babylonjs/materials';

// import { runScene } from './scenes/scene';
import { Env } from './scenes/GameScripts/environment';

export class Game {
  /**
   * Defines the engine used to draw the game using Babylon.JS and WebGL
   */
  public engine: Engine;

  /**
   * Defines the scene used to store and draw elements in the canvas.
   */
  public scene: Scene;

  /**
   * Constructor.
   */
  public constructor() {
    console.log(process.env.ACG_BACKSERVER_URL);
    this.engine = new Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true);
    this.scene = new Scene(this.engine);
    Env.currentScene = this.scene;
    this.scene.createDefaultEnvironment({});
    this._bindEvents();
    this._load('./scenes/welcomescene/');

    Env.onSwitchSceneObservable.add((rootUrl: string) => {
      this.engine.stopRenderLoop();
      this.scene.dispose();
      this.scene = new Scene(this.engine);
      Env.currentScene = this.scene;
      this._load(rootUrl);
    });
  }

  /**
   * Loads the first scene.
   */
  private _load(rootUrl: string): void {
    SceneLoader.Append(
      rootUrl,
      'scene.babylon',
      this.scene,
      () => {
        this.scene.executeWhenReady(() => {
          // Attach camera.
          if (!this.scene.activeCamera) {
            throw new Error(
              'No camera defined in the scene.' +
                ' Please add at least one camera in the project or create one yourself in the code.'
            );
          }
          this.scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);

          // Run the scene to attach scripts etc.
          import(`${rootUrl}index`).then((module) => {
            module.runScene(this.scene, rootUrl);

            // Render.
            this.engine.runRenderLoop(() => this.scene.render());
          });
        });
      },
      undefined,
      (_, message) => {
        console.error(message);
      },
      'babylon'
    );
  }

  /**
   * Binds the required events for a full experience.
   */
  private _bindEvents(): void {
    window.addEventListener('resize', () => this.engine.resize());
  }
}
