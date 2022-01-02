import { Observable } from '@babylonjs/core';
import { Connection } from './connection';
import { Login } from '../../../protobuf/backapi_pb2';

export class Env {
  public static username = 'Anonymous';
  public static password = 'password';

  public static readonly onSwitchSceneObservable: Observable<Env> = new Observable();

  public static readonly con = new Connection();

  public static setUsername(username: string) {
    Env.username = username;
  }
  public static setPassword(password: string) {
    Env.password = password;
  }
  public static getUsername() {
    return Env.username;
  }

  // Login to Server
  // username?: if not set, will use `Env.username` (use `Env.setUsername()` to set)
  // password?: if not set, will use `Env.password` (use `Env.setPassword()` to set)
  public static async login(_username?: string, _password?: string) {
    const username = _username || Env.username;
    const password = _password || Env.password;
    const result = await Connection.login(Login.create({ username, password }));
    console.log(result);
  }

  public static switchScene(sceneRootUrl: string) {
    Env.onSwitchSceneObservable.notifyObservers(sceneRootUrl);
  }
}
