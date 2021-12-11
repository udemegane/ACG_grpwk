/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.protobuf = (function() {
    
        /**
         * Namespace protobuf.
         * @exports protobuf
         * @namespace
         */
        var protobuf = {};
    
        protobuf.CloseWs = (function() {
    
            /**
             * Properties of a CloseWs.
             * @memberof protobuf
             * @interface ICloseWs
             */
    
            /**
             * Constructs a new CloseWs.
             * @memberof protobuf
             * @classdesc Represents a CloseWs.
             * @implements ICloseWs
             * @constructor
             * @param {protobuf.ICloseWs=} [properties] Properties to set
             */
            function CloseWs(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new CloseWs instance using the specified properties.
             * @function create
             * @memberof protobuf.CloseWs
             * @static
             * @param {protobuf.ICloseWs=} [properties] Properties to set
             * @returns {protobuf.CloseWs} CloseWs instance
             */
            CloseWs.create = function create(properties) {
                return new CloseWs(properties);
            };
    
            /**
             * Encodes the specified CloseWs message. Does not implicitly {@link protobuf.CloseWs.verify|verify} messages.
             * @function encode
             * @memberof protobuf.CloseWs
             * @static
             * @param {protobuf.ICloseWs} message CloseWs message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloseWs.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified CloseWs message, length delimited. Does not implicitly {@link protobuf.CloseWs.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.CloseWs
             * @static
             * @param {protobuf.ICloseWs} message CloseWs message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloseWs.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CloseWs message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.CloseWs
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.CloseWs} CloseWs
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CloseWs.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.CloseWs();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CloseWs message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.CloseWs
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.CloseWs} CloseWs
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CloseWs.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CloseWs message.
             * @function verify
             * @memberof protobuf.CloseWs
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CloseWs.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a CloseWs message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.CloseWs
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.CloseWs} CloseWs
             */
            CloseWs.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.CloseWs)
                    return object;
                return new $root.protobuf.CloseWs();
            };
    
            /**
             * Creates a plain object from a CloseWs message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.CloseWs
             * @static
             * @param {protobuf.CloseWs} message CloseWs
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CloseWs.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this CloseWs to JSON.
             * @function toJSON
             * @memberof protobuf.CloseWs
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CloseWs.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CloseWs;
        })();
    
        protobuf.WsWrapper = (function() {
    
            /**
             * Properties of a WsWrapper.
             * @memberof protobuf
             * @interface IWsWrapper
             * @property {protobuf.ICloseWs|null} [closews] WsWrapper closews
             */
    
            /**
             * Constructs a new WsWrapper.
             * @memberof protobuf
             * @classdesc Represents a WsWrapper.
             * @implements IWsWrapper
             * @constructor
             * @param {protobuf.IWsWrapper=} [properties] Properties to set
             */
            function WsWrapper(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * WsWrapper closews.
             * @member {protobuf.ICloseWs|null|undefined} closews
             * @memberof protobuf.WsWrapper
             * @instance
             */
            WsWrapper.prototype.closews = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * WsWrapper content.
             * @member {"closews"|undefined} content
             * @memberof protobuf.WsWrapper
             * @instance
             */
            Object.defineProperty(WsWrapper.prototype, "content", {
                get: $util.oneOfGetter($oneOfFields = ["closews"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new WsWrapper instance using the specified properties.
             * @function create
             * @memberof protobuf.WsWrapper
             * @static
             * @param {protobuf.IWsWrapper=} [properties] Properties to set
             * @returns {protobuf.WsWrapper} WsWrapper instance
             */
            WsWrapper.create = function create(properties) {
                return new WsWrapper(properties);
            };
    
            /**
             * Encodes the specified WsWrapper message. Does not implicitly {@link protobuf.WsWrapper.verify|verify} messages.
             * @function encode
             * @memberof protobuf.WsWrapper
             * @static
             * @param {protobuf.IWsWrapper} message WsWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsWrapper.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.closews != null && Object.hasOwnProperty.call(message, "closews"))
                    $root.protobuf.CloseWs.encode(message.closews, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified WsWrapper message, length delimited. Does not implicitly {@link protobuf.WsWrapper.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.WsWrapper
             * @static
             * @param {protobuf.IWsWrapper} message WsWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsWrapper.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a WsWrapper message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.WsWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.WsWrapper} WsWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsWrapper.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.WsWrapper();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.closews = $root.protobuf.CloseWs.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a WsWrapper message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.WsWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.WsWrapper} WsWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsWrapper.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a WsWrapper message.
             * @function verify
             * @memberof protobuf.WsWrapper
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WsWrapper.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.closews != null && message.hasOwnProperty("closews")) {
                    properties.content = 1;
                    {
                        var error = $root.protobuf.CloseWs.verify(message.closews);
                        if (error)
                            return "closews." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a WsWrapper message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.WsWrapper
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.WsWrapper} WsWrapper
             */
            WsWrapper.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.WsWrapper)
                    return object;
                var message = new $root.protobuf.WsWrapper();
                if (object.closews != null) {
                    if (typeof object.closews !== "object")
                        throw TypeError(".protobuf.WsWrapper.closews: object expected");
                    message.closews = $root.protobuf.CloseWs.fromObject(object.closews);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a WsWrapper message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.WsWrapper
             * @static
             * @param {protobuf.WsWrapper} message WsWrapper
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WsWrapper.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.closews != null && message.hasOwnProperty("closews")) {
                    object.closews = $root.protobuf.CloseWs.toObject(message.closews, options);
                    if (options.oneofs)
                        object.content = "closews";
                }
                return object;
            };
    
            /**
             * Converts this WsWrapper to JSON.
             * @function toJSON
             * @memberof protobuf.WsWrapper
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WsWrapper.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return WsWrapper;
        })();
    
        return protobuf;
    })();

    return $root;
});
