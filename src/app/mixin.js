import Vue from 'vue';
import {
  isNativeApp,
} from '../utils/env';
import {
  isFirstHash,
} from '../app/vars';
import {
  goBack,
} from '../utils/bridge';

export default function registerGlobalMixin() {
  Vue.mixin({
    methods: {
      back() {
        if (!isNativeApp || !isFirstHash(location.href)) {
          history.back();
          return;
        }
        goBack();
      },
    },
  });
}
