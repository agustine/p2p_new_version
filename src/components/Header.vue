<template>
<header class="header">
  <h1 class="header__title">{{ title }}</h1>
</header>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

$header_height: px(88);
$header_bg: #FFFFFF;

.header {
    height: $header_height;
    border-bottom: 1px solid $line_color;
    background-color: $header_bg;
}

.header__title {
    padding: 0 px(90);
    height: $header_height;
    line-height: $header_height;

    text-align: center;
    font-size: $font_size_header;
    @include text-truncate;
}
</style>
