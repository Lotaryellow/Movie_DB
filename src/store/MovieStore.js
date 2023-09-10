import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { months } from "@/constans/months";
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
    const actorList = ref([]);

    const responseServer = (elem) => {
      const dataResp = {
        id: null,
        title: null,
        poster: {
          preview: null,
          full: null,
        },
        ratings: {
          kinopoisk: null,
          imdb: null,
        },
        year: null,
        length: null,
        slogan: null,
        description: null,
        type: null,
        countries: null,
        genres: null,
      };

      if (elem.kinopoiskId || elem.filmId) {
        dataResp.id = elem.kinopoiskId || elem.filmId;
      }
      if (elem.nameRu || elem.nameEn || elem.nameOriginal) {
        dataResp.title = elem.nameRu || elem.nameEn || elem.nameOriginal;
      }
      if (elem.posterUrlPreview) {
        dataResp.poster.preview = elem.posterUrlPreview;
      }
      if (elem.posterUrl) {
        dataResp.poster.full = elem.posterUrl;
      }
      if (elem.ratingKinopoisk) {
        dataResp.ratings.kinopoisk = elem.ratingKinopoisk;
      }
      if (elem.ratingImdb) {
        dataResp.ratings.imdb = elem.ratingImdb;
      }
      if (elem.year) {
        dataResp.year = elem.year;
      }
      if (elem.duration || elem.filmLength) {
        const hours = Math.trunc(elem.duration / 60 || elem.filmLength / 60);
        const minutes = elem.duration % 60 || elem.filmLength % 60;
        const endingHours = ["час", "часа", "часов"];
        const endingMin = ["минута", "минуты", "минут"];

        dataResp.length = `${hours} ${endingConvert(
          hours,
          endingHours
        )} - ${minutes} ${endingConvert(minutes, endingMin)}`;
      }
      if (elem.slogan) {
        dataResp.slogan = elem.slogan;
      }
      if (elem.description || elem.shortDescription) {
        dataResp.description = elem.description || elem.shortDescription;
      }
      if (elem.type) {
        dataResp.type = elem.type;
      }
      if (elem.countries.length > 0) {
        dataResp.countries = elem.countries;
      }
      if (elem.genres.length > 0) {
        dataResp.genres = elem.genres;
      }

      return { dataResp };
    };

    const premStore = async () => {
      const date = new Date();
      const dateYearNow = date.getFullYear();
      const dateMouthNow = date.getUTCMonth();
      loader.value = false;
      try {
        const APIPrem_URL = `${pathApi}/v2.2/films/premieres?year=${dateYearNow}&month=${
          months[`${dateMouthNow}`]
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
        console.log(error);
      } finally {
        loader.value = true;
      }
    };

    const randomStore = async () => {
      const responsePromises = [];
      for (let i = 0; i < 4; i++) {
        loader.value = false;
        try {
          const API_URL = `${pathApi}/v2.2/films/${getRandomInRange(
            100,
            100000
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
          console.log(error);
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
            console.log("server response error ");
          }
        }
      );
      randomFilms.value = randomResponse.map((elem) => responseServer(elem));
    };

    const searchRes = async (searchData) => {
      const API_URL = `${pathApi}/v2.1/films/search-by-keyword?keyword=`;
      const apiSearch_URL = `${API_URL}${searchData}&page=1`;
      loader.value = false;
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
        console.log(error);
      } finally {
        loader.value = true;
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
        console.log(error);
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
        console.log(error);
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
    };
  },
});
