<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img
          class="navLogo"
          src="../../img/logoNav.png"
          alt="logo"
          width="40"
        />
        <h2 class="navTitle">Movie-DB</h2>
      </router-link>
      <router-link to="/random" class="rndFilms">Случайные фильмы </router-link>
    </div>
    <my-spinner
      class="spinner"
      v-if="!movieStore.loaderSearchPanel"
    ></my-spinner>

    <input
      v-model.trim="searchData"
      type="text"
      placeholder="Поиск"
      pattern="^[^\s]+(\s.*)?$"
    />
    <div class="searchFinish" v-if="show">
      <button
        v-for="res in movieStore.searchResult"
        :key="res.id"
        class="searchItem"
      >
        <router-link
          class="searchPanel"
          :to="`/info/${res.id}`"
          @click="closeSearchData"
        >
          <div class="searchIconContainer">
            <img
              class="searchIcon"
              :src="res.poster.preview"
              :alt="res.title"
            />
          </div>
          <span>{{ res.title }}</span>
        </router-link>
      </button>
    </div>
  </nav>
</template>
<script setup>
import { ref, watch } from "vue";
import MySpinner from "./MySpinner.vue";
import { useMovieStore } from "@/store/MovieStore";

const show = ref(false);
const movieStore = useMovieStore();
const searchData = ref("");

let timeoutID = null;

const closeSearchData = () => {
  show.value = false;
};

watch(searchData, () => {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    movieStore.searchRes(searchData.value);
  }, 1000);

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
  background: var(--blackOp);
  box-shadow: 0px 0px 20px var(--brightMint);
  border: 1px solid var(--brightMint);
  height: 70px;
  top: 20px;
}
.logo {
  display: flex;
  margin: 0px 0px 0px 25px;
  .navTitle {
    font-family: "Mynerve", cursive;
    padding: 8px 0px 0px 10px;
    font-size: 2em;
    color: var(--brightMint);
  }
}
a {
  display: flex;
  font-size: 0.9rem;
}
.navLogo {
  width: 30%;
}

.rndFilms {
  margin: 12px 0px 0px 30px;
  font-size: 1.5rem;
  text-align: center;
  color: var(--brightMint);
  transition-duration: 1s;
}
.rndFilms:hover {
  color: var(--white);
}
input {
  width: 14vw;
  font-size: 1rem;
  height: 30px;
  border: 1px solid var(--blackOp);
  margin: 0px 5px 0px 0px;
}
input:focus {
  box-shadow: 0px 0px 20px var(--brightMint);
}
.searchFinish {
  position: absolute;
  max-height: 800px;
  flex-direction: column;
  border: 1px solid var(--blackOp);
  overflow-y: scroll;
  overflow-x: visible;
  top: 68px;
  right: 0px;

  .searchItem {
    width: 268.5px;
    background: var(--white);
    cursor: pointer;
    margin-right: unset;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 0px;
    span {
      width: 150px;
      font-size: 1.1rem;
      color: var(--blackOp);
    }
  }
  .searchItem:hover {
    background: var(--brightMint);
    border: 1px solid var(--blackOp);
    span {
      color: var(--blackOp);
    }
  }
}
.searchIconContainer {
  width: 90px;
}
.searchIcon {
  width: 100%;
  object-fit: cover;
}
.spinner {
  position: absolute;
  right: 330px;
}
.searchPanel {
  display: flex;
}
@media (max-width: 420px) {
  .navTitle {
    display: none;
  }
  .navLogo {
    width: 90%;
  }
  .rndFilms {
    font-size: 0.9rem;
  }
}
@media (max-width: 1200px) {
  .spinner {
    display: none;
  }
}
@media (max-width: 670px) {
  .searchFinish {
    position: absolute;
    max-height: 800px;
    flex-direction: column;
    border: 1px solid var(--blackOp);
    overflow-y: scroll;
    overflow-x: visible;

    top: 20vw;
  }
  .rndFilms {
    margin: 15px 0px 0px 0px;
    text-align: center;
    width: 100px;
  }
}
</style>
