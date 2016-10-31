import axios from 'axios';
import Url from 'browser-url';
import configs from '../configs';
import * as vars from '../app/vars';

const apiBase = configs.API_P2P_URL;
const timeout = 10000;

function cunstructUrl(action) {
  const sessionId = vars.getSessionId();
  const url = new Url(`${apiBase}${action}`);
  url.addQuery('sessionId', sessionId);
  return url.format();
}

function cunstructParams(params) {
  const sessionId = vars.getSessionId();
  const result = params || {};
  if (sessionId) {
    result.sessionId = sessionId;
  }
  return JSON.stringify(result);
}

export default async function doRequest(apiName, params) {
  return new Promise((resolve, reject) => {
    async function request() {
      let res;
      // 构造请求的url
      const url = cunstructUrl(apiName);
      // 构造参数
      const requestBody = cunstructParams(params);
      try {
        debugger;
        // 请求发起
        res = await axios.post(url, requestBody, {
          timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // 取code
        const code = res.StatusCode === undefined ? res.statusCode : res.StatusCode;

        // 服务端未知错误用户弹框
        if (code === -1) {
          reject(new Error(vars.ERROR_CODE_HINT, res.statusMessage));
        }

        // session过期或者失效
        if (code === 402 || code === 401) {
          await vars.getStore().dispatch('renew');
          resolve(await request());
        }

        // 用户未登录
        if (code === 403) {
          vars.getStore().commit('LOGOUT_USER');
          reject(new Error(code, 'need login...'));
        }

        // 服务端超时，服务端在向其他服务（例如：账户中心）请求数据时超时
        if (code === 405) {
          reject(new Error(code, 'server side timeout'));
        }

        // 账户被锁定
        if (code === 408) {
          reject(new Error(code, 'locked'));
        }

        resolve(res);
      } catch (err) {
        reject(new Error(vars.ERROR_CODE_UNKNOW, err.description));
      }
    }
    return request();
  });
}
