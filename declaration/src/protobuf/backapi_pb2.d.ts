import { Writer, Reader } from 'protobufjs/minimal';
export interface Login {
    username: string;
    password: string;
}
export interface Signup {
    username: string;
    password: string;
}
export interface CheckToken {
    token: string;
}
export interface UserData {
    username: string;
    success: boolean;
}
export interface RespToken {
    token: string;
    success: boolean;
}
export interface RespSuccess {
    success: boolean;
}
export interface CreateBattleLog {
    battleToken: string;
    isSingleMode: boolean | undefined;
    meWinner: boolean | undefined;
    isDraw: boolean | undefined;
    myToken: string;
    enemyToken: string;
    elapsedms: number;
}
export declare const Login: {
    encode(message: Login, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): Login;
    fromJSON(object: any): Login;
    toJSON(message: Login): unknown;
    fromPartial<I extends {
        username?: string;
        password?: string;
    } & {
        username?: string;
        password?: string;
    } & Record<Exclude<keyof I, "username" | "password">, never>>(object: I): Login;
};
export declare const Signup: {
    encode(message: Signup, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): Signup;
    fromJSON(object: any): Signup;
    toJSON(message: Signup): unknown;
    fromPartial<I extends {
        username?: string;
        password?: string;
    } & {
        username?: string;
        password?: string;
    } & Record<Exclude<keyof I, "username" | "password">, never>>(object: I): Signup;
};
export declare const CheckToken: {
    encode(message: CheckToken, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): CheckToken;
    fromJSON(object: any): CheckToken;
    toJSON(message: CheckToken): unknown;
    fromPartial<I extends {
        token?: string;
    } & {
        token?: string;
    } & Record<Exclude<keyof I, "token">, never>>(object: I): CheckToken;
};
export declare const UserData: {
    encode(message: UserData, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): UserData;
    fromJSON(object: any): UserData;
    toJSON(message: UserData): unknown;
    fromPartial<I extends {
        username?: string;
        success?: boolean;
    } & {
        username?: string;
        success?: boolean;
    } & Record<Exclude<keyof I, "username" | "success">, never>>(object: I): UserData;
};
export declare const RespToken: {
    encode(message: RespToken, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): RespToken;
    fromJSON(object: any): RespToken;
    toJSON(message: RespToken): unknown;
    fromPartial<I extends {
        token?: string;
        success?: boolean;
    } & {
        token?: string;
        success?: boolean;
    } & Record<Exclude<keyof I, "token" | "success">, never>>(object: I): RespToken;
};
export declare const RespSuccess: {
    encode(message: RespSuccess, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): RespSuccess;
    fromJSON(object: any): RespSuccess;
    toJSON(message: RespSuccess): unknown;
    fromPartial<I extends {
        success?: boolean;
    } & {
        success?: boolean;
    } & Record<Exclude<keyof I, "success">, never>>(object: I): RespSuccess;
};
export declare const CreateBattleLog: {
    encode(message: CreateBattleLog, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): CreateBattleLog;
    fromJSON(object: any): CreateBattleLog;
    toJSON(message: CreateBattleLog): unknown;
    fromPartial<I extends {
        battleToken?: string;
        isSingleMode?: boolean;
        meWinner?: boolean;
        isDraw?: boolean;
        myToken?: string;
        enemyToken?: string;
        elapsedms?: number;
    } & {
        battleToken?: string;
        isSingleMode?: boolean;
        meWinner?: boolean;
        isDraw?: boolean;
        myToken?: string;
        enemyToken?: string;
        elapsedms?: number;
    } & Record<Exclude<keyof I, "battleToken" | "isSingleMode" | "meWinner" | "isDraw" | "myToken" | "enemyToken" | "elapsedms">, never>>(object: I): CreateBattleLog;
};
