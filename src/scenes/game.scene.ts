import * as Phaser from "phaser"
import { mapComposition } from "../compositions/map.composition.ts"
import { playerComposition } from "../compositions/player.composition.ts"
import { checkOverlap, EventBus } from "../utils/utils.ts"
import { Coords, Ship } from "../types/interfaces.ts"
import TimerEvent = Phaser.Time.TimerEvent
import { weaponComposition } from "../compositions/weapon.composition.ts"
import { piratesComposition } from "../compositions/pirates.composition.ts"
import { Pirate } from "../objects/Pirate.object.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private pirates: Pirate[] = []
    private target!: Phaser.GameObjects.Image
    private map!: Phaser.Tilemaps.Tilemap
    private townsGroup!: Phaser.Physics.Arcade.StaticGroup
    private townsArray!: Phaser.GameObjects.GameObject[]
    private fuelConsumption!: TimerEvent
    private healthConsumption!: TimerEvent
    private playerBullets!: Phaser.Physics.Arcade.Group
    private pirateBullets!: Phaser.Physics.Arcade.Group
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
        weaponComposition.uploadVFX(this)
    }

    create() {
        /* Инициализируем тайловую карту и созадем фон */
        // mapComposition.addMapBackground(this)
        this.map = mapComposition.createLevel(this)

        /* Добавляем острова на карту */
        // mapComposition.createIslands(this.map)

        /* Добавляем города на карту */
        this.townsGroup = this.physics.add.staticGroup()
        this.townsArray = mapComposition.createTowns(["start-01"], this.townsGroup, this.map)

        /* Инициализируем снаряды для игрока и пиратов */
        this.playerBullets = weaponComposition.init(this)
        this.pirateBullets = weaponComposition.init(this)

        /* Создаем игрока и передвижение для него */
        this.player = playerComposition.initPlayer(this, this.coords.x, this.coords.y)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target, this.ship)

        /* Создаем пиратов, шкалу здоровья и стрельбу для них */
        piratesComposition.createSpawners(this, this.map, this.pirates)

        for (const pirate of this.pirates) {
            pirate.spawnPirate(this, this.player, this.playerBullets, this.pirateBullets, this.ship.damage)
        }

        /* Создаем стрельбу игрока */
        playerComposition.fire(this, this.playerBullets, this.player, "bullets")

        /* Создаем эффекты и обработку попаданий */
        weaponComposition.initVFXAnimations(this)
        weaponComposition.hitOnPlayerHandler(this, this.pirateBullets, this.player)

        // weaponComposition.hitOnPirateHandler(this, this.playerBullets, this.pirates[0].body, this.ship.damage)

        EventBus.on("destroy-current-ship", () => {
            playerComposition.death(this, this.player as Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body }, this.target)
        })

        /* Создаем таймер для расхода топлива */
        this.fuelConsumption = playerComposition.initFuelConsumption(this)

        /* Создаем таймер для поломки во время полета */
        this.healthConsumption = playerComposition.initHealthConsumption(this)

        /* Эмитим событие с данными о городе и координаты игрока при полете над городом */
        playerComposition.flyOnTown(this.player, this.townsGroup, this)
    }

    update() {
        if (this.player && this.player.alpha !== 0) {
            playerComposition.onMovingPlayer(this.player, this.target, this, this.ship.velocity, this.fuelConsumption, this.healthConsumption, this.ship)
        }

        for (const pirate of this.pirates) {
            if (pirate.body && pirate.body.alpha !== 0) {
                pirate.onMoving(this.player)
            }
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
