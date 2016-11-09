<template lang="html">
    <lly-page class="auth-page" style="background-color: #FFFFFF">
      <lly-header title="登录" :bottom-line="false"></lly-header>
      <lly-section>
        <div class="login-panel">
            <ul class="login-panel__form">
                <li class="login-panel__form-li">
                    <label class="login-panel__mobile">
                        <input type="text" class="login-panel__mobile-input" placeholder="请输入手机号码" v-model="mobile">
                    </label>
                    <a class="login-panel__mobile-clear" @click="clearMobile"></a>
                </li>
                <li class="login-panel__form-li">
                    <label class="login-panel__password">
                        <input type="password" v-if="!showPassword" class="login-panel__password-input"
                        placeholder="请输入登录密码" v-model="password">
                        <input type="text" v-if="showPassword" class="login-panel__password-input"
                        placeholder="请输入登录密码" v-model="password">
                    </label>
                    <a class="login-panel__password-switch"
                    :class="{'login-panel__password-switch--show': showPassword}" @click="switchPassword"></a>
                </li>
            </ul>
            <a class="button button--big" :class="{'button--disabled': !formatValidate}" @click="doLogin">登录</a>
            <p class="login-panel__links">
                <router-link to="/auth/register" class="login-panel__reg-link" replace>立即注册</router-link>
                <router-link to="/auth/resetPassword" class="login-panel__reset-password" replace>忘记密码？</router-link>
            </p>
        </div>
      </lly-section>
    </lly-page>
</template>

<script>
import {
  mapActions,
} from 'vuex';
import Header from '../../components/Header';
import Page from '../../components/Page';
import PageSection from '../../components/PageSection';

export default {
  data() {
    return {
      mobile: '',
      password: '',
      showPassword: false,
    };
  },
  computed: {
    passwordType() {
      return this.showPassword ? 'text' : 'password';
    },
    formatValidate() {
      if (!this.mobile) {
        return false;
      }

      if (!this.password) {
        return false;
      }

      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        return false;
      }

      return true;
    },
  },
  methods: {
    ...mapActions(['login']),
    clearMobile() {
      this.mobile = '';
    },
    doLogin() {
      if (!this.formatValidate) {
        return;
      }
      this.login({
        mobile: this.mobile,
        password: this.password,
      }).then(this.back);
    },
    switchPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  components: {
    'lly-header': Header,
    'lly-page': Page,
    'lly-section': PageSection,
  },
};
</script>

<style lang="scss">
// import
@import "../../scss/vars";
@import "../../scss/mixins";

$icon_size: pxImage(53) pxImage(53);

.login-panel {
    padding: px(80) px(48) 0;
}

.login-panel__form {
    margin-bottom: px(80);
    border-top: 1px solid $line_color;
}

.login-panel__form-li {
    position: relative;
    border-bottom: 1px solid $line_color;
    height: $list_line_height;
}

.login-panel__mobile,
.login-panel__password {
    padding-top: px(24);
    padding-left: px(84);
    display: block;
    height: $list_line_height;
}
.login-panel__mobile:before,
.login-panel__password:before {
    content: "";
    @include size(px(84), px(100));
    @include abs-pos(0, auto, auto, 0);
}
.login-panel__mobile:before {
    background: url("../../assets/auth/mobile.png") center no-repeat;
    background-size: $icon_size;
}
.login-panel__password:before {
    background: url("../../assets/auth/password.png") center no-repeat;
    background-size: $icon_size;
}

.login-panel__mobile-input,
.login-panel__password-input {
    height: px(40);
    line-height: px(40);
    font-size: $font_size_common;
    outline: none;
    outline-offset: 0;
    background-color: #FFFFFF!important;
}

.login-panel__mobile-clear {
    display: block;
    @include size(px(84), px(100));
    @include abs-pos(0, 0, auto, auto);
    background: url("../../assets/auth/mobile-clear.png") center no-repeat;
    background-size: $icon_size;
}

.login-panel__password-switch {
    display: block;
    @include size(px(84), px(100));
    @include abs-pos(0, 0, auto, auto);
    background: url("../../assets/auth/password-switch-hide.png") center no-repeat;
    background-size: $icon_size;
}

.login-panel__password-switch--show {
    background: url("../../assets/auth/password-switch-show.png") center no-repeat;
    background-size: $icon_size;
}

.login-panel__links {
    line-height: px(90);
    font-size: $font_size_common_2;
}

.login-panel__reg-link {
    color: $contrast_color;
}

.login-panel__reset-password {
    float: right;
}
</style>
