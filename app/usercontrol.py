from app.db_connector import *  # noqa
import secrets
import hashlib


def login(username: str, password: str):
    with SessionContext() as session:
        user = session.query(Users).filter_by(userName=username).one_or_none()
        if user is None:
            return None
        convert = hashlib.sha256(password.encode()).hexdigest()
        if user.userPassword == convert:
            return getToken(user.id_int)
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
        userId = new.id_int
    return createToken(userId)


def getUserId(token: Optional[str]):
    with SessionContext() as session:
        tokendata = session.query(TokenTable).filter_by(token=token).one_or_none()
        if tokendata is None:
            return None
        return int(tokendata.userId)


def getUserData(userId: Optional[int], session=None):
    with SessionContext(session=session) as session:
        data: Users = session.query(Users).get(userId)
        if data is None:
            return None
        return data.get_dict()


def getToken(userId: int):
    with SessionContext() as session:
        tokendata = session.query(TokenTable).filter_by(userId=userId).one_or_none()
        if tokendata is None:
            return None
        return tokendata.token


def createToken(userId: int):
    new_token = secrets.token_hex()
    with SessionContext() as session:
        session.add(TokenTable(userId=userId, token=new_token))
        return new_token
