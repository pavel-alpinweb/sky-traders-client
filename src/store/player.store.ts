import { defineStore } from "pinia"
import { Player, RefuelParams, ResourcePanel, Ship } from "../types/interfaces.ts"
import { FUEL_CONSUMPTION, HEALTH_CONSUMPTION, PIRATE_DAMAGE, seagullParams, START_PLAYER_GOLD } from "../configs/gameplay.config.ts"

export const usePlayer = defineStore("player", {
    state: (): Player => ({
        id: 0,
        gold: START_PLAYER_GOLD,
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
                name: seagullParams.name,
                description: seagullParams.description,
                velocity: seagullParams.velocity,
                angularVelocity: seagullParams.angularVelocity,
                damage: seagullParams.damage,
                type: "seagull",
                maxHealth: seagullParams.maxHealth,
                currentHealth: seagullParams.currentHealth,
                maxFuel: seagullParams.maxFuel,
                currentFuel: seagullParams.maxFuel,
                price: seagullParams.price,
                repairPrice: seagullParams.repairPrice,
            },
        ],
        currentShipId: 1,
        currentResourceKey: null,
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
        currentResource: (state): ResourcePanel | null => {
            return state.currentResourceKey ? (state.resources.find((resource) => resource.name === state.currentResourceKey) as ResourcePanel) : null
        },
    },
    actions: {
        setCurrentResource(key: string) {
            this.currentResourceKey = key
        },
        decreaseGold(bill: number) {
            this.gold -= bill
        },
        increaseGold(bill: number) {
            this.gold += bill
        },
        addResource(amount: number) {
            const resource = this.resources.find((resource) => resource.name === this.currentResourceKey) as ResourcePanel
            resource.value += amount
        },
        removeResource(amount: number) {
            const resource = this.resources.find((resource) => resource.name === this.currentResourceKey) as ResourcePanel
            resource.value -= amount
        },
        resetAllResources() {
            this.resources.forEach((resource) => {
                resource.value = 0
            })
        },
        setCurrentShip(id: number): void {
            this.currentShipId = id
        },
        addNewShip(ship: Ship): void {
            this.ships.push(ship)
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
