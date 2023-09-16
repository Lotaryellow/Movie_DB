<template>
  <div class="preContent" @click="closeSP.closeSearchData(false)">
    <div class="content">
      <FilmsNav></FilmsNav>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import FilmsNav from "@/components/FilmsNav.vue";
import { useMovieStore } from "@/store/MovieStore";

const closeSP = useMovieStore();
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
.preContent {
  width: 100%;
  height: 100%;
}
.content {
  margin: 0px 50px 0px 50px;
}
@media (max-width: 500px) {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
  }
}
</style>
