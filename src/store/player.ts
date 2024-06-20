import { defineStore } from "pinia"
import { Player, Ship } from "../types/interfaces.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: 0,
        resources: [],
        ships: [
            {
                id: 1,
                name: "Хромая чайка",
                velocity: 10,
                damage: 5,
                type: "seagull",
                maxHealth: 20,
                currentHealth: 18,
                maxFuel: 50,
                currentFuel: 20,
                price: 100,
                repairPrice: 1,
            },
            {
                id: 2,
                name: "Наглый альбатрос",
                velocity: 30,
                damage: 20,
                type: "albatross",
                maxHealth: 100,
                currentHealth: 100,
                maxFuel: 120,
                currentFuel: 100,
                price: 1000,
                repairPrice: 3,
            },
        ],
        currentShipId: 1,
    }),
    getters: {
        currentShip: (state): Ship | null => {
            if (state.currentShipId) {
                return state.ships.find((ship) => ship.id === state.currentShipId) as Ship
            }
            return null
        },
    },
    actions: {
        setCurrentShip(id: number): void {
            this.currentShipId = id
        },
    },
})
