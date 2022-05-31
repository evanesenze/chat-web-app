import React, { useEffect, useState } from 'react';
import { ServerHandler } from './services/ServerHandler';
import { useCookies, withCookies } from 'react-cookie';

function App() {
  // const [cookies] = useCookies();
  const [s] = useState(new ServerHandler());

  const doLogin = async () => {
    if (!s) return;
    // const s = new ServerHandler();
    const res = await s.login();
    // console.log(res);
    // if (res.ok) console.log(await s.getProfile());
  };

  useEffect(() => {
    // console.log(cookies);
    // console.log(document.cookie);
    doLogin();
    // console.log(1);
  }, []);

  return <div>123</div>;
}

export default withCookies(App);
