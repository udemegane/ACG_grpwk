import json
from typing import Any, Dict, List, Optional
import datetime

from sqlalchemy import Column, Integer, String

from app.sqlalchemy_h import Base


class UsersTyping:
    __tablename__ = 'users'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_name = Column('user_name', String(64))
    user_password = Column('user_password', String(64))
    created_at = Column('created_at', String(20))
    auth_token = Column('auth_token', String(63))


class Users(Base, UsersTyping):
    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DB_jsondecode(data, [])
        return {
            k: v if Users.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }

    @property
    def id_int(self):
        return int(self.id)


class TokenTable(Base):
    __tablename__ = 'tokentable'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    token = Column('token', String(65))
    user_id = Column('user_id', Integer)

    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DB_jsondecode(data, [])
        return {
            k: v if TokenTable.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }


class AccessLog(Base):
    __tablename__ = 'accesslog'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', Integer)
    created_at = Column('created_at', String(20))

    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DB_jsondecode(data, [])
        return {
            k: v if AccessLog.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }


def DBtoDict(obj, delete=[]):
    tmp: Dict[str, Any] = obj.__dict__
    tmp.pop('_sa_instance_state', None)
    return {k: tmp[k] for k in (tmp.keys() - set(delete))}


def DB_jsondecode(data: Dict[str, Any], keys: List[str] = []):
    for k in keys:
        data[k] = json.loads(data[k])
    return data


def created_at(timeshift: Optional[datetime.timedelta] = None):
    if timeshift is None:
        timeshift = datetime.timedelta(0)
    return (datetime.datetime.now() + timeshift).isoformat('T', 'seconds')
