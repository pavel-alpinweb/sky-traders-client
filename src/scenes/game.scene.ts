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
    private playerBullets!: Phaser.Physics.Arcade.Group
    private pirateBullets!: Phaser.Physics.Arcade.Group
    private pirateFire!: TimerEvent
    private pirateHealthBar!: Phaser.GameObjects.Graphics
    private pirateCurrentHealth: number = 100
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
        mapComposition.createIslands(this.map)

        /* Добавляем города на карту */
        this.townsGroup = this.physics.add.staticGroup()
        this.townsArray = mapComposition.createTowns(["start-01", "start-02"], this.townsGroup, this.map)

        /* Инициализируем снаряды для игрока и пиратов */
        this.playerBullets = weaponComposition.init(this)
        this.pirateBullets = weaponComposition.init(this)

        /* Создаем игрока и передвижение для него */
        this.player = playerComposition.initPlayer(this, this.coords.x, this.coords.y)
        this.target = playerComposition.initTarget(this, this.player)
        playerComposition.movePlayer(this, this.player, this.target, this.ship)

        /* Создаем пиратов и их стрельбу */
        this.pirates = piratesComposition.initPirates(this, this.coords.x, this.coords.y - (window.innerHeight / 2 + 512))
        this.pirateFire = piratesComposition.initFireTimer(this, this.pirateBullets, this.pirates)

        /* Создаем здоровье для пиратов */
        this.pirateHealthBar = piratesComposition.initPirateHealthBar(this, this.pirates.x, this.pirates.y)

        /* Создаем стрельбу игрока */
        playerComposition.fire(this, this.playerBullets, this.player, "bullets")

        /* Создаем эффекты и обработку попаданий */
        weaponComposition.initVFXAnimations(this)
        weaponComposition.hitOnPlayerHandler(this, this.pirateBullets, this.player)
        weaponComposition.hitOnPirateHandler(this, this.playerBullets, this.pirates, this.ship.damage)

        EventBus.on("damage-pirate", (damage: number) => {
            this.pirateCurrentHealth -= this.pirateCurrentHealth >= damage ? damage : this.pirateCurrentHealth

            if (this.pirateCurrentHealth <= 0) {
                piratesComposition.death(this, this.pirates as Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body }, this.pirateFire, this.pirateHealthBar)
            }
        })

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

        if (this.pirates && this.pirates.alpha !== 0) {
            piratesComposition.fire(this.pirates, this.player, this.pirateFire)
            piratesComposition.movePirate(this, this.player, this.pirates, PIRATE_VELOCITY)

            piratesComposition.updatePirateHealthBar(this.pirateHealthBar, this.pirateCurrentHealth)
            piratesComposition.movePirateHealthBar(this.pirateHealthBar, this.pirates.x, this.pirates.y)
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
