import { Observable } from '@babylonjs/core';
import { Connection } from './connection';
export declare class Env {
    static username: string;
    static password: string;
    static readonly onSwitchSceneObservable: Observable<Env>;
    static readonly con: Connection;
    static onInitialize(): void;
    static setUsername(username: string): void;
    static setPassword(password: string): void;
    static getUsername(): string;
    /**
     * Login to Server
     * @param {string} _username - if not set, will use `Env.username` (use `Env.setUsername()` to set)
     * @param {string} _password - if not set, will use `Env.password` (use `Env.setPassword()` to set)
     */
    static login(_username?: string, _password?: string): Promise<import("../../../protobuf").RespToken>;
    static loginWithToken(_token?: string): Promise<import("../../../protobuf").UserData>;
    static setToken(token: string): void;
    /**
     * checkToken: Check if user logged in before
     * @returns bool; Whether user logged in before
     *              - if true; `Env.username`, `token` will be automatically set
     */
    static checkToken(): Promise<boolean>;
    static switchScene(sceneRootUrl: string): Promise<void>;
}
