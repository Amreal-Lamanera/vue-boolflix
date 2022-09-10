<template>

  <main class="container-fluid overflow-hidden p-4">
    <h2 class="pb-5">
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
        <div class="card-container">
            <div class="my-cards" ref="filmContainer">
                <div class="arrow prev" @click="movePrevMovie" ref="movie_arrow_prev">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </div>
                <div v-for="movie in getMovies" :key="movie.id" class="card-wrapper">
                    <MovieCard :movie="movie" />
                </div>
                <div class="arrow next" @click="moveNextMovie" ref="movie_arrow_next">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </div>
            </div>
        </div>

    </div>

    <div class="series">
        <h3>
            Serie
        </h3>
        <div class="card-container">
            <div class="my-cards" ref="tvContainer">
                <div class="arrow prev" @click="movePrevTv" ref="tv_arrow_prev">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </div>
                <div v-for="tv in getTv" :key="tv.id" class="card-wrapper">
                    <TvCard :tv="tv" />
                </div>
                <div class="arrow next" @click="moveNextTv" ref="tv_arrow_next">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </div>
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
        return {
            movieMoveCount: 0,
            tvMoveCount: 0
        };
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
        },
        getMoviesLen() {
            return state.movies.length;
        },
        getTvLen() {
            return state.tv.length;
        },
    },
    methods: {
        moveNextMovie() {
            console.log('OK2');
            if(++this.movieMoveCount === this.getMoviesLen-5 || this.getMoviesLen <= 5) {
                this.movieMoveCount = 0;
            }
            // console.log(this.$refs.filmContainer.style)
            this.$refs.filmContainer.style.transform = `translateX(${-300 * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${300 * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${300 * this.movieMoveCount}px)`;
            // console.log(this.$refs.filmContainer.style)
            console.log('OK3');
        },
        movePrevMovie() {
            if(this.movieMoveCount === 0) {
                console.log('OK');
                this.movieMoveCount = this.getMoviesLen-7;
                this.moveNextMovie();
                return;
            }
            this.$refs.filmContainer.style.transform = `translateX(${-300 * (--this.movieMoveCount)}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${300 * (this.movieMoveCount)}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${300 * (this.movieMoveCount)}px)`;
        },
        resetMoveMovie(){
            this.moviesNextCount = 0;
            this.$refs.filmContainer.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(0)`;
        },
        moveNextTv() {
            console.log('OK2');
            if(++this.tvMoveCount === this.getTvLen-5 || this.getTvLen <= 5) {
                this.tvMoveCount = 0;
            }
            this.$refs.tvContainer.style.transform = `translateX(${-300 * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${300 * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${300 * this.tvMoveCount}px)`;
            console.log('OK3');
        },
        movePrevTv() {
            if(this.tvMoveCount === 0) {
                console.log('OK');
                this.tvMoveCount = this.getTvLen-7;
                this.moveNextTv();
                return;
            }
            this.$refs.tvContainer.style.transform = `translateX(${-300 * (--this.tvMoveCount)}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${300 * (this.tvMoveCount)}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${300 * (this.tvMoveCount)}px)`;
        },
        resetMoveTv(){
            this.tvMoveCount = 0;
            this.$refs.tvContainer.style.transform = `translateX(0)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(0)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(0)`;
        }
    },
    watch: {
        getMovies: function() {
            this.resetMoveMovie();
        },
        getTv: function() {
            this.resetMoveTv();
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

    .card-container {
        position: relative;
        // width: 1200px;
        // margin: 0 auto;

        .my-cards{
            display: flex;
            transition: all 300ms ease-in-out;
            padding: 0 28px;
            
            .arrow {
                position: absolute;
                height: 100%;
                width: 53px;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 99;
                display: none;
                justify-content: center;
                align-items: center;
                top: 0;
            
            &.next{
                right: -1.5rem;
            }
            
            &.prev{
                left: -1.5rem;
                
            }
            }

            &>* {
                flex-basis: 300px;
                flex-shrink: 0;
            }
        }

        &:hover .arrow{
            display: flex;
        }


        .card-wrapper {
            transition: all 300ms ease-in-out;
            
            &:hover {
            transform: scale(1.2);
            z-index: 1;
            transition-delay: 500ms;
            }
        }
    }

</style>