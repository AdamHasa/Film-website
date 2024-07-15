<template>
  <main class = "main-container">
    <div v-if="movie" class="movie-container">
      <h1>{{ movie.title }}</h1>
      <img :src="base_url + movie.poster_path" alt="Movie Poster" class="movie-poster">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="movie" class="movie-container">
      <h1>{{ movie.title }}</h1>
      <img :src="base_url + movie.poster_path" alt="Movie Poster" class="movie-poster">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="movie" class="movie-container">
      <h1>{{ movie.title }}</h1>
      <img :src="base_url + movie.poster_path" alt="Movie Poster" class="movie-poster">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="movie" class="movie-container">
      <h1>{{ movie.title }}</h1>
      <img :src="base_url + movie.poster_path" alt="Movie Poster" class="movie-poster">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
      base_url: "https://image.tmdb.org/t/p/original"
    };
  },
  mounted() {
    const movieEndpoints = [
      { name: 'Dutch movie', description: "a dutch movie", endpoint: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.asc&vote_count.gte=100&with_origin_country=NL' },
    ];

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ4YTE4ZWU4Y2Q0MTk4ZTA0NTNiMzkyYTNhYjg4YSIsIm5iZiI6MTcyMTA0Mjc1Ny43OTgyMzcsInN1YiI6IjY2MTA2MTZiMzU2YTcxMDE2NDIyZTM1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GzGP9aF6X2r6dEhD6Ky8A7--HJ39keYIfRyXUKFHAjs'
      }
    };

    fetch(movieEndpoints[0].endpoint, options)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          this.movie = data.results[randomIndex];
        } else {
          console.error('No movies found');
        }
      })
      .catch(err => console.error(err));
  },
};
</script>

<style>
.main-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-around; 
  padding: 20px;
}

.movie-container {
  flex: 0 1 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.movie-poster {
  width: 300px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  margin-top: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  max-width: 800px;
  margin-bottom: 20px;
}
</style>
