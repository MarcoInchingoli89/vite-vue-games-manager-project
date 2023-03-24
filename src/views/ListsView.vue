<script>
import AppTutorial from '../components/AppTutorial.vue'
import { gameLists } from '../store';
export default {
    name: 'ListsView',
    components: { AppTutorial },
    data() {
        return {
            gameLists: gameLists
        }
    },
}
</script>

<template>
    <div class="container-fluid">

        <!-- intro tutorial -->
        <AppTutorial welcome="Benvenuto in Games Keeper giocatore!"
            tutorial="In quest'app è possibile tener traccia dei tuoi giochi organizzando i tuoi progressi in pratiche liste. Il funzionamento è molto semplice, nella pagina 'Scopri' in alto a destra troverai una barra di ricerca. Basterà cercare un titolo, passare sopra la cover, cliccare su 'Aggiungi alla lista' e scegliere la lista desiderata. Qui compariranno tutti i tuoi giochi e se ne ha completato qualcuno basterà cliccare sull'apposita spunta al di sopra della copertina e verrà spostato in 'Completati', viceversa se hai iniziato un nuovo gioco puoi spostarlo su 'Sto giocando a' cliccando sull'apposito pulsante." />

        <section class="card_lists">
            <div class="container color_dark">
                <!-- card list titoli da giocare -->
                <div class="want_play_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Da giocare</h5>
                    </div>
                </div>
                <!-- card list titoli in corso -->
                <div class="playing_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Sto giocando a</h5>
                    </div>
                </div>
                <!-- card list titoli completati -->
                <div class="played_list mt-4 mb-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Completati</h5>
                    </div>
                </div>
            </div>

        </section>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.card {
    height: 450px;
}
</style>