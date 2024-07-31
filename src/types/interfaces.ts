export enum HEADING {
    NAME = "Название",
    VALUE = "Количество на складе",
    BUY_PRICE = "Цена покупки",
    SELL_PRICE = "Цена продажи",
    MAX_VALUE = "Объем склада",
}

export interface Coords {
    x: number
    y: number
}

export interface Town {
    id: string
    name: string
    color: string
    ships: Ship[]
    resources: ResourceTable[]
    description: string
}

export interface TownStore {
    coords: Coords
    currentTownId: string
    towns: Town[]
    isShowSinkAlert: boolean
}

export interface ResourcePanel {
    name: string
    title: string
    value: number
}

export interface ResourceTable {
    [HEADING.NAME]: string
    key: string
    [HEADING.VALUE]: number
    [HEADING.BUY_PRICE]: number
    [HEADING.SELL_PRICE]: number
    optima: number
    optimaBuyPrice: number
    optimaSellPrice: number
    [HEADING.MAX_VALUE]: number
    minBuyPrice: number
    minSellPrice: number
    maxBuyPrice: number
    maxSellPrice: number
    isGrow: boolean
}

export interface Transaction {
    gold: number
    resourceAmount: number
}

export interface Ship {
    id: number
    name: string
    velocity: number
    angularVelocity: number
    damage: number
    type: string
    maxHealth: number
    currentHealth: number
    maxFuel: number
    currentFuel: number
    price: number
    repairPrice: number
    description: string
}

export interface Player {
    id: number
    gold: number
    resources: ResourcePanel[]
    ships: Ship[]
    currentShipId: number | null
    currentResourceKey: string | null
}

export interface RefuelParams {
    fuelAmount: number
    fuelBill: number
}
