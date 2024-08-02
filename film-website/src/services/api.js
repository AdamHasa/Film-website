// src/api.js
import { movieEndpoints } from './endpoints';

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ4YTE4ZWU4Y2Q0MTk4ZTA0NTNiMzkyYTNhYjg4YSIsIm5iZiI6MTcyMTA0Mjc1Ny43OTgyMzcsInN1YiI6IjY2MTA2MTZiMzU2YTcxMDE2NDIyZTM1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GzGP9aF6X2r6dEhD6Ky8A7--HJ39keYIfRyXUKFHAjs";

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
    const randomIndex = Math.floor(Math.random() * movieEndpoints.length);
    const selectedEndpoint = movieEndpoints[randomIndex];
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
