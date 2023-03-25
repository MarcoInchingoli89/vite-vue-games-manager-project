<script>
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
export default {
    components: {
        AppNav,
        AppFooter,
    },
    created() {
        // Carica i giochi dal localStorage all'avvio dell'app
        const gameLists = JSON.parse(localStorage.getItem('gameLists'));
        console.log(gameLists)
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
