import axios from 'axios';
import { Login, RespToken } from '../../../protobuf/compiled_pb2';

const axiosConfig = {
  baseURL: process.env.VUE_APP_PUBLICPATH,
  timeout: 300000,
};

const Axios = axios.create(axiosConfig);

export class Connection {
  public static p2pcon: Any;

  public static startConnectionByName(name: string) {
    this.p2pcon.searchConnection(name);
  }

  public static async login(p: Login) {
    return Axios.post('/api/login', Login.toBinary(p))
      .then((response) => {
        const resp = RespToken.fromBinary(response.data);
        console.log(resp);
        return resp;
      })
      .catch((e) => process.env.ACG_PRODUCTION_STAGE !== 'production' && console.log(e));
  }
}
