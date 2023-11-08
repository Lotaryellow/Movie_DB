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

  max-width: 1640px;
  margin: 0 auto;
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
