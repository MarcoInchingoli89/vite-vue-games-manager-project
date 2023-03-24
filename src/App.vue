<script>
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
export default {
    components: {
        AppNav,
        AppFooter,
    },
    data() {
        return {
            gameLists: [
                { id: 1, name: 'Da Giocare', games: [] },
                { id: 2, name: 'Sto Giocando a', games: [] },
            ]
        }
    },
    created() {
        // Recupera i dati dal localStorage
        const gameLists = JSON.parse(localStorage.getItem('gameLists'));
        console.log(gameLists)

        if (gameLists !== null) {
            this.gameLists = gameLists;
        }
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
