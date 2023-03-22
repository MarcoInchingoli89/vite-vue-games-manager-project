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
                data: 'fields name; search "' + searchInput + '"; limit 20;', // parametri di ricerca
                proxy: {
                    host: 'https://cors-anywhere.herokuapp.com/' //server intermediario per aggirare il CORS del server di igdb
                }
            };
            //Chiamata axios
            axios.request(config.proxy.host + config.url, config) //passiamo i dati di configurazione e il server intermediario
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
        <!-- dal componente AppSearch puntiamo alla funzione nella view Discovery con un emit -->
        <AppSearch @search="searchGames" />
        <section class="cards_discovery">
            <div class="container color_dark">
                <!-- card titoli recenti -->
                <div class="want_play_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Giochi recenti</h5>
                    </div>
                </div>
                <!-- card titoli popolari -->
                <div class="playing_list mt-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Giochi popolari</h5>
                    </div>
                </div>
                <!-- card titoli in arrivo -->
                <div class="played_list mt-4 mb-4">
                    <div class="card border-0 shadow-lg">
                        <h5 class="text-center">Giochi in arrivo</h5>
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