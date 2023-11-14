<template>
  <full-screen-spinner
    v-if="!infoFilm.loader"
    class="spinner"
  ></full-screen-spinner>
  <div v-if="infoFilm.errorText.length == 0" class="mainInfo">
    <div class="filmInfo">
      <img
        class="posterInfo"
        :src="infoFilm?.infoResult?.poster?.full"
        :alt="infoFilm?.infoResult?.title"
      />
      <ul>
        <li v-if="infoFilm?.infoResult?.title" class="statick">
          Название:
          <span>{{ infoFilm?.infoResult?.title }}. </span>
        </li>
        <li v-if="infoFilm?.infoResult?.description" class="statick">
          Описание:
          <span>{{ infoFilm?.infoResult?.description }}</span>
        </li>
        <li v-if="infoFilm?.infoResult?.genres" class="statick">
          Жанр:
          <span
            v-for="(genre, i) in infoFilm?.infoResult?.genres"
            :key="genre?.id"
          >
            {{ genre.genre.toLowerCase()
            }}{{
              i < infoFilm?.infoResult?.genres?.length - 1 ? ", " : ""
            }} </span
          >.
        </li>
        <li v-if="infoFilm?.infoResult?.slogan" class="statick">
          Слоган фильма:
          <span>{{ infoFilm?.infoResult?.slogan }}</span
          >.
        </li>
        <li v-if="infoFilm?.infoResult?.length" class="statick">
          Длинна фильма:
          <span>{{ infoFilm?.infoResult?.length }}</span
          >.
        </li>
        <li v-if="infoFilm?.infoResult?.ratings" class="statick">
          Рейтинги:
          <span v-if="infoFilm?.infoResult?.ratings?.imdb"
            >IMDB: {{ infoFilm?.infoResult?.ratings?.imdb }}</span
          >
          <span v-if="infoFilm?.infoResult?.ratings?.kinopoisk">
            Кинопоиск:
            {{ infoFilm?.infoResult?.ratings?.kinopoisk }}</span
          >.
        </li>
        <li v-if="infoFilm?.infoResult?.countries" class="statick">
          Страна:
          <span
            v-for="(country, i) in infoFilm?.infoResult?.countries"
            :key="country?.id"
            class="searchSpan"
          >
            {{ country?.country
            }}{{
              i < infoFilm?.infoResult?.countries?.length - 1 ? ", " : ""
            }} </span
          >.
        </li>
      </ul>
    </div>
    <div :class="statusClass">
      <button class="openList" @click="actorInfo">Показать весь список</button>
      <ul
        v-for="people in infoFilm.actorList"
        :key="people.staffId"
        class="spisokOne"
      >
        <img class="actorPhoto" :src="people.posterUrl" alt="actorPhoto" />
        <div class="actorInfoText">
          <li class="statick">
            Имя: <span>{{ people.nameRu }}</span>
          </li>
          <li class="statick">
            Должность в фильме:<span> {{ people.professionText }}</span>
          </li>
          <li class="statick">
            Роль:<span>{{ people.description || "Нет Данных" }}</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
  <my-notification
    :text="infoFilm?.errorText"
    :show="infoFilm.showNotification"
    :type="'error'"
    :timeout="NOTIFICATION_TIME"
  ></my-notification>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMovieStore } from "../store/MovieStore";
import { ref, watch } from "vue";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import MyNotification from "@/components/MyNotification.vue";
import { NOTIFICATION_TIME } from "@/constants/notificationTime";

const infoFilm = useMovieStore();

const route = useRoute();

const status = ref(false);
const statusClass = ref("actorInfoClose");
const actorInfo = () => {
  if (status.value == false) {
    statusClass.value = "actorInfoOpen";
    status.value = true;
  } else {
    statusClass.value = "actorInfoClose";
    status.value = false;
  }
};

watch(
  () => infoFilm.errorText,
  () => {
    if (infoFilm.errorText.length > 1) {
      infoFilm.showNotification = true;
    }
  }
);
watch(
  () => route.params.id,
  () => {
    let idInNumber = Number(route.params.id);
    infoFilm.filmInfo(idInNumber);
    infoFilm.actorListGet(idInNumber);
  },
  { immediate: true }
);
</script>
<style lang="scss">
.mainInfo {
  display: flex;
  gap: 20vw;
}
.filmInfo {
  margin: 100px 0px 0px 0px;
  display: flex;
  flex-direction: column;
}
.filmInfo > ul {
  width: 40vw;
}
.actorInfoClose {
  height: 550px;
  display: flex;
  flex-direction: column;
  margin: 50px 0px 0px 0px;
  overflow: hidden;
}
.actorInfoOpen {
  display: flex;
  flex-direction: column;
  margin: 50px 0px 0px 0px;
  height: unset;
}
span {
  font-size: 24px;
}
.posterInfo {
  width: 400px;
}
.statick {
  font-size: 22px;
  color: $black;
  padding: 10px 0px 0px 0px;
}
.actorPhoto {
  width: 100px;
}
.spisokOne {
  display: flex;
  gap: 10px;
}
.openList {
  width: 50%;
  background-color: $black;
  color: $white;
}
@media (max-width: 1200px) {
  .mainInfo {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .mainInfo > div {
    align-items: center;
  }
  .spisokOne {
    width: 600px;
  }
}
@media (max-width: 620px) {
  .openList {
    width: 100%;
  }
  .mainInfo {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .mainInfo > div {
    align-items: center;
  }
  .posterInfo {
    width: 50vw;
  }
  .spisokOne {
    display: block;
    width: 200px;
  }
  .statick {
    font-size: 14px;
  }
  span {
    font-size: 12px;
    font-weight: 700;
  }
}
</style>
