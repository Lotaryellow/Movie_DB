<template>
  <div class="modalWindowNotification" v-if="props.show">
    <span class="notificationText">{{ textError }} </span>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { NOTIFICATION_TIME } from "@/constans/notificationTime";
import { useMovieStore } from "../store/MovieStore";

const props = defineProps({
  textError: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const movieStore = useMovieStore();
console.log(props.show);
console.log(props.textError.length);
if (props.textError.length > 1) {
  setTimeout(() => {
    movieStore.showNotification = false;
  }, NOTIFICATION_TIME);
}
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
