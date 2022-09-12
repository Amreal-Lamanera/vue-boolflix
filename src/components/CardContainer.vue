<template>
  <div class="card-container">
            <div class="my-cards position-relative" ref="container">
                <div class="arrow prev" @click="movePrev" ref="arrow_prev">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </div>
                <div 
                    v-for="el,i in content"
                    :key="el.id"
                    class="card-wrapper"
                    :class="[dim === 1 ? 'no-scale' : i === moveCount ? 'translateR' : i === moveCount + dim - 1 ? 'translateL' : '', zindex === i ? 'more_index' : '']"
                    @mouseenter="zindex = i"
                >
                    <ContentCard :content="el" :tv="tv" />
                </div>
                <div class="arrow next" @click="moveNext" ref="arrow_next">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </div>
            </div>
        </div>
</template>

<script>
    import ContentCard from './ContentCard.vue';

    export default {
        props: {
            content: Array,
            tv: Boolean
        },
    /**************************************************
        DATA
    **************************************************/
    data() {
        return {
            moveCount: 0,
            windowWidth: window.innerWidth,
            dim: null,
            padding: null,
            casts: [],
            zindex: -1
        };
    },

    /**************************************************
        COMPUTED
    **************************************************/
    computed: {
        contentLen() {
            return this.content.length;
        },
    },

    /**************************************************
        METHODS
    **************************************************/
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },

        moveNext() {

            const cardDim = (this.windowWidth-this.padding)/this.dim;
            // console.log(cardDim);
            
            if(this.contentLen <= this.dim) return;
            
            if(this.moveCount === this.contentLen-this.dim) {
                this.moveCount = -1;
            }

            this.$refs.container.style.transform = `translateX(${-cardDim * (this.moveCount + 1)}px)`;
            this.$refs.arrow_next.style.transform = `translateX(${cardDim * (this.moveCount + 1)}px)`;
            this.$refs.arrow_prev.style.transform = `translateX(${cardDim * (this.moveCount + 1)}px)`;

            this.moveCount++;
        },
        movePrev() {
            if(this.moveCount === 0) {
                this.moveCount = this.contentLen-this.dim-1;
                this.moveNext();
                return;
            }
            this.moveCount-=2;
            this.moveNext();
        },
        resetMove(){
            this.moveCount = 0;
            try{
                this.$refs.container.style.transform = `translateX(0)`;
                this.$refs.arrow_next.style.transform = `translateX(0)`;
                this.$refs.arrow_prev.style.transform = `translateX(0)`;
            } catch {
                return;
            }
        },
    },

    /**************************************************
        WATCHERS
    **************************************************/
    watch: {
        content: function() {
            this.resetMove();
        },
        windowWidth: function() {
            if(this.windowWidth < 576)   this.dim = 1;
            else if(this.windowWidth < 768)  this.dim = 2;
            else if(this.windowWidth < 992)  this.dim = 3;
            else if(this.windowWidth < 1400) this.dim = 4;
            else this.dim = 5;
            this.moveCount -= 1;
            this.moveNext();
        }
    },

    /**************************************************
        COMPONENTS
    **************************************************/
    components: {
    ContentCard,
},

    /**************************************************
        MOUNTED
    **************************************************/
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            if(this.windowWidth < 576)
                this.dim = 1;
            else if(this.windowWidth < 768) this.dim = 2;
            else if(this.windowWidth < 992) this.dim = 3;
            else if(this.windowWidth < 1200) this.dim = 4;
            else this.dim = 5;

            if(this.windowWidth < 992) this.padding = 32;
            else this.padding = 96;
        })
    },
}

</script>

<style lang="scss" scoped>

    @import '../style/card-style.scss';

</style>