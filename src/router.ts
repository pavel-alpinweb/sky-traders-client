import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./components/screens/Start.screen.vue"
import GameScreen from "./components/screens/Game.screen.vue"

export const routes = [
    {
        path: "/",
        component: StartScreen,
    },
    {
        path: "/game",
        component: GameScreen,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
