export enum HEADING {
    NAME = "Название",
    VALUE = "Количество на складе",
    BUY_PRICE = "Цена покупки",
    SELL_PRICE = "Цена продажи",
}

export interface Coords {
    x: number
    y: number
}

export interface Town {
    name: string
    coords: Coords
    color: string
}

export interface Resource {
    name: string
    value: number
}

export interface ResourceTable {
    [HEADING.NAME]: string
    key: string
    [HEADING.VALUE]: number
    [HEADING.BUY_PRICE]: number
    [HEADING.SELL_PRICE]: number
}

export interface Ship {
    name: string
    velocity: number
    damage: number
    type: string
    maxHealth: number
    currentHealth: number
    maxFuel: number
    currentFuel: number
}

export type IconList = {
    [key in string]: string
}
