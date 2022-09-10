<template>
    <div class="my_card position-relative">

        <div v-if="getImg(movie)">
            <img :src="getImg(movie)" alt="" class="poster">
        </div>

        <div :class="getImg(movie)? 'layover' : 'default_img'">
            <div>
                <strong>Titolo: </strong>{{ movie.title }}
            </div>

            <div>
                <strong>Titolo originale: </strong>{{ movie.original_title }}
            </div>

            <div>

                <strong>Lingua originale: </strong>
    
                <GetFlags :array="movie" class="d-inline" />

            </div>
            
            <div>
                <strong>Valutazione: </strong>
                <font-awesome-icon class="star" icon="fa-solid fa-star" v-for="n,i in getVote(movie.vote_average)" :key="i" />
                <font-awesome-icon class="star" icon="fa-regular fa-star" v-for="n,i in (5 - getVote(movie.vote_average))" :key="5-i" />
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import GetFlags from "./GetFlags.vue";

    export default {
    props: {
        movie: Object
    },
    methods: {
        getImg(movie) {
            if (movie.backdrop_path === null)
                return false;
            return `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
        },
        getVote(vote) {
            return Math.floor(vote / 2);
            // return vote
        }
    },
    components: { GetFlags }
}
  </script>
  
  <style scoped lang="scss">
  
    @import '../style/card-style.scss';
  
  </style>