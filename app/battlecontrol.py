from app.db_connector import *  # noqa
import secrets
import hashlib


def createMultiBattleLog(token: str, winner: str, loser: str, battleTime: int, isDraw=False):
    new = BattleLog(
        gameToken=token,
        winnerToken=winner,
        loserToken=loser,
        isDraw=isDraw,
        createdAt=createdAt(),
        battleTime=battleTime,
        isSingleMode=False,
    )
    with SessionContext() as session:
        session.add(new)
        return True


def createSingleBattleLog(token: str, user: str, battleTime: int):
    new = BattleLog(
        gameToken=token,
        winnerToken=user,
        createdAt=createdAt(),
        battleTime=battleTime,
        isSingleMode=True,
    )
    with SessionContext() as session:
        session.add(new)
        return True
