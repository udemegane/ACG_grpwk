import { Observable, Vector3, Quaternion, Scene } from '@babylonjs/core';
import { Connection } from './connection';
import { MoveKeys } from './protobuf';

export class Env {
  public static username = 'Anonymous';
  public static password = 'password';

  public static readonly onSwitchSceneObservable: Observable<Env> = new Observable();

  public static readonly con = new Connection();
  public static gameStarted = false;

  private static _scene: Scene;

  public static async onInitialize() {
    if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log('env init');
    document.title = process.env.ACG_APP_NAME;
    if (process.env.ACG_PRODUCTION_STAGE !== 'production') {
      if (!(await this.checkToken())) {
        const urlParams = new URLSearchParams(window.location.search);
        const testUserId = parseInt(urlParams.get('user') || '0', 10);
        const users = [
          { user: 'test_user', pass: 'test_password' },
          { user: 'enemy', pass: 'enemy_password' },
        ];
        const user = users[testUserId];
        console.log('logging in with user: ', user);
        await this.login(user.user, user.pass);
      }
    }
  }

  public static setUsername(username: string) {
    Env.username = username;
  }

  public static setPassword(password: string) {
    Env.password = password;
  }

  public static getUsername() {
    return Env.username;
  }

  /**
   * Login to Server
   * @param {string} _username - if not set, will use `Env.username` (use `Env.setUsername()` to set)
   * @param {string} _password - if not set, will use `Env.password` (use `Env.setPassword()` to set)
   */
  public static async login(_username?: string, _password?: string) {
    const username = _username || Env.username;
    const password = _password || Env.password;
    let result = await this.con.login({ username, password });
    if (!result.success) {
      result = await this.con.signup({ username, password });
    }
    if (result.success) {
      this.setToken(result.token);
      this.setUsername(username);
      this.setPassword(password);
    }
    return result;
  }

  public static async loginWithToken(_token?: string) {
    const token = _token || this.con.token;
    const resp = await this.con.loginWithToken({ token });
    if (resp.success) {
      this.setUsername(resp.username);
    }
    return resp;
  }

  public static setToken(token: string) {
    this.con.token = token;
    localStorage.setItem(Connection.TOKEN_LOCALSTORAGE_NAME, token);
  }

  /**
   * checkToken: Check if user logged in before
   * @returns bool; Whether user logged in before
   *              - if true; `Env.username`, `token` will be automatically set
   */
  public static async checkToken() {
    const token = this.con.token || localStorage.getItem(Connection.TOKEN_LOCALSTORAGE_NAME);
    if (!token) return false;
    const resp = await this.loginWithToken(token);
    return resp.success;
  }

  /**
   * requestMulti: add current user to multi player queue.
   * @param{number?} maxTry?: set to change how many challenges. (default = 3)
   * @returns Promise<string?>: gameid for p2p connection
   *                          - `undefined` if no matching for more than `waitMax` seconds
   */
  public static async requestMultiMatch(maxTry = 3, currentCount = 0): Promise<string> {
    if (currentCount > maxTry) return undefined;
    if (process.env.ACG_PRODUCTION_STAGE !== 'production') await this.onInitialize();
    if (!this.con.isValid()) {
      console.log('Not Logged In');
      return undefined;
    }
    const resp = await this.con.multiQueue(60);
    if (!resp.success) return undefined;
    return new Promise((resolve) => {
      setTimeout(async () => {
        const check = await this.con.checkMulti();
        if (check.success) {
          resolve(resp.oppeer);
        } else resolve(await this.requestMultiMatch(maxTry, currentCount + 1));
      }, 5000);
    });
  }

  public static async createConnection(oppeer?: string) {
    await this.con.createConnection(oppeer);
  }

  public static sendMyStatus(pos: Vector3, dir: Quaternion) {
    if (!Env.gameStarted) return;
    this.con.sendMyAbsPos(pos);
    this.con.sendMyAbsDir(dir);
  }

  public static sendShot(origin: Vector3, direction: Vector3, length = -1) {
    if (!Env.gameStarted) return;
    this.con.sendNewShot(origin, direction, length);
  }

  public static updateHp(hp: number) {
    if (!Env.gameStarted) return;
    this.con.sendHp(hp);
  }

  public static sendMoveKeys(w: boolean, a: boolean, s: boolean, d: boolean, shift: boolean) {
    if (!Env.gameStarted) return;
    this.con.sendMoveKeys(w, a, s, d, shift);
  }

  public static getOpAbsPos() {
    return this.con.opponent.pos;
  }

  public static getOpAbsDir() {
    return this.con.opponent.dir;
  }

  public static getOpHp() {
    return this.con.opponent.hp;
  }

  /**
   * return one of new shots. `undefined` if none.
   */
  public static getNewShot() {
    if (this.con.opponent.shots.length === 0) return undefined;
    return this.con.opponent.shots.shift();
  }

  public static peekNextShot() {
    if (this.con.opponent.shots.length === 0) return undefined;
    return this.con.opponent.shots[0];
  }

  public static getOpKeys(): MoveKeys {
    return this.con.opponent.keys;
  }

  public static async switchScene(sceneRootUrl: string) {
    Env.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }

  static get currentScene() {
    if (Env._scene) {
      return Env._scene;
    } else {
      throw new Error('Scene not found');
    }
  }
  static set currentScene(scene: Scene) {
    if (!scene) {
      throw new Error('Invalied value');
    }
    this._scene = scene;
  }
}
