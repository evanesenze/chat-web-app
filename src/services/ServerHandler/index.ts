import { connect, Socket } from 'socket.io-client';
import axios from 'axios';

class ServerHandler {
  private serverUrl = 'http://91.191.236.14:1600/';
  private socketUrl = 'ws://91.191.236.14:1600/';
  //   private socket: Socket;

  constructor() {
    // this.socket = connect(this.socketUrl);
    // this.socket.on('connect', () => {
    //   console.log(this.socket);
    // });
    // this.socket.emit('');
  }

  private async execute(uri: string, config?: RequestInit) {
    return fetch(this.serverUrl + uri, config)
      .then(async (res) => {
        // res.text().then(console.log);
        if (res.status === 200) return { ok: true, response: await res.json() };
        else if (res.status === 204) return { ok: true, response: {} };
        return { ok: false, ...(await res.json()) };
      })
      .catch((error) => ({ ok: false, error: error.response?.data ?? error.message }));
  }

  public login() {
    const config: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: 'test', password: '123123' }),
    };
    return fetch('http://91.191.236.14:1600/api/auth/login/', {
      body: JSON.stringify({ login: 'test', password: '123123' }),
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'access-control-expose-headers': 'Set-Cookie' },
    });
    // return axios.post('http://91.191.236.14:1600/api/auth/login/', JSON.stringify({ login: 'test', password: '123123' }), {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // });
  }

  public async getProfile() {
    // const r = axios.create({
    //   withCredentials: true,
    // });
    const res = await fetch(this.serverUrl + 'api/profile', {
      method: 'GET',
      //   mode: 'no-cors',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   headers: { Cache: 'no-cache' },
      credentials: 'same-origin',
    });
    // const res2 = axios.get(this.serverUrl + 'api/profile', { withCredentials: true, headers: { Accept: '*/*' } }).catch(console.log);
    const j = await res.text();
    console.log(j);
    // return axios.get(this.serverUrl + 'api/profile', { withCredentials: true, headers: { Accept: '*/*' } }).catch(console.log);
    // const config: RequestInit = {
    //   method: 'GET',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   mode: 'no-cors',
    //   //   credentials: 'include',
    //   //   cache: 'force-cache',
    //   // body: JSON.stringify({ login: 'test', password: '123123' }),
    // };
    // return this.execute('api/profile', config);
  }
}

export { ServerHandler };
