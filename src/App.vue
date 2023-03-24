<script>
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import { defaultGameLists } from './store';
export default {
    data() {
        return {
            gameLists: JSON.parse(localStorage.getItem('gameLists')) || [
                { id: 1, name: 'Da Giocare', games: [] },
                { id: 2, name: 'Sto Giocando a', games: [] },
            ]
        }
    },

    components: {
        AppNav,
        AppFooter,
    },
}
</script>

<template>
    <AppNav />
    <RouterView />
    <AppFooter />
</template>

<style lang="scss">
@use './styles/general.scss';
</style>
