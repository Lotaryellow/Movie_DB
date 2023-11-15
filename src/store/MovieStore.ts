import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInRange } from "@/utils/random";
import { MONTHS } from "@/constants/months";
import { endingConvert } from "@/utils/timeConverter";
import { createLocalStorage, useLocalStorage } from "@/utils/localStor";
import {
  DigitalRelease,
  SearchingMovie,
  Movie,
  Premier,
  genre,
  country,
  Actor,
} from "@/types/movies";
const keyApi = import.meta.env.VITE_APP_APIKEY;
const pathApi = import.meta.env.VITE_APP_APIPATH;

export interface DataResp {
  id: number;
  title: string;
  poster: {
    preview: string;
    full: string;
  };
  ratings: {
    kinopoisk: number | null;
    imdb: number | null;
  };
  year: number | string | null;
  length: string | null;
  slogan: string | null;
  description: string | null;
  type: string | null;
  countries: Array<country>;
  genres: Array<genre>;
}

export const useMovieStore = defineStore("movieStore", {
  state: () => {
    const premeres = ref<Array<DataResp>>([]);
    const randomFilms = ref<Array<DataResp>>([]);
    const searchResult = ref<Array<DataResp>>([]);
    const infoResult = ref({} as DataResp);
    const loader = ref(true);
    const loaderSearchPanel = ref(true);
    const actorList = ref<Array<Actor>>([]);
    const errorText = ref("");
    const showSearchPanel = ref(false);
    const showNotification = ref(false);
    const releases = ref<Array<DataResp>>([]);

    const catchError = (error: unknown): void => {
      errorText.value = `${error}. Извините, ошибка, мы попробуйте ещё раз.`;
    };

    const responseServer = (
      elem: DigitalRelease | Movie | Premier | SearchingMovie,
    ): DataResp => {
      let ratingKinopoiskElem;
      if ("ratingKinopoisk" in elem) {
        ratingKinopoiskElem = elem?.ratingKinopoisk;
      } else ratingKinopoiskElem = null;

      let ratingImdbElem;
      if ("ratingImdb" in elem) {
        ratingImdbElem = elem?.ratingImdb;
      } else ratingImdbElem = null;

      let sloganElem;
      if ("slogan" in elem) {
        sloganElem = elem?.slogan;
      } else sloganElem = null;

      let descriptionElem;
      if ("description" in elem) {
        descriptionElem = elem?.description;
      } else descriptionElem = null;

      let shortDescriptionElem;
      if ("shortDescription" in elem) {
        shortDescriptionElem = elem?.shortDescription;
      } else shortDescriptionElem = null;

      let typeElem;
      if ("type" in elem) {
        typeElem = elem?.type;
      } else typeElem = null;

      const dataResp = {
        id: Number(""),
        title: "",
        poster: {
          preview: "",
          full: "",
        },
        ratings: {
          kinopoisk: ratingKinopoiskElem,
          imdb: ratingImdbElem,
        },
        year: elem?.year,
        length: "",
        slogan: sloganElem,
        description: descriptionElem || shortDescriptionElem,
        type: typeElem,
        countries: elem.countries,
        genres: elem.genres,
      };
      if ("filmId" in elem) {
        dataResp.id = elem?.filmId;
      } else dataResp.id = elem?.kinopoiskId;

      if (typeof elem.nameEng === "string") {
        if ("nameEng" in elem) {
          dataResp.title = elem.nameEng;
        }
      } else if (typeof elem.nameRu === "string") {
        if ("nameRu" in elem) {
          dataResp.title = elem.nameRu;
        }
      } else if ("nameOriginal" in elem) {
        dataResp.title = elem.nameOriginal;
      }
      if (typeof elem.posterUrlPreview === "string") {
        dataResp.poster.preview = elem.posterUrlPreview;
      }
      if (typeof elem.posterUrl === "string") {
        dataResp.poster.full = elem.posterUrl;
      }

      let durationElem;
      if ("duration" in elem) {
        durationElem = elem?.duration;
      } else durationElem = null;

      let filmLengthElem;
      if ("filmLength" in elem) {
        filmLengthElem = elem.filmLength;
      } else filmLengthElem = null;

      if (durationElem || filmLengthElem) {
        if (typeof filmLengthElem === "number") {
          const hours = Math.trunc(durationElem! / 60 || filmLengthElem / 60);
          const minutes = durationElem! % 60 || filmLengthElem % 60;
          const endingHours = ["час", "часа", "часов"];
          const endingMin = ["минута", "минуты", "минут"];

          if (hours !== 0) {
            dataResp.length = `${hours} ${endingConvert(
              hours,
              endingHours,
            )} - ${minutes} ${endingConvert(minutes, endingMin)}`;
          } else {
            dataResp.length = `${minutes} ${endingConvert(minutes, endingMin)}`;
          }
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
      const dateMonthNow: number = date.getUTCMonth();
      loader.value = false;
      const premeresLocalStorage = localStorage.getItem("premeres");
      if (
        premeresLocalStorage &&
        JSON.parse(premeresLocalStorage).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        premeres.value = useLocalStorage(
          premeresLocalStorage,
          premeres.value,
        ) as Array<DataResp>;
        loader.value = true;
      } else {
        try {
          const APIPrem_URL = `${pathApi}/v2.2/films/premieres?year=${dateYearNow}&month=${
            MONTHS[`${dateMonthNow}`]
          }`;

          const res = await fetch(APIPrem_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": keyApi,
            },
          });

          const premeresResponse = await res.json();

          const openPromisePremeres = premeresResponse.items.map(
            (elem: Premier) => responseServer(elem),
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
      const randomLocalStorage = localStorage.getItem("random");
      if (
        randomLocalStorage &&
        JSON.parse(randomLocalStorage).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        randomFilms.value = useLocalStorage(
          randomLocalStorage,
          randomFilms.value,
        ) as Array<DataResp>;
        loader.value = true;
      } else {
        for (let i = 0; i < 4; i++) {
          loader.value = false;
          try {
            const API_URL = `${pathApi}/v2.2/films/${getRandomInRange(
              1,
              10000,
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
          },
        );
        const randomResponse: Array<Movie> = (
          await Promise.allSettled(promisesArray)
        ).map((prom) => {
          if (prom.status === "fulfilled") {
            return prom.value;
          } else {
            errorText.value = "server response error ";
          }
        });
        console.log(randomResponse);

        const openPromiseRandom = randomResponse.map((elem: Movie) =>
          responseServer(elem),
        );
        createLocalStorage("random", openPromiseRandom);
        randomFilms.value = openPromiseRandom;
      }
    };

    const searchRes = async (searchData: string) => {
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
        searchResult.value = searchResponse.films.map((elem: Movie) =>
          responseServer(elem),
        );
      } catch (error) {
        catchError(error);
      } finally {
        loaderSearchPanel.value = true;
      }
    };

    const filmInfo = async (id: number) => {
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

    const actorListGet = async (id: number) => {
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

    const closeSearchData = (bool: boolean) => {
      showSearchPanel.value = bool;
    };

    const releasesStore = async () => {
      const date = new Date();
      const dateYearNow = date.getFullYear();
      const dateMonthNow = date.getUTCMonth();
      loader.value = false;

      const releasesLocalStorage = localStorage.getItem("releases");
      if (
        releasesLocalStorage &&
        JSON.parse(releasesLocalStorage).saveTime ==
          new Date().toJSON().split("T")[0]
      ) {
        releases.value = useLocalStorage(
          releasesLocalStorage,
          releases.value,
        ) as Array<DataResp>;
        loader.value = true;
      } else {
        try {
          const APIReleases_URL = `${pathApi}/v2.1/films/releases?year=${dateYearNow}&month=${MONTHS[dateMonthNow]}`;
          const res = await fetch(APIReleases_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": keyApi,
            },
          });
          const releasesResponse = await res.json();
          const openPromiseReleases = releasesResponse.releases.map(
            (elem: DigitalRelease) => responseServer(elem),
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
