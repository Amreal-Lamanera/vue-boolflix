<template>
  <div class="list-container">
    <ul class="list-wrapper">
        <li 
            v-for="category,i in categories"
            :key="i"
            class="element"
            :class="i===active? 'active' : ''"
            @click="active=i, $emit('changeCat', category)"
        >
            {{ category }}
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
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