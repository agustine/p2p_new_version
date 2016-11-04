<template lang="html">
    <lly-page class="search-page" style="background-color: #FFFFFF">
      <lly-header title="登录" :bottom-line="false"></lly-header>
      <lly-section>
        <div class="login-panel">

        </div>
      </lly-section>
    </lly-page>
</template>

<script>
import Header from '../../components/Header';
import Page from '../../components/Page';
import PageSection from '../../components/PageSection';

export default {
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

.login-panel {
    padding: px(80) px(48) 0;
}
</style>
