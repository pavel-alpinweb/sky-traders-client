import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./screens/Start.screen.vue"
import GameScreen from "./screens/Game.screen.vue"
import TownScreen from "./screens/Town.screen.vue"

export const routes = [
    {
        path: import.meta.env.BASE_URL,
        component: StartScreen,
    },
    {
        path: `${import.meta.env.BASE_URL}game`,
        component: GameScreen,
    },
    {
        path: `${import.meta.env.BASE_URL}town`,
        component: TownScreen,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
