export interface DigitalRelease {
  filmId: number;
  nameRu: string;
  nameEng: string | null;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  rating: number | null;
  ratingVoteCount: number | null;
  expectationsRating: number | null;
  expectationsRatingVoteCount: number | null;
  duration: number;
  releaseDate: string;
}

export interface SearchingMovie {
  filmId: number;
  nameRu: string;
  nameEng: string;
  type: string;
  year: string;
  description: string;
  filmLength: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface Movie {
  kinopoiskId: number | null;
  kinopoiskHDId: string | null;
  imdbId: string | null;
  nameRu: string | null;
  nameEng: string | null;
  nameOriginal: string | null;
  posterUrl: string | null;
  posterUrlPreveiw: string | null;
  coverUrl: string | null;
  logoUrl: string | null;
  reviewCount: number | null;
  ratingCount: number | null;
  ratingGoodReview: number | null;
  ratingGoodReviewVoteCount: number | null;
  ratingKinopoisk: number | null;
  ratingKinopoiskVoteCount: number | null;
  ratingImdb: number | null;
  ratingImdbVoteCount: number | null;
  ratingFilmCritics: number | null;
  ratingFilmCriticsVoteCount: number | null;
  ratingAwait: number | null;
  ratingAwaitCount: number | null;
  ratingRfCritics: number | null;
  ratingRfCriticsVoteCount: number | null;
  webUrl: string | null;
  year: number | null;
  filmLength: number | null;
  slogan: string | null;
  description: string | null;
  shortDescription: string | null;
  editorAnnotation: string | null;
  isTicketsAvailable: boolean | null;
  productionStatus: string | null;
  type: string | null;
  ratingMpaa: string | null;
  ratingAgeLimits: string | null;
  hasImax: boolean | null;
  has3D: boolean | null;
  lastSync: string | null;
  countries: { country: string }[] | null;
  genres: { genre: string }[] | null;
  startYear: number | null;
  endYear: number | null;
  serial: boolean | null;
  shortFilm: boolean | null;
  completed: boolean | null;
}

export interface Premier {
  items: [
    kinopoiskId: number | null,
    nameRu: string | null,
    nameEng: string | null,
    year: number | null,
    posterUrl: string | null,
    posterUrlPreview: string | null,
    countries: { country: string }[] | null,
    genres: { genre: string }[] | null,
    duration: number | null,
    premierRu: string | null
  ];
}
