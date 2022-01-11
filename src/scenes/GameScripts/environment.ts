import { Observable } from '@babylonjs/core';
import { Connection } from './connection';

export class Env {
  public static username = 'Anonymous';
  public static password = 'password';

  public static readonly onSwitchSceneObservable: Observable<Env> = new Observable();

  public static readonly con = new Connection();

  public static onInitialize() {
    document.title = process.env.ACG_APP_NAME;
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
    const result = await this.con.login({ username, password });
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

  public static async switchScene(sceneRootUrl: string) {
    Env.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }
}
