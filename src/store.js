import {
    reactive
} from 'vue'

//Variabili global state
export const store = reactive({
    api_url_games: 'https://api.igdb.com/v4/games', // l'url per accedere alla ricerca dei giochi
    games: null, // array dove andiamo a salvare i risultati della nostra ricerca
    client_id: '4zqmuac7m32o7c7ptuydbgt54pjl74', // id utente per l'accesso all'api
    access_token: '2kpggwe3djgc9o0kiudidccrutq309', // token autorizzazione accesso api
    searchInput: '', // input della nostra ricerca,
    loading: false // variabile loading per il caricamento dei giochi dall'api, inizialmente è settata su false per non renderla visibile
})

//Array delle liste in ListsView
export const gameLists = [
    { id: 1, name: 'Da Giocare', games: [] },
    { id: 2, name: 'Sto Giocando a', games: [] },
];