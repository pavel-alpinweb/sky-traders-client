import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.Math.Vector2
    private town!: Phaser.Types.Physics.Arcade.SpriteWithStaticBody
    private handler!: () => void
    constructor(callback: () => void) {
        super()
        this.handler = callback
    }

    preload() {
        mapComposition.playerShipUpload(this, "ship")
        mapComposition.mapBackgroundUpload(this)
    }

    create() {
        mapComposition.addMapBackground(this)
        this.town = mapComposition.addMapTown(this, "town")
        this.player = playerComposition.initPlayer(this, "ship", window.innerWidth / 2, window.innerHeight / 2)
        this.target = playerComposition.movePlayer(this, this.player)
        this.physics.add.overlap(this.player, this.town, this.goToTown, undefined, this)
    }

    update() {
        playerComposition.rotatePlayer(this, this.player, this.target)
    }

    goToTown() {
        this.handler()
    }
}
