<template>
  <full-screen-spinner
    class="spinner"
    v-if="!infoFilm.loader"
  ></full-screen-spinner>
  <div class="mainInfo" v-if="infoFilm.errorText.length == 0">
    <div class="filmInfo">
      <img
        class="posterInfo"
        :src="infoFilm?.infoResult?.poster?.full"
        :alt="infoFilm?.infoResult?.title"
      />
      <ul>
        <li class="statick" v-if="infoFilm?.infoResult?.title">
          Название:
          <span>{{ infoFilm?.infoResult?.title }}. </span>
        </li>
        <li class="statick" v-if="infoFilm?.infoResult?.description">
          Описание:
          <span>{{ infoFilm?.infoResult?.description }}</span>
        </li>
        <li class="statick" v-if="infoFilm?.infoResult?.genres">
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
        <li class="statick" v-if="infoFilm?.infoResult?.slogan">
          Слоган фильма:
          <span>{{ infoFilm?.infoResult?.slogan }}</span
          >.
        </li>
        <li class="statick" v-if="infoFilm?.infoResult?.length">
          Длинна фильма:
          <span>{{ infoFilm?.infoResult?.length }}</span
          >.
        </li>
        <li class="statick" v-if="infoFilm?.infoResult?.ratings">
          Рейтинги:
          <span v-if="infoFilm?.infoResult?.ratings?.imdb"
            >IMDB: {{ infoFilm?.infoResult?.ratings?.imdb }}</span
          >
          <span v-if="infoFilm?.infoResult?.ratings?.kinopoisk">
            Кинопоиск:
            {{ infoFilm?.infoResult?.ratings?.kinopoisk }}</span
          >.
        </li>
        <li class="statick" v-if="infoFilm?.infoResult?.countries">
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
        class="spisokOne"
        v-for="people in infoFilm.actorList"
        :key="people.id"
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
<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "../store/MovieStore";
import { ref, watch } from "vue";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import MyNotification from "@/components/MyNotification.vue";
import { NOTIFICATION_TIME } from "@/constans/notificationTime";

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
    infoFilm.filmInfo(route.params.id);
    infoFilm.actorListGet(route.params.id);
  },
  { immediate: infoFilm.filmInfo(route.params.id) }
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
  color: var(--blackOp);
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
  background-color: var(--blackOp);
  color: var(--white);
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
