import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './app/router';
import store from './vuex/store';
import * as vars from './app/vars';
import registerGlobalMixin from './app/mixin';

require('./scss/base.scss');

vars.setStore(store);
vars.setFirstHash(location.hash);

Vue.use(VueRouter);

registerGlobalMixin();

function startApp() {
  new Vue({
    store,
    router,
    template: `
          <router-view class="view"></router-view>
      `,
  }).$mount('.app-wrapper');
}

store.dispatch('initMember').then(startApp);
