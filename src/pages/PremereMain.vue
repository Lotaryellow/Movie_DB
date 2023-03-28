<template>
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
    <ul>
      <li>
        Название:
        <span>{{ premere.nameRu || premere.nameEn || "Нет Данных" }} </span>.
      </li>
      <li>
        Год выпуска: <span>{{ premere.year || "Нет Данных" }}</span
        >.
      </li>
      <li>
        Дата премьеры в России:
        <span>{{ premere.premiereRu || "Нет Данных" }}</span
        >.
      </li>
      <li>
        Жанр:
        <span v-for="(genre, i) in premere.genres" :key="genre.id">
          {{ genre.genre || "Нет Данных"
          }}{{ i < premere.genres.length - 1 ? ", " : "" }} </span
        >.
      </li>
      <li>
        Страна:
        <span v-for="(country, i) in premere.countries" :key="country.id">
          {{ country.country || "Нет Данных"
          }}{{ i < premere.countries.length - 1 ? ", " : "" }} </span
        >.
      </li>
    </ul>
    <h3 class="spoiler">Нажми для подробного описания</h3>
  </CardMovies>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CardMovies from "@/components/CardMovies.vue";

const current = ref("");
const showInfo = (name) => {
  current.value = name;
};

const premeres = ref({});

const months = {
  0: "JANUARY",
  1: "FEBRUARY",
  2: "MARCH",
  3: "APRIL",
  4: "MAY",
  5: "JUNE",
  6: "JULY",
  7: "AUGUST",
  8: "SEPTEMBER",
  9: "OCTOBER",
  10: "NOVEMBER",
  11: "DECEMBER",
};
const keyApi = process.env.VUE_APP_APIKEY;

onMounted(async () => {
  const date = new Date();
  const dateYearNow = date.getFullYear();
  const dateMouthNow = date.getUTCMonth();
  try {
    const APIPrem_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${dateYearNow}&month=${
      months[`${dateMouthNow}`]
    }`;

    const res = await fetch(APIPrem_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": keyApi,
      },
    });
    premeres.value = await res.json();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped>
.CardMovies {
  margin: 100px 0px 0px 0px;
}
.urlPosterPrem {
  width: 200px;
  height: 300px;
}
span {
  padding: 0px 5px 0px 5px;
  color: var(--white);
}
.spoiler {
  position: absolute;
  margin: 100px 20px 0px 400px;
  color: var(--white);
  font-size: 4rem;
}
li {
  padding: 10px 0px 0px 0px;
  color: var(--bir);
  font-size: 2rem;
}
</style>
