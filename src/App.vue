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
}
</style>
