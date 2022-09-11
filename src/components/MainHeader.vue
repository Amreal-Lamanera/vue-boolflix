<template>
  
  <header class="d-flex justify-content-between p-3 align-items-center">

    <div class="logo" @click="query='', onChange(category)">
        <h1 class="text-uppercase">
            boolflix
        </h1>
    </div>

    <CategoryContent @changeCat="onChange" v-if="windowWidth >= 576" />

    <div v-if="!searching">

        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="clickHandler" />

    </div>

    <div v-else class="searching">

        <div class="glass-container">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="onChange(category)" />
        </div>

        <input type="text" placeholder="Cerca per titolo..." v-model="query" @keyup.enter="onChange(category)" ref="searchBar" >

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
            windowWidth: window.innerWidth
        };
    },
    methods: {
        fetchMovies() {
            this.queryTypeMovie = this.query === "" ?
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
                    state.movies = res.data.results;
                });
        },

        fetchTv() {
            this.queryTypeTv = this.query === "" ?
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
                    state.tv = res.data.results;
                });
        },
        clickHandler() {
            this.searching = true;
            setTimeout(() => {
                this.$refs.searchBar.focus();
            }, 200);
        },
        onChange(data) {
            if(data === 'Film'){
                this.fetchMovies();
                state.tv = [];
            }
            else if(data === 'Serie TV'){
                this.fetchTv();
                state.movies = [];
            }
            else {
                this.fetchMovies();
                this.fetchTv();
            }
            this.category = data;
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        }
    },

    beforeMount() {
        this.fetchMovies();
        this.fetchTv();
    },

    mounted() {
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