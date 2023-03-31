<template>
  <div class="cardsPremere">
    <button class="btnLeft" :on-click="prevSlide">
      <img src="../../public/img/Btn.png" alt="btn" />
    </button>
    <CardMovies
      v-for="premere in premeres.items"
      :key="premere.id"
      @click="showInfo(premere.nameRu)"
      :class="{ selected: current === premere.nameRu }"
    >
      <img
        class="urlPosterPrem"
        :src="premere.posterUrl || premere.posterUrlPreview"
        :alt="premere.nameRu || premere.nameEng"
      />
    </CardMovies>
    <button class="btnRight" ::on-click="nextSlide">
      <img src="../../public/img/Btn.png" alt="btn" />
    </button>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import CardMovies from "./CardMovies.vue";
defineProps({
  premeres: Object,
});

const current = ref("");
const showInfo = (name) => {
  current.value = name;
};

const prevSlide = () => {
  console.log("sa");
};
const nextSlide = () => {
  console.log("sa");
};
</script>
<style lang="scss">
.cardsPremere {
  display: flex;
  overflow: hidden;
  margin: 100px 0px 0px 0px;
}
.urlPosterPrem {
  width: 150px;
}
span {
  padding: 0px 5px 0px 5px;
  color: var(--white);
}
li {
  padding: 10px 0px 0px 0px;
  color: var(--bir);
  font-size: 2rem;
}
.btnLeft,
.btnRight {
  height: 227px;
  position: fixed;
  background: #000000af;
  border: 1px solid var(--bir);

  img {
    width: 35px;
  }
}
.btnRight {
  border-right: none;
  transform: rotate(180deg);
}
.btnLeft {
  border-right: none;
}
.btnRight:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
.btnLeft:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
.btnRight {
  right: 50px;
}
</style>
