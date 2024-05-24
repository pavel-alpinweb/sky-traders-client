import { defineStore } from "pinia"

interface Coords {
    x: number
    y: number
}

interface Town {
    name: string
    coords: Coords
}

export const useTown = defineStore("town", {
    state: (): Town => ({
        name: "",
        coords: {
            x: 0,
            y: 0,
        },
    }),
    actions: {
        setTown: (name: string): void => {
            // eslint-disable-next-line
            // @ts-ignore
            this.name = name
        },
        setCoords: (coords: Coords): void => {
            // eslint-disable-next-line
            // @ts-ignore
            this.coords = coords
        },
    },
})
