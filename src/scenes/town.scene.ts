import * as Phaser from "phaser"
import { townComposition } from "../compositions/town.composition.ts"

export class TownScene extends Phaser.Scene {
    private name!: string

    constructor(name: string) {
        super()
        this.name = name
    }

    preload() {
        townComposition.uploadTown(this, this.name)
    }

    create() {
        townComposition.createTown(this)
    }

    update() {}
}
