import { Login, RespToken, CheckToken, UserData, Signup } from '../../../protobuf';
export declare class Connection {
    token: string;
    static TOKEN_LOCALSTORAGE_NAME: string;
    startConnectionByName(name: string): void;
    login(p: Login): Promise<RespToken>;
    signup(p: Signup): Promise<RespToken>;
    loginWithToken(p: CheckToken): Promise<UserData>;
}
