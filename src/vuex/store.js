import Vue from 'vue';
import Vuex from 'vuex';
import {
  default as modules,
} from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
});

store.watch(s => s.member.sessionId,
  () => {
    store.dispatch('reloadUserInfo');
  });

export default store;
