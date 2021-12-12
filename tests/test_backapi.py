from google.protobuf import message, json_format
import pytest
from responder.api import API
import run as service
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


def test_try_login_or_signup_if_not_exist(api: API):
    preq = json_format.ParseDict(test_user, Login(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/login', preq).content)
    if not presp.success:
        preq = json_format.ParseDict(test_user, Signup(), ignore_unknown_fields=True)
        presp.ParseFromString(post(api, '/api/signup', preq).content)
    assert presp.success


def test_signup_already_exists(api: API):
    preq = json_format.ParseDict(test_user, Signup(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/signup', preq).content)
    assert not presp.success


def test_login_already_exists(api: API):
    preq = json_format.ParseDict(test_user, Login(), ignore_unknown_fields=True)
    presp = RespToken()
    presp.ParseFromString(post(api, '/api/login', preq).content)
    assert presp.success
