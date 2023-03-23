<script>
import axios from 'axios'
import { store } from '../store'
import AppSearch from '../components/AppSearch.vue'
export default {
    name: 'DiscoveryView',
    components: { AppSearch },
    data() {
        return {
            store
        }
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
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <!-- importazione della searchbar, la barra è legata alla funzione di ricerca -->
        <AppSearch @search="searchGames" />
        <section class="cards_discovery">
            <div class="container color_dark">
                <div class="card_container mt-4 rounded-3">
                    <div class="container">
                        <div class="row">
                            <div class="col d-flex justify-content-center flex-wrap">
                                <!-- elemento di loading, se true viene mostrata la gif di caricamento -->
                                <div v-if="store.loading"
                                    class="loading d-flex justify-content-center align-items-center vh-100">
                                    <img src="../../public/img/loading-bar.gif" alt="Loading...">
                                </div>
                                <!-- altrimenti se è false vengono mostrati a schermo i giochi dall'array games -->
                                <div v-for="game in store.games" class="game_card border-0 rounded-3 shadow-lg mx-2 my-3">
                                    <!-- se il gioco ha una cover viene stampata a schermo -->
                                    <img v-if="game.cover" :src="`https://${game.cover.url}`"
                                        class="card-img-top rounded-top" alt="Game cover">
                                    <!-- se il gioco non ha una cover viene inserita un'immagine di placeholder -->
                                    <img v-else src="../../public/img/placeholder-cover.jpg"
                                        class="card-img-top rounded-top placeholder_img" alt="Game cover">
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
    overflow-y: scroll;


    .game_card {
        width: 150px;
        background-color: $gm-darker;
        color: $gm-secondary;
    }

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .placeholder_img {
        height: 150px;
    }

    .card_title {
        font-size: 0.8rem;
    }
}

/*#region Scrollbar Style */

// Stile generale della scrollbar
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

// Impostazioni del colore della scrollbar
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    height: 10px;
}

// Impostazioni del colore della scrollbar al passaggio del mouse
::-webkit-scrollbar-thumb:hover {
    background-color: $gm-darker;
}

// Impostazioni del colore della track della scrollbar
::-webkit-scrollbar-track {
    background-color: $gm-primary;
    border-radius: 10px;
}

/*#endregion Scrollbar Style */
</style>