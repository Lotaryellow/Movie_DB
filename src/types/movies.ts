export interface DigitalReleases {
  releases: [
    filId: number | null,
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
