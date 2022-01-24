from __future__ import annotations
import responder
from responderd import Request, Response

import app.usercontrol as backuser
import app.battlecontrol as backbattle
from protobuf import *  # noqa

api = responder.API(
    static_dir='./static',
    templates_dir='./static',
    cors=True,
    cors_params={
        'allow_origins': ['*'],
        'allow_methods': ['*'],
        'allow_headers': ['*'],
    }
)


@api.route('/api/login')
async def login(req: Request, resp: Response):
    preq = Login()
    preq.ParseFromString(await req.content)
    new_token = backuser.login(preq.username, preq.password)
    presp = RespToken()
    presp.success = False
    if new_token is not None:
        presp.success = True
        presp.token = new_token
    resp.content = presp.SerializeToString()


@api.route('/api/signup')
async def signup(req: Request, resp: Response):
    preq = Signup()
    preq.ParseFromString(await req.content)
    new_token = backuser.signup(preq.username, preq.password)
    presp = RespToken()
    presp.success = False
    if new_token is not None:
        presp.success = True
        presp.token = new_token
    resp.content = presp.SerializeToString()


@api.route('/api/checktoken')
async def checktoken(req: Request, resp: Response):
    preq = CheckToken()
    preq.ParseFromString(await req.content)
    presp = RespSuccess()
    presp.success = backuser.getUserId(preq.token) is not None
    resp.content = presp.SerializeToString()


@api.route('/api/getuserdata')
async def getuserdata(req: Request, resp: Response):
    preq = CheckToken()
    preq.ParseFromString(await req.content)
    presp = UserData()
    userData = backuser.getUserData(backuser.getUserId(preq.token))
    if userData is not None and 'userName' in userData:
        presp.success = True
        presp.username = userData['userName']
    else:
        presp.success = False
    resp.content = presp.SerializeToString()


@api.route('/api/createbattlelog')
async def createbattlelog(req: Request, resp: Response):
    preq = CreateBattleLog()
    preq.ParseFromString(await req.content)
    presp = RespSuccess()
    if preq.isSingleMode:
        presp.success = backbattle.createSingleBattleLog(
            preq.battleToken, preq.mypeer, preq.elapsedms)
    else:  # preq.HasField('meWinner') or preq.HasField('isDraw'): # multi battle
        # preq.meWinner will be None (hence False) if preq.HasField('isDraw')
        winner = preq.mypeer if preq.meWinner else preq.oppeer
        loser = preq.mypeer if not preq.meWinner else preq.oppeer
        presp.success = backbattle.createMultiBattleLog(
            preq.battleToken, winner, loser,
            preq.elapsedms, isDraw=bool(preq.isDraw))
    resp.content = presp.SerializeToString()

globalMatchQueue = backbattle.MatchQueue()


@api.route('/api/requestmatch')
async def requestmatch(req: Request, resp: Response):
    preq = RequestBattle()
    preq.ParseFromString(await req.content)
    presp = MultiGameID(success=False)
    if backuser.getUserId(preq.token) is None:
        resp.content = presp.SerializeToString()
        return
    presp = await globalMatchQueue.set_or_match(preq.token, preq.mypeer) or presp
    resp.content = presp.SerializeToString()
    print(presp, end='', flush=True)


@api.route('/api/checkmatch')
async def checkmatch(req: Request, resp: Response):
    preq = CheckToken()
    preq.ParseFromString(await req.content)
    presp = RespSuccess()
    presp.success = not await globalMatchQueue.failed_match(preq.token)
    resp.content = presp.SerializeToString()
    print(presp, end='', flush=True)

if __name__ == "__main__":
    api.run()
