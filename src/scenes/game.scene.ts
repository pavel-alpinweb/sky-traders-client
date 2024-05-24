import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"
// import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.GameObjects.Image
    private map!: Phaser.Tilemaps.Tilemap
    private towns!: Phaser.Physics.Arcade.StaticGroup

    preload() {
        playerComposition.playerShipUpload(this, "ship")
        mapComposition.mapBackgroundUpload(this)
        mapComposition.tileMapUpload(this)
        mapComposition.islandUpload(this)
        mapComposition.townsUpload(this)
    }

    create() {
        /* Инициализируем тайловую карту и созадем фон */
        // mapComposition.addMapBackground(this)
        this.map = mapComposition.createLevel(this)

        /* Добавляем острова на карту */
        mapComposition.createIslands(this.map)

        /* Добавляем города на карту */
        this.towns = this.physics.add.staticGroup()
        mapComposition.createTowns(["start-01", "start-02"], this.towns, this.map)

        /* Создаем игрока и передвижение для него */
        this.player = playerComposition.initPlayer(this, "ship", this.map.widthInPixels / 2, this.map.heightInPixels / 2)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target)
    }

    update() {
        playerComposition.onMovingPlayer(this.player, this.target, this)
    }
}
