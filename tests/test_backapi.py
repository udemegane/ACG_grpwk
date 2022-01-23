from typing import Dict, Optional
from google.protobuf import message, json_format
import pytest
from responder.api import API
import run as service
import secrets
import random
from protobuf import *  # noqa


@pytest.fixture
def api():
    return service.api


def post(a: API, url: str, payload: message.Message):
    return a.requests.put(
        url,
        headers={'Content-Type': 'application/protobuf'},
        data=payload.SerializeToString()
    )


test_user = {
    'username': 'test_user',
    'password': 'test_password',
    'token': None
}


def add_user_in_database(api, user_dict: Dict[str, Optional[str]]):
    preq = json_format.ParseDict(user_dict, Login(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/login', preq).content)
    if not presp.success:
        preq = json_format.ParseDict(user_dict, Signup(), ignore_unknown_fields=True)
        presp.ParseFromString(post(api, '/api/signup', preq).content)
    return presp


def test_try_login_or_signup_if_not_exist(api: API):
    presp = add_user_in_database(api, test_user)
    assert presp.success


def test_signup_already_exists(api: API):
    preq = json_format.ParseDict(test_user, Signup(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/signup', preq).content)
    assert not presp.success


def test_login_already_exists_and_get_token(api: API):
    preq = json_format.ParseDict(test_user, Login(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/login', preq).content)
    assert presp.success
    assert isinstance(presp.token, str)
    test_user['token'] = presp.token


def test_login_with_token(api: API):
    preq = json_format.ParseDict(test_user, CheckToken(), ignore_unknown_fields=True)
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/checktoken', preq).content)
    assert presp.success


defaultGameToken = secrets.token_hex()
oppeer = None


def test_add_enemy(api: API):
    presp = add_user_in_database(api, {
        'username': 'enemy',
        'password': 'enemy_password'
    })
    assert presp.success
    assert isinstance(presp.token, str)
    global oppeer
    oppeer = presp.token


# message CreateBattleLog {
#   required string battleToken = 1;
#   oneof winner {
#     bool isSingleMode = 2;
#     bool meWinner = 3;
#     bool isDraw = 4;
#   }
#   required string mypeer = 5;
#   optional string oppeer = 6;
#   required int32 elapsedms = 7;
# }


def test_create_single_battle_log(api: API):
    preq = CreateBattleLog()
    preq.battleToken = defaultGameToken
    preq.isSingleMode = True
    preq.mypeer = test_user['token']
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert presp.success


def test_create_single_battle_log_with_already_registered_battleToken_should_fail(api: API):
    preq = CreateBattleLog()
    preq.battleToken = defaultGameToken
    preq.isSingleMode = True
    preq.mypeer = test_user['token']
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert not presp.success


def test_create_single_battle_log_with_non_existing_user(api: API):
    preq = CreateBattleLog()
    preq.battleToken = secrets.token_hex()
    preq.isSingleMode = True
    preq.mypeer = 'random_invalid_token'
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert not presp.success


def test_create_multi_battle_log_me_winner(api: API):
    preq = CreateBattleLog()
    preq.battleToken = secrets.token_hex()
    preq.meWinner = True
    preq.mypeer = test_user['token']
    assert oppeer is not None
    preq.oppeer = oppeer
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert presp.success


def test_create_multi_battle_log_me_loser(api: API):
    preq = CreateBattleLog()
    preq.battleToken = secrets.token_hex()
    preq.meWinner = False
    preq.mypeer = test_user['token']
    assert oppeer is not None
    preq.oppeer = oppeer
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert presp.success


def test_create_multi_battle_log_draw(api: API):
    preq = CreateBattleLog()
    preq.battleToken = secrets.token_hex()
    preq.isDraw = True
    preq.mypeer = test_user['token']
    assert oppeer is not None
    preq.oppeer = oppeer
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert presp.success


def test_create_multi_battle_log_two_players_same_token_should_fail(api: API):
    preq = CreateBattleLog()
    preq.battleToken = secrets.token_hex()
    preq.meWinner = True
    preq.mypeer = test_user['token']
    preq.oppeer = test_user['token']
    preq.elapsedms = random.randint(100, int(1e5))
    presp = RespSuccess()
    presp.ParseFromString(post(api, '/api/createbattlelog', preq).content)
    assert not presp.success
