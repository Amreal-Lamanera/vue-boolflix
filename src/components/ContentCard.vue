<template>
    <div class="my_card position-relative">

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

            <div>
                <strong>Attori: </strong>
                <span v-for="actor,i in getActors()" :key="i">
                    {{ actor }}{{ i === getActors().length-1 ? '' : ', ' }}
                </span>
            </div>
        </div>
    </div>
  </template>
  
  <script>

    import GetFlags from "./GetFlags.vue";

    export default {
    props: {
        content: Object,
        actors: Array
    },
    
    methods: {
        getActors() {
            const fiveActors = [];
            if(!this.actors){
                return;
            }
            for (let i = 0; i < 5; i++) {
                if(i === this.actors.length) break;
                fiveActors.push(this.actors[i].name)
                // console.log(this.actors[i].name);
            }
            return fiveActors;
        }
    },
    components: {
        GetFlags
    }
}
  </script>
  
  <style scoped lang="scss">
  
    @import '../style/card-style.scss';
  
  </style>