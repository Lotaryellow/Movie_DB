<template>
  <FilmsNav></FilmsNav>
  <router-view></router-view>
</template>
<script setup>
import FilmsNav from "@/components/FilmsNav.vue";

import {} from "vue";
</script>

<style lang="scss">
:root {
  background: url("../public/img/bgMain.png") no-repeat fixed;
  background-size: cover;
  --black: black;
  --blackOp: rgba(0, 0, 0, 0.767);
  --bir: rgb(4, 204, 204);
  --white: white;
}
</style>
