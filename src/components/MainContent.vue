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
                <div v-for="movie in getMovies" :key="movie.id" class="card-wrapper" ref="card">
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
            tvMoveCount: 0,
            cardDim: 0
        };
    },
    computed: {
        getQuery() {
            return state.query;
        },
        getMovies() {
            return state.movies;
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
        // getCardDim(){
        //     const windowWidth = window.innerWidth;
        //     const cardDim = windowWidth/5 -48
        //     return windowWidth;
        // }
    },
    methods: {
        moveNextMovie() {
            const windowWidth = window.innerWidth;
            const cardDim = (windowWidth-48)/5;
            
            if(this.getMoviesLen <= 5) return;

            if(++this.movieMoveCount === this.getMoviesLen-4) {
                this.movieMoveCount = 0;
            }

            console.log(this.movieMoveCount, this.getMoviesLen);
            this.$refs.filmContainer.style.transform = `translateX(${-cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
        },
        movePrevMovie() {
            if(this.movieMoveCount === 0) {
                this.movieMoveCount = this.getMoviesLen-6;
                this.moveNextMovie();
                return;
            }
            this.movieMoveCount -= 2;
            console.log(this.movieMoveCount);
            this.moveNextMovie();
        },
        resetMoveMovie(){
            console.log('RESET');
            this.movieMoveCount = 0;
            this.$refs.filmContainer.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(0)`;
        },
        moveNextTv() {
            const windowWidth = window.innerWidth;
            const cardDim = (windowWidth-48)/5;
            
            if(this.getTvLen <= 5) return;

            if(++this.tvMoveCount === this.getTvLen-4) {
                this.tvMoveCount = 0;
            }

            console.log(this.tvMoveCount, this.getTvLen);
            this.$refs.tvContainer.style.transform = `translateX(${-cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
        },
        movePrevTv() {
            if(this.tvMoveCount === 0) {
                this.tvMoveCount = this.getTvLen-6;
                this.moveNextTv();
                return;
            }
            this.tvMoveCount -= 2;
            console.log(this.tvMoveCount);
            this.moveNextTv();
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
        },
    },
    components: {
        MovieCard,
        TvCard
    },
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
            // padding: 0 2rem;
            
            .arrow {
                position: absolute;
                height: 100%;
                width: 1.5rem;
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
                flex-basis: calc(100% / 5);
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