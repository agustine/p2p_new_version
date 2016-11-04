import {
  isIOS,
  iosVersion,
} from './ua';

let uniqueId = 1;

const bridge = {};

const generateCallbackName = () => {
  const callbackName = `ar_${uniqueId += 1}_${new Date().getTime()}`;
  return callbackName;
};

function parseCallbackArgs(args, resultParse) {
  let result = args.slice();
  if (resultParse) {
    result = resultParse(args);
  }
  return result;
}

if (!isIOS) {
  const ANDROID_NAMESPACE = 'proxyBridge';
  const functionRoot = window[ANDROID_NAMESPACE] || {};

  bridge.callHandler = (handlerName, data, resultParse) => new Promise((resolve) => {
    const callbackName = generateCallbackName();
    window[callbackName] = function callback(...args) {
      const result = parseCallbackArgs(args, resultParse);
      resolve(result);
      window[callbackName] = undefined;
    };
    console.log(callbackName);
    const handler = functionRoot[handlerName];
    data = data || {};
    data.callback = callbackName;
    if (handler && typeof handler === 'function') {
      handler.call(functionRoot, JSON.stringify(data));
    }
  });
} else if (!window.WebViewJavascriptBridge) {
  let messagingIframe;
  const sendMessages = [];

  const CUSTOM_PROTOCOL_SCHEME = 'bridge';
  const SEND_URL = JSON.stringify({
    receive: 'WebViewJavascriptBridge.getMessage',
    callback: 'WebViewJavascriptBridge.runCallback',
  });

  const responseCallbacks = {};

  const createQueueReadyIframe = (doc, url) => {
    url = url || `${CUSTOM_PROTOCOL_SCHEME}://{}`;
    if (iosVersion >= 10) {
      location.href = url;
      return;
    }
    if (messagingIframe) {
      doc.documentElement.removeChild(messagingIframe);
    }
    messagingIframe = doc.createElement('iframe');
    messagingIframe.style.display = 'none';
    messagingIframe.src = url;
    doc.documentElement.appendChild(messagingIframe);
  };

  const callHandler = bridge.callHandler = (handlerName, data, resultParse) =>
    new Promise((resolve) => {
      const requestId = generateCallbackName();
      const message = {
        id: requestId,
        command: handlerName,
        data: (data || {}),
      };
      if (responseCallbacks) {
        responseCallbacks[requestId] = function callback(...args) {
          const result = parseCallbackArgs(args, resultParse);
          resolve(result);
          responseCallbacks[requestId] = undefined;
        };
      }
      sendMessages.push(message);
      createQueueReadyIframe(document, `${CUSTOM_PROTOCOL_SCHEME}://${SEND_URL}`);
    });

  const getMessage = () => {
    const message = sendMessages.shift();
    if (!message) {
      return '';
    }
    return JSON.stringify(message);
  };

  const runCallback = (res) => {
    let callback;
    if (!res) {
      return;
    }
    if (res === res.toString()) {
      res = JSON.parse(res);
    }

    if (res && res.id && (res.id in responseCallbacks)) {
      callback = responseCallbacks[res.id];
      callback(res.data);
    }
  };
  window.WebViewJavascriptBridge = {
    getMessage,
    runCallback,
    callHandler,
  };
}


export default {};

export function getUserToken(oldToken) {
  const resultParse = (args) => {
    let result = {
      token: args[0],
      intType: args[1],
      os: args[2],
      deviceToken: args[3],
      version: args[4],
      packageName: args[5],
      channel: args[6],
    };
    if (isIOS) {
      result = args[0];
    }
    return result;
  };
  const params = {
    token: oldToken,
  };
  return bridge.callHandler('getUserToken', params, resultParse);
}

export function goBack() {
  bridge.callHandler('back');
}

export function popLogin() {
  const resultParse = (args) => {
    let result = {
      token: args[0],
      intType: args[1],
    };
    if (isIOS) {
      result = args[0];
    }
    return result;
  };
  return bridge.callHandler('userLogin', {}, resultParse);
}

export function openPage(url, token, header, footerBar, title) {
  bridge.callHandler('openPage', {
    url,
    token,
    header,
    footerBar,
    title,
  });
}

export function doShare(url, pic, title, desp) {
  bridge.callHandler('doShare', {
    url,
    pic,
    title,
    desp,
  });
}

export function sendTrackInfo(pageCode, moduleId) {
  bridge.callHandler('sendTrackInfo', {
    pageCode,
    moduleId,
  });
}

export function getCoords() {
  const resultParse = args => args[0];
  return bridge.callHandler('getCoords', {}, resultParse);
}

export function addToClipBoard(str) {
  const resultParse = args => args[0];
  return bridge.callHandler('addToClipBoard', {
    content: str,
  }, resultParse);
}
