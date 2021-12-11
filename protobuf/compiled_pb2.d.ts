import * as $protobuf from "protobufjs";
/** Namespace protobuf. */
export namespace protobuf {

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

    /** Properties of a WsWrapper. */
    interface IWsWrapper {

        /** WsWrapper closews */
        closews?: (protobuf.ICloseWs|null);
    }

    /** Represents a WsWrapper. */
    class WsWrapper implements IWsWrapper {

        /**
         * Constructs a new WsWrapper.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IWsWrapper);

        /** WsWrapper closews. */
        public closews?: (protobuf.ICloseWs|null);

        /** WsWrapper content. */
        public content?: "closews";

        /**
         * Creates a new WsWrapper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WsWrapper instance
         */
        public static create(properties?: protobuf.IWsWrapper): protobuf.WsWrapper;

        /**
         * Encodes the specified WsWrapper message. Does not implicitly {@link protobuf.WsWrapper.verify|verify} messages.
         * @param message WsWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IWsWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WsWrapper message, length delimited. Does not implicitly {@link protobuf.WsWrapper.verify|verify} messages.
         * @param message WsWrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IWsWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WsWrapper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WsWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.WsWrapper;

        /**
         * Decodes a WsWrapper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WsWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.WsWrapper;

        /**
         * Verifies a WsWrapper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WsWrapper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WsWrapper
         */
        public static fromObject(object: { [k: string]: any }): protobuf.WsWrapper;

        /**
         * Creates a plain object from a WsWrapper message. Also converts values to other types if specified.
         * @param message WsWrapper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.WsWrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WsWrapper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
