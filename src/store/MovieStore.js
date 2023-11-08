import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { MOUNTHS } from "@/constans/months";
import { endingConvert } from "@/utils/timeConverter";
import { createLocalStorage, useLocalStorage } from "@/utils/localStor";

const keyApi = import.meta.env.VITE_APP_APIKEY;
const pathApi = import.meta.env.VITE_APP_APIPATH;

export const useMovieStore = defineStore("movieStore", {
  state: () => {
    const premeres = ref([]);
    const randomFilms = ref([]);
    const searchResult = ref([]);
    const infoResult = ref({});
    const loader = ref(true);
    const loaderSearchPanel = ref(true);
    const actorList = ref([]);
    const errorText = ref("");
    const showSearchPanel = ref(false);
    const showNotification = ref(false);
    const releases = ref([]);

    const catchError = (error) => {
      errorText.value = `${error.message}. Извините, ошибка, мы попробуйте ещё раз.`;
    };

    const responseServer = (elem) => {
      const dataResp = {
        id: elem?.filmId || elem?.kinopoiskId,
        title: elem?.nameRu || elem?.nameEn || elem?.nameOriginal,
        poster: {
          preview: elem?.posterUrlPreview,
          full: elem?.posterUrl,
        },
        ratings: {
          kinopoisk: elem?.ratingKinopoisk,
          imdb: elem?.ratingImdb,
        },
        year: elem?.year,
        length: null,
        slogan: elem?.slogan,
        description: elem?.description || elem?.shortDescription,
        type: elem?.type,
        countries: null,
        genres: null,
      };

      if (elem?.duration || elem?.filmLength) {
        const hours = Math.trunc(elem.duration / 60 || elem.filmLength / 60);
        const minutes = elem.duration % 60 || elem.filmLength % 60;
        const endingHours = ["час", "часа", "часов"];
        const endingMin = ["минута", "минуты", "минут"];

        if (hours !== 0) {
          dataResp.length = `${hours} ${endingConvert(
            hours,
            endingHours
          )} - ${minutes} ${endingConvert(minutes, endingMin)}`;
        } else {
          dataResp.length = `${minutes} ${endingConvert(minutes, endingMin)}`;
        }
      }
      if (elem?.countries.length > 0) {
        dataResp.countries = elem.countries;
      }
      if (elem?.genres.length > 0) {
        dataResp.genres = elem.genres;
      }

      return dataResp;
    };

    const premStore = async () => {
      const date = new Date();
      const dateYearNow = date.getFullYear();
      const dateMouthNow = date.getUTCMonth();
      loader.value = false;
      if (
        localStorage.premeres &&
        JSON.parse(localStorage.getItem("premeres")).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        premeres.value = useLocalStorage(
          localStorage.getItem("premeres"),
          premeres.value
        );
        loader.value = true;
      } else {
        try {
          const APIPrem_URL = `${pathApi}/v2.2/films/premieres?year=${dateYearNow}&month=${
            MOUNTHS[`${dateMouthNow}`]
          }`;

          const res = await fetch(APIPrem_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": keyApi,
            },
          });
          const premeresResponse = await res.json();
          const openPromisePremeres = premeresResponse.items.map((elem) =>
            responseServer(elem)
          );
          createLocalStorage("premeres", openPromisePremeres);
          premeres.value = openPromisePremeres;
        } catch (error) {
          catchError(error);
        } finally {
          loader.value = true;
        }
      }
    };

    const randomStore = async () => {
      const responsePromises = [];
      if (
        localStorage.random &&
        JSON.parse(localStorage.getItem("random")).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        randomFilms.value = useLocalStorage(
          localStorage.getItem("random"),
          randomFilms.value
        );
        loader.value = true;
      } else {
        for (let i = 0; i < 4; i++) {
          loader.value = false;
          try {
            const API_URL = `${pathApi}/v2.2/films/${getRandomInRange(
              1,
              10000
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
            catchError(error);
          } finally {
            loader.value = true;
          }
        }

        const promisesArray = (await Promise.allSettled(responsePromises)).map(
          (promis) => {
            if (promis.status === "fulfilled") return promis.value.json();
          }
        );
        const randomResponse = (await Promise.allSettled(promisesArray)).map(
          (prom) => {
            if (prom.status === "fulfilled") {
              return prom.value;
            } else {
              errorText.value = "server response error ";
            }
          }
        );

        const openPromiseRandom = randomResponse.map((elem) =>
          responseServer(elem)
        );
        createLocalStorage("random", openPromiseRandom);
        randomFilms.value = openPromiseRandom;
      }
    };

    const searchRes = async (searchData) => {
      const API_URL = `${pathApi}/v2.1/films/search-by-keyword?keyword=`;
      const apiSearch_URL = `${API_URL}${searchData}&page=1`;
      loaderSearchPanel.value = false;
      try {
        const result = await fetch(apiSearch_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": keyApi,
          },
        });
        const searchResponse = await result.json();
        searchResult.value = searchResponse.films.map((elem) =>
          responseServer(elem)
        );
      } catch (error) {
        catchError(error);
      } finally {
        loaderSearchPanel.value = true;
      }
    };

    const filmInfo = async (id) => {
      loader.value = false;
      try {
        const result = await fetch(`${pathApi}/v2.2/films/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": keyApi,
          },
        });
        const infoResponse = await result.json();
        infoResult.value = responseServer(infoResponse);
      } catch (error) {
        catchError(error);
      } finally {
        loader.value = true;
      }
    };

    const actorListGet = async (id) => {
      try {
        const result = await fetch(`${pathApi}/v1/staff?filmId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": keyApi,
          },
        });
        actorList.value = await result.json();
      } catch (error) {
        catchError(error);
      }
    };

    const closeSearchData = (bool) => {
      showSearchPanel.value = bool;
    };

    const releasesStore = async () => {
      const date = new Date();
      const dateYearNow = date.getFullYear();
      const dateMouthNow = date.getUTCMonth();
      loader.value = false;
      if (
        localStorage.releases &&
        JSON.parse(localStorage.getItem("releases")).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        releases.value = useLocalStorage(
          localStorage.getItem("releases"),
          releases.value
        );
        loader.value = true;
      } else {
        try {
          const APIReleases_URL = `${pathApi}/v2.1/films/releases?year=${dateYearNow}&month=${
            MOUNTHS[`${dateMouthNow}`]
          }`;
          const res = await fetch(APIReleases_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": keyApi,
            },
          });
          const releasesResponse = await res.json();
          const openPromiseReleases = releasesResponse.releases.map((elem) =>
            responseServer(elem)
          );
          createLocalStorage("releases", openPromiseReleases);
          releases.value = openPromiseReleases;
        } catch (error) {
          catchError(error);
        } finally {
          loader.value = true;
        }
      }
    };

    return {
      premeres,
      premStore,
      randomStore,
      randomFilms,
      searchRes,
      searchResult,
      loader,
      filmInfo,
      infoResult,
      actorListGet,
      actorList,
      loaderSearchPanel,
      errorText,
      showSearchPanel,
      closeSearchData,
      showNotification,
      releasesStore,
      releases,
    };
  },
});
