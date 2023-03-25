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
        // Carica i giochi dal localStorage all'avvio dell'app
        const gameListsFromStorage = JSON.parse(localStorage.getItem('gameLists'));
        console.log(gameListsFromStorage);
        if (gameListsFromStorage) {
            // Se ci sono dati salvati, aggiungi le eventuali nuove liste mancanti
            const existingListsIds = gameListsFromStorage.map(list => list.id);
            if (!existingListsIds.includes(1)) {
                gameListsFromStorage.push({ id: 1, name: "Da Giocare", games: [] });
            }
            if (!existingListsIds.includes(2)) {
                gameListsFromStorage.push({ id: 2, name: "Sto Giocando a", games: [] });
            }
            if (!existingListsIds.includes(3)) {
                gameListsFromStorage.push({ id: 3, name: "Completati", games: [] });
            }
            this.gameLists = gameListsFromStorage;
        } else {
            // Se non ci sono dati salvati, inizializza la lista con i giochi di default
            this.gameLists = [
                { id: 1, name: "Da Giocare", games: [] },
                { id: 2, name: "Sto Giocando a", games: [] },
                { id: 3, name: "Completati", games: [] },
            ];
            localStorage.setItem("gameLists", JSON.stringify(this.gameLists));
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
