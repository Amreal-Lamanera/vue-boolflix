<template>
  
  <header class="d-flex justify-content-between p-3">

    <div class="logo" @click="query='', fetchMovies(), fetchTv()">
        <h1 class="text-uppercase">
            boolflix
        </h1>
    </div>

    <div v-if="!searching">

        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="clickHandler()" />

    </div>

    <div v-else class="searching">

        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="fetchMovies(),fetchTv()" />

        <input type="text" placeholder="Cerca per titolo..." v-model="query" @keyup.enter="fetchMovies(), fetchTv()" ref="searchBar" >

        <div class="layover" @click="searching = false"></div>

    </div>

  </header>

</template>

<script>

    import axios from 'axios';
    import state from '../store';

    export default {
        data() {
            return {
                query: '',
                searching: false,
                queryTypeMovie: '',
                queryTypeTv: ''
            }
        },
        methods: {
            fetchMovies() {
                this.queryTypeMovie = this.query === '' ?
                    '/movie/popular' :
                    '/search/movie';

                const parameters = this.queryTypeMovie === '/movie/popular' ?
                    { api_key: state.apiKey } :
                    {
                        api_key: state.apiKey,
                        query: this.query,
                        language: 'it-IT',
                    };

                axios

                .get(`${state.baseUri}${this.queryTypeMovie}`,{
                    params: parameters
                })

                .then((res) => {
                    console.log(res.data);
                    state.query = this.query;
                    state.movies = res.data.results;
                })
            },
            fetchTv() {
                this.queryTypeTv = this.query === '' ?
                    '/tv/popular' :
                    '/search/tv';

                const parameters = this.queryTypeTv === '/tv/popular' ?
                    { api_key: state.apiKey } :
                    {
                        api_key: state.apiKey,
                        query: this.query,
                        language: 'it-IT',
                    };

                axios

                .get(`${state.baseUri}${this.queryTypeTv}`,{
                    params: parameters
                })

                .then((res) => {
                    console.log(res.data);
                    state.query = this.query;
                    state.tv = res.data.results;
                })
            },
            async clickHandler() {
                this.searching = true;
                setTimeout(() => {
                    this.$refs.searchBar.focus()
                },200)
            },

        },
        beforeMount() {
            this.fetchMovies();
            this.fetchTv();
        },
    }

</script>

<style lang="scss" scoped>

    @import '../style/variables.scss';

    header {
        .logo {
            cursor: pointer;

            h1 {
                color: $--red;
            }
        }

        .glass {
            font-size: 2rem;
            cursor: pointer;
        }

        .searching {
            display: flex;
            align-content: center;

            .glass, input{
                background-color: $--dark;
                border: 1px solid #FFF;
                padding: 1rem;
                z-index: 1;
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

            .glass {
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;
                border-right: none;
            }
            
            input {
                border-top-right-radius: 1rem;
                border-bottom-right-radius: 1rem;
                border-left: none;
                width: 300px;
                color: #FFF;


                &:focus-visible {
                    outline: none;
                }
            }
        }
    }


</style>