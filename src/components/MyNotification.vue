<template>
  <div class="modalWindowNotification">
    <span class="notificationText">{{ textError }} </span>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  textError: {
    type: String,
    required: true,
  },
});
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
