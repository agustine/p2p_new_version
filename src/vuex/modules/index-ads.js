import {
  RECEIVE_INDEX_ADS,
} from '../mutation-types';
import {
  commonApi,
} from '../../api/basics';

const state = {
  data: [],
};

const mutations = {
  [RECEIVE_INDEX_ADS](s, ads) {
    s.data = ads;
  },
};

/**
 * 获取对应位置的广告集合数组
 * @param  {[type]} adState  store
 * @param  {[type]} position 广告位置
 * @return {[type]}          广告数组
 */
function positionFilter(adState, position) {
  const result = adState.data.find(group => group.adPosition === position);
  if (!result) {
    return [];
  }
  return [...result.ads];
}

const getters = {
  bannerAds(s) {
    return positionFilter(s, 'Home_Banner');
  },
  marqueeAds(s) {
    return positionFilter(s, 'Home_Notice');
  },
  smallBannerAds(s) {
    return positionFilter(s, 'SmallBanner');
  },
};

const actions = {
  loadAdData({
    commit,
  }) {
    commonApi.get('AdGroups', {
      params: {
        application: 'LiCai',
        channel: 'LianLian.Hybrid',
        version: '1.0.0',
        code: 'Home',
      },
      callbacks: {
        200: function success(res) {
          commit(RECEIVE_INDEX_ADS, res.data.items);
        },
      },
      //   beforeSend: function beforeSend() {},
      //   complete: function complete() {},
    });
  },
};


export default {
  state,
  mutations,
  getters,
  actions,
};
