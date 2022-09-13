<template>
    <div class="my_card position-relative" @click="getActors">
        <h3 class="content-title">
            {{ content.title }}
        </h3>

        <div v-if="content.backdrop">
            <img :src="content.backdrop" alt="" class="poster">
        </div>

        <div :class="content.backdrop? 'layover' : 'default_img'">
            <div>
                <strong>Titolo: </strong>{{ content.title }}
            </div>

            <div>
                <strong>Titolo originale: </strong>{{ content.original_title }}
            </div>

            <div>

                <strong>Lingua originale: </strong>
    
                <GetFlags :array="content" class="d-inline" />

            </div>
            
            <div>
                <strong>Valutazione: </strong>
                <font-awesome-icon class="star" icon="fa-solid fa-star" v-for="n,i in content.vote" :key="i" />
                <font-awesome-icon class="star" icon="fa-regular fa-star" v-for="n,i in 5 - content.vote" :key="5-i" />
            </div>

            <div v-if="!castDone">
                <span>Clicca per mostrare gli attori principali...</span>
            </div>

            <div v-else>
                <strong>Attori: </strong>
                <span v-for="actor,i in cast" :key="i">
                    {{ actor }}{{ i === cast.length-1 ? '' : ', ' }}
                </span>
            </div>
        </div>
    </div>
  </template>
  
  <script>

    import axios from 'axios';
    import state from '../store';

    import GetFlags from "./GetFlags.vue";

    export default {
    props: {
        content: Object,
        // actors: Array
        tv: Boolean
    },

    data() {
        return {
            cast: [],
            castDone: false
        }
    },
    
    methods: {
        getActors() {
            if(!this.castDone){
                const cast = [];
                if(this.content.length === 0) return;
                
                axios
                .get(`${state.baseUri}/${this.tv ? 'tv' : 'movie'}/${this.content.id}/credits`, {
                    params: {
                        api_key: state.apiKey,
                        language: "it-IT",
                    }
                })
                .then((res) => {
                    const resolution = res.data.cast;
                    for (let i = 0; i < 5; i++) {
                        if(i === resolution.length){
                            break;
                        }
                        cast.push(resolution[i].name)
                    }
                })
                .finally(() => {
                    console.log('CAST: ', cast);
                    this.cast = cast;
                    this.castDone = true
                })
            }
        }
    },
    components: {
        GetFlags
    }
}
  </script>
  
  <style scoped lang="scss">
  
    @import '../style/card-style.scss';

    .card-wrapper:hover .content-title {
        opacity: 0;
        transition-delay: 500ms;
    }

    .content-title {
        font-size: 0.75rem;
        text-align: center;
        padding-bottom: 0;
        color: #FFF;
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 50%;
        transform: translateX(-50%);
    }
  
  </style>