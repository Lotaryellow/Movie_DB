<template>
  <div class="mainInfo">
    <div class="filmInfo">
      <img
        class="posterInfo"
        :src="
          infoFilm.infoResult.posterUrl || infoFilm.infoResult.posterUrlPreview
        "
        :alt="infoFilm.infoResult.nameRu || infoFilm.infoResult.nameOriginal"
      />
      <ul>
        <li class="statick">
          Название:
          <span
            >{{
              infoFilm.infoResult.nameRu ||
              infoFilm.infoResult.nameOriginal ||
              "Нет Данных"
            }}.
          </span>
        </li>
        <li class="statick">
          Короткое описание:
          <span>{{
            infoFilm.infoResult.shortDescription || "Нет данных"
          }}</span>
        </li>
        <li class="statick">
          Жанр:
          <span
            v-for="(genre, i) in infoFilm.infoResult.genres"
            :key="genre.id"
          >
            {{ genre.genre.toLowerCase() || "Нет Данных"
            }}{{ i < infoFilm.infoResult.genres.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li class="statick">
          Слоган фильма:
          <span>{{ infoFilm.infoResult.slogan || "Нет Данных" }}</span
          >.
        </li>
        <li class="statick">
          Длинна фильма:
          <span>{{
            infoFilm.infoResult.filmLength + " минут" || "Нет Данных"
          }}</span
          >.
        </li>
        <li class="statick">
          Рейтинг Кинопоиска:
          <span>{{ infoFilm.infoResult.ratingKinopoisk || "Нет Данных" }}</span
          >.
        </li>
        <li class="statick">
          Страна:
          <span
            v-for="(country, i) in infoFilm.infoResult.countries"
            :key="country.id"
            class="searchSpan"
          >
            {{ country.country || "Нет Данных"
            }}{{
              i < infoFilm.infoResult.countries.length - 1 ? ", " : ""
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
</template>
<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "../store/MovieStore";
import { ref } from "vue";
const infoFilm = useMovieStore();

const route = useRoute();
const pageId = ref("");
pageId.value = route.params.id;

infoFilm.filmInfo(pageId.value);
infoFilm.actorListGet(pageId.value);

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
