from typing import Any, Dict, List, Set
from datetime import datetime


class Capp:
    def __init__(self, capp_manager, ws) -> None:
        self.capp_manager = capp_manager
        self.ws = ws
        self.isClosed = False
        self.game_id = None

    def set_gameID(self, game_id: int) -> bool:
        self.game_id = game_id
        return self.game_id in self.capp_manager.reserved

    async def create(self, data):
        await self.update(data, False)
        self.id = await self.capp_manager.joinGame(self.game_id, self)
        if self.id is False:
            return {'name': 'login', 'success': 0, 'msg': 'gameID not found'}
        else:
            await self.capp_manager.checkGameStart(self.game_id)
            return {'name': 'login', 'success': 1, 'player_id': self.id}

    async def update(self, data, send_data: bool = True) -> None:
        self.location = data['location']
        self.hp = data['hp']
        self.name = data['name']
        self.sleep_bullet = data['sleep_bullet']
        self.sleep_wall = data['sleep_wall']
        self.character = data['Character']
        if send_data:
            await self.loadEnemies(self.capp_manager.getEnemies(self.game_id))

    async def addBullet(self, data) -> None:
        if not self.isClosed:
            await self.capp_manager.sendBullet(self.game_id, self.id, data)

    async def sendBullet(self, data) -> None:
        if not self.isClosed:
            await self.ws.send_json({
                'name': 'newBullet',
                'data': data
            })

    async def addWall(self, data) -> None:
        if not self.isClosed:
            await self.capp_manager.sendWall(self.game_id, self.id, data)

    async def sendWall(self, data) -> None:
        if not self.isClosed:
            await self.ws.send_json({
                'name': 'newWall',
                'data': data
            })

    def dead(self) -> None:
        self.isClosed = True

    def close(self) -> None:
        self.capp_manager.close(self.game_id)

    def tojson(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'location': self.location,
            'hp': self.hp,
            'name': self.name,
            'sleep_bullet': self.sleep_bullet,
            'sleep_wall': self.sleep_wall,
            'Character': self.character
        }

    async def loadEnemies(self, enemies) -> None:
        if not self.isClosed:
            await self.ws.send_json({
                'name': 'updateEnemies',
                'data': [p.tojson() for p in enemies if p.id != self.id]
            })

    async def startTime(self, start_time: int) -> None:
        if not self.isClosed:
            await self.ws.send_json({
                'name': 'startTime',
                'time': start_time
            })


class CappControl:
    ENEMY_NUM = 1

    def __init__(self) -> None:
        self.games: Dict[int, List[Capp]] = dict()
        self.loading: Dict[int, List[Capp]] = dict()
        self.reserved: Set[int] = {1}

    def generateGameID(self) -> int:
        game_id: int = 1
        for i in sorted(self.reserved):
            if i != game_id:
                self.reserved.add(game_id)
                return game_id
            game_id += 1
        self.reserved.add(game_id)
        return game_id

    def createNewGame(self, game_id: int) -> None:
        self.loading[game_id] = []

    async def joinGame(self, game_id: int, client: Capp) -> Any:
        if game_id in self.games:
            return False
        elif game_id not in self.loading:
            self.createNewGame(game_id)
        self.loading[game_id].append(client)
        return len(self.loading[game_id]) - 1

    async def startGame(self, game_id: int) -> None:
        self.games[game_id] = self.loading.pop(game_id)
        current_time = int(datetime.now().timestamp()) + 5
        for p in self.games[game_id]:
            await p.loadEnemies(self.games[game_id])
            await p.startTime(current_time)

    async def checkGameStart(self, game_id: int) -> None:
        if len(self.loading[game_id]) == CappControl.ENEMY_NUM + 1:
            await self.startGame(game_id)

    def close(self, game_id: int) -> None:
        self.loading.pop(game_id, None)
        for p in self.games.pop(game_id, []):
            p.isClosed = True
        self.reserved.discard(game_id)

    def getEnemies(self, game_id: int) -> List[Capp]:
        return self.games[game_id]

    async def sendBullet(self, game_id: int, player_id: int, bullet) -> None:
        for p in self.games[game_id]:
            if p.id != player_id:
                await p.sendBullet(bullet)

    async def sendWall(self, game_id: int, player_id: int, wall) -> None:
        for p in self.games[game_id]:
            if p.id != player_id:
                await p.sendWall(wall)
