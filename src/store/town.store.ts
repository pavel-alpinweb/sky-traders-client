import { defineStore } from "pinia"
import { Coords, HEADING, ResourceTable, Town, TownStore } from "../types/interfaces.ts"
import { albatrossParams, pelicanParams, seagullParams, whaleParams } from "../configs/gameplay.config.ts"

export const useTown = defineStore("town", {
    state: (): TownStore => ({
        currentTownId: "start-01",
        coords: {
            x: 7168,
            y: 7672,
        },
        towns: [
            {
                id: "start-01",
                name: "start-01",
                color: "green",
                ships: [
                    {
                        id: 4,
                        name: "Хромая чайка",
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
                    {
                        id: 5,
                        name: "Наглый альбатрос",
                        velocity: albatrossParams.velocity,
                        angularVelocity: albatrossParams.angularVelocity,
                        damage: albatrossParams.damage,
                        type: "albatross",
                        maxHealth: albatrossParams.maxHealth,
                        currentHealth: albatrossParams.currentHealth,
                        maxFuel: albatrossParams.maxFuel,
                        currentFuel: albatrossParams.currentFuel,
                        price: albatrossParams.price,
                        repairPrice: albatrossParams.repairPrice,
                    },
                    {
                        id: 6,
                        name: "Золотой пеликан",
                        velocity: pelicanParams.velocity,
                        angularVelocity: pelicanParams.angularVelocity,
                        damage: pelicanParams.damage,
                        type: "pelican",
                        maxHealth: pelicanParams.maxHealth,
                        currentHealth: pelicanParams.currentHealth,
                        maxFuel: pelicanParams.maxFuel,
                        currentFuel: pelicanParams.currentFuel,
                        price: pelicanParams.price,
                        repairPrice: pelicanParams.repairPrice,
                    },
                    {
                        id: 7,
                        name: "Небесный кит",
                        velocity: whaleParams.velocity,
                        angularVelocity: whaleParams.angularVelocity,
                        damage: whaleParams.damage,
                        type: "whale",
                        maxHealth: whaleParams.maxHealth,
                        currentHealth: whaleParams.currentHealth,
                        maxFuel: whaleParams.maxFuel,
                        currentFuel: whaleParams.currentFuel,
                        price: whaleParams.price,
                        repairPrice: 8,
                    },
                ],
                resources: [
                    {
                        [HEADING.NAME]: "Сахарный тростник",
                        key: "sugar",
                        [HEADING.VALUE]: 300,
                        [HEADING.BUY_PRICE]: 10,
                        [HEADING.SELL_PRICE]: 13,
                        optima: 300,
                        optimaBuyPrice: 10,
                        optimaSellPrice: 13,
                        [HEADING.MAX_VALUE]: 600,
                        minBuyPrice: 8,
                        minSellPrice: 12,
                        maxBuyPrice: 12,
                        maxSellPrice: 15,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Кукуруза",
                        key: "corn",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 250,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 14,
                        minSellPrice: 21,
                        maxBuyPrice: 18,
                        maxSellPrice: 25,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Пряности",
                        key: "spice",
                        [HEADING.VALUE]: 400,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 400,
                        optimaBuyPrice: 10,
                        optimaSellPrice: 11,
                        [HEADING.MAX_VALUE]: 800,
                        minBuyPrice: 6,
                        minSellPrice: 7,
                        maxBuyPrice: 11,
                        maxSellPrice: 12,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Зерно",
                        key: "grain",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 5,
                        [HEADING.SELL_PRICE]: 8,
                        optima: 250,
                        optimaBuyPrice: 5,
                        optimaSellPrice: 8,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 3,
                        minSellPrice: 6,
                        maxBuyPrice: 6,
                        maxSellPrice: 10,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Древесина",
                        key: "wood",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Конопля",
                        key: "hemp",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Хлопок",
                        key: "cotton",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Порох",
                        key: "gunpowder",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Уголь",
                        key: "coal",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Сталь",
                        key: "steel",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Слоновая кость",
                        key: "ivory",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Шелк",
                        key: "silk",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                ],
            },
            {
                id: "start-02",
                name: "start-02",
                color: "green",
                ships: [
                    {
                        id: 4,
                        name: "Хромая чайка",
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
                    {
                        id: 5,
                        name: "Наглый альбатрос",
                        velocity: albatrossParams.velocity,
                        angularVelocity: albatrossParams.angularVelocity,
                        damage: albatrossParams.damage,
                        type: "albatross",
                        maxHealth: albatrossParams.maxHealth,
                        currentHealth: albatrossParams.currentHealth,
                        maxFuel: albatrossParams.maxFuel,
                        currentFuel: albatrossParams.currentFuel,
                        price: albatrossParams.price,
                        repairPrice: albatrossParams.repairPrice,
                    },
                    {
                        id: 6,
                        name: "Золотой пеликан",
                        velocity: pelicanParams.velocity,
                        angularVelocity: pelicanParams.angularVelocity,
                        damage: pelicanParams.damage,
                        type: "pelican",
                        maxHealth: pelicanParams.maxHealth,
                        currentHealth: pelicanParams.currentHealth,
                        maxFuel: pelicanParams.maxFuel,
                        currentFuel: pelicanParams.currentFuel,
                        price: pelicanParams.price,
                        repairPrice: pelicanParams.repairPrice,
                    },
                    {
                        id: 7,
                        name: "Небесный кит",
                        velocity: whaleParams.velocity,
                        angularVelocity: whaleParams.angularVelocity,
                        damage: whaleParams.damage,
                        type: "whale",
                        maxHealth: whaleParams.maxHealth,
                        currentHealth: whaleParams.currentHealth,
                        maxFuel: whaleParams.maxFuel,
                        currentFuel: whaleParams.currentFuel,
                        price: whaleParams.price,
                        repairPrice: 8,
                    },
                ],
                resources: [
                    {
                        [HEADING.NAME]: "Сахарный тростник",
                        key: "sugar",
                        [HEADING.VALUE]: 300,
                        [HEADING.BUY_PRICE]: 18,
                        [HEADING.SELL_PRICE]: 26,
                        optima: 300,
                        optimaBuyPrice: 18,
                        optimaSellPrice: 26,
                        [HEADING.MAX_VALUE]: 600,
                        minBuyPrice: 16,
                        minSellPrice: 24,
                        maxBuyPrice: 20,
                        maxSellPrice: 28,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Кукуруза",
                        key: "corn",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 5,
                        [HEADING.SELL_PRICE]: 8,
                        optima: 250,
                        optimaBuyPrice: 5,
                        optimaSellPrice: 8,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 3,
                        minSellPrice: 6,
                        maxBuyPrice: 6,
                        maxSellPrice: 10,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Пряности",
                        key: "spice",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 30,
                        [HEADING.SELL_PRICE]: 33,
                        optima: 250,
                        optimaBuyPrice: 30,
                        optimaSellPrice: 33,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 29,
                        minSellPrice: 32,
                        maxBuyPrice: 36,
                        maxSellPrice: 40,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Зерно",
                        key: "grain",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 250,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 14,
                        minSellPrice: 21,
                        maxBuyPrice: 18,
                        maxSellPrice: 25,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Древесина",
                        key: "wood",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Конопля",
                        key: "hemp",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Хлопок",
                        key: "cotton",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Порох",
                        key: "gunpowder",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Уголь",
                        key: "coal",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Сталь",
                        key: "steel",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Слоновая кость",
                        key: "ivory",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Шелк",
                        key: "silk",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                ],
            },
            {
                id: "middle",
                name: "middle",
                color: "green",
                ships: [
                    {
                        id: 4,
                        name: "Хромая чайка",
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
                    {
                        id: 5,
                        name: "Наглый альбатрос",
                        velocity: albatrossParams.velocity,
                        angularVelocity: albatrossParams.angularVelocity,
                        damage: albatrossParams.damage,
                        type: "albatross",
                        maxHealth: albatrossParams.maxHealth,
                        currentHealth: albatrossParams.currentHealth,
                        maxFuel: albatrossParams.maxFuel,
                        currentFuel: albatrossParams.currentFuel,
                        price: albatrossParams.price,
                        repairPrice: albatrossParams.repairPrice,
                    },
                    {
                        id: 6,
                        name: "Золотой пеликан",
                        velocity: pelicanParams.velocity,
                        angularVelocity: pelicanParams.angularVelocity,
                        damage: pelicanParams.damage,
                        type: "pelican",
                        maxHealth: pelicanParams.maxHealth,
                        currentHealth: pelicanParams.currentHealth,
                        maxFuel: pelicanParams.maxFuel,
                        currentFuel: pelicanParams.currentFuel,
                        price: pelicanParams.price,
                        repairPrice: pelicanParams.repairPrice,
                    },
                    {
                        id: 7,
                        name: "Небесный кит",
                        velocity: whaleParams.velocity,
                        angularVelocity: whaleParams.angularVelocity,
                        damage: whaleParams.damage,
                        type: "whale",
                        maxHealth: whaleParams.maxHealth,
                        currentHealth: whaleParams.currentHealth,
                        maxFuel: whaleParams.maxFuel,
                        currentFuel: whaleParams.currentFuel,
                        price: whaleParams.price,
                        repairPrice: 8,
                    },
                ],
                resources: [
                    {
                        [HEADING.NAME]: "Сахарный тростник",
                        key: "sugar",
                        [HEADING.VALUE]: 300,
                        [HEADING.BUY_PRICE]: 18,
                        [HEADING.SELL_PRICE]: 26,
                        optima: 300,
                        optimaBuyPrice: 18,
                        optimaSellPrice: 26,
                        [HEADING.MAX_VALUE]: 600,
                        minBuyPrice: 16,
                        minSellPrice: 24,
                        maxBuyPrice: 20,
                        maxSellPrice: 28,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Кукуруза",
                        key: "corn",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 5,
                        [HEADING.SELL_PRICE]: 8,
                        optima: 250,
                        optimaBuyPrice: 5,
                        optimaSellPrice: 8,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 3,
                        minSellPrice: 6,
                        maxBuyPrice: 6,
                        maxSellPrice: 10,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Пряности",
                        key: "spice",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 30,
                        [HEADING.SELL_PRICE]: 33,
                        optima: 250,
                        optimaBuyPrice: 30,
                        optimaSellPrice: 33,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 29,
                        minSellPrice: 32,
                        maxBuyPrice: 36,
                        maxSellPrice: 40,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Зерно",
                        key: "grain",
                        [HEADING.VALUE]: 250,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 250,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 14,
                        minSellPrice: 21,
                        maxBuyPrice: 18,
                        maxSellPrice: 25,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Древесина",
                        key: "wood",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Конопля",
                        key: "hemp",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Хлопок",
                        key: "cotton",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Порох",
                        key: "gunpowder",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Уголь",
                        key: "coal",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Сталь",
                        key: "steel",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Слоновая кость",
                        key: "ivory",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                    {
                        [HEADING.NAME]: "Шелк",
                        key: "silk",
                        [HEADING.VALUE]: 262,
                        [HEADING.BUY_PRICE]: 16,
                        [HEADING.SELL_PRICE]: 23,
                        optima: 262,
                        optimaBuyPrice: 16,
                        optimaSellPrice: 23,
                        [HEADING.MAX_VALUE]: 500,
                        minBuyPrice: 10,
                        minSellPrice: 13,
                        maxBuyPrice: 26,
                        maxSellPrice: 36,
                        isGrow: true,
                    },
                ],
            },
        ],
        isShowSinkAlert: false,
    }),
    getters: {
        currentTown: (state): Town => {
            return state.towns.find((town) => town.id === state.currentTownId) as Town
        },
    },
    actions: {
        setTown(name: string): void {
            this.currentTownId = name
        },
        setCoords(coords: Coords): void {
            this.coords = coords
        },
        setShowSinkAlert(value: boolean) {
            this.isShowSinkAlert = value
        },
        decreaseCurrentTownResource(key: string, amount: number) {
            const resource = this.currentTown.resources.find((resource) => resource.key === key) as ResourceTable
            resource[HEADING.VALUE] -= amount
        },
        increaseCurrentTownResource(key: string, amount: number) {
            const resource = this.currentTown.resources.find((resource) => resource.key === key) as ResourceTable
            resource[HEADING.VALUE] += amount
        },
        increaseTownResource(townId: string, key: string, amount: number) {
            const town = this.towns.find((town) => town.id === townId) as Town
            const resource = town.resources.find((resource) => resource.key === key) as ResourceTable
            resource[HEADING.VALUE] += amount
            resource.isGrow = true
        },
        decreaseTownResource(townId: string, key: string, amount: number) {
            const town = this.towns.find((town) => town.id === townId) as Town
            const resource = town.resources.find((resource) => resource.key === key) as ResourceTable
            resource[HEADING.VALUE] -= amount
            resource.isGrow = resource[HEADING.VALUE] <= resource.optima
        },
        calculatePrice(resource: ResourceTable) {
            const difference = resource.optima - resource[HEADING.VALUE]
            const percentValue = difference / (resource.optima / 100)
            const percentBuyPrice = resource.optimaBuyPrice / 100
            const percentSellPrice = resource.optimaSellPrice / 100
            let newBuyPrice = resource[HEADING.BUY_PRICE]
            let newSellPrice = resource[HEADING.BUY_PRICE]
            if (resource[HEADING.VALUE] < resource.optima) {
                newBuyPrice = Math.floor(resource.optimaBuyPrice + Math.abs(percentValue) * percentBuyPrice)
                newSellPrice = Math.floor(resource.optimaSellPrice + Math.abs(percentValue) * percentSellPrice)
            } else {
                newBuyPrice = Math.floor(resource.optimaBuyPrice - Math.abs(percentValue) * percentBuyPrice)
                newSellPrice = Math.floor(resource.optimaSellPrice - Math.abs(percentValue) * percentSellPrice)
            }

            if (newBuyPrice > resource.maxBuyPrice) {
                resource[HEADING.BUY_PRICE] = resource.maxBuyPrice
            } else if (newBuyPrice < resource.minBuyPrice) {
                resource[HEADING.BUY_PRICE] = resource.minBuyPrice
            } else {
                resource[HEADING.BUY_PRICE] = newBuyPrice
            }

            if (newSellPrice > resource.maxSellPrice) {
                resource[HEADING.SELL_PRICE] = resource.maxSellPrice
            } else if (newSellPrice < resource.minSellPrice) {
                resource[HEADING.SELL_PRICE] = resource.minSellPrice
            } else {
                resource[HEADING.SELL_PRICE] = newSellPrice
            }
        },
    },
})
