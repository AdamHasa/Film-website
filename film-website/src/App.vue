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
      base_url: "https://image.tmdb.org/t/p/original",
      total_pages: null
    };
  },
  mounted() {
    const movieEndpoints = [
      { name: 'Dutch movie', description: 'A dutch movie', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_count.asc&vote_count.gte=50&with_origin_country=NL' },
      { name: 'Hidden gem', description: 'A movie with less than 500 reviews but higher that 8 average vote', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50&vote_count.lte=500'},
      { name: 'This year', description: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&primary_release_year=' + new Date().getFullYear()},
      { name: 'Before the 80s', desctiption: 'A movie that was released before 1980', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&release_date.lte=1980-01-01&sort_by=popularity.desc&vote_count.gte=50'},
      { name: 'Short movie', desctiption: 'A movie less than 100 minutes', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=50&with_runtime.lte=100'}
    ];

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ4YTE4ZWU4Y2Q0MTk4ZTA0NTNiMzkyYTNhYjg4YSIsIm5iZiI6MTcyMTA0Mjc1Ny43OTgyMzcsInN1YiI6IjY2MTA2MTZiMzU2YTcxMDE2NDIyZTM1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GzGP9aF6X2r6dEhD6Ky8A7--HJ39keYIfRyXUKFHAjs'
      }
    };

    fetch(movieEndpoints[0].endpoint + '&page=1', options)
      .then(response => response.json())
      .then(data => {
        if (data.total_pages && data.total_pages > 0) {
          this.total_pages = data.total_pages;

          const randomPage = Math.floor(Math.random() * this.total_pages) + 1;

          fetch(movieEndpoints[0].endpoint + `&page=${randomPage}`, options)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                this.movie = data.results[randomIndex];
              } else {
                console.error('No movies found on the selected page');
              }
            })
            .catch(err => console.error(err));
        } else {
          console.error('No pages found');
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
