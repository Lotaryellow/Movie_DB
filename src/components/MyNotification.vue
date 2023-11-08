<template>
  <div v-if="props.show" class="modalWindowNotification" :style="bgColor">
    <span class="notificationText">{{ text }} </span>
  </div>
</template>
<script setup>
import { ref, defineProps, watch } from "vue";

import { useMovieStore } from "../store/MovieStore";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  timeout: {
    type: Number,
    required: true,
    default: 5000,
  },
  type: {
    type: String,
    required: true,
    default: "",
  },
});

const movieStore = useMovieStore();

const bgColor = ref("");
if (props.type === "error") {
  bgColor.value = "red";
}
if (props.type === "successful") {
  bgColor.value = "green";
}
if (props.type === "") {
  bgColor.value = "black";
}

watch(
  () => props.textError,
  () => {
    if (props.textError.length > 1) {
      setTimeout(() => {
        movieStore.showNotification = false;
      }, props.timeout);
    }
  }
);
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
  background-color: v-bind(bgColor);
  border: 3px solid $black;
}
.notificationText {
  display: block;
  color: $white;
}
</style>
