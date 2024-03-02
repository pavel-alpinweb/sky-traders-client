import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./screens/Start.screen.vue"
import GameScreen from "./screens/Game.screen.vue"
import TownScreen from "./screens/Town.screen.vue"

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
