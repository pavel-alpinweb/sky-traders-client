import * as Phaser from "phaser"
import { townComposition } from "../compositions/town.composition.ts"
import { LEVEL_HEIGHT } from "../configs/gameplay.config.ts"

export class TownScene extends Phaser.Scene {
    private id!: string
    private cloudsTop!: Phaser.GameObjects.TileSprite
    private cloudsFront!: Phaser.GameObjects.TileSprite
    private cloudsBack!: Phaser.GameObjects.TileSprite

    constructor(name: string) {
        super()
        this.id = name
    }

    preload() {
        townComposition.uploadTown(this, this.id)
        townComposition.uploadClouds(this)
    }

    create() {
        this.cloudsTop = townComposition.createClouds(this, LEVEL_HEIGHT / 3.5, 311, "clouds-dark", 1.25)
        this.cloudsBack = townComposition.createClouds(this, LEVEL_HEIGHT / 1.3, 454, "clouds-big", 1.5)
        townComposition.createTown(this)
        this.cloudsFront = townComposition.createClouds(this, LEVEL_HEIGHT / 2, 310, "clouds-small")
    }

    update() {
        townComposition.moveClouds(this.cloudsTop, 0.5)
        townComposition.moveClouds(this.cloudsFront, 0.75)
        townComposition.moveClouds(this.cloudsBack, 0.25)
    }
}
