<template>
  <full-screen-spinner
    class="spinner"
    v-if="!movieStore.loader"
  ></full-screen-spinner>
  <div class="cardsPremeres" v-if="movieStore?.errorText.length == 0">
    <h2>Премьеры этого месяца</h2>
    <div class="box-swiper">
      <Swiper
        :slidesPerView="cardsNumberWidth"
        :spaceBetween="7"
        :modules="[FreeMode]"
        :grabCursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="premere in movieStore?.premeres" :key="premere?.id">
          <img
            class="urlPosterPrem"
            :src="premere?.poster?.full"
            :alt="premere?.title"
          />
          <button
            class="btn-info"
            @click="(openInfo = true), (infoData = premere)"
          >
            <router-link class="infoLink" :to="`/info/${premere?.id}`">
              Подробности
            </router-link>
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div class="cardsReleases">
    <h2>Релизы этого месяца</h2>
    <div class="box-swiper">
      <Swiper
        :slidesPerView="cardsNumberWidth"
        :spaceBetween="7"
        :modules="[FreeMode]"
        :grabCursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="release in movieStore?.releases" :key="release?.id">
          <router-link
            class="releaseLink"
            @click="(openInfo = true), (infoData = release)"
            :to="`/info/${release?.id}`"
          >
            <img
              class="urlPosterRelease"
              :src="release?.poster?.full"
              :alt="release?.title"
            />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <my-notification
    :text="movieStore?.errorText"
    :show="movieStore.showNotification"
    :type="'error'"
    :timeout="NOTIFICATION_TIME"
  ></my-notification>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { useMovieStore } from "../store/MovieStore";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import MyNotification from "@/components/MyNotification.vue";
import { NOTIFICATION_TIME } from "@/constans/notificationTime";

const movieStore = useMovieStore();
if (!movieStore?.premeres?.items) {
  movieStore.premStore();
}
movieStore.releasesStore();
const openInfo = ref(false);
const infoData = ref({});
const cardsNumberWidth = ref(6);
const screenWidth = ref(window.innerWidth);

function updateWidth() {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value > 1200) {
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

watch(
  () => movieStore.errorText,
  () => {
    if (movieStore.errorText.length > 1) {
      movieStore.showNotification = true;
    }
  }
);
</script>

<style lang="scss" scoped>
.cardsPremeres,
.cardsReleases {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 50px 0px 0px 0px;
}
.cardsReleases {
  padding-bottom: 50px;
}
.urlPosterPrem,
.urlPosterRelease {
  height: 100%;
  width: 100%;
  border: 2px solid var(--blackOp);
}
.urlPosterRelease {
  height: 100%;
}
.urlPosterPrem:hover {
  box-shadow: 0px 0px 50px var(--blackOp);
}
.releaseLink {
  display: block;
  height: 400px;
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
.infoLink {
  color: var(--blackOp);
  text-decoration: none;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  height: unset;
  overflow: visible;
  position: relative;
}
@media (max-width: 500px) {
  .box-swiper {
    width: 270px;
  }
}
</style>
