<template>
    <div class="my_card position-relative">

        <div v-if="getImgTv(tv)">
            <img :src="getImgTv(tv)" alt="" class="poster">
        </div>

        <div :class="getImgTv(tv) ? 'layover' : 'default_img'">
            <div>
                <strong>Titolo: </strong>{{ tv.name }}
            </div>

            <div>
                <strong>Titolo originale: </strong>{{ tv.original_name }}
            </div>

            <div>
                <strong>Lingua originale: </strong>
    
                <GetFlags :array="tv" class="d-inline" />
            </div>

            <div>
                <strong>Valutazione: </strong>
                <font-awesome-icon class="star" icon="fa-solid fa-star" v-for="n,i in getVote(tv.vote_average)" :key="5+i" />
                <font-awesome-icon class="star" icon="fa-regular fa-star" v-for="n,i in (5 - getVote(tv.vote_average))" :key="10-i" />
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import GetFlags from "./GetFlags.vue";

    export default {
        props: {
            tv: Object
        },
        methods: {
            getImgTv(tv) {
                if (tv.backdrop_path === null)
                    return false;
                return `https://image.tmdb.org/t/p/w780${tv.backdrop_path}`;
            },
            getVote(vote) {
                return Math.floor(vote / 2);
                // return vote
            },
        },
        components: { 
            GetFlags
        }
    }
  </script>
  
  <style scoped lang="scss">

    @import '../style/card-style.scss'
  
  </style>