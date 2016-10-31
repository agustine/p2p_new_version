import Vue from 'vue';
import Vuex from 'vuex';
import {
  default as indexAds,
} from './modules/index-ads';
import {
  default as mainView,
} from './modules/main-view';
import {
  default as member,
} from './modules/member';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    member,
    indexAds,
    mainView,
  },
});

store.watch(s => s.member.sessionId,
  () => {
    store.dispatch('reloadUserInfo');
  });

export default store;
