import { createRouter, createWebHistory } from 'vue-router'

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

        {
            path: '/games/:id',
            name: 'single-game',
            component: SingleGameView
        }

    ]
})

export { router };