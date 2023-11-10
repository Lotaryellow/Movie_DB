<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img class="navLogo" src="/img/logoNav.png" alt="logo" width="40" />
        <h2 class="navTitle">Movie-DB</h2>
      </router-link>
      <router-link to="/random" class="rndFilms">Случайные фильмы </router-link>
    </div>
    <div class="searchInputBlock">
      <my-spinner
        v-if="!movieStore.loaderSearchPanel"
        class="spinner"
      ></my-spinner>

      <input
        v-model.trim="searchData"
        type="text"
        placeholder="Поиск"
        pattern="^[^\s]+(\s.*)?$"
      />
      <div
        v-if="movieStore.showSearchPanel"
        class="searchFinish"
        @click="movieStore.closeSearchData(false)"
      >
        <button
          v-for="res in movieStore.searchResult"
          :key="res?.id"
          class="searchItem"
        >
          <router-link class="searchPanel" :to="`/info/${res?.id}`">
            <div class="searchIconContainer">
              <img
                class="searchIcon"
                :src="res?.poster?.preview"
                :alt="res?.title"
              />
            </div>
            <span>{{ res?.title }}</span>
          </router-link>
        </button>
      </div>
    </div>
  </nav>
  <my-notification
    :text="movieStore?.errorText"
    :show="movieStore.showNotification"
    :type="'error'"
    :timeout="NOTIFICATION_TIME"
  ></my-notification>
</template>
<script setup>
import { ref, watch } from "vue";
import MySpinner from "./MySpinner.vue";
import { useMovieStore } from "@/store/MovieStore";
import MyNotification from "@/components/MyNotification.vue";
import { NOTIFICATION_TIME } from "@/constants/notificationTime";

const movieStore = useMovieStore();
const searchData = ref("");

let timeoutID = null;
window.addEventListener("click", () => movieStore.closeSearchData(false));
watch(
  searchData,
  () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      movieStore.searchRes(searchData.value);
    }, 1000);

    if (searchData.value.length > 1) {
      movieStore.closeSearchData(true);
    } else {
      movieStore.closeSearchData(false);
    }
  },
  () => movieStore.errorText,
  () => {
    if (movieStore.errorText.length > 1) {
      movieStore.showNotification = true;
    }
  }
);
</script>

<style scoped lang="scss">
nav {
  z-index: 20;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $black;
  box-shadow: 0px 0px 20px $aquamarine;
  border: 1px solid $aquamarine;
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
    color: $aquamarine;
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
  color: $aquamarine;
  transition-duration: 1s;
}
.rndFilms:hover {
  color: $white;
}
input {
  width: 14vw;
  font-size: 1rem;
  height: 30px;
  border: 1px solid $black;
  margin: 0px 5px 0px 0px;
}
input:focus {
  box-shadow: 0px 0px 20px $aquamarine;
}
.searchFinish {
  position: absolute;
  max-height: 800px;
  flex-direction: column;
  border: 1px solid $black;
  overflow-y: scroll;
  overflow-x: visible;
  top: 68px;
  right: 0px;

  .searchItem {
    width: 268.5px;
    background: $white;
    cursor: pointer;
    margin-right: unset;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 0px;
    span {
      width: 150px;
      font-size: 1.1rem;
      color: $black;
    }
  }
  .searchItem:hover {
    background: $aquamarine;
    border: 1px solid $black;
    span {
      color: $black;
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
.searchInputBlock {
  display: flex;
  gap: 10px;
}
.spinner {
  top: 20px;
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

@media (max-width: 670px) {
  .searchFinish {
    position: absolute;
    max-height: 800px;
    flex-direction: column;
    border: 1px solid $black;
    overflow-y: scroll;
    overflow-x: visible;
    top: 20vw;
  }
  .spinner {
    display: none;
  }
  .rndFilms {
    font-size: 0.9rem;
    text-align: center;
    width: 100px;
  }
}
</style>
