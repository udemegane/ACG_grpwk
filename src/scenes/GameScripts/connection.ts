import axios, { AxiosRequestConfig } from 'axios';
import Peer, { DataConnection } from 'peerjs';
import { Vector3, Quaternion, Ray } from '@babylonjs/core';
import {
  Login,
  RespToken,
  CheckToken,
  UserData,
  Signup,
  MultiGameID,
  RespSuccess,
  RequestBattle,
  WsWrapper,
  PingTime,
  MoveKeys,
} from './protobuf';

const secureConnection = process.env.ACG_PRODUCTION_STAGE === 'production';
const ssl = secureConnection ? 's' : '';
const axiosConfig: AxiosRequestConfig = {
  baseURL: `http${ssl}://${process.env.ACG_BACKSERVER_URL}`,
  timeout: 300000,
  responseType: 'arraybuffer',
  headers: { 'Content-Type': 'application/octet-stream' },
};

const Axios = axios.create(axiosConfig);

Axios.interceptors.request.use(
  (request) => {
    request.data = new Uint8Array(request.data);
    return request;
  },
  (err) => Promise.reject(err)
);

Axios.interceptors.response.use(
  (response) => {
    response.data = new Uint8Array(response.data);
    return response;
  },
  (err) => Promise.reject(err)
);

interface OpCon {
  pos: Vector3;
  dir: Quaternion;
  shots: Array<Ray>;
  hp: number;
  keys: MoveKeys;
}

export class Connection {
  public peer = new Peer();
  public pcon: DataConnection;
  public prec: DataConnection;

  public opponent: OpCon = {
    pos: Vector3.Zero(),
    dir: Quaternion.Zero(),
    shots: [],
    hp: 100,
    keys: {} as MoveKeys,
  };

  public token: string = undefined;
  public validToken = false;
  public static TOKEN_LOCALSTORAGE_NAME = `${process.env.ACG_APP_NAME}-token-key`;

  constructor() {
    this.peer.on('connection', (con) => {
      this.prec = con;
      this.prec.on('open', () => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(`connection started with ${this.prec.peer}`);
        this.prec.on('data', (data: ArrayBuffer) => {
          const req = WsWrapper.decode(new Uint8Array(data));
          const preq = req.e;
          // if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(preq);
          switch (preq.$case) {
            case 'ping':
              console.log(`lag is: ${parseInt(preq.ping.pong, 10) - parseInt(preq.ping.ping, 10)} [ms]`);
              break;
            case 'absPos':
              this.opponent.pos.copyFromFloats(preq.absPos.x, preq.absPos.y, preq.absPos.z);
              break;
            case 'absDir':
              this.opponent.dir.copyFromFloats(preq.absDir.x, preq.absDir.y, preq.absDir.z, preq.absDir.w);
              break;
            case 'newShot':
              this.opponent.shots.push(
                preq.newShot.length > 0
                  ? new Ray(this.o2v(preq.newShot.origin), this.o2v(preq.newShot.direction), preq.newShot.length)
                  : new Ray(this.o2v(preq.newShot.origin), this.o2v(preq.newShot.direction))
              );
              break;
            case 'ishit':
              this.opponent.hp = preq.ishit.remain;
              break;
            case 'keys':
              this.opponent.keys = preq.keys;
              break;
            default:
              console.log('Wrong Protobuf Data');
          }
        });
        // check lag
        const checkLag: PingTime = { ping: Date.now().toString(), pong: '' };
        this.prec.send(WsWrapper.encode({ e: { $case: 'ping', ping: checkLag } }).finish());
      });
    });
  }

  public createConnection(oppeer: string) {
    return new Promise((resolve) => {
      this.pcon = this.peer.connect(oppeer, { serialization: 'protobuf' });
      this.pcon.on('open', () => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(`connection started with ${this.pcon.peer}`);
        this.pcon.on('data', (data: ArrayBuffer) => {
          const req = WsWrapper.decode(new Uint8Array(data));
          const preq = req.e;
          // if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(preq);
          switch (preq.$case) {
            case 'ping':
              if (!preq.ping.pong) {
                this.pcon.send(
                  WsWrapper.encode({
                    e: {
                      $case: 'ping',
                      ping: {
                        ping: preq.ping.ping,
                        pong: Date.now().toString(),
                      },
                    },
                  }).finish()
                );
              }
              break;
            default:
              console.log('Wrong Protobuf Data');
          }
        });
        resolve();
      });
    });
  }

  public async login(p: Login) {
    return Axios.post('/api/login', Login.encode(p).finish())
      .then((response) => {
        const resp = RespToken.decode(response.data);
        if (resp.success) this.setValidToken(resp.token);
        return resp;
      })
      .catch((e) => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(e);
        return { success: false } as RespToken;
      });
  }

  public async signup(p: Signup) {
    return Axios.post('/api/signup', Signup.encode(p).finish())
      .then((response) => {
        const resp = RespToken.decode(response.data);
        if (resp.success) this.setValidToken(resp.token);
        return resp;
      })
      .catch((e) => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(e);
        return { success: false } as RespToken;
      });
  }

  public async loginWithToken(p: CheckToken) {
    return Axios.post('/api/getuserdata', CheckToken.encode(p).finish())
      .then((response) => {
        const resp = UserData.decode(response.data);
        if (resp.success) this.setValidToken(p.token);
        return resp;
      })
      .catch((e) => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(e);
        return { success: false } as UserData;
      });
  }

  private setValidToken(token: string) {
    this.token = token;
    this.validToken = true;
  }

  public isValid() {
    return this.validToken;
  }

  public async multiQueue(maxWaitTime: number): Promise<MultiGameID> {
    if (!this.validToken) return { success: false } as MultiGameID;
    const req: RequestBattle = { token: this.token, mypeer: this.peer.id };
    return new Promise((resolve, reject) => {
      const intervalTime = 2000; // ms
      let counter = 0;
      const interval = setInterval(async () => {
        const response = await Axios.post('/api/requestmatch', RequestBattle.encode(req).finish());
        const resp = MultiGameID.decode(response.data);
        if (resp.success) {
          clearInterval(interval);
          resolve(resp);
        } else if (counter * intervalTime >= maxWaitTime * 1000) {
          clearInterval(interval);
          reject();
        }
        console.log(counter * intervalTime, maxWaitTime * 1000);
        counter += 1;
      }, intervalTime);
    });
  }

  public checkMulti() {
    if (!this.validToken) return { success: false } as RespSuccess;
    const req: CheckToken = { token: this.token };
    return Axios.post('/api/checkmatch', CheckToken.encode(req).finish()).then((response) =>
      RespSuccess.decode(response.data)
    );
  }

  private v2o(v: Vector3) {
    return { x: v.x, y: v.y, z: v.z };
  }

  private q2o(q: Quaternion) {
    return { x: q.x, y: q.y, z: q.z, w: q.w };
  }

  private o2v(obj) {
    return new Vector3(obj.x, obj.y, obj.z);
  }

  private o2q(obj) {
    return new Quaternion(obj.x, obj.y, obj.z, obj.w);
  }

  public sendMyAbsPos(absPos: Vector3) {
    this.pcon.send(WsWrapper.encode({ e: { $case: 'absPos', absPos: this.v2o(absPos) } }).finish());
  }

  public sendMyAbsDir(absDir: Quaternion) {
    this.pcon.send(WsWrapper.encode({ e: { $case: 'absDir', absDir: this.o2q(absDir) } }).finish());
  }

  public sendNewShot(origin: Vector3, direction: Vector3, length: number) {
    this.pcon.send(
      WsWrapper.encode({
        e: { $case: 'newShot', newShot: { origin: this.v2o(origin), direction: this.v2o(direction), length } },
      }).finish()
    );
  }

  public sendHp(hp: number) {
    this.pcon.send(WsWrapper.encode({ e: { $case: 'ishit', ishit: { remain: hp } } }).finish());
  }

  public sendMoveKeys(w: boolean, a: boolean, s: boolean, d: boolean, shift: boolean) {
    this.pcon.send(WsWrapper.encode({ e: { $case: 'keys', keys: { w, a, s, d, shift } } }).finish());
  }
}
