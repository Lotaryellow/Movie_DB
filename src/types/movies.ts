export interface DigitalReleases {
  releases: [
    filmId: number | null,
    nameRu: string | null,
    nameEng: string | null,
    year: number | null,
    posterUrl: string | null,
    posterUrlPreview: string | null,
    countries: { country: string }[] | null,
    genres: { genre: string }[] | null,
    rating: number | null,
    ratingVoteCount: number | null,
    expectationsRating: number | null,
    expectationsRatingVoteCount: number | null,
    duration: number | null,
    releaseDate: string | null
  ];
}

export interface SearchingMovie {
  films: [
    filmId: number | null,
    nameRu: string | null,
    nameEng: string | null,
    type: string | null,
    year: string | null,
    description: string | null,
    filmLength: string | null,
    countries: { country: string }[] | null,
    genres: { genre: string }[] | null,
    rating: string | null,
    ratingVoteCount: number | null,
    posterUrl: string | null,
    posterUrlPreview: string | null
  ];
}
