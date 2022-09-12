<template>

  <main class="container-fluid overflow-hidden p-4">

    <div class="films mb-5" v-if="movies.length !== 0">

        <h3>
            Film {{ query === '' ? 'popolari su Boolflix' : 'trovati'}}
        </h3>
        <CardContainer :content="movies" :tv="false" />

    </div>

    <div class="films action mb-5" v-if="movies.length !== 0">
        <h3>
            Film di azione
        </h3>
        <CardContainer :content="actionMovies" :tv="false" />
    </div>

    <div class="series" v-if="tvs.length !== 0">

        <h3>
            Serie {{ query === '' ? 'popolari su Boolflix' : 'trovate'}}
        </h3>
        <CardContainer :content="tvs" :tv="true" />
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
        actionMovies() {
            const actionMovies = new Array();
            state.movies.forEach(element => {
                for (let i = 0; i < element.genres.length; i++) {
                    const genreId = element.genres[i];
                    if(state.genres[0] === genreId) actionMovies.push(element);
                }
            });
            console.log('ACTION MOVIES: ', actionMovies);
            return actionMovies;
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