<template>
  <full-screen-spinner
    v-if="!movieStore.loader"
    class="spinner"
  ></full-screen-spinner>
  <h2>
    "Случайных фильмы на сегодня выбраны, для обновления списка посетите
    страницу завтра"
  </h2>

  <CardMovies
    v-for="film in movieStore?.randomFilms"
    :key="film?.id"
    @click="showInfo(film.titleOrig)"
  >
    <router-link class="randomInfoLink" :to="`/info/${film?.id}`">
      <div class="randomImgBox">
        <img
          class="urlPosterRandom"
          :src="film?.poster?.full"
          :alt="film?.title"
        />
      </div>
      <ul class="randomList">
        <li v-if="film?.title" class="randomParagraph">
          Название:
          <span class="randomText">{{ film?.title }}</span
          >.
        </li>
        <li v-if="film?.year" class="randomParagraph">
          Год:
          <span class="randomText">{{ film?.year }}</span
          >.
        </li>
        <li v-if="film?.slogan" class="randomParagraph">
          Слоган: <span class="randomText"> {{ film?.slogan }} </span>.
        </li>
        <li v-if="film?.description" class="randomParagraph">
          Описание:
          <span class="randomText"> {{ film?.description }} </span>.
        </li>
        <li v-if="film?.genres" class="randomParagraph">
          Жанр:
          <span
            v-for="(genre, i) in film?.genres"
            :key="genre?.id"
            class="randomText"
          >
            {{ genre?.genre
            }}{{ i < film?.genres?.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film?.countries" class="randomParagraph">
          Страна:
          <span
            v-for="(country, i) in film?.countries"
            :key="country?.id"
            class="randomText"
          >
            {{ country?.country
            }}{{ i < film?.countries?.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film?.ratings?.length > 0" class="randomParagraph">
          Рейтинг Кинопоиска / IMBD:
          <span class="randomText"
            >{{ film?.ratings?.kinopoisk }}/{{ film?.ratings?.imdb }}</span
          >
        </li>
        <li v-if="film?.length" class="randomParagraph">
          Длительность:
          <span class="randomText"> {{ film?.length }}</span
          >.
        </li>
      </ul>
    </router-link>
  </CardMovies>
  <my-notification
    :text="movieStore?.errorText"
    :show="movieStore?.showNotification"
    :type="'error'"
    :timeout="NOTIFICATION_TIME"
  ></my-notification>
</template>
<script setup>
import { ref, watch } from "vue";
import CardMovies from "@/components/CardMovies.vue";
import { useMovieStore } from "../store/MovieStore";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import MyNotification from "@/components/MyNotification.vue";
import { NOTIFICATION_TIME } from "@/constans/notificationTime";

const movieStore = useMovieStore();
movieStore.randomStore();
const current = ref("");
const showInfo = (name) => {
  current.value = name;
};

watch(
  () => movieStore.errorText,
  () => {
    if (movieStore.errorText.length > 1) {
      movieStore.showNotification = true;
    }
  }
);
</script>

<style scoped lang="scss">
:root {
  font-size: 2rem;
}
h2 {
  font-size: 3vw;
  font-weight: 500;
  font-style: italic;
  color: $black;
  text-shadow: 1px 2px $aquamarine;
  text-align: center;
  padding: 40px 0px 0px 0px;
}
.myCard {
  width: unset;
  margin: 30px 0px 0px 0px;
}
.randomImgBox {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  width: 250px;
  border-right: 1px solid $darkGreen;
}
.urlPosterRandom {
  width: 250px;
  object-fit: fill;
}
.randomInfoLink {
  display: flex;
}
.randomList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 10px 20px 15px;
}
.randomParagraph {
  padding: 10px 0px 0px 0px;
  color: $darkGreen;
  font-size: 1.5rem;
  text-align: left;
}
.randomText {
  margin: 0px 5px 0px 5px;
  color: $white;
}
@media (max-width: 1200px) {
  .randomImgBox {
    width: 237px;
    justify-content: center;
  }
  .urlPosterRandom {
    height: 33vh;
    width: inherit;
  }
}
@media (max-width: 700px) {
  .myCard {
    display: flex;
    justify-content: center;
  }
  .randomText {
    font-size: 1.3rem;
  }
  .randomInfoLink {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: unset;
  }
  .randomImgBox {
    border: none;
  }
  h2 {
    font-size: 5vw;
  }
}
@media (max-width: 500px) {
  .myCard {
    width: 270px;
  }
  .randomInfoLink {
    width: unset;
  }
  .urlPosterRandom {
    width: 100%;
  }
}
</style>
