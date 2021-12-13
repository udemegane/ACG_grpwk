from app.db_connector import *  # noqa
from app.usercontrol import getUserId


def createMultiBattleLog(token: str, winner: str, loser: str, battleTime: int, isDraw=False):
    winnerId = getUserId(winner)
    loserId = getUserId(loser)
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
