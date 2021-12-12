from db_connector import *  # noqa
import secrets
import hashlib


def login(username: str, password: str):
    with SessionContext() as session:
        user = session.query(Users).filter_by(userName=username).one_or_none()
        if user is None:
            return None
        convert = hashlib.sha256(password.encode()).hexdigest()
        if user.password == convert:
            return getToken(int(user.id))
    return None


def signup(username: str, password: str):
    with SessionContext() as session:
        user = session.query(Users).filter_by(userName=username).one_or_none()
        if user is not None:
            return None
    convert = hashlib.sha256(password.encode()).hexdigest()
    with SessionContext() as session:
        new = Users(
            userName=username,
            userPassword=convert,
            createdAt=createdAt()
        )
        session.add(new)
        session.flush()
        return createToken(new.id_int)


def getToken(userId: int):
    with SessionContext() as session:
        user = session.query(TokenTable).filter_by(userId=userId).one_or_none()
        if user is None:
            return None
        return user.token


def createToken(userId: int):
    new_token = secrets.token_hex()
    with SessionContext() as session:
        session.add(TokenTable(userId=userId, token=new_token))
        return new_token
