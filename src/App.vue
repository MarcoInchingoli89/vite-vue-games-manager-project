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
        }
    },
    created() {
        // carica i giochi dal local storage oppure se è vuoto imposta delle liste di default
        const gameLists = JSON.parse(localStorage.getItem('gameLists'));

        if (!gameLists) {
            const defaultLists = [
                { id: 1, name: 'Da Giocare', games: [] },
                { id: 2, name: 'Sto Giocando a', games: [] },
                { id: 3, name: 'Completati', games: [] }
            ];
            localStorage.setItem('gameLists', JSON.stringify(defaultLists));
            this.gameLists = defaultLists;
        } else {
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
