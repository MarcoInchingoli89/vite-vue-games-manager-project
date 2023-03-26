import { createRouter, createWebHistory } from 'vue-router'

import ListsView from './views/ListsView.vue'
import FindGamesView from './views/FindGamesView.vue'

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
            component: FindGamesView
        },

    ]
})

export { router };