<template>
  <div class="cardsPremere">
    <h2>Премьеры этого месяца</h2>
    <div>
      <Swiper
        :slidesPerView="7"
        :spaceBetween="5"
        :modules="[FreeMode]"
        :grabCursor="true"
        :enabled="true"
        :loop="true"
      >
        <SwiperSlide v-for="premere in premeres.items" :key="premere.id">
          <img
            class="urlPosterPrem"
            :src="premere.posterUrl || premere.posterUrlPreview"
            :alt="premere.nameRu || premere.nameEng"
            @mouseenter="showInfo(premere.nameRu)"
            @mouseleave="showInfo(false)"
          />
        </SwiperSlide>
      </Swiper>
      <CardMovies
        v-for="premere in premeres.items"
        :key="premere.id"
        class="filmInfo"
        :class="{ selected: current === premere.nameRu }"
      >
        <ul>
          <li>
            Название:
            <span>{{ premere.nameRu || premere.nameEn || "Нет Данных" }} </span
            >.
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
        </ul></CardMovies
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
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
.cardsPremere {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 50px 0px 0px 0px;
}
.urlPosterPrem {
  height: 400px;
  border: 1px solid var(--bir);
}
.urlPosterPrem:hover {
  box-shadow: 0px 0px 40px var(--bir);
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
h2 {
  font-size: 4rem;
  color: rgb(1, 233, 250);
  text-align: center;
  padding: 0px 0px 20px 0px;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  height: unset;
  overflow: visible;
  position: unset;
}
.filmInfo {
  opacity: 0;
}
.selected {
  transform: scale(1.2) translateX(42px);
  transition: 0.5s;
  top: 640px;
  opacity: 1;
  position: absolute;
  box-shadow: 0px 0px 40px var(--bir);
}
</style>
