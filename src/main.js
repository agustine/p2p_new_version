import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import MainView from './views/MainView';
import SearchView from './views/SearchView';
import * as vars from './app/vars';
import {
  getUserToken,
} from './utils/bridge';

require('./scss/base.scss');

Vue.use(VueRouter);

vars.setStore(store);

async function startApp() {
  const router = new VueRouter({
    base: __dirname,
    routes: [{
      path: '/',
      component: MainView,
    }, {
      path: '/search',
      component: SearchView,
    }],
  });

  new Vue({
    store,
    router,
    template: `
          <router-view class="view"></router-view>
      `,
  }).$mount('.app-wrapper');

  const newToken = await getUserToken(vars.getSessionId());
  console.log(newToken);
}

store.dispatch('initMember').then(startApp);
