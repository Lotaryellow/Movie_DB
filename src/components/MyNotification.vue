<template>
  <div v-if="$props.show" class="modalWindowNotification" :style="bgColor">
    <span class="notificationText">{{ text }} </span>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

import { useMovieStore } from "../store/MovieStore";

const $props = withDefaults(
  defineProps<{
    text: string;

    show?: boolean;

    timeout: number;
    default?: number;
    type: string;
  }>(),
  {
    default: 5000,
  },
);

const movieStore = useMovieStore();

const bgColor = ref("");
if ($props.type === "error") {
  bgColor.value = "red";
}
if ($props.type === "successful") {
  bgColor.value = "green";
}
if ($props.type === "") {
  bgColor.value = "black";
}

watch(
  () => $props.text,
  () => {
    if ($props.text.length > 1) {
      setTimeout(() => {
        movieStore.showNotification = false;
      }, $props.timeout | $props.default);
    }
  },
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
