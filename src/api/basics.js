import axios from 'axios';
import Url from 'browser-url';
import configs from '../configs';
import * as vars from '../app/vars';

const cunstructUrl = Symbol('cunstructUrl');
const cunstructUrlWithSession = Symbol('cunstructUrlWithSession');
const cunstructParams = Symbol('cunstructParams');
const success = Symbol('success');
const httpError = Symbol('httpError');

class BasicsApi {
  constructor(apiRoot, timeout) {
    if (!apiRoot) {
      throw new Error('Expected api base');
    }
    this.apiBase = apiRoot;
    this.timeout = timeout;
  }

  [cunstructUrl](action) {
    const apiBase = this.apiBase;
    const url = `${apiBase}${action}`;
    return url;
  }

  [cunstructUrlWithSession](action) {
    const sessionId = vars.getSessionId();
    const url = new Url(this[cunstructUrl](action));
    url.addQuery('sessionId', sessionId);
    return url.format();
  }

  static[cunstructParams](params) {
    const sessionId = vars.getSessionId();
    const result = params || {};
    if (sessionId) {
      result.sessionId = sessionId;
    }
    return result;
  }

  static[success](res, options) {
    const code = res.StatusCode === undefined ? res.statusCode : res.StatusCode;
    if (code === 402 || code === 401) {
      // 重新获取session
      return;
    }

    if (code === 403) {
      // 状态重置为未登录
      // return;
    }

    if (code === 405) {
      // 服务端请求超时
      // return;
    }

    if (code === 408) {
      // 账户被锁定
      // return;
    }

    if (options.callbacks && options.callbacks[code.toString()]) {
      const callback = options.callbacks[code.toString()];
      if (typeof callback === 'function') {
        callback(res);
      }
    }

    if (options.complete) {
      options.complete(res);
    }
  }

  static[httpError]() {

  }

  get(apiName, options) {
    async function request() {
      let res;
      if (options.beforeSend) {
        options.beforeSend.call();
      }
      try {
        res = await axios.get(this[cunstructUrl](apiName), {
          params: BasicsApi[cunstructParams](options.params),
          timeout: this.timeout,
        });
        BasicsApi[success](res.data, options);
      } catch (err) {
        BasicsApi[httpError](err);
      } finally {
        if (options.complete) {
          options.complete.call();
        }
      }
    }

    request.call(this);
  }

  post(apiName, options) {
    async function request() {
      let res;
      if (options.beforeSend) {
        options.beforeSend.call();
      }
      try {
        res = await axios.post(this[cunstructUrl](apiName),
          JSON.stringify(BasicsApi[cunstructParams](options.params)), {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        BasicsApi[success](res.data, options);
      } catch (err) {
        BasicsApi[httpError](err);
      } finally {
        if (options.complete) {
          options.complete.call();
        }
      }
    }

    request.call(this);
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
