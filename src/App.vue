<template>
  <div id="app">
    <!-- <ul>
      <li v-for="movie in movies" :key="movie.id">
        <p>
          {{ movie.title}}
        </p>
        <img :src= "`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">
        <p>
          {{movie.overview}}
        </p>
      </li>
    </ul> -->
    <MainHeader />
    <MainContent />
  </div>
</template>

<script>

  import MainHeader from './components/MainHeader.vue';
  import MainContent from './components/MainContent.vue';

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainContent
    },
  }

</script>

<style lang="scss">

  @import './style/general.scss';

</style>
