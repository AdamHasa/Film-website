<template>
    <div class="movie-container">
      <h2 class="endpoint-name">{{ movie.endpointName }}</h2>
      <p>{{ movie.endpointDescription }}</p>
      <h1>{{ movie.title }}</h1>
      <img :src="base_url + movie.poster_path" alt="Movie Poster" class="movie-poster">
      <p>{{ movie.overview }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movie: Object,
      base_url: String
    }
  };
  </script>
  
  <style>
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
  
  .endpoint-name {
    color: yellow; 
    font-weight: bold; 
    font-size: 20px; 
    margin-bottom: 10px; 
  }
  </style>
  