<template>
  <div class="list-container">
    <ul class="list-wrapper">
        <li 
            v-for="category,i in categories"
            :key="i"
            class="element"
            :class="i===active? 'active' : ''"
            @click="$emit('changeCat', i)"
        >
            {{ category }}
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        props: {
            active: Number
        },
        data() {
            return {
                categories: ['Home', 'Film', 'Serie TV']
            }
        },
    }
</script>

<style scoped lang="scss">

    @import '../style/general.scss';

    .list-container {

        .list-wrapper{
            display: flex;
            gap: 0.5rem;
            align-items: center;

            .element {
                color: rgb(197, 197, 197);
                cursor: pointer;

                &.active {
                    color: #FFF;
                    font-weight: bold;
                }
            }
        }
    }

</style>