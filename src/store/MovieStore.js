import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { months } from "@/constans/months";

const keyApi = process.env.VUE_APP_APIKEY;
const pathApi = process.env.VUE_APP_APIPATH;

export const useMovieStore = defineStore("movieStore", {
  state: () => {
    const premeres = ref({});
    const randomFilms = ref([]);
    const searchResult = ref([]);
    const infoResult = ref({});
    const loader = ref(true);
    const actorList = ref([]);

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
        premeres.value = await res.json();
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

      randomFilms.value = (await Promise.allSettled(promisesArray)).map(
        (prom) => {
          if (prom.status === "fulfilled") {
            return prom.value;
          } else {
            console.log("server response error ");
          }
        }
      );
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
        searchResult.value = await result.json();
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
        infoResult.value = await result.json();
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
