<template>

  <main class="container-fluid">
    <h2 class="py-5">
        <span v-if="getQuery === ''">
            Popolari su Boolflix:
        </span>
        <span v-else>
            Risultato ricerca:
        </span>
    </h2>

    <div class="films mb-5">

        <h3>
            Film
        </h3>
        <div class="my_grid">
             <div v-for="movie in getMovies" :key="movie.id">
                <MovieCard :movie="movie" />
            </div> 
        </div>

    </div>

    <div class="series">
        <h3>
            Serie
        </h3>
        <div class="my_grid">
            <div v-for="tv in getTv" :key="tv.id">
                <TvCard :tv="tv" />
            </div>
        </div>
    </div>
</main>

</template>

<script>
    // import axios from 'axios';
    import state from '../store';
    import MovieCard from './MovieCard.vue';
    import TvCard from './TvCard.vue';

    export default {
    data() {
        return {};
    },
    computed: {
        getMovies() {
            return state.movies;
        },
        getQuery() {
            return state.query;
        },
        getTv() {
            return state.tv;
        }
    },
    components: {
        MovieCard,
        TvCard
    }
}

</script>

<style lang="scss" scoped>

    h3 {
        padding-bottom: 1rem;
    }

    .my_grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 1rem;
    }

</style>