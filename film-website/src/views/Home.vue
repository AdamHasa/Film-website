<template>
    <div>
      <MovieList :movies="movies" :base_url="base_url" :loading="loading" />
    </div>
  </template>
  
  <script>
  import { getRandomMovies, BASE_IMAGE_URL } from '@/services/api';
  import MovieList from '@/components/MovieList.vue';
  
  export default {
    components: {
      MovieList
    },
    data() {
      return {
        movies: [],
        base_url: BASE_IMAGE_URL,
        loading: true
      };
    },
    mounted() {
      this.fetchMovies();
    },
    methods: {
      async fetchMovies() {
        this.loading = true;
        this.movies = await getRandomMovies();
        this.loading = false;
      }
    }
  };
  </script>
  