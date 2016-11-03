import axios from 'axios';
import Url from 'browser-url';
import configs from '../configs';
import * as vars from '../app/vars';
import {
  ERROR_CODE_UNKNOW,
  AppError,
} from '../classes';

const constructUrl = Symbol('constructUrl');
const constructUrlWithSession = Symbol('constructUrlWithSession');
const request = Symbol('request');

function constructParams(params) {
  const sessionId = vars.getSessionId();
  const result = params || {};
  if (sessionId) {
    result.sessionId = sessionId;
  }
  return result;
}

class BasicsApi {
  constructor(apiRoot, timeout) {
    if (!apiRoot) {
      throw new Error('Expected api base');
    }
    this.apiBase = apiRoot;
    this.timeout = timeout;
  }

  [constructUrl](action) {
    const apiBase = this.apiBase;
    const url = `${apiBase}${action}`;
    return url;
  }

  [constructUrlWithSession](action) {
    const sessionId = vars.getSessionId();
    const url = new Url(this[constructUrl](action));
    if (sessionId) {
      url.addQuery('sessionId', sessionId);
    }
    return url.format();
  }

  [request](apiName, method, options) {
    const thisObj = this;
    return new Promise((resolve, reject) => {
      async function requestProcess() {
        let res;
        try {
          if (['get', 'delete'].includes(method.toLowerCase())) {
            res = await axios({
              method,
              url: thisObj[constructUrl](apiName),
              params: constructParams(options.params),
              timeout: thisObj.timeout,
            });
          } else {
            res = await axios({
              method,
              url: thisObj[constructUrl](apiName),
              data: JSON.stringify(constructParams(options.params)),
              timeout: thisObj.timeout,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }

          res = res.data;
          // 获取返回状态
          const code = res.StatusCode === undefined ? res.statusCode : res.StatusCode;
          // 请求成功返回
          if (code === 200) {
            resolve(res);
            return;
          }

          // session过期或者失效
          if (code === 402 || code === 401) {
            await vars.getStore().dispatch('renew');
            request();
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
        }
      }

      requestProcess();
    });
  }

  get(apiName, options) {
    return this[request](apiName, 'get', options);
  }

  post(apiName, options) {
    return this[request](apiName, 'post', options);
  }
}


// url root
const commonApiBase = configs.API_BASICS_URL;
const memberApiBase = configs.API_MEMBERSHIP_URL;

// timeout
const timeout = 10000;

export const commonApi = new BasicsApi(commonApiBase, timeout);
export const memberApi = new BasicsApi(memberApiBase, timeout);

export default {
  commonApi,
  memberApi,
};
