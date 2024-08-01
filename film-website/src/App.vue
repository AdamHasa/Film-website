<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      base_url: "https://image.tmdb.org/t/p/original",
      loading: true
    };
  },
  mounted() {
    const movieEndpoints = [
      { name: 'Dutch movie', description: 'A dutch movie', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_count.asc&vote_count.gte=50&with_origin_country=NL' },
      { name: 'Hidden gem', description: 'A movie with less than 500 reviews but higher that 8 average vote', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50&vote_count.lte=500'},
      { name: 'This year', description: 'A movie that was released this year', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&primary_release_year=' + new Date().getFullYear()},
      { name: 'Before the 80s', description: 'A movie that was released before 1980', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&release_date.lte=1980-01-01&sort_by=popularity.desc&vote_count.gte=50'},
      { name: 'Short movie', description: 'A movie less than 100 minutes', endpoint: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=50&with_runtime.lte=100'}
    ];


    const selectedEndpoints = [];
    while (selectedEndpoints.length < 4) {
      const randomIndex = Math.floor(Math.random() * movieEndpoints.length);
      const selectedEndpoint = movieEndpoints[randomIndex];
      if (!selectedEndpoints.includes(selectedEndpoint)) {
        selectedEndpoints.push(selectedEndpoint);
      }
    }

    console.log(selectedEndpoints)

    Promise.all(selectedEndpoints.map(endpoint =>
      fetch(endpoint.endpoint + '&page=1', options)
        .then(response => response.json())
        .then(data => {
          if (data.total_pages && data.total_pages > 0) {
            // cap pages tmdb api doesn't accept past page 500
            const maxPages = Math.min(data.total_pages, 500);
            const randomPage = Math.floor(Math.random() * maxPages) + 1;
            return fetch(endpoint.endpoint + `&page=${randomPage}`, options)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.results && data.results.length > 0) {
                  const randomIndex = Math.floor(Math.random() * data.results.length);
                  const movie = data.results[randomIndex];
                  movie.endpointName = endpoint.name;  
                  movie.endpointDescription = endpoint.description
                  return movie;
                } else {
                  console.error('No movies found on the selected page');
                  return null;
                }
              });
          } else {
            console.error('No pages found');
            return null;
          }
        })
    ))
    .then(results => {
      this.movies = results.filter(movie => movie !== null);
      this.loading = false;
    })
    .catch(err => {
      console.error(err);
      this.loading = false;
    });
  },
};
</script>
<style>
/* Global styles */
</style>
