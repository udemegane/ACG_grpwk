import { Engine, Scene, SceneLoader } from '@babylonjs/core';
import '@babylonjs/materials';

// import { runScene } from './scenes/scene';
import { GameManager } from './scenes/GameScripts/gameManager';

export class Game {
  /**
   * Defines the engine used to draw the game using Babylon.JS and WebGL
   */
  public engine: Engine;

  /**
   * Defines the scene used to store and draw elements in the canvas.
   */
  public scene: Scene;
  private fpsPane: HTMLElement;

  /**
   * Constructor.
   */
  public constructor() {
    console.log(process.env.ACG_BACKSERVER_URL);
    this.fpsPane = document.getElementById('fps');
    this.engine = new Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    this.scene = new Scene(this.engine);
    GameManager.setScene(this.scene);
    this._bindEvents();
    this._load('./scenes/ImageProcessing/');
    GameManager.onSwitchSceneObservable.add((rootUrl: string) => {
      this.engine.stopRenderLoop();
      this.scene.dispose();
      this.scene = new Scene(this.engine);
      GameManager.setScene(this.scene);
      this._bindEvents();
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
              // eslint-disable-next-line max-len
              'No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.'
            );
          }
          this.scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);

          // Run the scene to attach scripts etc.
          import(`${rootUrl}index`).then((module) => {
            module.runScene(this.scene, rootUrl);

            // Render.
            const tmp = this.engine;
            this.engine.runRenderLoop(() => {
              this.fpsPane.innerHTML = `${this.engine.getFps().toFixed()} fps`;
              this.scene.render();
            });
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
