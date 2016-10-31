<template lang="html">
    <section class="page-section">
        <slot></slot>
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.page-section {
    flex: 1;
}
</style>
