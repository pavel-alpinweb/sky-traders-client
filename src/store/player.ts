import { defineStore } from "pinia"
import { Player, Ship } from "../types/interfaces.ts"
import { BASIC_SHIP_SPEED, FUEL_CONSUMPTION, HEALTH_CONSUMPTION } from "../configs/gameplay.config.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: 100,
        resources: [],
        ships: [
            {
                id: 1,
                name: "Хромая чайка",
                velocity: BASIC_SHIP_SPEED,
                damage: 5,
                type: "seagull",
                maxHealth: 20,
                currentHealth: 5,
                maxFuel: 50,
                currentFuel: 20,
                price: 100,
                repairPrice: 1,
            },
            {
                id: 2,
                name: "Наглый альбатрос",
                velocity: BASIC_SHIP_SPEED + 30,
                damage: 20,
                type: "albatross",
                maxHealth: 100,
                currentHealth: 1,
                maxFuel: 120,
                currentFuel: 100,
                price: 1000,
                repairPrice: 3,
            },
            {
                id: 6,
                name: "Золотой пеликан",
                velocity: BASIC_SHIP_SPEED + 80,
                damage: 50,
                type: "pelican",
                maxHealth: 300,
                currentHealth: 300,
                maxFuel: 500,
                currentFuel: 200,
                price: 5000,
                repairPrice: 5,
            },
            {
                id: 7,
                name: "Небесный кит",
                velocity: BASIC_SHIP_SPEED + 120,
                damage: 100,
                type: "whale",
                maxHealth: 700,
                currentHealth: 600,
                maxFuel: 900,
                currentFuel: 900,
                price: 15000,
                repairPrice: 8,
            },
        ],
        currentShipId: 1,
    }),
    getters: {
        currentShip: (state): Ship => {
            return state.ships.find((ship) => ship.id === state.currentShipId) as Ship
        },
    },
    actions: {
        setCurrentShip(id: number): void {
            this.currentShipId = id
        },
        decreaseCurrentShipFuel(): void {
            if (this.currentShip.currentFuel > 0) {
                this.currentShip.currentFuel -= FUEL_CONSUMPTION
            }
        },
        decreaseCurrentShipHealth(): void {
            if (this.currentShip.currentHealth > 0) {
                this.currentShip.currentHealth -= HEALTH_CONSUMPTION
            }
        },
    },
})
