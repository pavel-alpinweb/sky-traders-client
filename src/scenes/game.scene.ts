import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"
import { checkOverlap, EventBus } from "../utils/utils.ts"
import { Coords, Ship } from "../types/interfaces.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.GameObjects.Image
    private map!: Phaser.Tilemaps.Tilemap
    private townsGroup!: Phaser.Physics.Arcade.StaticGroup
    private townsArray!: Phaser.GameObjects.GameObject[]
    private readonly coords!: Coords
    private readonly ship!: Ship

    constructor(coords: Coords, ship: Ship) {
        super()
        this.coords = coords
        this.ship = ship
    }

    preload() {
        playerComposition.playerShipUpload(this, this.ship.type)
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
        this.townsGroup = this.physics.add.staticGroup()
        this.townsArray = mapComposition.createTowns(["start-01", "start-02"], this.townsGroup, this.map)

        /* Создаем игрока и передвижение для него */
        this.player = playerComposition.initPlayer(this, this.coords.x, this.coords.y)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target)

        /* Эмитим событие с данными о городе и коориданты игрока при полете над городом */
        playerComposition.flyOnTown(this.player, this.townsGroup, this)
    }

    update() {
        playerComposition.onMovingPlayer(this.player, this.target, this)

        for (const town of this.townsArray) {
            if (checkOverlap(this.player, town)) {
                EventBus.emit("arrive-town")
                break
            } else {
                EventBus.emit("leave-town")
            }
        }
    }
}
