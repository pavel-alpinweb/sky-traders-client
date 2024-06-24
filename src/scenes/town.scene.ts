import * as Phaser from "phaser"
import { townComposition } from "../compositions/town.composition.ts"

export class TownScene extends Phaser.Scene {
    private name!: string
    private clouds!: Phaser.GameObjects.TileSprite

    constructor(name: string) {
        super()
        this.name = name
    }

    preload() {
        townComposition.uploadTown(this, this.name)
        townComposition.uploadClouds(this)
    }

    create() {
        townComposition.createTown(this)
        this.clouds = townComposition.createClouds(this)
    }

    update() {
        townComposition.moveClouds(this.clouds)
    }
}
