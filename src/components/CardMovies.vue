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
  border: 1px solid var(--mint);
}
.myCard:hover {
  box-shadow: 5px 5px 40px var(--blackOp);
  display: flex;
}
ul {
  padding: 10px 10px 20px 15px;
}
</style>
