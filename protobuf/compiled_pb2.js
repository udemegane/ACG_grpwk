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
    
        protobuf.CheckToken = (function() {
    
            /**
             * Properties of a CheckToken.
             * @memberof protobuf
             * @interface ICheckToken
             * @property {string} token CheckToken token
             */
    
            /**
             * Constructs a new CheckToken.
             * @memberof protobuf
             * @classdesc Represents a CheckToken.
             * @implements ICheckToken
             * @constructor
             * @param {protobuf.ICheckToken=} [properties] Properties to set
             */
            function CheckToken(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CheckToken token.
             * @member {string} token
             * @memberof protobuf.CheckToken
             * @instance
             */
            CheckToken.prototype.token = "";
    
            /**
             * Creates a new CheckToken instance using the specified properties.
             * @function create
             * @memberof protobuf.CheckToken
             * @static
             * @param {protobuf.ICheckToken=} [properties] Properties to set
             * @returns {protobuf.CheckToken} CheckToken instance
             */
            CheckToken.create = function create(properties) {
                return new CheckToken(properties);
            };
    
            /**
             * Encodes the specified CheckToken message. Does not implicitly {@link protobuf.CheckToken.verify|verify} messages.
             * @function encode
             * @memberof protobuf.CheckToken
             * @static
             * @param {protobuf.ICheckToken} message CheckToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckToken.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
                return writer;
            };
    
            /**
             * Encodes the specified CheckToken message, length delimited. Does not implicitly {@link protobuf.CheckToken.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.CheckToken
             * @static
             * @param {protobuf.ICheckToken} message CheckToken message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckToken.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CheckToken message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.CheckToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.CheckToken} CheckToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckToken.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.CheckToken();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.token = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("token"))
                    throw $util.ProtocolError("missing required 'token'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a CheckToken message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.CheckToken
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.CheckToken} CheckToken
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckToken.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CheckToken message.
             * @function verify
             * @memberof protobuf.CheckToken
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CheckToken.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.token))
                    return "token: string expected";
                return null;
            };
    
            /**
             * Creates a CheckToken message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.CheckToken
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.CheckToken} CheckToken
             */
            CheckToken.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.CheckToken)
                    return object;
                var message = new $root.protobuf.CheckToken();
                if (object.token != null)
                    message.token = String(object.token);
                return message;
            };
    
            /**
             * Creates a plain object from a CheckToken message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.CheckToken
             * @static
             * @param {protobuf.CheckToken} message CheckToken
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CheckToken.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.token = "";
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                return object;
            };
    
            /**
             * Converts this CheckToken to JSON.
             * @function toJSON
             * @memberof protobuf.CheckToken
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CheckToken.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CheckToken;
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
    
        protobuf.RespSuccess = (function() {
    
            /**
             * Properties of a RespSuccess.
             * @memberof protobuf
             * @interface IRespSuccess
             * @property {boolean} success RespSuccess success
             */
    
            /**
             * Constructs a new RespSuccess.
             * @memberof protobuf
             * @classdesc Represents a RespSuccess.
             * @implements IRespSuccess
             * @constructor
             * @param {protobuf.IRespSuccess=} [properties] Properties to set
             */
            function RespSuccess(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * RespSuccess success.
             * @member {boolean} success
             * @memberof protobuf.RespSuccess
             * @instance
             */
            RespSuccess.prototype.success = false;
    
            /**
             * Creates a new RespSuccess instance using the specified properties.
             * @function create
             * @memberof protobuf.RespSuccess
             * @static
             * @param {protobuf.IRespSuccess=} [properties] Properties to set
             * @returns {protobuf.RespSuccess} RespSuccess instance
             */
            RespSuccess.create = function create(properties) {
                return new RespSuccess(properties);
            };
    
            /**
             * Encodes the specified RespSuccess message. Does not implicitly {@link protobuf.RespSuccess.verify|verify} messages.
             * @function encode
             * @memberof protobuf.RespSuccess
             * @static
             * @param {protobuf.IRespSuccess} message RespSuccess message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RespSuccess.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                return writer;
            };
    
            /**
             * Encodes the specified RespSuccess message, length delimited. Does not implicitly {@link protobuf.RespSuccess.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.RespSuccess
             * @static
             * @param {protobuf.IRespSuccess} message RespSuccess message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RespSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a RespSuccess message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.RespSuccess
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.RespSuccess} RespSuccess
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RespSuccess.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.RespSuccess();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
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
             * Decodes a RespSuccess message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.RespSuccess
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.RespSuccess} RespSuccess
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RespSuccess.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a RespSuccess message.
             * @function verify
             * @memberof protobuf.RespSuccess
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RespSuccess.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
                return null;
            };
    
            /**
             * Creates a RespSuccess message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.RespSuccess
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.RespSuccess} RespSuccess
             */
            RespSuccess.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.RespSuccess)
                    return object;
                var message = new $root.protobuf.RespSuccess();
                if (object.success != null)
                    message.success = Boolean(object.success);
                return message;
            };
    
            /**
             * Creates a plain object from a RespSuccess message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.RespSuccess
             * @static
             * @param {protobuf.RespSuccess} message RespSuccess
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RespSuccess.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.success = false;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                return object;
            };
    
            /**
             * Converts this RespSuccess to JSON.
             * @function toJSON
             * @memberof protobuf.RespSuccess
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RespSuccess.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return RespSuccess;
        })();
    
        protobuf.CreateBattleLog = (function() {
    
            /**
             * Properties of a CreateBattleLog.
             * @memberof protobuf
             * @interface ICreateBattleLog
             * @property {string} battleToken CreateBattleLog battleToken
             * @property {boolean|null} [isSingleMode] CreateBattleLog isSingleMode
             * @property {boolean|null} [meWinner] CreateBattleLog meWinner
             * @property {boolean|null} [isDraw] CreateBattleLog isDraw
             * @property {string} myToken CreateBattleLog myToken
             * @property {string|null} [enemyToken] CreateBattleLog enemyToken
             * @property {number} elapsedms CreateBattleLog elapsedms
             */
    
            /**
             * Constructs a new CreateBattleLog.
             * @memberof protobuf
             * @classdesc Represents a CreateBattleLog.
             * @implements ICreateBattleLog
             * @constructor
             * @param {protobuf.ICreateBattleLog=} [properties] Properties to set
             */
            function CreateBattleLog(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CreateBattleLog battleToken.
             * @member {string} battleToken
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.battleToken = "";
    
            /**
             * CreateBattleLog isSingleMode.
             * @member {boolean|null|undefined} isSingleMode
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.isSingleMode = null;
    
            /**
             * CreateBattleLog meWinner.
             * @member {boolean|null|undefined} meWinner
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.meWinner = null;
    
            /**
             * CreateBattleLog isDraw.
             * @member {boolean|null|undefined} isDraw
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.isDraw = null;
    
            /**
             * CreateBattleLog myToken.
             * @member {string} myToken
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.myToken = "";
    
            /**
             * CreateBattleLog enemyToken.
             * @member {string} enemyToken
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.enemyToken = "";
    
            /**
             * CreateBattleLog elapsedms.
             * @member {number} elapsedms
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            CreateBattleLog.prototype.elapsedms = 0;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * CreateBattleLog winner.
             * @member {"isSingleMode"|"meWinner"|"isDraw"|undefined} winner
             * @memberof protobuf.CreateBattleLog
             * @instance
             */
            Object.defineProperty(CreateBattleLog.prototype, "winner", {
                get: $util.oneOfGetter($oneOfFields = ["isSingleMode", "meWinner", "isDraw"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new CreateBattleLog instance using the specified properties.
             * @function create
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {protobuf.ICreateBattleLog=} [properties] Properties to set
             * @returns {protobuf.CreateBattleLog} CreateBattleLog instance
             */
            CreateBattleLog.create = function create(properties) {
                return new CreateBattleLog(properties);
            };
    
            /**
             * Encodes the specified CreateBattleLog message. Does not implicitly {@link protobuf.CreateBattleLog.verify|verify} messages.
             * @function encode
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {protobuf.ICreateBattleLog} message CreateBattleLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateBattleLog.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.battleToken);
                if (message.isSingleMode != null && Object.hasOwnProperty.call(message, "isSingleMode"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isSingleMode);
                if (message.meWinner != null && Object.hasOwnProperty.call(message, "meWinner"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.meWinner);
                if (message.isDraw != null && Object.hasOwnProperty.call(message, "isDraw"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isDraw);
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.myToken);
                if (message.enemyToken != null && Object.hasOwnProperty.call(message, "enemyToken"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.enemyToken);
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.elapsedms);
                return writer;
            };
    
            /**
             * Encodes the specified CreateBattleLog message, length delimited. Does not implicitly {@link protobuf.CreateBattleLog.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {protobuf.ICreateBattleLog} message CreateBattleLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateBattleLog.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CreateBattleLog message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.CreateBattleLog} CreateBattleLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateBattleLog.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.CreateBattleLog();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.battleToken = reader.string();
                        break;
                    case 2:
                        message.isSingleMode = reader.bool();
                        break;
                    case 3:
                        message.meWinner = reader.bool();
                        break;
                    case 4:
                        message.isDraw = reader.bool();
                        break;
                    case 5:
                        message.myToken = reader.string();
                        break;
                    case 6:
                        message.enemyToken = reader.string();
                        break;
                    case 7:
                        message.elapsedms = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("battleToken"))
                    throw $util.ProtocolError("missing required 'battleToken'", { instance: message });
                if (!message.hasOwnProperty("myToken"))
                    throw $util.ProtocolError("missing required 'myToken'", { instance: message });
                if (!message.hasOwnProperty("elapsedms"))
                    throw $util.ProtocolError("missing required 'elapsedms'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a CreateBattleLog message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.CreateBattleLog} CreateBattleLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateBattleLog.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CreateBattleLog message.
             * @function verify
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateBattleLog.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (!$util.isString(message.battleToken))
                    return "battleToken: string expected";
                if (message.isSingleMode != null && message.hasOwnProperty("isSingleMode")) {
                    properties.winner = 1;
                    if (typeof message.isSingleMode !== "boolean")
                        return "isSingleMode: boolean expected";
                }
                if (message.meWinner != null && message.hasOwnProperty("meWinner")) {
                    if (properties.winner === 1)
                        return "winner: multiple values";
                    properties.winner = 1;
                    if (typeof message.meWinner !== "boolean")
                        return "meWinner: boolean expected";
                }
                if (message.isDraw != null && message.hasOwnProperty("isDraw")) {
                    if (properties.winner === 1)
                        return "winner: multiple values";
                    properties.winner = 1;
                    if (typeof message.isDraw !== "boolean")
                        return "isDraw: boolean expected";
                }
                if (!$util.isString(message.myToken))
                    return "myToken: string expected";
                if (message.enemyToken != null && message.hasOwnProperty("enemyToken"))
                    if (!$util.isString(message.enemyToken))
                        return "enemyToken: string expected";
                if (!$util.isInteger(message.elapsedms))
                    return "elapsedms: integer expected";
                return null;
            };
    
            /**
             * Creates a CreateBattleLog message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.CreateBattleLog} CreateBattleLog
             */
            CreateBattleLog.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.CreateBattleLog)
                    return object;
                var message = new $root.protobuf.CreateBattleLog();
                if (object.battleToken != null)
                    message.battleToken = String(object.battleToken);
                if (object.isSingleMode != null)
                    message.isSingleMode = Boolean(object.isSingleMode);
                if (object.meWinner != null)
                    message.meWinner = Boolean(object.meWinner);
                if (object.isDraw != null)
                    message.isDraw = Boolean(object.isDraw);
                if (object.myToken != null)
                    message.myToken = String(object.myToken);
                if (object.enemyToken != null)
                    message.enemyToken = String(object.enemyToken);
                if (object.elapsedms != null)
                    message.elapsedms = object.elapsedms | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a CreateBattleLog message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.CreateBattleLog
             * @static
             * @param {protobuf.CreateBattleLog} message CreateBattleLog
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateBattleLog.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.battleToken = "";
                    object.myToken = "";
                    object.enemyToken = "";
                    object.elapsedms = 0;
                }
                if (message.battleToken != null && message.hasOwnProperty("battleToken"))
                    object.battleToken = message.battleToken;
                if (message.isSingleMode != null && message.hasOwnProperty("isSingleMode")) {
                    object.isSingleMode = message.isSingleMode;
                    if (options.oneofs)
                        object.winner = "isSingleMode";
                }
                if (message.meWinner != null && message.hasOwnProperty("meWinner")) {
                    object.meWinner = message.meWinner;
                    if (options.oneofs)
                        object.winner = "meWinner";
                }
                if (message.isDraw != null && message.hasOwnProperty("isDraw")) {
                    object.isDraw = message.isDraw;
                    if (options.oneofs)
                        object.winner = "isDraw";
                }
                if (message.myToken != null && message.hasOwnProperty("myToken"))
                    object.myToken = message.myToken;
                if (message.enemyToken != null && message.hasOwnProperty("enemyToken"))
                    object.enemyToken = message.enemyToken;
                if (message.elapsedms != null && message.hasOwnProperty("elapsedms"))
                    object.elapsedms = message.elapsedms;
                return object;
            };
    
            /**
             * Converts this CreateBattleLog to JSON.
             * @function toJSON
             * @memberof protobuf.CreateBattleLog
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateBattleLog.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CreateBattleLog;
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
