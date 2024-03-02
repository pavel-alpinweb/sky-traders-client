import * as Phaser from "phaser"
import { mapBackgroundComposition } from "../compositions/map-background.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.Math.Vector2
    constructor() {
        super()
    }

    preload() {
        mapBackgroundComposition.playerShipUpload(this, "ship")
        mapBackgroundComposition.mapBackgroundUpload(this)
    }

    create() {
        mapBackgroundComposition.addMapBackground(this)
        this.player = playerComposition.initPlayer(this, "ship", window.innerWidth / 2, window.innerHeight / 2)
        this.target = playerComposition.movePlayer(this, this.player)
    }

    update() {
        playerComposition.rotatePlayer(this, this.player, this.target)
    }
}
