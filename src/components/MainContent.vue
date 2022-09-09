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
            <div class="my_card" v-for="movie in getMovies" :key="movie.id">
                <img :src="getImg(movie)" alt="">
                <p>
                    <strong>Titolo: </strong>{{ movie.title }} <br><br>
                    <strong>Titolo originale: </strong>{{ movie.original_title }} <br><br>
                    <strong>Lingua originale: </strong>
                    <!-- {{movie.original_language}} -->
    
                    <!-- <img id="currentPhoto" :src="`https://flagcdn.com/16x12/${movie.original_language}.png`" onerror='this.style.display = "none"; flag = false'> -->
    
                    <img :src="getSrc(movie.original_language)" alt="" v-if="getSrc(movie.original_language)">
    
                    <span v-else>
                        {{movie.original_language}}
                    </span>
    
                    <br><br>
                    <strong>Valutazione: </strong>{{ movie.vote_average }}
                </p>
            </div>
        </div>

    </div>

    <div class="series">
        <h3>
            Serie
        </h3>
        <div class="my_grid">
            <div class="my_card" v-for="tv in getTv" :key="tv.id">
                <img :src="getImgTv(tv)" alt="">
                <p>
                    <strong>Titolo: </strong>{{ tv.name }} <br><br>
                    <strong>Titolo originale: </strong>{{ tv.original_name }} <br><br>
                    <strong>Lingua originale: </strong>
                    <!-- {{tv.original_language}} -->
    
                    <img :src="getSrc(tv.original_language)" alt="" v-if="getSrc(tv.original_language)">
    
                    <span v-else>
                        {{tv.original_language}}
                    </span>
    
                    <br><br>
                    <strong>Valutazione: </strong>{{ tv.vote_average }}
                </p>
            </div>
        </div>
    </div>
</main>

</template>

<script>
    // import axios from 'axios';
    import state from '../store';

    export default {
        data() {
            return {
            }
        },
        methods: {
            getSrc(lang) {
                let src = 'https://flagcdn.com/16x12/'
                switch (lang) {
                    case 'it':
                        src += 'it'
                        break;
                    case 'es':
                        src += 'es'
                        break;
                    case 'en':
                        src += 'gb-eng'
                        break;
                    case 'ko':
                        src += 'kr'
                        break;
                    case 'ja':
                        src += 'jp'
                        break;
                    case 'te':
                        src += 'in'
                        break;
                    default:
                        return false;
                }
                src += '.png';
                return src;
            },
            getImg(movie) {
                return `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`
            },
            getImgTv(tv) {
                return `https://image.tmdb.org/t/p/w300${tv.backdrop_path}`
            }
        },
        computed: {
            getMovies() {
                return state.movies;
            },
            getQuery(){
                return state.query;
            },
            getTv() {
                return state.tv;
            }
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

        .my_card {
            text-align: center;
        }
    }

</style>