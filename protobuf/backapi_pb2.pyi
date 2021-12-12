"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.message
import typing
import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor = ...

class Login(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor = ...
    USERNAME_FIELD_NUMBER: builtins.int
    PASSWORD_FIELD_NUMBER: builtins.int
    username: typing.Text = ...
    password: typing.Text = ...
    def __init__(self,
        *,
        username : typing.Optional[typing.Text] = ...,
        password : typing.Optional[typing.Text] = ...,
        ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["password",b"password","username",b"username"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["password",b"password","username",b"username"]) -> None: ...
global___Login = Login

class Signup(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor = ...
    USERNAME_FIELD_NUMBER: builtins.int
    PASSWORD_FIELD_NUMBER: builtins.int
    username: typing.Text = ...
    password: typing.Text = ...
    def __init__(self,
        *,
        username : typing.Optional[typing.Text] = ...,
        password : typing.Optional[typing.Text] = ...,
        ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["password",b"password","username",b"username"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["password",b"password","username",b"username"]) -> None: ...
global___Signup = Signup

class RespToken(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor = ...
    TOKEN_FIELD_NUMBER: builtins.int
    SUCCESS_FIELD_NUMBER: builtins.int
    token: typing.Text = ...
    success: builtins.bool = ...
    def __init__(self,
        *,
        token : typing.Optional[typing.Text] = ...,
        success : typing.Optional[builtins.bool] = ...,
        ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["success",b"success","token",b"token"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["success",b"success","token",b"token"]) -> None: ...
global___RespToken = RespToken
