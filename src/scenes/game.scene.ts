import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"
// import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.GameObjects.Image
    private map!: Phaser.Tilemaps.Tilemap

    preload() {
        playerComposition.playerShipUpload(this, "ship")
        mapComposition.mapBackgroundUpload(this)
        mapComposition.tileMapUpload(this)
        mapComposition.islandUpload(this)
    }

    create() {
        // mapComposition.addMapBackground(this)
        this.map = mapComposition.createLevel(this)
        mapComposition.createIslands(this.map)
        this.player = playerComposition.initPlayer(this, "ship", this.map.widthInPixels / 2, this.map.heightInPixels / 2)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target)
    }

    update() {
        playerComposition.onMovingPlayer(this.player, this.target, this)
    }
}
