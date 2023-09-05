<template>
  <my-spinner class="spinner" v-if="!movieStore.loader"></my-spinner>
  <CardMovies
    v-for="film in movieStore.randomFilms"
    :key="film.dataResp.id"
    @click="showInfo(film.dataResp.titleOrig)"
  >
    <router-link class="infoLink" :to="`/info/` + film.dataResp.id">
      <img
        class="urlPoster"
        :src="film.dataResp.poster.full"
        :alt="film.dataResp.title"
      />
      <ul>
        <li v-if="film.dataResp.title">
          Название:
          <span>{{ film.dataResp.title }}</span
          >.
        </li>
        <li v-if="film.dataResp.year">
          Год:
          <span>{{ film.dataResp.year }}</span
          >.
        </li>
        <li v-if="film.dataResp.slogan">
          Слоган: <span> {{ film.dataResp.slogan }} </span>.
        </li>
        <li v-if="film.dataResp.description">
          Описание:
          <span> {{ film.dataResp.description }} </span>.
        </li>
        <li v-if="film.dataResp.genres">
          Жанр:
          <span v-for="(genre, i) in film.dataResp.genres" :key="genre.id">
            {{ genre.genre
            }}{{ i < film.dataResp.genres.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film.dataResp.countries">
          Страна:
          <span
            v-for="(country, i) in film.dataResp.countries"
            :key="country.id"
          >
            {{ country.country
            }}{{ i < film.dataResp.countries.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li v-if="film.dataResp.ratings.length > 0">
          Рейтинг Кинопоиска / IMBD:
          <span
            >{{ film.dataResp.ratings.kinopoisk }}/{{
              film.dataResp.ratings.imdb
            }}</span
          >
        </li>
        <li v-if="film.dataResp.length">
          Длительность:
          <span> {{ film.dataResp.length }}</span
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
import MySpinner from "@/components/MyTwoSpinner.vue";

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
