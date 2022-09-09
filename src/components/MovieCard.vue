<template>
    <div class="my_card position-relative">

        <div v-if="getImg(movie)">
            <img :src="getImg(movie)" alt="" class="poster">
        </div>

        <div :class="getImg(movie)? 'layover' : 'default_img p-4'">
            <strong>Titolo: </strong>{{ movie.title }}
            <strong>Titolo originale: </strong>{{ movie.original_title }}
            <div>

                <strong>Lingua originale: </strong>
    
                <img :src="getSrc(movie.original_language)" alt="" v-if="getSrc(movie.original_language)">
    
                <span v-else>
                    {{movie.original_language}}
                </span>

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
      export default {
          props: {
              movie: Object
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
            getImg(movie) {
                if (movie.backdrop_path === null)
                    return false;
                return `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`;
            },
            getVote(vote) {
                return Math.floor(vote / 2);
                // return vote
            }
        },
      }
  </script>
  
  <style scoped lang="scss">
  
    @import '../style/card-style.scss';
  
  </style>