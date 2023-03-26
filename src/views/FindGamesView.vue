<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { store } from '../store'
import AppSearch from '../components/AppSearch.vue'
export default {
    name: 'FindGamesView',
    components: { AppSearch },
    data() {
        return {
            store,
        };
    },
    methods: {
        // funzione per la ricerca dei giochi
        searchGames() {
            console.log('Ho cliccato')
            const searchInput = this.store.searchInput;
            console.log(searchInput);
            // configurazione variabili axios per l'api
            const config = {
                url: `${this.store.api_url_games}`, //url dell'api
                method: 'POST',
                // configurazione di accesso igdb
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${this.store.client_id}`,
                    Authorization: `bearer ${this.store.access_token}`,
                },
                data: 'fields name, cover.url; search "' + searchInput + '"; limit 100;', // parametri di ricerca
                proxy: {
                    host: 'https://cors-anywhere.herokuapp.com/' //server intermediario per aggirare il CORS del server di igdb
                }
            };
            //Chiamata axios
            this.store.loading = true; // attiva il sistema di loading al momento della chiamata dell'api
            this.store.games = ''; // svuota l'array games nel caso si abbia già fatto una ricerca per rimuovere i risultati da schermo
            axios.request(config.proxy.host + config.url, config) //passiamo i dati di configurazione, il server api e il server intermediario
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    console.log(store);
                    store.games = response.data; // i dati della ricerca vengono salvati in un array
                    console.log(store.games);
                })

                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.store.loading = false; // loading viene settato su false così da disattivare il caricamento e mostrare i risultati della ricerca
                })
        },
        // Funzione per aggiungere un gioco ad una lista
        addToGameList(newGame, listId) { // passiamo alla funzione il gioco e l'id corrispondente ad una lista
            console.log('Sto cliccando');
            let gameLists = JSON.parse(localStorage.getItem('gameLists')); // creiamo una copia dell'oggetto gameLists

            const list = gameLists.find(list => list.id === listId); // cerca la lista corrispondente nell'array gameLists
            console.log(list)
            if (list) {
                const existingGame = list.games.find(game => game.id === newGame.id); // trovata la lista controlliamo se il gioco esiste già al suo interno
                if (!existingGame) {
                    list.games.push(newGame); // se il gioco non esiste viene pushato, altrimenti non facciamo nulla

                    const completedList = gameLists.find(list => list.name === 'Completati'); // cerchiamo con find la lista Completati e la salviamo in una costante
                    if (!completedList) { // se la lista Completati non esiste, la creiamo e la andiamo a pushare nell'array gameLists
                        gameLists.push({
                            id: 3,
                            name: 'Completati',
                            games: []
                        });
                    }
                    localStorage.setItem('gameLists', JSON.stringify(gameLists)); // il gioco aggiunto viene salvato in un local storage per renderlo persistente
                    console.log(localStorage)
                } else {
                    // Messaggio di errore
                    Swal.fire({
                        title: 'Gioco già inserito',
                        text: 'Il gioco selezionato è già presente nella lista.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        },

    }
}
</script>

<template>
    <div class="container-fluid">
        <!-- importazione della searchbar, la barra è legata alla funzione di ricerca -->
        <AppSearch @search="searchGames" />
        <section class="cards_findgames">
            <div class="container color_dark">
                <div class="card_container mt-3 mb-2 rounded-3">
                    <div class="container mt-3">
                        <div class="row">
                            <div class="col d-flex justify-content-center flex-wrap">
                                <!-- elemento di loading, se è true viene mostrata la gif di caricamento -->
                                <div v-if="store.loading"
                                    class="loading d-flex justify-content-center align-items-center vh-100">
                                    <img src="../../public/img/loading-bar.gif" alt="Loading...">
                                </div>
                                <!-- altrimenti se è false vengono mostrati a schermo i giochi dall'array games -->
                                <div v-for="game in store.games" :key="game.id"
                                    class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                    <div class="icons d-flex justify-content-between">
                                        <!-- icona per aggiungere un gioco alla lista 'Da Giocare' -->
                                        <div class="icon_container ms-1 mt-1 mb-1" @click="addToGameList(game, 1)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor"
                                                class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>
                                            <span class="label">Clicca per aggiungere a 'Da Giocare'</span>
                                        </div>
                                        <!-- icona per aggiungere un gioco alla lista 'Sto Giocando a' -->
                                        <div class="icon_container me-1 mt-1 mb-1" @click="addToGameList(game, 2)">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor"
                                                class="bi bi-controller" viewBox="0 0 16 16">
                                                <path
                                                    d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" />
                                                <path
                                                    d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
                                            </svg>
                                            <span class="label">Clicca per aggiungere a 'Sto Giocando a'</span>
                                        </div>
                                    </div>
                                    <!-- se il gioco ha una cover viene stampata a schermo -->
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
        </section>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.card_container {
    height: 1350px;
}
</style>