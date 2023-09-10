<template>
  <full-screen-spinner
    class="spinner"
    v-if="!movieStore.loader"
  ></full-screen-spinner>
  <CardMovies
    v-for="film in movieStore.randomFilms"
    :key="film.id"
    @click="showInfo(film.titleOrig)"
  >
    <router-link class="infoLink" :to="`/info/${film.id}`">
      <img class="urlPoster" :src="film.poster.full" :alt="film.title" />
      <ul>
        <li v-if="film.title">
          Название:
          <span>{{ film.title }}</span
          >.
        </li>
        <li v-if="film.year">
          Год:
          <span>{{ film.year }}</span
          >.
        </li>
        <li v-if="film.slogan">
          Слоган: <span> {{ film.slogan }} </span>.
        </li>
        <li v-if="film.description">
          Описание:
          <span> {{ film.description }} </span>.
        </li>
        <li v-if="film.genres">
          Жанр:
          <span v-for="(genre, i) in film.genres" :key="genre.id">
            {{ genre.genre }}{{ i < film.genres.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film.countries">
          Страна:
          <span v-for="(country, i) in film.countries" :key="country.id">
            {{ country.country
            }}{{ i < film.countries.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film.ratings.length > 0">
          Рейтинг Кинопоиска / IMBD:
          <span>{{ film.ratings.kinopoisk }}/{{ film.ratings.imdb }}</span>
        </li>
        <li v-if="film.length">
          Длительность:
          <span> {{ film.length }}</span
          >.
        </li>
      </ul>
    </router-link>
  </CardMovies>
</template>
<script setup>
import { ref } from "vue";
import CardMovies from "@/components/CardMovies.vue";
import { useMovieStore } from "../store/MovieStore";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";

const movieStore = useMovieStore();
movieStore.randomStore();

const current = ref("");
const showInfo = (name) => {
  current.value = name;
};
</script>

<style scoped lang="scss">
:root {
  font-size: 2rem;
}
.myCard {
  max-height: 700px;
  width: unset;
  margin: 30px 0px 0px 0px;
}
.urlPoster {
  width: 250px;
  border-right: 1px solid var(--mint);
}
span {
  padding: 0px 5px 0px 5px;
  color: var(--white);
}

li {
  padding: 10px 0px 0px 0px;
  color: var(--mint);
  font-size: 1.5rem;
}
@media (max-width: 1200px) {
  .urlPoster {
    width: 25vw;
    height: 50%;
  }
}
@media (max-width: 700px) {
  .myCard {
    display: flex;
    flex-direction: column;
    max-height: unset;
  }
  .urlPoster {
    margin: 0 auto;
    width: 90%;
    height: 90vw;
  }
}
@media (max-width: 500px) {
  .urlPoster {
    width: 100%;
  }
}
</style>
