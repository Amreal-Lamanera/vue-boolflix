<template>

  <main class="container-fluid overflow-hidden p-4">

    <div class="films mb-5" v-if="getMoviesLen !== 0">

        <h3>
            Film {{ getQuery === '' ? 'popolari su Boolflix' : 'trovati'}}
        </h3>
        <div class="card-container">
            <div class="my-cards" ref="filmContainer">
                <div class="arrow prev" @click="movePrevMovie" ref="movie_arrow_prev">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </div>
                <div v-for="movie,i in getMovies" :key="movie.id" class="card-wrapper">
                    <MovieCard :movie="movie" :actors="casts[i]"/>
                </div>
                <div class="arrow next" @click="moveNextMovie" ref="movie_arrow_next">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </div>
            </div>
        </div>

    </div>

    <div class="films action mb-5" v-if="getMoviesLen !== 0">
        <h3>
            Film di azione
        </h3>
        <div class="card-container">
            <div class="my-cards" ref="actionContainer">
                <div class="arrow prev" @click="movePrevAction" ref="action_arrow_prev">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </div>
                
                    <div v-for="movie,i in getActionMovies" :key="i" class="card-wrapper">
                        <MovieCard :movie="movie" />
                    </div>

                <div class="arrow next" @click="moveNextAction" ref="action_arrow_next">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </div>
            </div>
        </div>
    </div>

    <div class="series" v-if="getTvLen !== 0">

        <h3>
            Serie {{ getQuery === '' ? 'popolari su Boolflix' : 'trovate'}}
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
    import axios from 'axios';
    import state from '../store';
    import MovieCard from './MovieCard.vue';
    import TvCard from './TvCard.vue';

    export default {
    /**************************************************
        DATA
    **************************************************/
    data() {
        return {
            movieMoveCount: 0,
            tvMoveCount: 0,
            actionMoveCount: 0,
            windowWidth: window.innerWidth,
            dim: null,
            padding: 48,
            casts: [],
            prova: 'filmContainer'
        };
    },

    /**************************************************
        COMPUTED
    **************************************************/
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
        getMoviesGenres() {
            return state.genres;
        },
        getActionMovies() {
            const actionMovies = new Array();
            state.movies.forEach(element => {
                for (let i = 0; i < element.genre_ids.length; i++) {
                    const genreId = element.genre_ids[i];
                    if(state.genres[0] === genreId) actionMovies.push(element);
                }
            });
            console.log('ACTION MOVIES: ', actionMovies);
            return actionMovies;
        }
    },

    /**************************************************
        METHODS
    **************************************************/
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },

        /**************************************************
            MOVIES
        **************************************************/
        moveNextMovie() {

            const cardDim = (this.windowWidth-this.padding)/this.dim;
            
            if(this.getMoviesLen <= this.dim) return;

            // console.log(
            //     'CALCOLO', this.getMoviesLen-this.dim,
            //     'LEN', this.getMoviesLen,
            //     'DIM', this.dim,
            //     'WIND', this.windowWidth
            // );
            
            if(this.movieMoveCount === this.getMoviesLen-this.dim) {
                this.movieMoveCount = -1;
            }

            this.$refs.filmContainer.style.transform = `translateX(${-cardDim * (this.movieMoveCount + 1)}px)`;
            this.$refs.movie_arrow_next.style.transform = `translateX(${cardDim * (this.movieMoveCount + 1)}px)`;
            this.$refs.movie_arrow_prev.style.transform = `translateX(${cardDim * (this.movieMoveCount + 1)}px)`;

            this.movieMoveCount++;
        },
        movePrevMovie() {
            if(this.movieMoveCount === 0) {
                this.movieMoveCount = this.getMoviesLen-this.dim-1;
                this.moveNextMovie();
                return;
            }
            this.movieMoveCount-=2;
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

        /**************************************************
            ACTION MOVIES
        **************************************************/
        moveNextAction() {

            const cardDim = (this.windowWidth-this.padding)/this.dim;

            if(this.getActionMovies.length <= this.dim) return;

            if(this.actionMoveCount === this.getActionMovies.length-this.dim) {
                this.actionMoveCount = -1;
            }

            this.$refs.actionContainer.style.transform = `translateX(${-cardDim * (this.actionMoveCount + 1)}px)`;
            this.$refs.action_arrow_next.style.transform = `translateX(${cardDim * (this.actionMoveCount + 1)}px)`;
            this.$refs.action_arrow_prev.style.transform = `translateX(${cardDim * (this.actionMoveCount + 1)}px)`;

            this.actionMoveCount++;
        },
        movePrevAction() {
            if(this.actionMoveCount === 0) {
                this.actionMoveCount = this.getActionMovies.length-this.dim-1;
                this.moveNextAction();
                return;
            }
            this.actionMoveCount-=2;
            this.moveNextAction();
            },
        resetMoveAction(){
            this.actionMoveCount = 0;
            try{
                this.$refs.actionContainer.style.transform = `translateX(0)`;
                this.$refs.action_arrow_next.style.transform = `translateX(0)`;
                this.$refs.action_arrow_prev.style.transform = `translateX(0)`;
            } catch {
                return;
            }
        },

        /**************************************************
            TVs
        **************************************************/
        moveNextTv() {
            const cardDim = (this.windowWidth-this.padding)/this.dim;
            
            if(this.getTvLen <= this.dim) return;

            if(this.tvMoveCount === this.getTvLen-this.dim) {
                this.tvMoveCount = -1;
            }

            this.$refs.tvContainer.style.transform = `translateX(${-cardDim * (this.tvMoveCount + 1)}px)`;
            this.$refs.tv_arrow_next.style.transform = `translateX(${cardDim * (this.tvMoveCount + 1)}px)`;
            this.$refs.tv_arrow_prev.style.transform = `translateX(${cardDim * (this.tvMoveCount + 1)}px)`;

            this.tvMoveCount++;
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
        },

        /**************************************************
            ACTORS
        **************************************************/
        fetchActors() {
            const casts = [];
            state.movies.forEach(element => {
                axios
                .get(`${state.baseUri}/movie/${element.id}/credits`, {
                    params: {
                        api_key: state.apiKey,
                        language: "it-IT",
                    }
                })
                .then((res) => {
                    casts.push(res.data.cast)
                });
            });
            this.casts = casts;
        }
    },

    /**************************************************
        WATCHERS
    **************************************************/
    watch: {
        getMovies: function() {
            this.resetMoveMovie();
            //TODO: UNICA SOLUZIONE
            this.fetchActors();
            this.resetMoveAction();
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
            this.moveNextMovie();
            this.tvMoveCount -= 1;
            this.moveNextTv();
        }
    },

    /**************************************************
        COMPONENTS
    **************************************************/
    components: {
        MovieCard,
        TvCard
    },

    /**************************************************
        MOUNTED
    **************************************************/
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