<template lang="html">
  <div class="page">
      <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.page {
    display: flex;
    flex-direction: column;
    background-color: $bg_color;
    @include abs-pos(0,0,0,0);
    @include size(100%);
}
</style>
