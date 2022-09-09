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
                <strong>Titolo: </strong>{{ movie.title }} <br><br>
                <strong>Titolo originale: </strong>{{ movie.original_title }} <br><br>
                <strong>Lingua originale: </strong>{{ movie.original_language }} <br><br>
                <strong>Valutazione: </strong>{{ movie.vote_average }}
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
        gap: 1rem;

        .card {
            color: #000;
        }
    }

</style>