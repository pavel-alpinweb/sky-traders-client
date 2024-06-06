import { defineStore } from "pinia"
import { Coords, Town } from "../types/interfaces.ts"

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
