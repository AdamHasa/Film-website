const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ4YTE4ZWU4Y2Q0MTk4ZTA0NTNiMzkyYTNhYjg4YSIsIm5iZiI6MTcyMTA0Mjc1Ny43OTgyMzcsInN1YiI6IjY2MTA2MTZiMzU2YTcxMDE2NDIyZTM1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GzGP9aF6X2r6dEhD6Ky8A7--HJ39keYIfRyXUKFHAjs";

const endpoints = [
  { name: 'Dutch movie', description: 'A Dutch movie', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=vote_count.asc&vote_count.gte=50&with_origin_country=NL` },
  { name: 'Hidden gem', description: 'A movie with less than 500 reviews but higher than 8 average vote', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50&vote_count.lte=500`},
  { name: 'This year', description: 'A movie released this year', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&primary_release_year=${new Date().getFullYear()}`},
  { name: 'Before the 80s', description: 'A movie released before 1980', endpoint: `${BASE_URL}/discover/movie?language=en-US&release_date.lte=1980-01-01&sort_by=popularity.desc&vote_count.gte=50`},
  { name: 'Short movie', description: 'A movie less than 100 minutes', endpoint: `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&with_runtime.lte=100`}
];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY
  }
};

export const getRandomMovies = async () => {
  const selectedEndpoints = [];
  while (selectedEndpoints.length < 4) {
    const randomIndex = Math.floor(Math.random() * endpoints.length);
    const selectedEndpoint = endpoints[randomIndex];
    if (!selectedEndpoints.includes(selectedEndpoint)) {
      selectedEndpoints.push(selectedEndpoint);
    }
  }

  try {
    const movies = await Promise.all(selectedEndpoints.map(async (endpoint) => {
      const initialResponse = await fetch(endpoint.endpoint + '&page=1', options);
      const initialData = await initialResponse.json();

      if (initialData.total_pages && initialData.total_pages > 0) {
        const maxPages = Math.min(initialData.total_pages, 500);
        const randomPage = Math.floor(Math.random() * maxPages) + 1;
        const pageResponse = await fetch(endpoint.endpoint + `&page=${randomPage}`, options);
        const pageData = await pageResponse.json();

        if (pageData.results && pageData.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * pageData.results.length);
          const movie = pageData.results[randomIndex];
          return {
            ...movie,
            endpointName: endpoint.name,
            endpointDescription: endpoint.description
          };
        }
      }
      return null;
    }));

    return movies.filter(movie => movie !== null);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export { BASE_IMAGE_URL };
