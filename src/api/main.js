import axios from 'axios';
import Url from 'browser-url';
import configs from '../configs';
import * as vars from '../app/vars';
import {
  ERROR_CODE_HINT,
  ERROR_CODE_UNKNOW,
  AppError,
} from '../classes';

const apiBase = configs.API_P2P_URL;
const timeout = 10000;

function cunstructUrl(action) {
  const sessionId = vars.getSessionId();
  const url = new Url(`${apiBase}${action}`);
  if (sessionId) {
    url.addQuery('sessionId', sessionId);
  }
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

export default function doRequest(apiName, params) {
  return new Promise((resolve, reject) => {
    async function request() {
      let res;
      // 构造请求的url
      const url = cunstructUrl(apiName);
      // 构造参数
      const requestBody = cunstructParams(params);
      try {
        // 请求发起
        res = await axios.post(url, requestBody, {
          timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        res = res.data;
        // 取code
        const code = res.StatusCode === undefined ? res.statusCode : res.StatusCode;
        // 请求成功返回
        if (code === 0) {
          resolve(res);
          return;
        }

        // 服务端未知错误用户弹框
        if (code === -1) {
          reject(new AppError(res.statusMessage, ERROR_CODE_HINT));
          return;
        }

        // session过期或者失效
        if (code === 402 || code === 401) {
          await vars.getStore().dispatch('renew');
          request();
          //   console.log('after renew...', res);
          //   resolve(await request());
          return;
        }

        // 用户未登录
        if (code === 403) {
          vars.getStore().commit('LOGOUT_USER');
          reject(new AppError('need login...', code));
          return;
        }

        // 服务端超时，服务端在向其他服务（例如：账户中心）请求数据时超时
        if (code === 405) {
          reject(new AppError('server side timeout', code));
          return;
        }

        // 账户被锁定
        if (code === 408) {
          reject(new AppError('locked', code));
          return;
        }
        reject(new AppError(res.message || 'common error', code));
        return;
      } catch (err) {
        reject(new AppError(err.message, ERROR_CODE_UNKNOW));
        return;
      }
    }
    return request();
  });
}
