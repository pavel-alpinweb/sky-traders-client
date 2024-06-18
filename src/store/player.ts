import { defineStore } from "pinia"
import { Player } from "../types/interfaces.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: 0,
        resources: [],
        ships: [
            {
                name: "Хромая чайка",
                velocity: 0,
                damage: 0,
                type: "seagull",
                maxHealth: 0,
                currentHealth: 0,
                maxFuel: 0,
                currentFuel: 0,
            },
            {
                name: "Наглый альбатрос",
                velocity: 0,
                damage: 0,
                type: "albatross",
                maxHealth: 0,
                currentHealth: 0,
                maxFuel: 0,
                currentFuel: 0,
            },
            {
                name: "Золотой пеликан",
                velocity: 0,
                damage: 0,
                type: "pelican",
                maxHealth: 0,
                currentHealth: 0,
                maxFuel: 0,
                currentFuel: 0,
            },
            {
                name: "Небесный кит",
                velocity: 0,
                damage: 0,
                type: "whale",
                maxHealth: 0,
                currentHealth: 0,
                maxFuel: 0,
                currentFuel: 0,
            },
        ],
        currentShip: null,
    }),
})
