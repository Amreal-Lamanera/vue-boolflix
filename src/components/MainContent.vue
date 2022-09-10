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

    <div class="films mb-5" v-if="getMoviesLen !== 0">

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

    <div class="series" v-if="getTvLen !== 0">

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
            windowWidth: window.innerWidth,
            dim: null,
            padding: 48
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
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        moveNextMovie() {

            const cardDim = (this.windowWidth-this.padding)/this.dim;
            
            if(this.getMoviesLen <= this.dim) return;

            // console.log(
            //     'CALCOLO', this.getMoviesLen-this.dim,
            //     'LEN', this.getMoviesLen,
            //     'DIM', this.dim,
            //     'WIND', this.windowWidth
            // );
            
            if(++this.movieMoveCount === this.getMoviesLen-this.dim+1) {
                this.movieMoveCount = 0;
            }

            this.$refs.filmContainer.style.transform = `translateX(${-cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${cardDim * this.movieMoveCount}px)`;
        },
        movePrevMovie() {
            if(this.movieMoveCount === 0) {
                this.movieMoveCount = this.getMoviesLen-this.dim-1;
                this.moveNextMovie();
                return;
            }
            this.movieMoveCount -= 2;
            this.moveNextMovie();
        },
        resetMoveMovie(){
            this.movieMoveCount = 0;
            try{
                this.$refs.filmContainer.style.transform = `translateX(0)`;
                this.$refs.movie_arrow_next.style.transform = `translateX(0)`;
                this.$refs.movie_arrow_prev.style.transform = `translateX(0)`;
            } catch {
                return;
            }
        },
        moveNextTv() {
            const cardDim = (this.windowWidth-this.padding)/this.dim;
            
            if(this.getTvLen <= this.dim) return;

            if(++this.tvMoveCount === this.getTvLen-this.dim+1) {
                this.tvMoveCount = 0;
            }

            this.$refs.tvContainer.style.transform = `translateX(${-cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${cardDim * this.tvMoveCount}px)`;
        },
        movePrevTv() {
            if(this.tvMoveCount === 0) {
                this.tvMoveCount = this.getTvLen-this.dim-1;
                this.moveNextTv();
                return;
            }
            this.tvMoveCount -= 2;
            this.moveNextTv();
        },
        resetMoveTv(){
            this.tvMoveCount = 0;
            try{
                this.$refs.tvContainer.style.transform = `translateX(0)`;
                this.$refs.tv_arrow_next.style.transform = `translateX(0)`;
                this.$refs.tv_arrow_prev.style.transform = `translateX(0)`;
            } catch {
                return;
            }
        }
    },
    watch: {
        getMovies: function() {
            this.resetMoveMovie();
        },
        getTv: function() {
            this.resetMoveTv();
        },
        windowWidth: function() {
            if(this.windowWidth < 576)   this.dim = 1;
            else if(this.windowWidth < 768)  this.dim = 2;
            else if(this.windowWidth < 992)  this.dim = 3;
            else if(this.windowWidth < 1200) this.dim = 4;
            else this.dim = 5;
            this.movieMoveCount -= 1;
            console.log(this.movieMoveCount);
            this.moveNextMovie();
            this.tvMoveCount -= 1;
            this.moveNextTv();
        }
    },
    components: {
        MovieCard,
        TvCard
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            if(this.windowWidth < 576)   this.dim = 1;
            else if(this.windowWidth < 768)  this.dim = 2;
            else if(this.windowWidth < 992)  this.dim = 3;
            else if(this.windowWidth < 1200) this.dim = 4;
            else this.dim = 5;
        })
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