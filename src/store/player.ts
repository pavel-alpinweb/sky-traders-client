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
                velocity: 10,
                damage: 5,
                type: "seagull",
                maxHealth: 20,
                currentHealth: 18,
                maxFuel: 50,
                currentFuel: 20,
                price: 100,
            },
            {
                name: "Наглый альбатрос",
                velocity: 30,
                damage: 20,
                type: "albatross",
                maxHealth: 100,
                currentHealth: 100,
                maxFuel: 120,
                currentFuel: 100,
                price: 1000,
            },
            {
                name: "Золотой пеликан",
                velocity: 80,
                damage: 50,
                type: "pelican",
                maxHealth: 300,
                currentHealth: 300,
                maxFuel: 500,
                currentFuel: 200,
                price: 5000,
            },
            {
                name: "Небесный кит",
                velocity: 200,
                damage: 100,
                type: "whale",
                maxHealth: 700,
                currentHealth: 600,
                maxFuel: 900,
                currentFuel: 900,
                price: 15000,
            },
        ],
        currentShip: null,
    }),
})
