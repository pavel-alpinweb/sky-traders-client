import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./components/screens/Start.screen.vue"
import GameScreen from "./components/screens/Game.screen.vue"
import TownScreen from "./components/screens/Town.screen.vue"

export const routes = [
    {
        path: "/",
        component: StartScreen,
    },
    {
        path: "/game",
        component: GameScreen,
    },
    {
        path: "/town",
        component: TownScreen,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
