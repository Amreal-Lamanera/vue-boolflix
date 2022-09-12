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

    <div class="films action mb-5" v-if="fantasyMovies.length !== 0 && (activeCat === 1 || activeCat === 3)">
        <h3>
            Film Fantasy
        </h3>
        <CardContainer :content="fantasyMovies" :tv="false" />
    </div>

    <div class="films action mb-5" v-if="crimeMovies.length !== 0 && (activeCat === 1 || activeCat === 3)">
        <h3>
            Film Crime
        </h3>
        <CardContainer :content="crimeMovies" :tv="false" />
    </div>

    <div class="series" v-if="tvs.length !== 0 && (activeCat === 0 || activeCat === 2)">

        <h3>
            Serie {{ query === '' ? 'popolari su Boolflix' : 'trovate'}}
        </h3>
        <CardContainer :content="tvs" :tv="true" class="pb-5" />
    </div>

    <div class="films action mb-5" v-if="actionTvs.length !== 0 && (activeCat === 2 || activeCat === 3)">
        <h3>
            Serie di azione
        </h3>
        <CardContainer :content="actionTvs" :tv="true" />
    </div>

    <div class="films action mb-5" v-if="fantasyTvs.length !== 0 && (activeCat === 2 || activeCat === 3)">
        <h3>
            Serie Fantasy
        </h3>
        <CardContainer :content="fantasyTvs" :tv="true" />
    </div>

    <div class="films action mb-5" v-if="crimeTvs.length !== 0 && (activeCat === 2 || activeCat === 3)">
        <h3>
            Serie Crime
        </h3>
        <CardContainer :content="crimeTvs" :tv="true" />
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
                // console.log('MOVIES: ', state.movies);
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
            },
            actionTvs() {
                return state.actionTv;
            },
            fantasyMovies() {
                return state.fantasyMovies;
            },
            fantasyTvs() {
                return state.fantasyTv;
            },
            crimeMovies() {
                return state.crimeMovies;
            },
            crimeTvs() {
                return state.crimeTv;
            },
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

    h3 {
        font-size: 1.75rem;
    }

    @media (min-width: 992px) {
        h3 {
        font-size: 2rem;
    }
    }

</style>