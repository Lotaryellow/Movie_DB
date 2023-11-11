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
  kinopoiskId: number;
  kinopoiskHDId: string | null;
  imdbId: string;
  nameRu: string | null;
  nameEng: string | null;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreveiw: string;
  coverUrl: string | null;
  logoUrl: string | null;
  reviewCount: number;
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
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string | null;
  description: string | null;
  shortDescription: string | null;
  editorAnnotation: string | null;
  isTicketsAvailable: boolean;
  productionStatus: string | null;
  type: string;
  ratingMpaa: string | null;
  ratingAgeLimits: string | null;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear: number | null;
  endYear: number | null;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
}

export interface Premier {
  kinopoiskId: number;
  nameRu: string;
  nameEng: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  duration: number;
  premierRu: string;
}
