<template>
  <div id="app">
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <p>
          {{ movie.title}}
        </p>
        <p>
          {{movie.overview}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        movies: [],
        apiKey: '604eb69c5e2149adb681169e8dc9e532',
        query: 'futuro',
        baseUri:'https://api.themoviedb.org/3'
      }
    },
    methods: {
      fetchMovies() {
        axios

          // .get(`concatenazione_interpolazione_stringhe => ${this.baseUri}/search/movie?api_key=${this.apiKey}&query=${this.query}`)
          // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

          //alternativa
          .get(`${this.baseUri}/search/movie`,{
            params: {
              api_key: this.apiKey,
              query: this.query,
              language: 'it-IT',
            }
          })

          .then((res) => {
            console.log(res.data);
            this.movies = res.data.results;
          })
      }
    },
    beforeMount() {
      this.fetchMovies();
    },
  }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
