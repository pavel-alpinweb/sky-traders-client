import { defineStore } from "pinia"
import { Player, RefuelParams, Ship } from "../types/interfaces.ts"
import { BASIC_SHIP_ANGULAR_VELOCITY, BASIC_SHIP_SPEED, FUEL_CONSUMPTION, HEALTH_CONSUMPTION, PIRATE_DAMAGE } from "../configs/gameplay.config.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: 50000,
        resources: [
            {
                value: 0,
                name: "sugar",
                title: "Сахарный тростник",
            },
            {
                value: 0,
                name: "corn",
                title: "Кукуруза",
            },
            {
                value: 0,
                name: "spice",
                title: "Пряности",
            },
            {
                value: 0,
                name: "grain",
                title: "Зерно",
            },
            {
                value: 0,
                name: "wood",
                title: "Древесина",
            },
            {
                value: 0,
                name: "hemp",
                title: "Конопля",
            },
            {
                value: 0,
                name: "cotton",
                title: "Хлопок",
            },
            {
                value: 0,
                name: "gunpowder",
                title: "Порох",
            },
            {
                value: 0,
                name: "coal",
                title: "Уголь",
            },
            {
                value: 0,
                name: "steel",
                title: "Сталь",
            },
            {
                value: 0,
                name: "ivory",
                title: "Слоновая кость",
            },
            {
                value: 0,
                name: "silk",
                title: "Шелк",
            },
        ],
        ships: [
            {
                id: 1,
                name: "Хромая чайка",
                velocity: BASIC_SHIP_SPEED,
                angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY + 100,
                damage: 5,
                type: "seagull",
                maxHealth: 20,
                currentHealth: 5,
                maxFuel: 50,
                currentFuel: 20,
                price: 100,
                repairPrice: 10,
            },
            {
                id: 2,
                name: "Наглый альбатрос",
                velocity: BASIC_SHIP_SPEED + 80,
                angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY + 50,
                damage: 10,
                type: "albatross",
                maxHealth: 100,
                currentHealth: 100,
                maxFuel: 120,
                currentFuel: 120,
                price: 1000,
                repairPrice: 30,
            },
            {
                id: 6,
                name: "Золотой пеликан",
                velocity: BASIC_SHIP_SPEED + 120,
                angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY - 50,
                damage: 20,
                type: "pelican",
                maxHealth: 300,
                currentHealth: 300,
                maxFuel: 500,
                currentFuel: 200,
                price: 5000,
                repairPrice: 50,
            },
            {
                id: 7,
                name: "Небесный кит",
                velocity: BASIC_SHIP_SPEED + 150,
                angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY - 50,
                damage: 50,
                type: "whale",
                maxHealth: 700,
                currentHealth: 600,
                maxFuel: 900,
                currentFuel: 900,
                price: 15000,
                repairPrice: 80,
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
