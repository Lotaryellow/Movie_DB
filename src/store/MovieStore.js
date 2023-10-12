import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { MOUNTHS } from "@/constans/months";
import { endingConvert } from "@/utils/timeConverter";

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

        premeres.value = premeresResponse.items.map((elem) =>
          responseServer(elem)
        );
      } catch (error) {
        catchError(error);
      } finally {
        loader.value = true;
      }
    };

    const randomStore = async () => {
      const responsePromises = [];
      for (let i = 0; i < 4; i++) {
        loader.value = false;
        try {
          const API_URL = `${pathApi}/v2.2/films/${getRandomInRange(1, 10000)}`;
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
      randomFilms.value = randomResponse.map((elem) => responseServer(elem));
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
    };
  },
});
