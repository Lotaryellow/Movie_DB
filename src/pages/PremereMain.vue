<template>
  <full-screen-spinner
    v-if="!movieStore.loader"
    class="spinner"
  ></full-screen-spinner>
  <div v-if="movieStore?.errorText.length == 0" class="cardsPremeres">
    <h2 class="title premeresTitle">Премьеры этого месяца</h2>
    <div class="box-swiper">
      <Swiper
        :slides-per-view="cardsNumberWidth"
        :space-between="7"
        :modules="[FreeMode]"
        :grab-cursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="premere in movieStore?.premeres" :key="premere?.id">
          <router-link class="infoLink" :to="`/info/${premere?.id}`">
            <img
              class="urlPosterPrem"
              :src="premere?.poster?.full"
              :alt="premere?.title"
            />
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div class="cardsReleases">
    <h2 class="title releasesTitle">Цифровые релизы этого месяца</h2>
    <div class="box-swiper">
      <Swiper
        :slides-per-view="cardsNumberWidth"
        :space-between="7"
        :modules="[FreeMode]"
        :grab-cursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="release in movieStore?.releases" :key="release?.id">
          <router-link class="releaseLink" :to="`/info/${release?.id}`">
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
  <h3 class="news">Новые материалы в разработке</h3>
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

const cardsNumberWidth = ref(6);
const screenWidth = ref(window.innerWidth);

function updateWidth() {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value > 1200) {
    cardsNumberWidth.value = 5;
  }
  if (screenWidth.value > 930 && screenWidth.value < 1199) {
    cardsNumberWidth.value = 4;
  }
  if (screenWidth.value > 730 && screenWidth.value < 929) {
    cardsNumberWidth.value = 3;
  }
  if (screenWidth.value > 500 && screenWidth.value < 729) {
    cardsNumberWidth.value = 2;
  }
  if (screenWidth.value > 300 && screenWidth.value < 500) {
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
.urlPosterPrem,
.urlPosterRelease {
  width: -webkit-fill-available;
  height: inherit;
  object-fit: cover;
  border: $borderNormal;
}
.urlPosterPrem:hover,
.urlPosterRelease:hover {
  box-shadow: 0px 0px 20px $black;
}
.title {
  font-size: $fontSizeBig;
  font-weight: $fontWeightNormal;
  font-style: italic;
  color: $black;
  text-shadow: 1px 2px $aquamarine;
  text-align: center;
}
.releasesTitle,
.premeresTitle {
  padding: 20px 0px 40px 0px;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  height: 30rem;
}
.releaseLink,
.infoLink {
  height: inherit;
}
.news {
  margin: 10px 0px 0px 0px;
  font-size: $fontSizeMedium;
}
@media (max-width: 500px) {
  .cardsPremeres,
  .cardsReleases {
    align-items: center;
  }

  .box-swiper {
    max-width: 270px;
  }
  .news {
    font-size: 4vw;
  }
}
</style>
