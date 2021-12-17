import * as $protobuf from "protobufjs";
/** Namespace protobuf. */
export namespace protobuf {

    /** Properties of a Login. */
    interface ILogin {

        /** Login username */
        username: string;

        /** Login password */
        password: string;
    }

    /** Represents a Login. */
    class Login implements ILogin {

        /**
         * Constructs a new Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.ILogin);

        /** Login username. */
        public username: string;

        /** Login password. */
        public password: string;

        /**
         * Creates a new Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login instance
         */
        public static create(properties?: protobuf.ILogin): protobuf.Login;

        /**
         * Encodes the specified Login message. Does not implicitly {@link protobuf.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link protobuf.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Login;

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Login;

        /**
         * Verifies a Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Login;

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @param message Login
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Login, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Signup. */
    interface ISignup {

        /** Signup username */
        username: string;

        /** Signup password */
        password: string;
    }

    /** Represents a Signup. */
    class Signup implements ISignup {

        /**
         * Constructs a new Signup.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.ISignup);

        /** Signup username. */
        public username: string;

        /** Signup password. */
        public password: string;

        /**
         * Creates a new Signup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Signup instance
         */
        public static create(properties?: protobuf.ISignup): protobuf.Signup;

        /**
         * Encodes the specified Signup message. Does not implicitly {@link protobuf.Signup.verify|verify} messages.
         * @param message Signup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.ISignup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Signup message, length delimited. Does not implicitly {@link protobuf.Signup.verify|verify} messages.
         * @param message Signup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.ISignup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Signup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Signup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Signup;

        /**
         * Decodes a Signup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Signup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Signup;

        /**
         * Verifies a Signup message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Signup message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Signup
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Signup;

        /**
         * Creates a plain object from a Signup message. Also converts values to other types if specified.
         * @param message Signup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Signup, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Signup to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckToken. */
    interface ICheckToken {

        /** CheckToken token */
        token: string;
    }

    /** Represents a CheckToken. */
    class CheckToken implements ICheckToken {

        /**
         * Constructs a new CheckToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.ICheckToken);

        /** CheckToken token. */
        public token: string;

        /**
         * Creates a new CheckToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckToken instance
         */
        public static create(properties?: protobuf.ICheckToken): protobuf.CheckToken;

        /**
         * Encodes the specified CheckToken message. Does not implicitly {@link protobuf.CheckToken.verify|verify} messages.
         * @param message CheckToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.ICheckToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckToken message, length delimited. Does not implicitly {@link protobuf.CheckToken.verify|verify} messages.
         * @param message CheckToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.ICheckToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.CheckToken;

        /**
         * Decodes a CheckToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.CheckToken;

        /**
         * Verifies a CheckToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckToken
         */
        public static fromObject(object: { [k: string]: any }): protobuf.CheckToken;

        /**
         * Creates a plain object from a CheckToken message. Also converts values to other types if specified.
         * @param message CheckToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.CheckToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespToken. */
    interface IRespToken {

        /** RespToken token */
        token?: (string|null);

        /** RespToken success */
        success: boolean;
    }

    /** Represents a RespToken. */
    class RespToken implements IRespToken {

        /**
         * Constructs a new RespToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IRespToken);

        /** RespToken token. */
        public token: string;

        /** RespToken success. */
        public success: boolean;

        /**
         * Creates a new RespToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespToken instance
         */
        public static create(properties?: protobuf.IRespToken): protobuf.RespToken;

        /**
         * Encodes the specified RespToken message. Does not implicitly {@link protobuf.RespToken.verify|verify} messages.
         * @param message RespToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IRespToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespToken message, length delimited. Does not implicitly {@link protobuf.RespToken.verify|verify} messages.
         * @param message RespToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IRespToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.RespToken;

        /**
         * Decodes a RespToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.RespToken;

        /**
         * Verifies a RespToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespToken
         */
        public static fromObject(object: { [k: string]: any }): protobuf.RespToken;

        /**
         * Creates a plain object from a RespToken message. Also converts values to other types if specified.
         * @param message RespToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.RespToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RespSuccess. */
    interface IRespSuccess {

        /** RespSuccess success */
        success: boolean;
    }

    /** Represents a RespSuccess. */
    class RespSuccess implements IRespSuccess {

        /**
         * Constructs a new RespSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IRespSuccess);

        /** RespSuccess success. */
        public success: boolean;

        /**
         * Creates a new RespSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RespSuccess instance
         */
        public static create(properties?: protobuf.IRespSuccess): protobuf.RespSuccess;

        /**
         * Encodes the specified RespSuccess message. Does not implicitly {@link protobuf.RespSuccess.verify|verify} messages.
         * @param message RespSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IRespSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RespSuccess message, length delimited. Does not implicitly {@link protobuf.RespSuccess.verify|verify} messages.
         * @param message RespSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IRespSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RespSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RespSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.RespSuccess;

        /**
         * Decodes a RespSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RespSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.RespSuccess;

        /**
         * Verifies a RespSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RespSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RespSuccess
         */
        public static fromObject(object: { [k: string]: any }): protobuf.RespSuccess;

        /**
         * Creates a plain object from a RespSuccess message. Also converts values to other types if specified.
         * @param message RespSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.RespSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RespSuccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateBattleLog. */
    interface ICreateBattleLog {

        /** CreateBattleLog battleToken */
        battleToken: string;

        /** CreateBattleLog isSingleMode */
        isSingleMode?: (boolean|null);

        /** CreateBattleLog meWinner */
        meWinner?: (boolean|null);

        /** CreateBattleLog isDraw */
        isDraw?: (boolean|null);

        /** CreateBattleLog myToken */
        myToken: string;

        /** CreateBattleLog enemyToken */
        enemyToken?: (string|null);

        /** CreateBattleLog elapsedms */
        elapsedms: number;
    }

    /** Represents a CreateBattleLog. */
    class CreateBattleLog implements ICreateBattleLog {

        /**
         * Constructs a new CreateBattleLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.ICreateBattleLog);

        /** CreateBattleLog battleToken. */
        public battleToken: string;

        /** CreateBattleLog isSingleMode. */
        public isSingleMode?: (boolean|null);

        /** CreateBattleLog meWinner. */
        public meWinner?: (boolean|null);

        /** CreateBattleLog isDraw. */
        public isDraw?: (boolean|null);

        /** CreateBattleLog myToken. */
        public myToken: string;

        /** CreateBattleLog enemyToken. */
        public enemyToken: string;

        /** CreateBattleLog elapsedms. */
        public elapsedms: number;

        /** CreateBattleLog winner. */
        public winner?: ("isSingleMode"|"meWinner"|"isDraw");

        /**
         * Creates a new CreateBattleLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateBattleLog instance
         */
        public static create(properties?: protobuf.ICreateBattleLog): protobuf.CreateBattleLog;

        /**
         * Encodes the specified CreateBattleLog message. Does not implicitly {@link protobuf.CreateBattleLog.verify|verify} messages.
         * @param message CreateBattleLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.ICreateBattleLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateBattleLog message, length delimited. Does not implicitly {@link protobuf.CreateBattleLog.verify|verify} messages.
         * @param message CreateBattleLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.ICreateBattleLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateBattleLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateBattleLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.CreateBattleLog;

        /**
         * Decodes a CreateBattleLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateBattleLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.CreateBattleLog;

        /**
         * Verifies a CreateBattleLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateBattleLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateBattleLog
         */
        public static fromObject(object: { [k: string]: any }): protobuf.CreateBattleLog;

        /**
         * Creates a plain object from a CreateBattleLog message. Also converts values to other types if specified.
         * @param message CreateBattleLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.CreateBattleLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateBattleLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CloseWs. */
    interface ICloseWs {
    }

    /** Represents a CloseWs. */
    class CloseWs implements ICloseWs {

        /**
         * Constructs a new CloseWs.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.ICloseWs);

        /**
         * Creates a new CloseWs instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CloseWs instance
         */
        public static create(properties?: protobuf.ICloseWs): protobuf.CloseWs;

        /**
         * Encodes the specified CloseWs message. Does not implicitly {@link protobuf.CloseWs.verify|verify} messages.
         * @param message CloseWs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.ICloseWs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CloseWs message, length delimited. Does not implicitly {@link protobuf.CloseWs.verify|verify} messages.
         * @param message CloseWs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.ICloseWs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CloseWs message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CloseWs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.CloseWs;

        /**
         * Decodes a CloseWs message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CloseWs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.CloseWs;

        /**
         * Verifies a CloseWs message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CloseWs message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CloseWs
         */
        public static fromObject(object: { [k: string]: any }): protobuf.CloseWs;

        /**
         * Creates a plain object from a CloseWs message. Also converts values to other types if specified.
         * @param message CloseWs
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.CloseWs, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CloseWs to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WsReqWrapper. */
    interface IWsReqWrapper {

        /** WsReqWrapper closews */
        closews?: (protobuf.ICloseWs|null);
    }

    /** Represents a WsReqWrapper. */
    class WsReqWrapper implements IWsReqWrapper {

        /**
         * Constructs a new WsReqWrapper.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IWsReqWrapper);

        /** WsReqWrapper closews. */
        public closews?: (protobuf.ICloseWs|null);

        /** WsReqWrapper content. */
        public content?: "closews";

        /**
         * Creates a new WsReqWrapper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WsReqWrapper instance
         */
        public static create(properties?: protobuf.IWsReqWrapper): protobuf.WsReqWrapper;

        /**
         * Encodes the specified WsReqWrapper message. Does not implicitly {@link protobuf.WsReqWrapper.verify|verify} messages.
         * @param message WsReqWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IWsReqWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WsReqWrapper message, length delimited. Does not implicitly {@link protobuf.WsReqWrapper.verify|verify} messages.
         * @param message WsReqWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IWsReqWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WsReqWrapper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WsReqWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.WsReqWrapper;

        /**
         * Decodes a WsReqWrapper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WsReqWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.WsReqWrapper;

        /**
         * Verifies a WsReqWrapper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WsReqWrapper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WsReqWrapper
         */
        public static fromObject(object: { [k: string]: any }): protobuf.WsReqWrapper;

        /**
         * Creates a plain object from a WsReqWrapper message. Also converts values to other types if specified.
         * @param message WsReqWrapper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.WsReqWrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WsReqWrapper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WsRespWrapper. */
    interface IWsRespWrapper {

        /** WsRespWrapper closews */
        closews?: (protobuf.ICloseWs|null);
    }

    /** Represents a WsRespWrapper. */
    class WsRespWrapper implements IWsRespWrapper {

        /**
         * Constructs a new WsRespWrapper.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IWsRespWrapper);

        /** WsRespWrapper closews. */
        public closews?: (protobuf.ICloseWs|null);

        /** WsRespWrapper content. */
        public content?: "closews";

        /**
         * Creates a new WsRespWrapper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WsRespWrapper instance
         */
        public static create(properties?: protobuf.IWsRespWrapper): protobuf.WsRespWrapper;

        /**
         * Encodes the specified WsRespWrapper message. Does not implicitly {@link protobuf.WsRespWrapper.verify|verify} messages.
         * @param message WsRespWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IWsRespWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WsRespWrapper message, length delimited. Does not implicitly {@link protobuf.WsRespWrapper.verify|verify} messages.
         * @param message WsRespWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IWsRespWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WsRespWrapper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WsRespWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.WsRespWrapper;

        /**
         * Decodes a WsRespWrapper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WsRespWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.WsRespWrapper;

        /**
         * Verifies a WsRespWrapper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WsRespWrapper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WsRespWrapper
         */
        public static fromObject(object: { [k: string]: any }): protobuf.WsRespWrapper;

        /**
         * Creates a plain object from a WsRespWrapper message. Also converts values to other types if specified.
         * @param message WsRespWrapper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.WsRespWrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WsRespWrapper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
