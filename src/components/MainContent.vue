<template>

  <main class="container-xl">
    <h2 class="py-5">
        <span v-if="getQuery === ''">
            Popolari su Boolflix:
        </span>
        <span v-else>
            Risultato ricerca:
        </span>
    </h2>
    <div class="my_grid">
        <div class="card" v-for="movie in getMovies" :key="movie.id">
            <p>
                {{ movie.title }} <br>
                {{ movie.original_title }} <br>
                {{ movie.original_language }} <br>
                {{ movie.vote_average }}
            </p>
        </div>
    </div>
</main>

</template>

<script>
    // import axios from 'axios';
    import state from '../store';

    export default {
        computed: {
            getMovies() {
                return state.movies;
            },
            getQuery(){
                return state.query;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .my_grid {
        display: grid;
        grid-template-columns: repeat(6,1fr);

        .card {
            color: #000;
        }
    }

</style>