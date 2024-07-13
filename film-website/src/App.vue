<template>
  <main>
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <img :src= "base_url + movie.poster_path" alt="Movie Poster">
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
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ4YTE4ZWU4Y2Q0MTk4ZTA0NTNiMzkyYTNhYjg4YSIsIm5iZiI6MTcyMDc4MjEzOC44MTg5NTYsInN1YiI6IjY2MTA2MTZiMzU2YTcxMDE2NDIyZTM1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H4QIkL3_oJyhKOEsmXUfLsWOn57jAnCWsuBvIKVUM1Y'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/630?language=en-US', options)
      .then(response => response.json())
      .then(data => {
        this.movie = data;
      })
      .catch(err => console.error(err));
  }
};
</script>

