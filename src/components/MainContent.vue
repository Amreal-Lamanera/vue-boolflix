<template>

  <main class="container-fluid overflow-hidden p-5">

    <div class="films mb-5" v-if="movies.length !== 0 && activeCat < 2">

        <h3>
            Film {{ query === '' ? 'popolari su Boolflix' : 'trovati'}}
        </h3>
        <CardContainer :content="movies" :tv="false" />

    </div>

    <div class="films action mb-5" v-if="actionMovies.length !== 0 && (activeCat === 1 || activeCat === 3)">
        <h3>
            Film di azione
        </h3>
        <CardContainer :content="actionMovies" :tv="false" />
    </div>

    <div class="series" v-if="tvs.length !== 0">

        <h3>
            Serie {{ query === '' ? 'popolari su Boolflix' : 'trovate'}}
        </h3>
        <CardContainer :content="tvs" :tv="true" class="pb-5" />
    </div>
</main>

</template>

<script>
    import state from '../store';
    import CardContainer from './CardContainer.vue';

    export default {

        /**************************************************
            COMPUTED
        **************************************************/
        computed: {
            query() {
                return state.query;
            },
            movies() {
                console.log('MOVIES: ', state.movies);
                return state.movies;
            },
            tvs() {
                return state.tv;
            },
            activeCat() {
                return state.activeCat;
            },
            actionMovies() {
                return state.actionMovies;
            }
        },


        /**************************************************
            COMPONENTS
        **************************************************/
        components: {
            CardContainer
        },

}

</script>

<style lang="scss" scoped>

    @import '../style/card-style.scss';

</style>