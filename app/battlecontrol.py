import asyncio
import uuid
from typing import Dict, Set, Tuple
from dataclasses import dataclass

from app.db_connector import *  # noqa
from app.usercontrol import getUserId
from protobuf.backapi_pb2 import MultiGameID


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


class MatchQueue:
    def __init__(self, max_len: int = 0):
        self.queue: asyncio.Queue[MultiGameID] = asyncio.Queue(maxsize=max_len)
        self.match_ready: Dict[str, MultiGameID] = {}
        self.user_waiting: Set[str] = set()

    async def set_or_match(self, token: str, mypeer: str):
        if token in self.match_ready:
            return self.match_ready.pop(token)
        elif token in self.user_waiting:
            return None
        mydata = MultiGameID(success=True, token=token, oppeer=mypeer, isHost=True)
        while not self.queue.empty():
            op = await self.queue.get()
            if op.token == token:
                print(token, 'same as op')
                return None
            self.match_ready[op.token] = mydata
            self.user_waiting.remove(op.token)
            op.isHost = False
            return op
        else:
            await self.queue.put(mydata)
            self.user_waiting.add(token)
            return None

    async def failed_match(self, op: str):
        match = self.match_ready.pop(op, None)
        return match is not None


# globalMatchQueue: asyncio.Queue[WebSocket] = asyncio.Queue()


# @api.route('/ws/matchqueue', websocket=True)
# async def matchqueue(ws: WebSocket):
#     await ws.accept()
#     preq = CheckToken()
#     preq.ParseFromString(await ws.receive_bytes())
#     if backuser.getUserId(preq.token) is None:
#         await ws.send_bytes(MultiGameID(success=False).SerializeToString())
#         await ws.close()
#         return
#     presp = MultiGameID(success=True, gameid=uuid.uuid4().hex)
#     prespContext = presp.SerializeToString()
#     while not globalMatchQueue.empty():
#         opponent = await globalMatchQueue.get()
#         print(opponent.client)
#         try:
#             await opponent.send_bytes(prespContext)
#             print('send data')
#         except Exception as e:
#             print('error ws matchqueue', e)
#             pass
#         else:
#             print('ws matchqueue success')
#             await opponent.close()
#             await ws.send_bytes(prespContext)
#             await ws.close()
#             break
#     else:  # only when while is NOT terminated with break or return
#         print('ws matchqueue put')
#         await globalMatchQueue.put(ws)
#         sleep(120)
#         print('sleep done')
