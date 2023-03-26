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
            console.log(listToSearch);
            let listId, gameId; // dichiarazione delle variabili, servono per memorizzare gli id della lista e gioco specifico
            for (let i = 0; i < listToSearch.length; i++) { // iteriamo nei nomi delle due liste
                listId = this.gameLists.findIndex(list => list.name === listToSearch[i]); // andiamo a cercare l'id della lista corrispondente
                console.log(listId)
                gameId = this.gameLists[listId].games.findIndex(game => game.id === removedGame.id); // andiamo a cercare l'id del gioco cliccato
                console.log(gameId)
                if (gameId >= 0) {
                    this.gameLists[listId].games.splice(gameId, 1); // se troviamo l'id del gioco nella lista rimuoviamo l'elemento con splice
                    localStorage.setItem('gameLists', JSON.stringify(this.gameLists)); // aggiorniamo il local storage con le nuove modifiche
                    console.log(localStorage);
                    console.log(this.gameLists)
                    break; // interrompe il ciclo quando il gioco è stato trovato
                }
            }
        },
        // funzione per aggiungere un gioco alla lista Sto Giocando a
        moveGameToPlaying(playingGame) {
            const wantPlayList = this.gameLists.find(list => list.name === 'Da Giocare'); // troviamo la lista Da Giocare
            console.log(wantPlayList)
            console.log(this.gameLists)
            const gameId = wantPlayList.games.findIndex(game => game.id === playingGame.id); // trova l'id del gioco cliccato

            if (gameId >= 0) {
                const removedGame = wantPlayList.games.splice(gameId, 1)[0]; // rimuoviamo il gioco dalla lista "Da Giocare"
                console.log(removedGame)

                // aggiungiamo il gioco alla lista "Sto Giocando a"
                const playingList = this.gameLists.find(list => list.name === 'Sto Giocando a');
                console.log(playingList)
                console.log(this.gameLists)
                playingList.games.push(removedGame);

                localStorage.setItem('gameLists', JSON.stringify(this.gameLists)); // aggiorniamo il local storage
            }
        },
        // funzione per aggiungere un gioco alla lista Completati
        moveGameToCompleted(completedGame) {
            const playingList = this.gameLists.find(list => list.name === 'Sto Giocando a'); // troviamo la lista Sto Giocando a
            console.log(playingList)
            console.log(this.gameLists)
            const gameId = playingList.games.findIndex(game => game.id === completedGame.id); // trova l'id del gioco cliccato
            console.log(gameId)

            if (gameId >= 0) {
                const removedGame = playingList.games.splice(gameId, 1)[0]; // rimuoviamo il gioco dalla lista "Sto Giocando a"
                console.log(removedGame)

                // aggiungiamo il gioco alla lista "Completati"
                const completedList = this.gameLists.find(list => list.name === 'Completati');
                console.log(completedList)
                console.log(this.gameLists)
                completedList.games.push(removedGame);

                localStorage.setItem('gameLists', JSON.stringify(this.gameLists)); // aggiorniamo il local storage
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
            tutorial="In quest'app è possibile tener traccia dei tuoi giochi organizzando i tuoi progressi in pratiche liste. Il funzionamento è molto semplice, nella pagina 'Cerca un gioco' in alto a destra troverai una barra di ricerca. Basterà cercare un titolo, e cliccare su una delle due icone poste sopra la cover del singolo gioco. Sul cuore il titolo verrà aggiunto alla lista 'Da Giocare', mentre con il controller verrà aggiunto alla lista 'Sto Giocando a'. In questa pagina compariranno dunque i tuoi giochi, inoltre da qui è possibile passare un gioco alla lista 'Sto Giocando a' (icona controller), alla lista 'Completati' (icona con la spunta) oppure rimuoverlo per qualsiasi motivo. Se in una ricerca l'applicazione non fornisce nessun risultato è probabile che ci sia un blocco nell'accesso al database dei giochi. Per risolvere basta andare a questo sito https://cors-anywhere.herokuapp.com/corsdemo e cliccare sul pulsante 'Request temporary access to the demo server'" />

        <!-- liste dei giochi -->
        <section class="card_lists">
            <div class="container color_dark">
                <!-- card list titoli da giocare -->
                <div class="want_play_list mt-4">
                    <div class="card_container mt-3 mb-2 rounded-3">
                        <h5 class="text-center">Da Giocare</h5>
                        <div class="container mt-3">
                            <div class="row">
                                <div v-if="gameLists.find(list => list.name === 'Da Giocare').games.length"
                                    class="col d-flex justify-content-center flex-wrap">
                                    <!-- iteriamo nella lista specificata per stampare a schermo i singoli giochi -->
                                    <div v-for="game in gameLists.find(list => list.name === 'Da Giocare').games"
                                        :key="game.id" class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                        <div class="icons d-flex justify-content-between">
                                            <!-- icona per aggiungere un gioco alla lista 'Sto Giocando a' -->
                                            <div class="icon_container ms-1 mt-1 mb-1" @click="moveGameToPlaying(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor"
                                                    class="bi bi-controller" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" />
                                                    <path
                                                        d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
                                                </svg>
                                                <span class="label">Clicca per aggiungere a 'Sto Giocando a'</span>
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
                                <!-- se non ci sono giochi all'interno della lista Da Giocare stampiamo un messaggio a schermo -->
                                <div v-else class="d-flex justify-content-center">
                                    <p>Non ci sono giochi da giocare al momento!</p>
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
                                <div v-if="gameLists.find(list => list.name === 'Sto Giocando a').games.length"
                                    class="col d-flex justify-content-center flex-wrap">
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
                                <!-- se non ci sono giochi all'interno della lista Sto Giocando a stampiamo un messaggio a schermo -->
                                <div v-else class="d-flex justify-content-center">
                                    <p>Non ci sono giochi che stai giocando al momento!</p>
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
                                <!-- verifichiamo che esista la lista Completati e se c'è almeno un gioco al suo interno, in quel caso vengono stampati a schermo -->
                                <div v-if="gameLists.find(list => list.name === 'Completati').games.length"
                                    class="col d-flex justify-content-center flex-wrap">
                                    <!-- iteriamo nella lista specificata per stampare a schermo i singoli giochi -->
                                    <div v-for="game in gameLists.find(list => list.name === 'Completati').games"
                                        :key="game.id" class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                        <div class="icons d-flex justify-content-between">
                                            <!-- icona per rimuovere il gioco -->
                                            <div class="icon_container m-auto mt-1 mb-1 d-flex justify-content-center align-items-center"
                                                @click="removeGame(game)">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                    class="bi bi-trash3-fill align-self-center" viewBox="0 0 16 16">
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
                                <!-- se non ci sono giochi all'interno della lista Completati stampiamo un messaggio a schermo -->
                                <div v-else class="d-flex justify-content-center">
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