import {
  memberApi,
} from '../../api/basics';
import {
  version,
  channel,
} from '../../utils/env';
import {
  UPDATE_SESSION_ID,
  UPDATE_USER_INFO,
  LOGOUT_USER,
} from '../mutation-types';
import ls from '../ls';
import * as vars from '../../app/vars';

const application = 'LiCai';
const deviceKind = 'Mobile';

const localSession = ls('LOCAL_KEY_SESSION_3');

const state = {
  sessionId: '', // 联连的用户token（sessionId）
  version: '', // 联连的版本号

  isLogin: false, // 是否已登录

  canWithdraw: false, // 是否可提现

  userId: 0, // 用户id
  loginname: '', // 用户名
  balamount: 0.00, // 账户余额（可用余额）
  investamount: 0.00, // 投资总额（资金总额）
  borrowamount: 0.00, // 借款总额
  isrealname: 0, // 实名认证状态 0-未认证，1-已认证，2-审核中
  authstat: '', // 实名认证状态 未认证,审核中,已认证
  roles: 0, // 用户角色 1-投资者 2-借款者
  repayamount: '', // 待还金额
  frozenamount: 0, // 冻结金额
  actualloanamount: '', // 实到借款金额
  principal: '', // 待收本金
  interest: '', // 待收利息
  phonenumber: '', // 手机号码
  payaccountstat: '', // 支付公司注册状态名称
  payaccountcode: 0, // 第三方支付账号状态：1已注册,0未注册
  websitename: '', // 支付公司网站
  isnew: true, // 是否为新手
  email: '', // 邮件
  totalEarnedInterest: 0.00, // 总共赚取利息（累计收益）
  totalEarnedCredit: 0.00, // 总联豆收益
  totalCredit: 0.00, // 可用联豆总数
  todayIncome: 0.00, // 今日收益
  nextIncome: 0.00, // 回款
  nextTermDays: 0, // 下一笔收益天数
  realname: '', // 实名姓名
  idcardnumber: '', // 身份证号
  payAccount: '', // 汇付账号
  chinapnrPayAccount: '', // 汇付支付号
  couponUsedCount: 0, // 已激活红包的数量
  unusedGiftMoneyCount: 0, // 未使用红包数
  unReadInnerMailCount: 0, // 未读消息数量
  portrait: '', // 个人头像
  raiseInvestCount: 0, //正在筹款中投资数量
};

const actions = {
  anonymousSignIn({
    commit,
    // dispatch,
  }) {
    const requestBody = {
      application,
      kind: 'AnonymousSignIn',
      device: {
        kind: deviceKind,
        app: application,
        appVersion: version,
        channel,
      },
    };

    return new Promise((resolve) => {
      memberApi.post('Members/SignedIn', {
        params: requestBody,
        callbacks: {
          200: function success(res) {
            const sessionId = res.data.sessionId;
            commit(UPDATE_SESSION_ID, sessionId);

            const storage = {
              sessionId,
            };
            localSession.set(storage);

            resolve();
          },
        },
      });
    });
  },

  initMember({
    commit,
    dispatch,
  }) {
    const storage = localSession.get();

    // 从本地存储
    if (storage && storage.sessionId) {
      commit(UPDATE_SESSION_ID, storage.sessionId);
      return new Promise((resolve) => {
        resolve();
      });
    }

    return dispatch('anonymousSignIn');
  },

  reloadUserInfo({
    commit,
  }) {
    console.log('reload user info');
    commit(UPDATE_USER_INFO, {});
  },

  renew({
    commit,
    dispatch,
  }) {
    let sessionId = vars.getSessionId();
    const requestBody = {
      application,
      sessionId,
      kind: 'Renew',
      device: {
        kind: deviceKind,
        app: application,
        appVersion: version,
        channel,
      },
    };
    return new Promise((resolve) => {
      memberApi.post('Members/SignedIn', {
        params: requestBody,
        callbacks: {
          200: function success(res) {
            sessionId = res.data.sessionId;
            commit(UPDATE_SESSION_ID, sessionId);

            const storage = {
              sessionId,
            };
            localSession.set(storage);
          },
          412: function unknowSession() {
            dispatch('anonymousSignIn').then(resolve);
          },
        },
      });
    });
  },
};

const mutations = {
  [UPDATE_SESSION_ID](s, sessionId) {
    s.sessionId = sessionId;
    // vars.setSessionId(sessionId);
  },
  [UPDATE_USER_INFO](s, userInfo) {
    if (!userInfo) {
      return;
    }
    s = Object.assign(s, userInfo);
    s.isLogin = true;
  },
  [LOGOUT_USER](s) {
    s.isLogin = false;
  },
};

const getters = {
  sessionId(s) {
    return s.sessionId;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
