<template>
<lly-page class="search-page">
  <lly-header title="投资广场">

  </lly-header>
  <lly-section>
    <img class="logo" src="../assets/logo.png">
    <h1>Search Page</h1>
  </lly-section>

  <lly-footer current="search"></lly-footer>
</lly-page>
</template>

<script>
import Header from '../components/Header';
import NavFooter from '../components/NavFooter';
import Page from '../components/Page';
import PageSection from '../components/PageSection';

export default {

  components: {
    'lly-header': Header,
    'lly-footer': NavFooter,
    'lly-page': Page,
    'lly-section': PageSection,
  },
};
</script>

<style lang="scss">
// no style
</style>
