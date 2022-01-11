import axios, { AxiosRequestConfig } from 'axios';
import { Login, RespToken, CheckToken, UserData } from '../../../protobuf';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.ACG_BACKSERVER_URL,
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

export class Connection {
  // public static p2pcon: Any;

  public token: string = undefined;
  public static TOKEN_LOCALSTORAGE_NAME = `${process.env.ACG_APP_NAME}-token-key`;

  public startConnectionByName(name: string) {
    // this.p2pcon.searchConnection(name);
  }

  public async login(p: Login) {
    return Axios.post('/api/login', Login.encode(p).finish())
      .then((response) => {
        const resp = RespToken.decode(response.data);
        if (resp.success) this.token = resp.token;
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
        return UserData.decode(response.data);
      })
      .catch((e) => {
        if (process.env.ACG_PRODUCTION_STAGE !== 'production') console.log(e);
        return { success: false } as UserData;
      });
  }
}
