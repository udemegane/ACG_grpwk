from pathlib import Path

print(Path().absolute())
print(list(Path().glob('*')))
print(list(Path().glob('protobuf/*')))

from .compiled_pb2 import *  # noqa
