import VueRouter from 'vue-router';
import MainView from '../views/MainView';
import SearchView from '../views/SearchView';
import LoginView from '../views/auth/Login';
import RegisterView from '../views/auth/Register';

export default new VueRouter({
  base: __dirname,
  routes: [{
    path: '/',
    component: MainView,
  }, {
    path: '/search',
    component: SearchView,
  }, {
    path: '/auth/login',
    component: LoginView,
  }, {
    path: '/auth/register',
    component: RegisterView,
  }],
});
