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
  background: var(--blackOp);
  border: 1px solid var(--mint);
}
.myCard:hover {
  box-shadow: 5px 5px 40px var(--blackOp);
  display: flex;
}
</style>
