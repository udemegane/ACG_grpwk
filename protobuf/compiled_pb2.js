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
    
        protobuf.Login = (function() {
    
            /**
             * Properties of a Login.
             * @memberof protobuf
             * @interface ILogin
             * @property {string} username Login username
             * @property {string} password Login password
             */
    
            /**
             * Constructs a new Login.
             * @memberof protobuf
             * @classdesc Represents a Login.
             * @implements ILogin
             * @constructor
             * @param {protobuf.ILogin=} [properties] Properties to set
             */
            function Login(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Login username.
             * @member {string} username
             * @memberof protobuf.Login
             * @instance
             */
            Login.prototype.username = "";
    
            /**
             * Login password.
             * @member {string} password
             * @memberof protobuf.Login
             * @instance
             */
            Login.prototype.password = "";
    
            /**
             * Creates a new Login instance using the specified properties.
             * @function create
             * @memberof protobuf.Login
             * @static
             * @param {protobuf.ILogin=} [properties] Properties to set
             * @returns {protobuf.Login} Login instance
             */
            Login.create = function create(properties) {
                return new Login(properties);
            };
    
            /**
             * Encodes the specified Login message. Does not implicitly {@link protobuf.Login.verify|verify} messages.
             * @function encode
             * @memberof protobuf.Login
             * @static
             * @param {protobuf.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                return writer;
            };
    
            /**
             * Encodes the specified Login message, length delimited. Does not implicitly {@link protobuf.Login.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.Login
             * @static
             * @param {protobuf.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Login message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Login();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.username = reader.string();
                        break;
                    case 2:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("username"))
                    throw $util.ProtocolError("missing required 'username'", { instance: message });
                if (!message.hasOwnProperty("password"))
                    throw $util.ProtocolError("missing required 'password'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Login message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Login message.
             * @function verify
             * @memberof protobuf.Login
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Login.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.username))
                    return "username: string expected";
                if (!$util.isString(message.password))
                    return "password: string expected";
                return null;
            };
    
            /**
             * Creates a Login message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.Login
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.Login} Login
             */
            Login.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.Login)
                    return object;
                var message = new $root.protobuf.Login();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };
    
            /**
             * Creates a plain object from a Login message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.Login
             * @static
             * @param {protobuf.Login} message Login
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Login.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };
    
            /**
             * Converts this Login to JSON.
             * @function toJSON
             * @memberof protobuf.Login
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Login.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Login;
        })();
    
        protobuf.Signup = (function() {
    
            /**
             * Properties of a Signup.
             * @memberof protobuf
             * @interface ISignup
             * @property {string} username Signup username
             * @property {string} password Signup password
             */
    
            /**
             * Constructs a new Signup.
             * @memberof protobuf
             * @classdesc Represents a Signup.
             * @implements ISignup
             * @constructor
             * @param {protobuf.ISignup=} [properties] Properties to set
             */
            function Signup(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Signup username.
             * @member {string} username
             * @memberof protobuf.Signup
             * @instance
             */
            Signup.prototype.username = "";
    
            /**
             * Signup password.
             * @member {string} password
             * @memberof protobuf.Signup
             * @instance
             */
            Signup.prototype.password = "";
    
            /**
             * Creates a new Signup instance using the specified properties.
             * @function create
             * @memberof protobuf.Signup
             * @static
             * @param {protobuf.ISignup=} [properties] Properties to set
             * @returns {protobuf.Signup} Signup instance
             */
            Signup.create = function create(properties) {
                return new Signup(properties);
            };
    
            /**
             * Encodes the specified Signup message. Does not implicitly {@link protobuf.Signup.verify|verify} messages.
             * @function encode
             * @memberof protobuf.Signup
             * @static
             * @param {protobuf.ISignup} message Signup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                return writer;
            };
    
            /**
             * Encodes the specified Signup message, length delimited. Does not implicitly {@link protobuf.Signup.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.Signup
             * @static
             * @param {protobuf.ISignup} message Signup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signup.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Signup message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.Signup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.Signup} Signup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Signup();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.username = reader.string();
                        break;
                    case 2:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("username"))
                    throw $util.ProtocolError("missing required 'username'", { instance: message });
                if (!message.hasOwnProperty("password"))
                    throw $util.ProtocolError("missing required 'password'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Signup message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.Signup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.Signup} Signup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signup.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Signup message.
             * @function verify
             * @memberof protobuf.Signup
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Signup.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.username))
                    return "username: string expected";
                if (!$util.isString(message.password))
                    return "password: string expected";
                return null;
            };
    
            /**
             * Creates a Signup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.Signup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.Signup} Signup
             */
            Signup.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.Signup)
                    return object;
                var message = new $root.protobuf.Signup();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };
    
            /**
             * Creates a plain object from a Signup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.Signup
             * @static
             * @param {protobuf.Signup} message Signup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Signup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };
    
            /**
             * Converts this Signup to JSON.
             * @function toJSON
             * @memberof protobuf.Signup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Signup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Signup;
        })();
    
        protobuf.RespToken = (function() {
    
            /**
             * Properties of a RespToken.
             * @memberof protobuf
             * @interface IRespToken
             * @property {string|null} [token] RespToken token
             * @property {boolean} success RespToken success
             */
    
            /**
             * Constructs a new RespToken.
             * @memberof protobuf
             * @classdesc Represents a RespToken.
             * @implements IRespToken
             * @constructor
             * @param {protobuf.IRespToken=} [properties] Properties to set
             */
            function RespToken(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * RespToken token.
             * @member {string} token
             * @memberof protobuf.RespToken
             * @instance
             */
            RespToken.prototype.token = "";
    
            /**
             * RespToken success.
             * @member {boolean} success
             * @memberof protobuf.RespToken
             * @instance
             */
            RespToken.prototype.success = false;
    
            /**
             * Creates a new RespToken instance using the specified properties.
             * @function create
             * @memberof protobuf.RespToken
             * @static
             * @param {protobuf.IRespToken=} [properties] Properties to set
             * @returns {protobuf.RespToken} RespToken instance
             */
            RespToken.create = function create(properties) {
                return new RespToken(properties);
            };
    
            /**
             * Encodes the specified RespToken message. Does not implicitly {@link protobuf.RespToken.verify|verify} messages.
             * @function encode
             * @memberof protobuf.RespToken
             * @static
             * @param {protobuf.IRespToken} message RespToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RespToken.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.success);
                return writer;
            };
    
            /**
             * Encodes the specified RespToken message, length delimited. Does not implicitly {@link protobuf.RespToken.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.RespToken
             * @static
             * @param {protobuf.IRespToken} message RespToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RespToken.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a RespToken message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.RespToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.RespToken} RespToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RespToken.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.RespToken();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.token = reader.string();
                        break;
                    case 2:
                        message.success = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("success"))
                    throw $util.ProtocolError("missing required 'success'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a RespToken message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.RespToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.RespToken} RespToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RespToken.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a RespToken message.
             * @function verify
             * @memberof protobuf.RespToken
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RespToken.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
                return null;
            };
    
            /**
             * Creates a RespToken message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.RespToken
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.RespToken} RespToken
             */
            RespToken.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.RespToken)
                    return object;
                var message = new $root.protobuf.RespToken();
                if (object.token != null)
                    message.token = String(object.token);
                if (object.success != null)
                    message.success = Boolean(object.success);
                return message;
            };
    
            /**
             * Creates a plain object from a RespToken message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.RespToken
             * @static
             * @param {protobuf.RespToken} message RespToken
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RespToken.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.token = "";
                    object.success = false;
                }
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                return object;
            };
    
            /**
             * Converts this RespToken to JSON.
             * @function toJSON
             * @memberof protobuf.RespToken
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RespToken.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return RespToken;
        })();
    
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
    
        protobuf.WsReqWrapper = (function() {
    
            /**
             * Properties of a WsReqWrapper.
             * @memberof protobuf
             * @interface IWsReqWrapper
             * @property {protobuf.ICloseWs|null} [closews] WsReqWrapper closews
             */
    
            /**
             * Constructs a new WsReqWrapper.
             * @memberof protobuf
             * @classdesc Represents a WsReqWrapper.
             * @implements IWsReqWrapper
             * @constructor
             * @param {protobuf.IWsReqWrapper=} [properties] Properties to set
             */
            function WsReqWrapper(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * WsReqWrapper closews.
             * @member {protobuf.ICloseWs|null|undefined} closews
             * @memberof protobuf.WsReqWrapper
             * @instance
             */
            WsReqWrapper.prototype.closews = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * WsReqWrapper content.
             * @member {"closews"|undefined} content
             * @memberof protobuf.WsReqWrapper
             * @instance
             */
            Object.defineProperty(WsReqWrapper.prototype, "content", {
                get: $util.oneOfGetter($oneOfFields = ["closews"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new WsReqWrapper instance using the specified properties.
             * @function create
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {protobuf.IWsReqWrapper=} [properties] Properties to set
             * @returns {protobuf.WsReqWrapper} WsReqWrapper instance
             */
            WsReqWrapper.create = function create(properties) {
                return new WsReqWrapper(properties);
            };
    
            /**
             * Encodes the specified WsReqWrapper message. Does not implicitly {@link protobuf.WsReqWrapper.verify|verify} messages.
             * @function encode
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {protobuf.IWsReqWrapper} message WsReqWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsReqWrapper.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.closews != null && Object.hasOwnProperty.call(message, "closews"))
                    $root.protobuf.CloseWs.encode(message.closews, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified WsReqWrapper message, length delimited. Does not implicitly {@link protobuf.WsReqWrapper.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {protobuf.IWsReqWrapper} message WsReqWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsReqWrapper.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a WsReqWrapper message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.WsReqWrapper} WsReqWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsReqWrapper.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.WsReqWrapper();
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
             * Decodes a WsReqWrapper message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.WsReqWrapper} WsReqWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsReqWrapper.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a WsReqWrapper message.
             * @function verify
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WsReqWrapper.verify = function verify(message) {
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
             * Creates a WsReqWrapper message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.WsReqWrapper} WsReqWrapper
             */
            WsReqWrapper.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.WsReqWrapper)
                    return object;
                var message = new $root.protobuf.WsReqWrapper();
                if (object.closews != null) {
                    if (typeof object.closews !== "object")
                        throw TypeError(".protobuf.WsReqWrapper.closews: object expected");
                    message.closews = $root.protobuf.CloseWs.fromObject(object.closews);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a WsReqWrapper message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.WsReqWrapper
             * @static
             * @param {protobuf.WsReqWrapper} message WsReqWrapper
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WsReqWrapper.toObject = function toObject(message, options) {
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
             * Converts this WsReqWrapper to JSON.
             * @function toJSON
             * @memberof protobuf.WsReqWrapper
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WsReqWrapper.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return WsReqWrapper;
        })();
    
        protobuf.WsRespWrapper = (function() {
    
            /**
             * Properties of a WsRespWrapper.
             * @memberof protobuf
             * @interface IWsRespWrapper
             * @property {protobuf.ICloseWs|null} [closews] WsRespWrapper closews
             */
    
            /**
             * Constructs a new WsRespWrapper.
             * @memberof protobuf
             * @classdesc Represents a WsRespWrapper.
             * @implements IWsRespWrapper
             * @constructor
             * @param {protobuf.IWsRespWrapper=} [properties] Properties to set
             */
            function WsRespWrapper(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * WsRespWrapper closews.
             * @member {protobuf.ICloseWs|null|undefined} closews
             * @memberof protobuf.WsRespWrapper
             * @instance
             */
            WsRespWrapper.prototype.closews = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * WsRespWrapper content.
             * @member {"closews"|undefined} content
             * @memberof protobuf.WsRespWrapper
             * @instance
             */
            Object.defineProperty(WsRespWrapper.prototype, "content", {
                get: $util.oneOfGetter($oneOfFields = ["closews"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new WsRespWrapper instance using the specified properties.
             * @function create
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {protobuf.IWsRespWrapper=} [properties] Properties to set
             * @returns {protobuf.WsRespWrapper} WsRespWrapper instance
             */
            WsRespWrapper.create = function create(properties) {
                return new WsRespWrapper(properties);
            };
    
            /**
             * Encodes the specified WsRespWrapper message. Does not implicitly {@link protobuf.WsRespWrapper.verify|verify} messages.
             * @function encode
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {protobuf.IWsRespWrapper} message WsRespWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsRespWrapper.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.closews != null && Object.hasOwnProperty.call(message, "closews"))
                    $root.protobuf.CloseWs.encode(message.closews, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified WsRespWrapper message, length delimited. Does not implicitly {@link protobuf.WsRespWrapper.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {protobuf.IWsRespWrapper} message WsRespWrapper message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WsRespWrapper.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a WsRespWrapper message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.WsRespWrapper} WsRespWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsRespWrapper.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.WsRespWrapper();
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
             * Decodes a WsRespWrapper message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.WsRespWrapper} WsRespWrapper
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WsRespWrapper.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a WsRespWrapper message.
             * @function verify
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WsRespWrapper.verify = function verify(message) {
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
             * Creates a WsRespWrapper message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.WsRespWrapper} WsRespWrapper
             */
            WsRespWrapper.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.WsRespWrapper)
                    return object;
                var message = new $root.protobuf.WsRespWrapper();
                if (object.closews != null) {
                    if (typeof object.closews !== "object")
                        throw TypeError(".protobuf.WsRespWrapper.closews: object expected");
                    message.closews = $root.protobuf.CloseWs.fromObject(object.closews);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a WsRespWrapper message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.WsRespWrapper
             * @static
             * @param {protobuf.WsRespWrapper} message WsRespWrapper
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WsRespWrapper.toObject = function toObject(message, options) {
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
             * Converts this WsRespWrapper to JSON.
             * @function toJSON
             * @memberof protobuf.WsRespWrapper
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WsRespWrapper.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return WsRespWrapper;
        })();
    
        return protobuf;
    })();

    return $root;
});
