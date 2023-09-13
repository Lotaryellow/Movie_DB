<template>
  <div class="modalWindowNotification" v-if="notification">
    <span class="notificationText"> {{ errorMovieStore.errorText }}</span>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMovieStore } from "../store/MovieStore";

const errorMovieStore = useMovieStore();
const notification = ref(true);

setTimeout(() => {
  notification.value = false;
}, 5000);
</script>
<style lang="scss">
.modalWindowNotification {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100px;
  right: 50px;
  bottom: 50px;
  background-color: red;
  border: 3px solid var(--blackOp);
}
.notificationText {
  display: block;
  color: var(--white);
}
</style>
