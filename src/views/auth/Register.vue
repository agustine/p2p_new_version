<template lang="html">
    <lly-page class="auth-page" style="background-color: #FFFFFF">
      <lly-header title="注册" :bottom-line="false"></lly-header>
      <lly-section>
        <div class="register-panel">
            <ul class="register-panel__form">
                <li class="register-panel__form-li">
                    <label class="register-panel__mobile">
                        <input type="text" class="register-panel__mobile-input" placeholder="请输入手机号码" v-model="mobile">
                    </label>
                    <a class="register-panel__mobile-clear" @click="clearMobile"></a>
                </li>
                <li class="register-panel__form-li">
                    <label class="register-panel__validate">
                        <input type="text" class="register-panel__validate-input" placeholder="请输入验证码" v-model="validate">
                    </label>
                    <a @click="sendValidate" v-if="!validateBlocked" class="register-panel__get-validate">获取验证码</a>
                    <span  class="register-panel__block-validate" v-if="validateBlocked">{{ blockSecond }}秒后重发</span>
                </li>
                <li class="register-panel__form-li">
                    <label class="register-panel__password">
                        <input type="password" v-if="!showPassword" class="register-panel__password-input"
                        placeholder="请输入登录密码" v-model="password">
                        <input type="text" v-if="showPassword" class="register-panel__password-input"
                        placeholder="请输入登录密码" v-model="password">
                    </label>
                    <a class="register-panel__password-switch"
                    :class="{'register-panel__password-switch--show': showPassword}" @click="switchPassword"></a>
                </li>
            </ul>
            <dl class="register-panel__inviter-wrapper">
                <dt>是否有邀请人？ <span class="register-panel__inviter-switch"
                    @click="switchInviter"
                :class="{'register-panel__inviter-switch--has': hasInviter}"></span></dt>
                <dd class="register-panel__form-li" v-if="hasInviter">
                    <label class="register-panel__inviter">
                        邀请人
                        <input type="text" class="register-panel__mobile-input" placeholder="请输入邀请人手机号码（选填）" v-model="inviter">
                    </label>
                </dd>
            </dl>
            <a class="button button--big" :class="{'button--disabled': !formatValidate}" @click="doRegister">注册</a>
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

const BLOCK_SECOND = 120;

export default {
  data() {
    return {
      mobile: '',
      password: '',
      showPassword: false,
      validate: '',
      hasInviter: false,
      inviter: '',
      blockSecond: 0,
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
    validateBlocked() {
      return this.blockSecond > 0;
    },
  },
  methods: {
    ...mapActions(['register', 'getValidateCode']),
    clearMobile() {
      this.mobile = '';
    },
    doRegister() {
      if (!this.formatValidate) {
        return;
      }
      const data = {
        mobile: this.mobile,
        password: this.password,
        validate: this.validate,
        inviter: this.inviter,
      };
      this.register(data).then(this.back);
    },
    switchPassword() {
      this.showPassword = !this.showPassword;
    },
    switchInviter() {
      this.hasInviter = !this.hasInviter;
    },
    sendValidate() {
      if (!this.mobile) {
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        return;
      }

      const data = {
        mobile: this.mobile,
        businessKind: 'SignUp',
      };
      this.getValidateCode(data).then(this.startCountDown);
    },
    startCountDown() {
      const thisView = this;
      let timeout;
      this.blockSecond = BLOCK_SECOND;

      function countDown() {
        thisView.blockSecond -= 1;
        if (thisView.blockSecond <= 0) {
          clearInterval(timeout);
          timeout = null;
        }
      }
      timeout = setInterval(countDown, 1000);
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

.register-panel {
    padding: px(80) px(48) 0;
}

.register-panel__form {
    margin-bottom: px(80);
    border-top: 1px solid $line_color;
}

.register-panel__form-li {
    position: relative;
    border-bottom: 1px solid $line_color;
    height: $list_line_height;
}

.register-panel__mobile,
.register-panel__password,
.register-panel__validate {
    padding-top: px(24);
    padding-left: px(84);
    display: block;
    height: $list_line_height;
}
.register-panel__mobile:before,
.register-panel__password:before,
.register-panel__validate:before {
    content: "";
    @include size(px(84), px(100));
    @include abs-pos(0, auto, auto, 0);
}
.register-panel__mobile:before {
    background: url("../../assets/auth/mobile.png") center no-repeat;
    background-size: $icon_size;
}
.register-panel__validate:before {
    background: url("../../assets/auth/validate.png") center no-repeat;
    background-size: $icon_size;
}
.register-panel__password:before {
    background: url("../../assets/auth/password.png") center no-repeat;
    background-size: $icon_size;
}

.register-panel__mobile-input,
.register-panel__password-input,
.register-panel__validate-input {
    height: px(40);
    line-height: px(40);
    font-size: $font_size_common;
    outline: none;
    outline-offset: 0;
    background-color: #FFFFFF!important;
}

.register-panel__mobile-clear {
    display: block;
    @include size(px(84), px(100));
    @include abs-pos(0, 0, auto, auto);
    background: url("../../assets/auth/mobile-clear.png") center no-repeat;
    background-size: $icon_size;
}

.register-panel__block-validate,
.register-panel__get-validate {
    display: block;
    line-height: px(48);
    background-color: $contrast_color_2;
    text-align: center;
    color: #FFFFFF;
    font-size: $font_size_common_2;
    @include size(px(160), px(48));
    @include abs-pos(px(26), px(24), auto, auto);
}

.register-panel__block-validate {
    background-color: $bg_btn_week;
}

.register-panel__password-switch {
    display: block;
    @include size(px(84), px(100));
    @include abs-pos(0, 0, auto, auto);
    background: url("../../assets/auth/password-switch-hide.png") center no-repeat;
    background-size: $icon_size;
}

.register-panel__password-switch--show {
    background: url("../../assets/auth/password-switch-show.png") center no-repeat;
    background-size: $icon_size;
}

.register-panel__inviter-switch {
    line-height: px(40);
    font-size: font_size_common_2;
    color: #FFFFFF;
    text-align: center;
    float: right;
    &:after,
    &:before {
        content: "否";
        display: inline-block;
        background-color: $bg_btn_week;
        @include size(px(70), px(40));
    }
    &:after {
        content: "有";
        background-color: $sub_color;
    }
}

.register-panel__inviter-switch--has {
    &:before {
        background-color: $sub_color;
    }
    &:after {
        background-color: $bg_btn_week;
    }
}
</style>
