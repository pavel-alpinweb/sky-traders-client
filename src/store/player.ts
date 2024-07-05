import { defineStore } from "pinia"
import { Player, RefuelParams, Ship } from "../types/interfaces.ts"
import { BASIC_SHIP_SPEED, FUEL_CONSUMPTION, HEALTH_CONSUMPTION, PIRATE_DAMAGE } from "../configs/gameplay.config.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: 5000,
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
                currentHealth: 100,
                maxFuel: 120,
                currentFuel: 120,
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
        currentShipHealth: (state): number | null => {
            const currentShip = state.ships.find((ship) => ship.id === state.currentShipId)

            return currentShip ? currentShip.currentHealth : null
        },
        currentShipFuel: (state): number | null => {
            const currentShip = state.ships.find((ship) => ship.id === state.currentShipId)

            return currentShip ? currentShip.currentFuel : null
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
        refuelCurrentShip(params: RefuelParams): void {
            this.gold -= params.fuelBill
            this.currentShip.currentFuel += params.fuelAmount
        },
        repairCurrentShip(repairBill: number): void {
            this.gold -= repairBill
            this.currentShip.currentHealth = this.currentShip.maxHealth
        },
        damageCurrentShip(): void {
            if (this.currentShip.currentHealth > 0) {
                this.currentShip.currentHealth -= this.currentShip.currentHealth > PIRATE_DAMAGE ? PIRATE_DAMAGE : this.currentShip.currentHealth
            }
        },
        removeCurrentShip(): void {
            this.ships = this.ships.filter((ship) => ship.id !== this.currentShipId)
            this.currentShipId = null
        },
    },
})
