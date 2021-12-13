# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: protobuf/backapi.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='protobuf/backapi.proto',
  package='protobuf',
  syntax='proto2',
  serialized_pb=_b('\n\x16protobuf/backapi.proto\x12\x08protobuf\"+\n\x05Login\x12\x10\n\x08username\x18\x01 \x02(\t\x12\x10\n\x08password\x18\x02 \x02(\t\",\n\x06Signup\x12\x10\n\x08username\x18\x01 \x02(\t\x12\x10\n\x08password\x18\x02 \x02(\t\"\x1b\n\nCheckToken\x12\r\n\x05token\x18\x01 \x02(\t\"+\n\tRespToken\x12\r\n\x05token\x18\x01 \x01(\t\x12\x0f\n\x07success\x18\x02 \x02(\x08\"\x1e\n\x0bRespSuccess\x12\x0f\n\x07success\x18\x01 \x02(\x08\"\xa6\x01\n\x0f\x43reateBattleLog\x12\x13\n\x0b\x62\x61ttleToken\x18\x01 \x02(\t\x12\x16\n\x0cisSingleMode\x18\x02 \x01(\x08H\x00\x12\x12\n\x08meWinner\x18\x03 \x01(\x08H\x00\x12\x10\n\x06isDraw\x18\x04 \x01(\x08H\x00\x12\x0f\n\x07myToken\x18\x05 \x02(\t\x12\x12\n\nenemyToken\x18\x06 \x01(\t\x12\x11\n\telapsedms\x18\x07 \x02(\x05\x42\x08\n\x06winner')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_LOGIN = _descriptor.Descriptor(
  name='Login',
  full_name='protobuf.Login',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='username', full_name='protobuf.Login.username', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='password', full_name='protobuf.Login.password', index=1,
      number=2, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=36,
  serialized_end=79,
)


_SIGNUP = _descriptor.Descriptor(
  name='Signup',
  full_name='protobuf.Signup',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='username', full_name='protobuf.Signup.username', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='password', full_name='protobuf.Signup.password', index=1,
      number=2, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=81,
  serialized_end=125,
)


_CHECKTOKEN = _descriptor.Descriptor(
  name='CheckToken',
  full_name='protobuf.CheckToken',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='token', full_name='protobuf.CheckToken.token', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=127,
  serialized_end=154,
)


_RESPTOKEN = _descriptor.Descriptor(
  name='RespToken',
  full_name='protobuf.RespToken',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='token', full_name='protobuf.RespToken.token', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='success', full_name='protobuf.RespToken.success', index=1,
      number=2, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=156,
  serialized_end=199,
)


_RESPSUCCESS = _descriptor.Descriptor(
  name='RespSuccess',
  full_name='protobuf.RespSuccess',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='success', full_name='protobuf.RespSuccess.success', index=0,
      number=1, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=201,
  serialized_end=231,
)


_CREATEBATTLELOG = _descriptor.Descriptor(
  name='CreateBattleLog',
  full_name='protobuf.CreateBattleLog',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='battleToken', full_name='protobuf.CreateBattleLog.battleToken', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='isSingleMode', full_name='protobuf.CreateBattleLog.isSingleMode', index=1,
      number=2, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='meWinner', full_name='protobuf.CreateBattleLog.meWinner', index=2,
      number=3, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='isDraw', full_name='protobuf.CreateBattleLog.isDraw', index=3,
      number=4, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='myToken', full_name='protobuf.CreateBattleLog.myToken', index=4,
      number=5, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='enemyToken', full_name='protobuf.CreateBattleLog.enemyToken', index=5,
      number=6, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='elapsedms', full_name='protobuf.CreateBattleLog.elapsedms', index=6,
      number=7, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
    _descriptor.OneofDescriptor(
      name='winner', full_name='protobuf.CreateBattleLog.winner',
      index=0, containing_type=None, fields=[]),
  ],
  serialized_start=234,
  serialized_end=400,
)

_CREATEBATTLELOG.oneofs_by_name['winner'].fields.append(
  _CREATEBATTLELOG.fields_by_name['isSingleMode'])
_CREATEBATTLELOG.fields_by_name['isSingleMode'].containing_oneof = _CREATEBATTLELOG.oneofs_by_name['winner']
_CREATEBATTLELOG.oneofs_by_name['winner'].fields.append(
  _CREATEBATTLELOG.fields_by_name['meWinner'])
_CREATEBATTLELOG.fields_by_name['meWinner'].containing_oneof = _CREATEBATTLELOG.oneofs_by_name['winner']
_CREATEBATTLELOG.oneofs_by_name['winner'].fields.append(
  _CREATEBATTLELOG.fields_by_name['isDraw'])
_CREATEBATTLELOG.fields_by_name['isDraw'].containing_oneof = _CREATEBATTLELOG.oneofs_by_name['winner']
DESCRIPTOR.message_types_by_name['Login'] = _LOGIN
DESCRIPTOR.message_types_by_name['Signup'] = _SIGNUP
DESCRIPTOR.message_types_by_name['CheckToken'] = _CHECKTOKEN
DESCRIPTOR.message_types_by_name['RespToken'] = _RESPTOKEN
DESCRIPTOR.message_types_by_name['RespSuccess'] = _RESPSUCCESS
DESCRIPTOR.message_types_by_name['CreateBattleLog'] = _CREATEBATTLELOG

Login = _reflection.GeneratedProtocolMessageType('Login', (_message.Message,), dict(
  DESCRIPTOR = _LOGIN,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.Login)
  ))
_sym_db.RegisterMessage(Login)

Signup = _reflection.GeneratedProtocolMessageType('Signup', (_message.Message,), dict(
  DESCRIPTOR = _SIGNUP,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.Signup)
  ))
_sym_db.RegisterMessage(Signup)

CheckToken = _reflection.GeneratedProtocolMessageType('CheckToken', (_message.Message,), dict(
  DESCRIPTOR = _CHECKTOKEN,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.CheckToken)
  ))
_sym_db.RegisterMessage(CheckToken)

RespToken = _reflection.GeneratedProtocolMessageType('RespToken', (_message.Message,), dict(
  DESCRIPTOR = _RESPTOKEN,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.RespToken)
  ))
_sym_db.RegisterMessage(RespToken)

RespSuccess = _reflection.GeneratedProtocolMessageType('RespSuccess', (_message.Message,), dict(
  DESCRIPTOR = _RESPSUCCESS,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.RespSuccess)
  ))
_sym_db.RegisterMessage(RespSuccess)

CreateBattleLog = _reflection.GeneratedProtocolMessageType('CreateBattleLog', (_message.Message,), dict(
  DESCRIPTOR = _CREATEBATTLELOG,
  __module__ = 'protobuf.backapi_pb2'
  # @@protoc_insertion_point(class_scope:protobuf.CreateBattleLog)
  ))
_sym_db.RegisterMessage(CreateBattleLog)


# @@protoc_insertion_point(module_scope)
