const BASE_URL = "https://api.themoviedb.org/3";

export const movieEndpoints = [
  { name: 'Dutch movie', description: 'A Dutch movie', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=vote_count.asc&vote_count.gte=50&with_origin_country=NL` },
  { name: 'Hidden gem', description: 'A movie with less than 500 reviews but higher than 8 average vote', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50&vote_count.lte=500`},
  { name: 'This year', description: 'A movie released this year', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&primary_release_year=${new Date().getFullYear()}`},
  { name: 'Before the 80s', description: 'A movie released before 1980', endpoint: `${BASE_URL}/discover/movie?language=en-US&release_date.lte=1980-01-01&sort_by=popularity.desc&vote_count.gte=50`},
  { name: 'Short movie', description: 'A movie less than 100 minutes', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&with_runtime.lte=100`}
];
