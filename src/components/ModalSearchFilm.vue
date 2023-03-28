<template>
  <div class="modal">
    <div class="modalContent">
      <button @click="close" class="closeBtn">Close</button>
      <img
        class="urlPosterSearch"
        :src="
          props.searchResult.posterUrl || props.searchResult.posterUrlPreview
        "
        :alt="props.searchResult.nameRu || props.searchResult.nameEng"
      />
      <ul>
        <li class="searchLi">
          Название:
          <span class="searchSpan"
            >{{
              props.searchResult.nameRu ||
              props.searchResult.nameEn ||
              "Нет Данных"
            }}.
          </span>
        </li>
        <li>
          Длинна фильма:
          <span>{{ props.searchResult.filmLength || "Нет Данных" }}</span
          >.
        </li>
        <li>
          Рейтинг Кинопоиска:
          <span>{{ props.searchResult.rating || "Нет Данных" }}</span
          >.
        </li>
        <li class="searchLi">
          Дата премьеры в России:
          <span class="searchSpan">{{
            props.searchResult.premiereRu || "Нет Данных"
          }}</span
          >.
        </li>
        <li class="searchLi">
          Жанр:
          <span
            v-for="(genre, i) in props.searchResult.genres"
            :key="genre.id"
            class="searchSpan"
          >
            {{ genre.genre.toLowerCase() || "Нет Данных"
            }}{{ i < props.searchResult.genres.length - 1 ? ", " : "" }} </span
          >.
        </li>
        <li class="searchLi">
          Страна:
          <span
            v-for="(country, i) in props.searchResult.countries"
            :key="country.id"
            class="searchSpan"
          >
            {{ country.country || "Нет Данных"
            }}{{
              i < props.searchResult.countries.length - 1 ? ", " : ""
            }} </span
          >.
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  searchResult: Object,
});

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>
<style lang="scss" scoped>
.modalContent {
  position: absolute;
  top: 20px;
  right: 380px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--bir);
  background: var(--blackOp);
  transition-duration: 2s;
  padding: 30px 30px 30px 30px;
  z-index: 21;
}
.modalContent:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
.urlPosterSearch {
  width: 50%;
  border: 1px solid var(--bir);
}
ul {
  margin: 30px 0px 0px 0px;
  opacity: unset;
}
ul > li {
  color: var(--bir);
}
li,
span {
  padding: 20px 0px 0px 0px;
  font-size: 2rem;
  color: var(--white);
}
.closeBtn {
  width: 60px;
  height: 30px;
  background: var(--bir);
  position: absolute;
  right: 20px;
  top: 10px;
}
.closeBtn:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
</style>
