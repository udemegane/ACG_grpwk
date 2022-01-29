from pathlib import Path

print(Path().absolute())
print(list(Path().glob('*')))

from .compiled_pb2 import *  # noqa
