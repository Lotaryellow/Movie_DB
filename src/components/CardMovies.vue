<template>
  <div class="myCard">
    <slot></slot>
  </div>
</template>
<script setup></script>
<style lang="scss">
.myCard {
  width: 500px;
  display: flex;
  flex-direction: row;
  background: var(--blackOp);
  margin: 0px 0px 0px 0px;
  border: 1px solid var(--bir);
}
.myCard:hover {
  box-shadow: 0px 0px 20px var(--bir);
  display: flex;
  background: var(--black);
  ul {
    opacity: 1;
  }
}
ul {
  padding: 10px 10px 10px 15px;
}
</style>
