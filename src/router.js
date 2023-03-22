import { createRouter, createWebHistory } from 'vue-router'

import ListsView from './views/ListsView.vue'
import DiscoveryView from './views/DiscoveryView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'my-lists',
            component: ListsView
        },

        {
            path: '/discovery',
            name: 'discovery',
            component: DiscoveryView
        },

        /* {
            path: '/games/:id',
            name: 'single-game',
            component: SingleGameView
        } */

        /* {
            path: '/search-page',
            name: 'search-page',
            component: SearchView
        } */

    ]
})

export { router };