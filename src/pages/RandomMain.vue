<template>
  <CardMovies
    v-for="film in randomFilms"
    :key="film.id"
    @click="showInfo(film.nameOriginal)"
    :class="{ selected: current === film.nameOriginal }"
  >
    <img class="urlPoster" :src="film.posterUrl" :alt="film.nameRu" />
    <ul>
      <li>
        Название:
        <span>{{
          film.nameRu || film.nameOriginal || film.nameEn || "Нет Данных"
        }}</span>
      </li>
      <li>
        Дата выхода:
        <span>{{
          film.year || film.startYear || film.endYear || "Нет Данных"
        }}</span>
      </li>
      <li>
        Слоган: <span> {{ film.slogan || "Нет Данных" }} </span>
      </li>
      <li>
        Описание:
        <span>
          {{ film.shortDescription || film.description || "Нет Данных" }}
        </span>
      </li>
      <li>
        Жанр:
        <span v-for="genre in film.genres" :key="genre.id">
          {{ genre.genre || "Нет Данных" }}
        </span>
      </li>
      <li>
        Страна:
        <span v-for="country in film.countries" :key="country.id">
          {{ country.country || "Нет Данных" }},
        </span>
      </li>
    </ul>
    <h3>
      Кликните по постеру <br />
      для получения дополнительной информации.
    </h3>
  </CardMovies>
</template>
<script setup>
import { ref, onMounted } from "vue";
import CardMovies from "@/components/CardMovies.vue";

const current = ref("");
const showInfo = (name) => {
  current.value = name;
};

const randomFilms = ref([]);

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const keyApi = process.env.VUE_APP_APIKEY;
onMounted(async () => {
  const responsePromises = [];
  for (let i = 0; i < 4; i++) {
    try {
      const API_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${getRandomInRange(
        100,
        100000
      )}`;
      const res = fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": keyApi,
        },
      });
      responsePromises.push(res);
    } catch (error) {
      console.log(error);
    }
  }

  const promisesArray = (await Promise.allSettled(responsePromises)).map(
    (promis) => {
      if (promis.status === "fulfilled") return promis.value.json();
    }
  );

  randomFilms.value = (await Promise.allSettled(promisesArray)).map((prom) => {
    if (prom.status === "fulfilled") {
      return prom.value;
    } else {
      console.log("server response error ");
    }
  });
});
</script>

<style scoped lang="scss">
:root {
  color: white;
  font-size: 2rem;
}
.urlPoster {
  width: 300px;
  height: 400px;
}
span {
  padding: 0px 5px 0px 5px;
  color: white;
}
h3 {
  position: absolute;
  margin: 125px 20px 0px 400px;
  color: azure;
  font-size: 3rem;
}

li {
  color: rgba(0, 255, 255, 0.692);
  font-size: 2rem;
}
</style>
