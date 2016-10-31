import Url from 'browser-url';

const url = new Url(location.href);


// 当前url query string 反序列化后转换成的对象
export const queryStrings = url.query;

/**
 * 获取单个queryString的值
 * @param  {String} name 参数名
 * @return {String}      参数值
 */
export function request(name) {
  return queryStrings[name.toLowerCase()];
}

// 所处的应用，默认M站 LiCai
export const app = request('app') || 'LiCai';

// 当前渠道，默认M站 LianLian.Mobile
export const channel = request('channel') || 'LianLian.Mobile';

// 外壳应用的版本
export const version = request('appVersion');

// 从那个应用引导而来
export const from = request('from');

// 平台，目前默认 Hybrid
export const platform = 'Hybrid';

// 环境参数 1:测试环境 0:生产换进
export const env = request('env') || '0';

// export const inviterMobile = request('inviterMobile');

// 渠道后缀
const channelSuffix = channel.split('.')[1] || '';

// 是否M站渠道
export const isMobileSite = channelSuffix.toLowerCase() === 'mobile';

// 是否微信渠道
export const isWeChat = channelSuffix.toLowerCase() === 'wechatoa';

// 是否在公司各客户端内
export const isNativeApp = !isMobileSite && !isWeChat;

// 是否在P2P客户端内
export const isP2PApp = isNativeApp && app.toLowerCase() === 'licai';

// 是否生产环境
export const isProduction = env === '0';
