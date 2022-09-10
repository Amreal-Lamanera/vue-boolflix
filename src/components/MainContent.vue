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
            dim: null,
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
    },
    methods: {
        moveNextMovie() {
            const windowWidth = window.innerWidth;
            const padding = 48;
            let dim;
            if(windowWidth < 576)   dim = 1;
            else if(windowWidth < 768)  dim = 2;
            else if(windowWidth < 992)  dim = 3;
            else if(windowWidth < 1200) dim = 4;
            else dim = 5;
            this.dim = dim;

            const cardDim = (windowWidth-padding)/dim;
            
            if(this.getMoviesLen <= dim) return;

            if(++this.movieMoveCount === this.getMoviesLen-dim+1) {
                this.movieMoveCount = 0;
            }

            this.$refs.filmContainer.style.transform = `translateX(${-cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
        },
        movePrevMovie() {
            const windowWidth = window.innerWidth;
            let dim;
            if(windowWidth < 576)   dim = 1;
            else if(windowWidth < 768)  dim = 2;
            else if(windowWidth < 992)  dim = 3;
            else if(windowWidth < 1200) dim = 4;
            else dim = 5;
            this.dim = dim;

            if(this.movieMoveCount === 0) {
                this.movieMoveCount = this.getMoviesLen-dim-1;
                this.moveNextMovie();
                return;
            }
            this.movieMoveCount -= 2;
            this.moveNextMovie();
        },
        resetMoveMovie(){
            this.movieMoveCount = 0;
            this.$refs.filmContainer.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(0)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(0)`;
        },
        moveNextTv() {
            const windowWidth = window.innerWidth;
            const padding = 48;
            let dim;
            if(windowWidth < 576)   dim = 1;
            else if(windowWidth < 768)  dim = 2;
            else if(windowWidth < 992)  dim = 3;
            else if(windowWidth < 1200) dim = 4;
            else dim = 5;
            this.dim = dim;
            const cardDim = (windowWidth-padding)/dim;
            
            if(this.getTvLen <= dim) return;

            if(++this.tvMoveCount === this.getTvLen-dim+1) {
                this.tvMoveCount = 0;
            }

            this.$refs.tvContainer.style.transform = `translateX(${-cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
        },
        movePrevTv() {
            const windowWidth = window.innerWidth;
            let dim;
            if(windowWidth < 576)   dim = 1;
            else if(windowWidth < 768)  dim = 2;
            else if(windowWidth < 992)  dim = 3;
            else if(windowWidth < 1200) dim = 4;
            else dim = 5;
            this.dim = dim;
            if(this.tvMoveCount === 0) {
                this.tvMoveCount = this.getTvLen-dim-1;
                this.moveNextTv();
                return;
            }
            this.tvMoveCount -= 2;
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
        dim: function() {
            this.movieMoveCount -= 1;
            this.moveNextMovie();
            this.tvMoveCount -= 1;
            this.moveNextTv();
        }
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
                flex-basis: 100%;
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

    @media (min-width: 576px) {
        .card-container .my-cards > * {
            flex-basis: calc(100% / 2);
        }
    }

    @media (min-width: 768px) {
        .card-container .my-cards > * {
            flex-basis: calc(100% / 3);
        }
    }

    @media (min-width: 992px) {
        .card-container .my-cards > * {
            flex-basis: calc(100% / 4);
        }
    }

    @media (min-width: 1200px) {
        .card-container .my-cards > * {
            flex-basis: calc(100% / 5);
        }
    }

</style>