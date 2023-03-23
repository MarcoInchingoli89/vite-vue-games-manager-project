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
                data: 'fields name, cover.url; search "' + searchInput + '"; limit 30;', // parametri di ricerca
                proxy: {
                    host: 'https://cors-anywhere.herokuapp.com/' //server intermediario per aggirare il CORS del server di igdb
                }
            };
            //Chiamata axios
            axios.request(config.proxy.host + config.url, config) //passiamo i dati di configurazione, il server api e il server intermediario
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    console.log(store);
                    store.games = response.data; // salviamo i dati della ricerca in un array
                    console.log(store.games);
                })

                .catch(function (error) {
                    console.log(error);
                })
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <!-- applichiamo la funzione di ricerca al nostro componente AppSearch -->
        <AppSearch @search="searchGames" />
        <section class="cards_discovery">
            <div class="container color_dark">
                <!-- card titoli recenti -->
                <div class="want_play_list mt-4">
                    <div class="card border-0 shadow-lg">
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.card {
    height: 1350px;
}
</style>