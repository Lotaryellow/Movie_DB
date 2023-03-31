<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="../../public/img/logoNav.png" alt="logo" width="40" />
        <h2>Movie-DB</h2>
      </router-link>
      <router-link to="/random" class="rndFilms">Случайные фильмы </router-link>
    </div>
    <my-spinner class="spinner" v-if="!loader"></my-spinner>
    <form action="">
      <input
        v-model="searchData"
        type="text"
        placeholder="Поиск"
        pattern="^[^\s]+(\s.*)?$"
      />
      <div class="searchFinish" v-if="show">
        <button
          v-for="res in searchResult.films"
          :key="res.id"
          class="searchItem"
          @click.prevent="modal(res)"
        >
          <div class="searchIconContainer">
            <img
              class="searchIcon"
              :src="res.posterUrl || res.posterUrlPreview"
              :alt="res.posterUrl || res.posterUrlPreview"
            />
          </div>

          <span>{{ res.nameRu || res.nameEn }}</span>
        </button>
      </div>
      <button>Поиск</button>
    </form>
    <teleport to="body">
      <modal-search-film
        @close="isModalOpen = false"
        v-if="isModalOpen"
        :searchResult="filterSearch"
      />
    </teleport>
  </nav>
</template>
<script setup>
import { ref, watch } from "vue";
import ModalSearchFilm from "@/components/ModalSearchFilm.vue";
import MySpinner from "./MySpinner.vue";

const isModalOpen = ref(false);
const show = ref(false);
const filterSearch = ref({});
const searchResult = ref([]);
const searchData = ref("");
const keyApi = process.env.VUE_APP_APIKEY;
const loader = ref(true);
const API_URL =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const modal = (res) => {
  isModalOpen.value = true;
  filterSearch.value = res;
  show.value = false;
};

watch(searchData, async (newSearchData) => {
  const apiSearch_URL = `${API_URL}${newSearchData}&page=1`;
  loader.value = false;
  try {
    const result = await fetch(apiSearch_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": keyApi,
      },
    });
    searchResult.value = await result.json();
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = true;
  }

  if (searchData.value.length > 1) {
    show.value = true;
  } else show.value = false;
});
</script>
<style scoped lang="scss">
nav {
  z-index: 20;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--black);
  box-shadow: 0px 0px 20px var(--bir);
  border: 1px solid var(--bir);
  height: 70px;
  top: 20px;
}
.logo {
  display: flex;
  margin: 0px 0px 0px 25px;
  h2 {
    font-family: "Mynerve", cursive;
    padding: 8px 0px 0px 10px;
    font-size: 2rem;
    color: var(--white);
  }
}
a {
  display: flex;
  font-size: 0.9rem;
}
button {
  width: 70px;
  height: 30px;
  font-size: 1rem;
  background-color: var(--bir);
  margin-right: 15px;
  border: 1px solid var(--bir);
}
button:active {
  box-shadow: 0px 0px 20px var(--bir);
}
form {
  position: relative;
}
.rndFilms {
  background: var(--bir);
  width: 90px;
  display: flex;
  margin: 0px 0px 0px 30px;
  font-size: 1rem;
  text-align: center;
  padding: 5px 5px 0px 0px;
  color: var(--black);
}
.rndFilms:hover {
  box-shadow: 0px 0px 20px var(--bir);
}
input {
  width: 220px;
  font-size: 1rem;
  height: 30px;
  border: 1px solid var(--bir);
}
input:focus {
  box-shadow: 0px 0px 20px var(--bir);
}
.searchFinish {
  position: absolute;
  max-height: 800px;
  flex-direction: column;
  border: 1px solid var(--bir);
  overflow-y: scroll;
  overflow-x: visible;
  margin: 5px 0px 0px 0px;

  .searchItem {
    width: 268.5px;
    height: 80px;
    background: var(--white);
    cursor: pointer;
    margin-right: unset;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 0px;
    span {
      width: 150px;
      font-size: 1.1rem;
      color: var(--black);
    }
  }
  .searchItem:hover {
    background: var(--black);
    span {
      color: var(--bir);
    }
  }
}
.searchIconContainer {
  width: 90px;
  height: 79.5px;
  border: 1px solid var(--bir);
  overflow: hidden;
}
.searchIcon {
  width: 100%;
}
.spinner {
  position: absolute;
  right: 330px;
}
</style>
