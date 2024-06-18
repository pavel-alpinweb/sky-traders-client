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
                name: "Хромая чайка",
                velocity: 0,
                damage: 0,
                type: "seagull",
                maxHealth: 0,
                currentHealth: 0,
                maxFuel: 0,
                currentFuel: 0,
            },
        ],
        currentShip: null,
    }),
})
