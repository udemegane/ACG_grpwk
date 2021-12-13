import json
from typing import Any, Dict, List, Optional
import datetime

from sqlalchemy import Column, Integer, String, Boolean

from app.sqlalchemy_h import Base, SessionContext


class UsersTyping:
    __tablename__ = 'users'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    userName = Column('userName', String(64))
    userPassword = Column('userPassword', String(64))
    createdAt = Column('createdAt', String(20))


class Users(Base, UsersTyping):
    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DBJsonDecode(data, [])
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
    userId = Column('userId', Integer)

    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DBJsonDecode(data, [])
        return {
            k: v if TokenTable.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }


class BattleLog(Base):
    __tablename__ = 'battlelog'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    gameToken = Column('gameToken', String(100))
    winnerId = Column('winnerId', Integer)
    loserId = Column('loserId', Integer, server_default=None)
    isDraw = Column('isDraw', Boolean, server_default=False)
    createdAt = Column('createdAt', String(20))
    battleTime = Column('battleTime', Integer)  # milliseconds
    isSingleMode = Column('isSingleMode', Boolean)

    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DBJsonDecode(data, [])
        return {
            k: v if TokenTable.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }


class AccessLog(Base):
    __tablename__ = 'accesslog'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    userId = Column('userId', Integer)
    createdAt = Column('createdAt', String(20))

    def get_dict(self, privacy_level: int = -1, delete: List[str] = []) -> Dict[str, Any]:
        data = DBtoDict(self, delete)
        data = DBJsonDecode(data, [])
        return {
            k: v if AccessLog.privacy_settings.get(k, privacy_level) >= privacy_level else None
            for k, v in data.items()
        }


def DBtoDict(obj, delete=[]):
    tmp: Dict[str, Any] = obj.__dict__
    tmp.pop('_sa_instance_state', None)
    return {k: tmp[k] for k in (tmp.keys() - set(delete))}


def DBJsonDecode(data: Dict[str, Any], keys: List[str] = []):
    for k in keys:
        data[k] = json.loads(data[k])
    return data


def createdAt(timeshift: Optional[datetime.timedelta] = None):
    if timeshift is None:
        timeshift = datetime.timedelta(0)
    return (datetime.datetime.now() + timeshift).isoformat('T', 'seconds')
