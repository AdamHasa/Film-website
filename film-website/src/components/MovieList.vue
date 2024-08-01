<template>
    <main class="main-container">
      <MovieCard
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
        :base_url="base_url"
      />
      <div v-if="loading" class="loading">
        Loading...
      </div>
    </main>
  </template>
  
  <script>
  import MovieCard from './MovieCard.vue';
  
  export default {
    components: {
      MovieCard
    },
    props: {
      movies: Array,
      base_url: String,
      loading: Boolean
    }
  };
  </script>
  
  <style>
  .main-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
  }
  .loading {
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
  </style>
  