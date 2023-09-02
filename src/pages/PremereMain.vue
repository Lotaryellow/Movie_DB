<template>
  <div class="cardsPremere">
    <h2>Премьеры этого месяца</h2>
    <div class="box-swiper">
      <Swiper
        :slidesPerView="cardsNumberWidth"
        :spaceBetween="5"
        :modules="[FreeMode]"
        :grabCursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="premere in movieStore.premeres" :key="premere.id">
          <img
            class="urlPosterPrem"
            :src="premere.dataResp.poster"
            :alt="premere.title || premere.titleEng"
          />
          <button
            class="btn-info"
            @click="(openInfo = true), (infoData = premere)"
          >
            Подробности
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="infoModal" v-if="openInfo">
      <ul>
        <li v-if="infoData.dataResp.title">
          Название:
          <span>{{ infoData.dataResp.title }} </span>.
        </li>
        <li v-if="infoData.dataResp.titleEng">
          Название:
          <span>{{ infoData.dataResp.titleEng }} </span>.
        </li>
        <li v-if="infoData.dataResp.year">
          Год выпуска: <span>{{ infoData.dataResp.year }}</span
          >.
        </li>
        <li v-if="infoData.dataResp.premierRu">
          Дата премьеры в России:
          <span>{{ infoData.dataResp.premierRu }}</span
          >.
        </li>
        <li v-if="infoData.dataResp.genres">
          Жанр:
          <span v-for="(genre, i) in infoData.dataResp.genres" :key="genre.id">
            {{ genre.genre
            }}{{ i < infoData.dataResp.genres.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="infoData.dataResp.countries">
          Страна:
          <span
            v-for="(country, i) in infoData.dataResp.countries"
            :key="country.id"
          >
            {{ country.country
            }}{{
              i < infoData.dataResp.countries.length - 1 ? ", " : ""
            }} </span
          >.
        </li>
        <li v-if="infoData.dataResp.duration">
          Длительность:
          <span>{{ infoData.dataResp.duration }}</span
          >.
        </li>
      </ul>
      <button class="button-close" @click="openInfo = false">Закрыть</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { useMovieStore } from "../store/MovieStore";

const movieStore = useMovieStore();
if (!movieStore.premeres.items) {
  movieStore.premStore();
}

const openInfo = ref(false);
const infoData = ref({});
const cardsNumberWidth = ref(7);

const screenWidth = ref(window.innerWidth);
function updateWidth() {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value > 1200) {
    cardsNumberWidth.value = 7;
  }
  if (screenWidth.value > 990 && screenWidth.value < 1200) {
    cardsNumberWidth.value = 5;
  }
  if (screenWidth.value > 768 && screenWidth.value < 989) {
    cardsNumberWidth.value = 4;
  }
  if (screenWidth.value > 480 && screenWidth.value < 767) {
    cardsNumberWidth.value = 2;
  }
  if (screenWidth.value > 300 && screenWidth.value < 479) {
    cardsNumberWidth.value = 1;
  }
}
updateWidth();
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<style lang="scss" scoped>
.cardsPremere {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 50px 0px 0px 0px;
}
.urlPosterPrem {
  height: 100%;
  border: 2px solid var(--blackOp);
}
.urlPosterPrem:hover {
  box-shadow: 0px 0px 50px var(--blackOp);
}
span {
  padding: 0px 5px 0px 5px;
  color: var(--white);
}
li {
  padding: 10px 0px 0px 0px;
  color: var(--mint);
  font-size: 1.2rem;
  font-weight: 500;
}
h2 {
  font-size: 5vw;
  font-weight: 500;
  font-style: italic;
  color: var(--blackOp);
  text-shadow: 1px 2px var(--brightMint);
  text-align: center;
  padding: 20px 0px 40px 0px;
}
.btn-info {
  opacity: 0.7;
  background-color: var(--brightMint);
  font-style: italic;
  font-size: 1.5em;
  font-weight: 500;
}
.btn-info:hover {
  opacity: 1;
  box-shadow: 0px 0px 40px var(--blackOp);
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  height: unset;
  overflow: visible;
  position: relative;
}
.infoModal {
  margin-top: 30px;
  width: 35vw;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--mint);
  background: var(--blackOp);
  transition-duration: 2s;
  padding: 20px 0px 20px 0px;
}
@media (max-width: 1200px) {
  .infoModal {
    width: 100%;
  }
}
.button-close {
  font-size: 12px;
  width: 100px;
  margin: 0 auto;
  color: var(--mint);
  background-color: var(--bir);
}
.button-close:hover {
  border: 1px solid var(--mint);
}
</style>
