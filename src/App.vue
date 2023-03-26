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
        const gameLists = JSON.parse(localStorage.getItem('gameLists'));

        if (!gameLists) {
            const defaultLists = [
                { name: 'Da Giocare', games: [] },
                { name: 'Sto Giocando a', games: [] },
                { name: 'Completati', games: [] }
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
