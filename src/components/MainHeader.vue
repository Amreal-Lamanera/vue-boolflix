<template>
  
  <header class="d-flex justify-content-between align-items-center">

    <div class="d-flex align-items-center">
        <div class="logo" @click="query='', fetchMovies(), fetchTv()">
            <!-- <h1 class="text-uppercase m-0 d-flex align-items-start">
                <span class="fs_max">b</span>
                <span class="fs_hi">o</span>
                <span class="fs_mid">o</span>
                <span class="fs_min">l</span>
                <span class="fs_min">f</span>
                <span class="fs_mid">l</span>
                <span class="fs_hi">i</span>
                <span class="fs_max">x</span>
            </h1> -->
            <img src="../assets/lamaflix.png" alt="">
        </div>
    
        <CategoryContent @changeCat="onChange" v-if="windowWidth >= 576" :active="activeCat" class="ms-4" />
    </div>

    <div v-if="!searching">

        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="clickHandler" />

    </div>

    <div v-else class="searching">

        <div class="glass-container">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white glass" @click="fetchMovies(), fetchTv()" />
        </div>

        <input type="text" placeholder="Cerca per titolo..." v-model="query" @keyup.enter="fetchMovies(), fetchTv()" ref="searchBar" >

        <div class="layover" @click="searching = false"></div>

    </div>

    <div v-if="windowWidth < 576">
        <div class="burger" @click="hiddenMenu = true">
            =
        </div>
        <div class="hidden-menu" :class="hiddenMenu ? 'visible' : ''">
            <CategoryContent @changeCat="onChange" :active="activeCat" v-if="hiddenMenu" />
        </div>
        <div class="layover-menu" :class="hiddenMenu ? 'visible' : ''" @click="hiddenMenu = false"></div>
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
            originalTvs: [],
            hiddenMenu: false
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
            // console.log('NEW MOVIES: ', newMovies);
            state.movies = newMovies;
        },

        fetchMovies() {
            this.queryTypeMovie = this.query.trim() === "" ?
                "/movie/popular" :
                "/search/movie";
            const parameters = this.queryTypeMovie === "/movie/popular" ?
                {
                    api_key: state.apiKey
                 }
                :
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
                    // console.log('OG MOVIES: ', res);
                    this.getMovies();
                    this.fetchActionMovies();
                    this.fetchFantasyMovies();
                    this.fetchCrimeMovies();
                });
        },

        fetchActionMovies() {
            const actionMovies = new Array();
            state.movies.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genres[0] === genreId) actionMovies.push(element);
                }
            });
            if(actionMovies.length < 20 && state.query === '') {
                const queryTypeMovie = "/movie/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeMovie}`, {
                        params: parameters
                    })

                    .then((res) => {
                        let i = 0;
                        const result = res.data.results;
                        while(actionMovies.length < 20 && i < actionMovies.length){
                            if(result[i].genre_ids.includes(state.genres[0])) {
                                const newObj = 
                                {
                                    id: result[i].id,
                                    title: result[i].title,
                                    original_title: result[i].original_title,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.movies.some(e => e.id === newObj.id))) actionMovies.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.actionMovies = actionMovies;
        },

        fetchFantasyMovies() {
            const fantasyMovies = new Array();
            state.movies.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genres[8] === genreId) fantasyMovies.push(element);
                }
            });
            if(fantasyMovies.length < 20 && state.query === '') {
                const queryTypeMovie = "/movie/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeMovie}`, {
                        params: parameters
                    })

                    .then((res) => {
                        let i = 0;
                        const result = res.data.results;
                        while(fantasyMovies.length < 20 && i < fantasyMovies.length){
                            if(result[i].genre_ids.includes(state.genres[8])) {
                                const newObj = 
                                {
                                    id: result[i].id,
                                    title: result[i].title,
                                    original_title: result[i].original_title,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.movies.some(e => e.id === newObj.id))) fantasyMovies.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.fantasyMovies = fantasyMovies;
        },

        fetchCrimeMovies() {
            const crimeMovies = new Array();
            state.movies.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genres[4] === genreId) crimeMovies.push(element);
                }
            });
            if(crimeMovies.length < 20 && state.query === '') {
                const queryTypeMovie = "/movie/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeMovie}`, {
                        params: parameters
                    })

                    .then((res) => {
                        let i = 0;
                        const result = res.data.results;
                        while(crimeMovies.length < 20 && i < crimeMovies.length){
                            if(result[i].genre_ids.includes(state.genres[4])) {
                                const newObj = 
                                {
                                    id: result[i].id,
                                    title: result[i].title,
                                    original_title: result[i].original_title,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.movies.some(e => e.id === newObj.id))) crimeMovies.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.crimeMovies = crimeMovies;
        },

        getTvs(){
            const newTvs = this.originalTvs.map(el => {
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
            // console.log('NEW TVS: ', newTvs);
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
                    // console.log('OG TVS: ', res.data);
                    this.getTvs();
                    this.fetchActionTvs();
                    this.fetchFantasyTvs();
                    this.fetchCrimeTvs();
                });
        },

        fetchActionTvs() {
            const actionTv = new Array();
            state.tv.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genresTv[0] === genreId) actionTv.push(element);
                }
            });
            if(actionTv.length < 20) {
                const queryTypeTv = "/tv/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeTv}`, {
                        params: parameters
                    })

                    .then((res) => {
                        // console.log('PG 2 TV', res.data);
                        let i = 0;
                        const result = res.data.results;
                        while(actionTv.length < 20 && i < actionTv.length){
                            if(result[i].genre_ids.includes(state.genresTv[0])) {
                                const newObj =
                                {
                                    id: result[i].id,
                                    title: result[i].name,
                                    original_name: result[i].original_name,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.tv.some(e => e.id === newObj.id))) actionTv.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.actionTv = actionTv;
        },

        fetchFantasyTvs() {
            const fantasyTv = new Array();
            state.tv.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genresTv[11] === genreId) fantasyTv.push(element);
                }
            });
            if(fantasyTv.length < 20) {
                const queryTypeTv = "/tv/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeTv}`, {
                        params: parameters
                    })

                    .then((res) => {
                        // console.log('PG 2 TV', res.data);
                        let i = 0;
                        const result = res.data.results;
                        while(fantasyTv.length < 20 && i < fantasyTv.length){
                            if(result[i].genre_ids.includes(state.genresTv[11])) {
                                const newObj =
                                {
                                    id: result[i].id,
                                    title: result[i].name,
                                    original_name: result[i].original_name,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.tv.some(e => e.id === newObj.id))) fantasyTv.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.fantasyTv = fantasyTv;
        },

        fetchCrimeTvs() {
            const crimeTv = new Array();
            state.tv.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genresTv[3] === genreId) crimeTv.push(element);
                }
            });
            if(crimeTv.length < 20) {
                const queryTypeTv = "/tv/popular";
                const parameters =
                {
                    api_key: state.apiKey,
                    page: 2
                 }
                axios

                    .get(`${state.baseUri}${queryTypeTv}`, {
                        params: parameters
                    })

                    .then((res) => {
                        // console.log('PG 2 TV', res.data);
                        let i = 0;
                        const result = res.data.results;
                        while(crimeTv.length < 20 && i < crimeTv.length){
                            if(result[i].genre_ids.includes(state.genresTv[3])) {
                                const newObj =
                                {
                                    id: result[i].id,
                                    title: result[i].name,
                                    original_name: result[i].original_name,
                                    lang: result[i].original_language,
                                    backdrop: result[i].backdrop_path ? `https://image.tmdb.org/t/p/w780${result[i].backdrop_path}` : null,
                                    genres: result[i].genre_ids,
                                    vote: Math.round(result[i].vote_average/2)
                                }
                                if(!(state.tv.some(e => e.id === newObj.id))) crimeTv.push(newObj)
                            }
                            i++;
                        }
                    });
            }
            state.crimeTv = crimeTv;
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
                    // console.log(res.data.genres);
                    res.data.genres.forEach(element => {
                        genres.push(element.id);
                    })
                    state.genres = genres;
                    // console.log('GENRES: ', state.genres);
                });
            
            axios
                .get(`${state.baseUri}/genre/tv/list`, {
                    params:{
                        api_key: state.apiKey
                    }
                })
                .then((res) => {
                    const genres = new Array();
                    // console.log(res.data.genres);
                    res.data.genres.forEach(element => {
                        genres.push(element.id);
                    })
                    state.genresTv = genres;
                    // console.log('GENRES TV: ', state.genres);
                });
        },

        clickHandler() {
            this.searching = true;
            setTimeout(() => {
                this.$refs.searchBar.focus();
            }, 200);
        },

        onChange(index) {
            if(!state.actionMovies.length) this.fetchActionMovies();
            if(!state.actionTv.length) this.fetchActionTvs();
            if(!state.fantasyMovies.length) this.fetchFantasyMovies();
            if(!state.fantasyTv.length) this.fetchFantasyTvs();
            if(!state.crimeMovies.length) this.fetchCrimeMovies();
            if(!state.crimeTv.length) this.fetchCrimeTvs();
            this.activeCat = index;
            state.activeCat = index;
            this.hiddenMenu = false;
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
    @import '../style/header-style.scss';


</style>