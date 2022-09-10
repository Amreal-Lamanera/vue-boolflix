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
    
                <img :src="getSrc(tv.original_language)" alt="" v-if="getSrc(tv.original_language)">
    
                <span v-else>
                    {{tv.original_language}}
                </span>
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

    export default {
        props: {
            tv: Object
        },
        methods: {
            getSrc(lang) {
                let src = "https://flagcdn.com/16x12/";
                switch (lang) {
                    case "it":
                        src += "it";
                        break;
                    case "es":
                        src += "es";
                        break;
                    case "en":
                        src += "gb-eng";
                        break;
                    case "ko":
                        src += "kr";
                        break;
                    case "ja":
                        src += "jp";
                        break;
                    case "te":
                        src += "in";
                        break;
                    default:
                        return false;
    }
    src += ".png";
    return src;
            },
            getImgTv(tv) {
                if (tv.backdrop_path === null)
                    return false;
                return `https://image.tmdb.org/t/p/w780${tv.backdrop_path}`;
            },
            getVote(vote) {
                return Math.floor(vote / 2);
                // return vote
            }
        },
    }
  </script>
  
  <style scoped lang="scss">

    @import '../style/card-style.scss'
  
  </style>