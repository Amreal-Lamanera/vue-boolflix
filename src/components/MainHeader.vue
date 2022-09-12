<template>
  
  <header class="d-flex justify-content-between p-3 align-items-center">

    <div class="logo" @click="query='', onChange(0)">
        <h1 class="text-uppercase">
            boolflix
        </h1>
    </div>

    <CategoryContent @changeCat="onChange" v-if="windowWidth >= 576" :active="activeCat" />

    <div v-if="!searching">

        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="clickHandler" />

    </div>

    <div v-else class="searching">

        <div class="glass-container">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="onChange(activeCat)" />
        </div>

        <input type="text" placeholder="Cerca per titolo..." v-model="query" @keyup.enter="onChange(activeCat)" ref="searchBar" >

        <div class="layover" @click="searching = false"></div>

    </div>

  </header>

</template>

<script>

    import axios from 'axios';
    import state from '../store';
    import CategoryContent from './CategoryContent.vue';

    export default {
    data() {
        return {
            query: "",
            searching: false,
            queryTypeMovie: "",
            queryTypeTv: "",
            category: '',
            windowWidth: window.innerWidth,
            activeCat: 0,
            originalMovies: [],
            originalTvs: []
        };
    },
    methods: {
        getMovies(){
            const newMovies = this.originalMovies.map(el => {
                //  ? `https://image.tmdb.org/t/p/w780${el.backdrop_path}` : null,
                const movies = {
                    id: el.id,
                    title: el.title,
                    original_title: el.original_title,
                    lang: el.original_language,
                    backdrop: el.backdrop_path ? `https://image.tmdb.org/t/p/w780${el.backdrop_path}` : null,
                    genres: el.genre_ids,
                    vote: Math.round(el.vote_average/2)
                };
                return movies;
            })
            console.log('NEW MOVIES: ', newMovies);
            state.movies = newMovies;
        },

        fetchMovies() {
            this.queryTypeMovie = this.query.trim() === "" ?
                "/movie/popular" :
                "/search/movie";
            const parameters = this.queryTypeMovie === "/movie/popular" ?
                { api_key: state.apiKey } :
                {
                    api_key: state.apiKey,
                    query: this.query,
                    language: "it-IT",
                };
            axios

                .get(`${state.baseUri}${this.queryTypeMovie}`, {
                    params: parameters
                })

                .then((res) => {
                    state.query = this.query;
                    this.originalMovies = res.data.results;
                    console.log('OG MOVIES: ', this.originalMovies);
                    this.getMovies();
                });
        },

        getTvs(){
            const newTvs = this.originalTvs.map(el => {
                //  ? `https://image.tmdb.org/t/p/w780${el.backdrop_path}` : null,
                const tvs = {
                    id: el.id,
                    title: el.name,
                    original_title: el.original_name,
                    lang: el.original_language,
                    backdrop: el.backdrop_path ? `https://image.tmdb.org/t/p/w780${el.backdrop_path}` : null,
                    genres: el.genre_ids,
                    vote: Math.round(el.vote_average/2)
                };
                return tvs;
            })
            console.log('NEW TVS: ', newTvs);
            state.tv = newTvs;
        },

        fetchTv() {
            this.queryTypeTv = this.query.trim() === "" ?
                "/tv/popular" :
                "/search/tv";
            const parameters = this.queryTypeTv === "/tv/popular" ?
                { api_key: state.apiKey } :
                {
                    api_key: state.apiKey,
                    query: this.query,
                    language: "it-IT",
                };

            axios
                .get(`${state.baseUri}${this.queryTypeTv}`, {
                    params: parameters
                })
                .then((res) => {
                    state.query = this.query;
                    this.originalTvs = res.data.results;
                    console.log('OG TVS: ', this.originalTvs);
                    this.getTvs();
                });
        },

        fetchGenres(){
            axios
                .get(`${state.baseUri}/genre/movie/list`, {
                    params:{
                        api_key: state.apiKey
                    }
                })
                .then((res) => {
                    const genres = new Array();
                    res.data.genres.forEach(element => {
                        genres.push(element.id);
                    })
                    state.genres = genres;
                    console.log('GENRES: ', state.genres);
                });
        },

        clickHandler() {
            this.searching = true;
            setTimeout(() => {
                this.$refs.searchBar.focus();
            }, 200);
        },
        onChange(index) {
            if(index === 1){
                this.fetchMovies();
                state.tv = [];
            }
            else if(index === 2){
                this.fetchTv();
                state.movies = [];
            }
            else {
                this.fetchMovies();
                this.fetchTv();
            }
            this.activeCat = index;
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        }
    },

    beforeMount() {
        this.fetchMovies();
        this.fetchTv();
        this.fetchGenres();
    },

    created() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    components: { CategoryContent }
}

</script>

<style lang="scss" scoped>

    @import '../style/variables.scss';

    header {
        .logo {
            cursor: pointer;

            h1 {
                color: $--red;
                font-weight: bold;
            }
        }

        .glass {
            font-size: 2rem;
            cursor: pointer;
        }

        .searching {
            display: flex;
            align-content: center;
            justify-content: flex-end;
            height: 3rem;

            .glass-container, input{
                background-color: $--dark;
                border: 1px solid #FFF;
                z-index: 1;
                padding: 1rem;
            }
            
            .layover {
                position: absolute;
                // for testing
                // background-color: tomato;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
            
            .glass-container {
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;
                border-right: none;
                display: flex;
                justify-content: center;
                align-items: center;

                .glass {
                    font-size: 1.25rem;

                    @media (min-width:768px) {
                    & {
                        font-size: 2rem;
                    }
                }
                }
            }
            
            input {
                border-top-right-radius: 1rem;
                border-bottom-right-radius: 1rem;
                border-left: none;
                width: 60%;
                color: #FFF;
                font-size: 75%;

                @media (min-width:768px) {
                    & {
                        font-size: 1rem;
                        width: 100%;
                    }
                }


                &:focus-visible {
                    outline: none;
                }
            }
        }
    }


</style>