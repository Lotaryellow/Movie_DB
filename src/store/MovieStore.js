import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { months } from "@/constans/months";
import { getTimeFromMins } from "@/utils/timeConverter";

const keyApi = process.env.VUE_APP_APIKEY;
const pathApi = process.env.VUE_APP_APIPATH;

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
        year: null,
        poster: null,
        countries: null,
        genres: null,
        duration: null,
        premierRu: null,
        ratings: {
          kinopoisk: null,
          imdb: null,
        },
        slogan: null,
        description: null,
        shortDescription: null,
      };

      if (elem.kinopoiskId || elem.filmId) {
        dataResp.id = elem.kinopoiskId || elem.filmId;
      }
      if (elem.nameRu || elem.nameEn || elem.nameOriginal) {
        dataResp.title = elem.nameRu || elem.nameEn || elem.nameOriginal;
      }
      if (elem.year) {
        dataResp.year = elem.year;
      }
      if (elem.posterUrl || elem.posterUrlPreview) {
        dataResp.poster = elem.posterUrl || elem.posterUrlPreview;
      }
      if (elem.countries.length > 0) {
        dataResp.countries = elem.countries;
      }
      if (elem.genres.length > 0) {
        dataResp.genres = elem.genres;
      }
      if (elem.duration || elem.filmLength) {
        dataResp.duration = getTimeFromMins(elem.duration || elem.filmLength);
      }
      if (elem.premiereRu) {
        dataResp.premierRu = elem.premiereRu;
      }
      if (elem.ratingKinopoisk) {
        dataResp.ratings.kinopoisk = elem.ratingKinopoisk;
      }
      if (elem.ratingImdb) {
        dataResp.ratings.imdb = elem.ratingImdb;
      }
      if (elem.slogan) {
        dataResp.slogan = elem.slogan;
      }
      if (elem.description || elem.shortDescription) {
        dataResp.description = elem.description || elem.shortDescription;
      }

      return { dataResp };
    };

    const premStore = async () => {
      const date = new Date();
      const dateYearNow = date.getFullYear();
      const dateMouthNow = date.getUTCMonth();
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
      }
    };

    const randomStore = async () => {
      const responsePromises = [];
      for (let i = 0; i < 4; i++) {
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
      try {
        const result = await fetch(`${pathApi}/v2.2/films/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": keyApi,
          },
        });
        const infoResponse = await result.json();
        console.log(infoResponse);
        infoResult.value = responseServer(infoResponse);
      } catch (error) {
        console.log(error);
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
