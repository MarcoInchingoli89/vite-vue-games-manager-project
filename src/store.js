import {
    reactive
} from 'vue'

//Variabili global state
export const store = reactive({
    api_url_games: 'https://api.igdb.com/v4/games', // l'url per accedere alla ricerca dei giochi
    games: null, // array dove andiamo a salvare i risultati della nostra ricerca
    client_id: '4zqmuac7m32o7c7ptuydbgt54pjl74', // id utente per l'accesso all'api
    access_token: '2kpggwe3djgc9o0kiudidccrutq309', // token autorizzazione accesso api
    searchInput: '', // input della nostra ricerca
})