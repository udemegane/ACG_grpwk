import { Writer, Reader } from 'protobufjs/minimal';
export interface CloseWs {
}
export interface WsReqWrapper {
    closews: CloseWs | undefined;
}
export interface WsRespWrapper {
    closews: CloseWs | undefined;
}
export declare const CloseWs: {
    encode(_: CloseWs, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): CloseWs;
    fromJSON(_: any): CloseWs;
    toJSON(_: CloseWs): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): CloseWs;
};
export declare const WsReqWrapper: {
    encode(message: WsReqWrapper, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): WsReqWrapper;
    fromJSON(object: any): WsReqWrapper;
    toJSON(message: WsReqWrapper): unknown;
    fromPartial<I extends {
        closews?: {};
    } & {
        closews?: {} & {} & Record<Exclude<keyof I["closews"], never>, never>;
    } & Record<Exclude<keyof I, "closews">, never>>(object: I): WsReqWrapper;
};
export declare const WsRespWrapper: {
    encode(message: WsRespWrapper, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): WsRespWrapper;
    fromJSON(object: any): WsRespWrapper;
    toJSON(message: WsRespWrapper): unknown;
    fromPartial<I extends {
        closews?: {};
    } & {
        closews?: {} & {} & Record<Exclude<keyof I["closews"], never>, never>;
    } & Record<Exclude<keyof I, "closews">, never>>(object: I): WsRespWrapper;
};
