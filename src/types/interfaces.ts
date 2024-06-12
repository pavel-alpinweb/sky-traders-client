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
    component: string
}

export type IconList = {
    [key in string]: string
}