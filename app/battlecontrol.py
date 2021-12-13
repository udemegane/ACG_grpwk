from app.db_connector import *  # noqa
from app.usercontrol import getUserId


def createMultiBattleLog(token: str, winner: str, loser: str, battleTime: int, isDraw=False):
    winnerId = getUserId(winner)
    loserId = getUserId(loser)
    if not (winnerId and loserId) or winnerId == loserId:
        return False
    # check if this game is already registered to the db
    with SessionContext() as session:
        if session.query(BattleLog).filter_by(gameToken=token).one_or_none() is not None:
            return False
    new = BattleLog(
        gameToken=token,
        winnerId=winnerId,
        loserId=loserId,
        isDraw=isDraw,
        createdAt=createdAt(),
        battleTime=battleTime,
        isSingleMode=False,
    )
    with SessionContext() as session:
        session.add(new)
        return True


def createSingleBattleLog(token: str, user: str, battleTime: int):
    userId = getUserId(user)
    if userId is None:
        return False
    # check if this game is already registered to the db
    with SessionContext() as session:
        if session.query(BattleLog).filter_by(gameToken=token).one_or_none() is not None:
            return False
    new = BattleLog(
        gameToken=token,
        winnerId=userId,
        createdAt=createdAt(),
        battleTime=battleTime,
        isSingleMode=True,
    )
    with SessionContext() as session:
        session.add(new)
        return True
