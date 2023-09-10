<template>
  <div class="content">
    <FilmsNav></FilmsNav>
    <router-view></router-view>
  </div>
</template>
<script setup>
import FilmsNav from "@/components/FilmsNav.vue";
</script>

<style lang="scss">
:root {
  font-family: "Open Sans", sans-serif;
  background: url("../img/fon.avif") fixed;
  background-size: cover;
  --blackOp: rgba(0, 0, 0, 0.938);
  --mint: #6f926e;
  --brightMint: #7fffd4;
  --white: white;
}
.content {
  margin: 0px 50px 0px 50px;
}
</style>
