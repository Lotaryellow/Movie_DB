<template>
  <div class="myCard">
    <slot></slot>
  </div>
</template>
<script setup></script>
<style lang="scss">
.myCard {
  display: flex;
  margin: 100px 50px 0px 50px;
  border: 1px solid var(--bir);
  background: var(--blackOp);
  transition-duration: 2s;
}
.myCard:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
ul {
  padding: 10px 10px 10px 15px;
  opacity: 0;
  transition-duration: 2s;
}
.selected {
  display: flex;
  transition-duration: 2s;
  background: var(--black);
  h3 {
    transition-duration: 2s;
    opacity: 0;
  }
  ul {
    transition-duration: 2s;
    opacity: 1;
  }
}
</style>
