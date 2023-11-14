<template>
  <div class="myCard">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.myCard {
  width: 500px;
  display: flex;
  background: $black;
  border: 1px solid $darkGreen;
}
.myCard:hover {
  box-shadow: 5px 5px 40px $black;
  display: flex;
}
</style>
