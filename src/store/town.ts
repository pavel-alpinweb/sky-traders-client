import { defineStore } from "pinia"

declare global {
    interface Coords {
        x: number
        y: number
    }

    interface Town {
        name: string
        coords: Coords
    }
}

export const useTown = defineStore("town", {
    state: (): Town => ({
        name: "start-01",
        coords: {
            x: 1280,
            y: 1280,
        },
    }),
    actions: {
        setTown(name: string): void {
            this.name = name
        },
        setCoords(coords: Coords): void {
            this.coords = coords
        },
    },
})
