const navigator = window.navigator || {};
export const ua = navigator.userAgent || '';

/**
 * 判断当前ua是否匹配对应正则表达式
 * @param  {[type]}     pattern 正则表达式
 * @return {Bealoon}            是否匹配
 */
export function detect(pattern) {
  return (pattern).test(ua);
}

function getIosVersion() {
  const regResult = /(iPhone|iPad|iPod) OS ([\d_]+)/.exec(ua);
  if (!regResult || regResult <= 2) {
    return 0;
  }
  const version = (regResult[2] || '').split('_')[0];
  if (version) {
    return window.parseInt(version);
  }
  return 0;
}

export const isChrome = detect(/webkit\W.*(chrome|chromium)\W/i);

export const isFirefox = detect(/mozilla.*\Wfirefox\W/i);

export const isIE = (navigator.appName === 'Microsoft Internet Explorer') || detect(/\bTrident\b/);

export const isMobile = detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i);

export const isOpera = detect(/opera.*\Wpresto\W/i);

export const isSafari = detect(/webkit\W(?!.*chrome).*safari\W/i);

export const isTablet = detect(/(ipad|android(?!.*mobile)|tablet)/i);

export const isTV = detect(/googletv|sonydtv/i);

export const isWebKit = detect(/webkit\W/i);

export const isAndroid = detect(/android/i);

export const isIOS = detect(/(ipad|iphone|ipod)/i);

export const isIPad = detect(/ipad/i);

export const isIPhone = detect(/iphone/i);

export const isIPod = detect(/ipod/i);

export const isWeChat = detect(/MicroMessenger/i);

export const iosVersion = getIosVersion();
