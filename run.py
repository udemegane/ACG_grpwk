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


@api.route('/api/createbattlelog')
async def createbattlelog(req: Request, resp: Response):
    preq = CreateBattleLog()
    preq.ParseFromString(await req.content)
    presp = RespSuccess()
    if preq.isSingleMode:
        presp.success = backbattle.createSingleBattleLog(preq.battleToken, preq.myToken, preq.elapsedms)
    else:  # preq.HasField('meWinner') or preq.HasField('isDraw'): # multi battle
        # preq.meWinner will be None (hence False) if preq.HasField('isDraw')
        winner = preq.myToken if preq.meWinner else preq.enemyToken
        loser = preq.enemyToken if not preq.meWinner else preq.myToken
        presp.success = backbattle.createMultiBattleLog(
            preq.battleToken, winner, loser,
            preq.elapsedms, isDraw=bool(preq.isDraw))
    resp.content = presp.SerializeToString()

# capp_manager = backapp.CappControl()

# @api.route('/ws/cappgroup', websocket=True)
# async def cappgroup(ws):
#     player = backapp.Capp(capp_manager, ws)
#     async def login(data):
#         if not player.set_gameID(data['gameID']):
#             return {'name':'login', 'success':0, 'msg':'unknown gameID'}
#         else:
#             return None
#     async def createPlayer(data):
#         return await player.create(data['player'])
#     async def updatePlayer(data):
#         await player.update(data['player'])
#         return None
#     async def newBullet(data):
#         await player.addBullet(data['bullet'])
#         return None
#     async def newWall(data):
#         await player.addWall(data['wall'])
#         return None
#     async def dead(data):
#         player.dead()
#         return None
#     async def call_functions(data):
#         name = data.pop('name')
#         if name == 'login':
#             return await login(data)
#         elif name == 'createPlayer':
#             return await createPlayer(data)
#         elif name == 'updatePlayer':
#             return await updatePlayer(data)
#         elif name == 'newBullet':
#             return await newBullet(data)
#         elif name == 'newWall':
#             return await newWall(data)
#         elif name == 'dead':
#             return await dead(data)
#         return None
#     await ws.accept()
#     try:
#         while True:
#             data = await ws.receive_json()
#             if data['name'] == 'generateGameID':
#                 await ws.send_json({
#                     'name':'newGameID',
#                     'id':capp_manager.generateGameID()
#                 })
#                 break
#             resp_media = await call_functions(data)
#             if resp_media is not None and not player.isClosed:
#                 await ws.send_json(resp_media)
#     except Exception as e:
#         print('websocket error', e.with_traceback(None))
#     finally:
#         if player.game_id is not None:
#             player.close()
#         await ws.close()

if __name__ == "__main__":
    api.run()
