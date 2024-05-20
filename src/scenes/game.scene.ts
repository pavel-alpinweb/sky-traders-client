import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.Math.Vector2
    private map!: Phaser.Tilemaps.Tilemap

    preload() {
        mapComposition.playerShipUpload(this, "ship")
        mapComposition.mapBackgroundUpload(this)
        mapComposition.islandUpload(this)
    }

    create() {
        mapComposition.addMapBackground(this)
        this.player = playerComposition.initPlayer(this, "ship", window.innerWidth / 2, window.innerHeight / 2)
        this.target = playerComposition.movePlayer(this, this.player)
        this.map = mapComposition.createLevel(this)
        mapComposition.createIslands(this.map)
    }

    update() {
        playerComposition.rotatePlayer(this, this.player, this.target)
    }
}
