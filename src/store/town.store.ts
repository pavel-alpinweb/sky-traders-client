import { defineStore } from "pinia"
import { Coords, TownStore } from "../types/interfaces.ts"

export const useTown = defineStore("town", {
    state: (): TownStore => ({
        currentTownId: "start-01",
        coords: {
            x: 1280,
            y: 1280,
        },
        towns: [],
        isShowSinkAlert: false,
    }),
    actions: {
        setTown(): void {},
        setCoords(coords: Coords): void {
            this.coords = coords
        },
        setShowSinkAlert(value: boolean) {
            this.isShowSinkAlert = value
        },
    },
})
