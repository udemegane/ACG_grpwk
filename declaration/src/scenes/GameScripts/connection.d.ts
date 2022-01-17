import { Login, CheckToken, Signup } from '../../../protobuf';
export declare class Connection {
    token: string;
    static TOKEN_LOCALSTORAGE_NAME: string;
    startConnectionByName(name: string): void;
    login(p: Login): Promise<any>;
    signup(p: Signup): Promise<any>;
    loginWithToken(p: CheckToken): Promise<any>;
}
