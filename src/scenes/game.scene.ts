import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"
import { checkOverlap, EventBus } from "../utils/utils.ts"
import { Coords, Ship } from "../types/interfaces.ts"
import TimerEvent = Phaser.Time.TimerEvent
import { weaponComposition } from "../compositions/weapon.composition.ts"
import { piratesComposition } from "../compositions/pirates.composition.ts"
import { PIRATE_VELOCITY } from "../configs/gameplay.config.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private pirates!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.GameObjects.Image
    private map!: Phaser.Tilemaps.Tilemap
    private townsGroup!: Phaser.Physics.Arcade.StaticGroup
    private townsArray!: Phaser.GameObjects.GameObject[]
    private fuelConsumption!: TimerEvent
    private healthConsumption!: TimerEvent
    private bullets!: Phaser.Physics.Arcade.Group
    private pirateFire!: TimerEvent
    private readonly coords!: Coords
    private readonly ship!: Ship

    constructor(coords: Coords, ship: Ship) {
        super()
        this.coords = coords
        this.ship = ship
    }

    preload() {
        playerComposition.playerShipUpload(this, this.ship.type)
        piratesComposition.piratesShipsUpload(this)
        mapComposition.mapBackgroundUpload(this)
        mapComposition.tileMapUpload(this)
        mapComposition.islandUpload(this)
        mapComposition.townsUpload(this)
        weaponComposition.uploadBullets(this, this.ship.type)
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

        /* Инициализируем снаряды для игрока и пиратов */
        this.bullets = weaponComposition.init(this)

        /* Создаем игрока и передвижение для него */
        this.player = playerComposition.initPlayer(this, this.coords.x, this.coords.y)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target, this.ship)

        /* Создаем пиратов и их стрельбу */
        this.pirates = piratesComposition.initPirates(this, this.coords.x, this.coords.y - 800)
        this.pirateFire = piratesComposition.initFireTimer(this, this.bullets, this.pirates)

        /* Создаем стрельбу игрока */
        playerComposition.fire(this, this.bullets, this.player, "bullets")

        /* Создаем таймер для расхода топлива */
        this.fuelConsumption = playerComposition.initFuelConsumption(this)

        /* Создаем таймер для поломки во время полета */
        this.healthConsumption = playerComposition.initHealthConsumption(this)

        /* Эмитим событие с данными о городе и координаты игрока при полете над городом */
        playerComposition.flyOnTown(this.player, this.townsGroup, this)
    }

    update() {
        playerComposition.onMovingPlayer(this.player, this.target, this, this.ship.velocity, this.fuelConsumption, this.healthConsumption, this.ship)

        if (this.pirates) {
            piratesComposition.fire(this.pirates, this.player, this.pirateFire)
            piratesComposition.movePirate(this, this.player, this.pirates, PIRATE_VELOCITY)
        }

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
