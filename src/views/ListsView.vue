<script>
import AppTutorial from '../components/AppTutorial.vue'
import { gameLists } from '../store';
export default {
    name: 'ListsView',
    components: { AppTutorial },
    data() {
        // assegniamo i giochi salvati a gameLists subito all'avvio così da farli comparire al lancio dell'applicazione, se non ci sono nuovi giochi gli assegniamo un array vuoto
        const storedLists = JSON.parse(localStorage.getItem('gameLists')) || [];
        return {
            gameLists: storedLists,

        }
    },
    methods: {
        // funzione per rimuovere un gioco al click dell'icona
        removeGame(removedGame) {
            console.log('Ho cliccato');
            const listToSearch = ['Da Giocare', 'Sto Giocando a', 'Completati']; // costante con i nomi delle due liste in cui cercare il gioco da rimuovere
            let listId, gameId; // dichiarazione delle variabili, servono per memorizzare gli id della lista e gioco specifico
            for (let i = 0; i < listToSearch.length; i++) { // iteriamo nei nomi delle due liste
                listId = this.gameLists.findIndex(list => list.name === listToSearch[i]); // andiamo a cercare l'id della lista corrispondente
                gameId = this.gameLists[listId].games.findIndex(game => game.id === removedGame.id); // andiamo a cercare l'id del gioco cliccato
                if (gameId >= 0) {
                    this.gameLists[listId].games.splice(gameId, 1); // se troviamo l'id del gioco nella lista rimuoviamo l'elemento con splice
                    localStorage.setItem('gameLists', JSON.stringify(this.gameLists)); // aggiorniamo il local storage con le nuove modifiche
                    break; // interrompe il ciclo quando il gioco è stato trovato
                }
            }
        },
        moveGameToCompleted(completedGame) {
            const playingList = this.gameLists.find(list => list.name === 'Sto Giocando a');
            console.log(playingList)
            console.log(this.gameLists)
            const gameId = playingList.games.findIndex(game => game.id === completedGame.id);
            console.log(gameId)

            if (gameId >= 0) {
                // Rimuovi il gioco dalla lista "Sto Giocando a"
                const removedGame = playingList.games.splice(gameId, 1)[0];
                console.log(removedGame)

                // Aggiungi il gioco alla lista "Completati"
                const completedList = this.gameLists.find(list => list.name === 'Completati');
                console.log(completedList)
                console.log(this.gameLists)
                completedList.games.push(removedGame);

                // Aggiorna il localStorage
                localStorage.setItem('gameLists', JSON.stringify(this.gameLists));
            }
        }
    },
    mounted() {
        // recupero i dati salvati nel local storage e converto il JSON in un array di oggetti con il metodo parse
        this.completedList = this.gameLists.find(list => list.name === "Completati");
        const storedLists = JSON.parse(localStorage.getItem('gameLists'));
        // se i giochi vengono caricati con splice andiamo ad aggiornare la nostra gameLists importata dallo store con i giochi recuperati dal local storage che abbiamo salvato nella costante storedLists
        if (storedLists) {
            gameLists.splice(0, gameLists.length, ...storedLists);
        }
    },
}
</script>

<template>
    <div class="container-fluid">

        <!-- intro tutorial -->
        <AppTutorial welcome="Benvenuto in Games Keeper giocatore!"
            tutorial="In quest'app è possibile tener traccia dei tuoi giochi organizzando i tuoi progressi in pratiche liste. Il funzionamento è molto semplice, nella pagina 'Cerca un gioco' in alto a destra troverai una barra di ricerca. Basterà cercare un titolo, e cliccare su una delle due icone poste sopra la cover del singolo gioco. Sul cuore il titolo verrà aggiunto alla lista 'Da Giocare', mentre con il controller verrà aggiunto alla lista 'Sto Giocando a'. In questa pagina compariranno dunque i tuoi giochi, inoltre da qui è possibile passare un gioco alla lista 'Completati' oppure rimuoverlo per qualsiasi motivo." />

        <!-- liste dei giochi -->
        <section class="card_lists">
            <div class="container color_dark">
                <!-- card list titoli da giocare -->
                <div class="want_play_list mt-4">
                    <div class="card_container mt-3 mb-2 rounded-3">
                        <h5 class="text-center">Da Giocare</h5>
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col d-flex justify-content-center flex-wrap">
                                    <!-- iteriamo nella lista specificata per stampare a schermo i singoli giochi -->
                                    <div v-for="game in gameLists.find(list => list.name === 'Da Giocare').games"
                                        :key="game.id" class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                        <div class="icons d-flex justify-content-between">
                                            <!-- icona per aggiungere un gioco alla lista 'Completati' -->
                                            <div class="icon_container ms-1 mt-1 mb-1" @click="moveGameToCompleted(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                </svg>
                                                <span class="label">Clicca per aggiungere a 'Completati'</span>
                                            </div>
                                            <!-- icona per rimuovere il gioco -->
                                            <div class="icon_container me-1 mt-1 mb-1" @click="removeGame(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                                <span class="label">Clicca per rimuovere il gioco</span>
                                            </div>
                                        </div>
                                        <img v-if="game.cover" :src="`https://${game.cover.url}`" class="card-img-top"
                                            alt="Game cover">
                                        <!-- se il gioco non ha una cover viene inserita un'immagine di placeholder -->
                                        <img v-else src="../../public/img/placeholder-cover.jpg"
                                            class="card-img-top placeholder_img" alt="Game cover">
                                        <div class="card_body p-0">
                                            <h5 class="card_title text-center">{{ game.name }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- card list titoli in corso -->
                <div class="playing_list mt-4">
                    <div class="card_container mt-3 mb-2 rounded-3">
                        <h5 class="text-center">Sto Giocando a</h5>
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col d-flex justify-content-center flex-wrap">
                                    <!-- iteriamo nella lista specificata per stampare a schermo i singoli giochi -->
                                    <div v-for="game in gameLists.find(list => list.name === 'Sto Giocando a').games"
                                        :key="game.id" class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                        <div class="icons d-flex justify-content-between">
                                            <!-- icona per aggiungere un gioco alla lista 'Completati' -->
                                            <div class="icon_container ms-1 mt-1 mb-1" @click="moveGameToCompleted(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                </svg>
                                                <span class="label">Clicca per aggiungere a 'Completati'</span>
                                            </div>
                                            <!-- icona per rimuovere il gioco -->
                                            <div class="icon_container me-1 mt-1 mb-1" @click="removeGame(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                                <span class="label">Clicca per rimuovere il gioco</span>
                                            </div>
                                        </div>
                                        <img v-if="game.cover" :src="`https://${game.cover.url}`" class="card-img-top"
                                            alt="Game cover">
                                        <!-- se il gioco non ha una cover viene inserita un'immagine di placeholder -->
                                        <img v-else src="../../public/img/placeholder-cover.jpg"
                                            class="card-img-top placeholder_img" alt="Game cover">
                                        <div class="card_body p-0">
                                            <h5 class="card_title text-center">{{ game.name }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- card list titoli completati -->
                <div class="played_list mt-4 mb-4">
                    <div class="card_container border-0 shadow-lg">
                        <h5 class="text-center">Completati</h5>
                        <div class="container mt-3">
                            <div class="row">
                                <div v-if="completedList && completedList.games.length"
                                    class="col d-flex justify-content-center flex-wrap">
                                    <!-- iteriamo nella lista specificata per stampare a schermo i singoli giochi -->
                                    <div v-for="game in completedList" :key="game.id"
                                        class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                        <div class="icons d-flex justify-content-between">
                                            <!-- icona per rimuovere il gioco -->
                                            <div class="icon_container me-1 mt-1 mb-1 text-center"
                                                @click="removeGame(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                                <span class="label">Clicca per rimuovere il gioco</span>
                                            </div>
                                        </div>
                                        <img v-if="game.cover" :src="`https://${game.cover.url}`" class="card-img-top"
                                            alt="Game cover">
                                        <!-- se il gioco non ha una cover viene inserita un'immagine di placeholder -->
                                        <img v-else src="../../public/img/placeholder-cover.jpg"
                                            class="card-img-top placeholder_img" alt="Game cover">
                                        <div class="card_body p-0">
                                            <h5 class="card_title text-center">{{ game.name }}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center" v-else>
                                    <p>Non ci sono giochi completati al momento!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.card_container {
    height: 450px;
}

p {
    font-family: $gm-press-start;
}
</style>