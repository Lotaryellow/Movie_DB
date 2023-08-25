<template>
  <CardMovies
    v-for="film in movieStore.randomFilms"
    :key="film.id"
    @click="showInfo(film.nameOriginal)"
  >
    <img class="urlPoster" :src="film.posterUrl" :alt="film.nameRu" />
    <ul>
      <li>
        Название:
        <span>{{
          film.nameRu || film.nameOriginal || film.nameEn || "Нет Данных"
        }}</span
        >.
      </li>
      <li>
        Дата выхода:
        <span>{{
          film.year || film.startYear || film.endYear || "Нет Данных"
        }}</span
        >.
      </li>
      <li>
        Слоган: <span> {{ film.slogan || "Нет Данных" }} </span>.
      </li>
      <li>
        Описание:
        <span>
          {{ film.shortDescription || film.description || "Нет Данных" }} </span
        >.
      </li>
      <li>
        Жанр:
        <span v-for="(genre, i) in film.genres" :key="genre.id">
          {{ genre.genre || "Нет Данных"
          }}{{ i < film.genres.length - 1 ? ", " : "" }} </span
        >.
      </li>
      <li>
        Страна:
        <span v-for="(country, i) in film.countries" :key="country.id">
          {{ country.country || "Нет Данных"
          }}{{ i < film.countries.length - 1 ? ", " : "" }} </span
        >.
      </li>
    </ul>
  </CardMovies>
</template>
<script setup>
import { ref } from "vue";
import CardMovies from "@/components/CardMovies.vue";
import { useMovieStore } from "../store/MovieStore";

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
