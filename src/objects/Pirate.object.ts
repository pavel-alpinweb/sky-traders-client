import Phaser from "phaser"
import {
    BASIC_SHIP_SCALE,
    PIRATE_ANGULAR_VELOCITY,
    PIRATE_FIRE_DELAY,
    PIRATE_FIRE_DISTANCE,
    PIRATE_MAX_HEALTH,
    PIRATE_START_FIRE_DELAY,
    PIRATE_STOP_TOLERANCE,
    PIRATE_VELOCITY,
    TARGET_TOLERANCE,
} from "../configs/gameplay.config.ts"
import { Coords } from "../types/interfaces.ts"
import { weaponComposition } from "../compositions/weapon.composition.ts"

export class Pirate {
    public scene!: Phaser.Scene
    public body!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    public spawner!: Phaser.GameObjects.GameObject
    public pirateFireTimer!: Phaser.Time.TimerEvent
    public pirateBullets!: Phaser.Physics.Arcade.Group
    public pirateHealthBar!: Phaser.GameObjects.Graphics
    public pirateCurrentHealth: number = PIRATE_MAX_HEALTH

    constructor(scene: Phaser.Scene, spawner: Phaser.GameObjects.GameObject) {
        this.scene = scene
        this.spawner = spawner
    }

    init(coords: Coords): void {
        this.body = this.scene.physics.add
            .image(coords.x, coords.y - (window.innerHeight / 2 + 512), "shark")
            .setScale(BASIC_SHIP_SCALE)
            .refreshBody()
        this.initBullets()
        this.initFireTimer()
        this.initPirateHealthBar()
    }

    initBullets(): void {
        this.pirateBullets = weaponComposition.init(this.scene)
    }

    initFireTimer(): void {
        this.pirateFireTimer = this.scene.time.addEvent({
            paused: true,
            delay: PIRATE_FIRE_DELAY,
            startAt: PIRATE_START_FIRE_DELAY,
            callback: () => {
                weaponComposition.fire(this.scene, this.pirateBullets, this.body, "pirate-bullets")
            },
            loop: true,
        })
    }

    initPirateHealthBar(): void {
        this.pirateHealthBar = this.scene.add.graphics()
        this.pirateHealthBar.fillStyle(0x4caf50, 1)
        this.pirateHealthBar.fillRect(0, 0, 100, 10)
        this.pirateHealthBar.x = this.body.x - 50
        this.pirateHealthBar.y = this.body.y - 50
    }

    hitOnPirateHandler(playerBullets: Phaser.Physics.Arcade.Group, playerShipDamage: number): void {
        this.scene.physics.add.collider(
            playerBullets,
            this.body,
            () => {},
            (pirate, bullet) => {
                weaponComposition.explosionOnHit(pirate, bullet)
                this.pirateCurrentHealth -= this.pirateCurrentHealth >= playerShipDamage ? playerShipDamage : this.pirateCurrentHealth

                if (this.pirateCurrentHealth <= 0) {
                    this.death()
                }
            }
        )
    }

    death(): void {
        this.pirateFireTimer.destroy()
        const pirateExplosion = this.scene.add.sprite(this.body.x, this.body.y, "death")
        pirateExplosion.anims.play("death")
        this.body.body.enable = false
        this.body.setAlpha(0)
        this.pirateHealthBar.setAlpha(0)
        pirateExplosion.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
                this.body.destroy()
                pirateExplosion.destroy()
                this.pirateHealthBar.destroy()
            },
            this
        )
    }

    onMoving(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }): void {
        this.movePirate(player)
        this.fire(player)
        this.updatePirateHealthBar()
        this.movePirateHealthBar()
    }

    fire(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }) {
        const distance = Phaser.Math.Distance.BetweenPoints(this.body, player)

        this.pirateFireTimer.paused = distance > PIRATE_FIRE_DISTANCE
    }

    movePirate(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }) {
        const distance = Phaser.Math.Distance.BetweenPoints(this.body, player)
        const angleToPlayer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.body.x, this.body.y, player.x, player.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(this.body.body.rotation, angleToPlayer)

        if (distance < PIRATE_STOP_TOLERANCE) {
            this.body.body.reset(this.body.x, this.body.y)
        }

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TARGET_TOLERANCE)) {
            this.body.body.rotation = angleToPlayer
            this.body.setAngularVelocity(0)
        } else {
            this.body.setAngularVelocity(Math.sign(angleDelta) * PIRATE_ANGULAR_VELOCITY)
        }

        this.scene.physics.moveToObject(this.body, player, PIRATE_VELOCITY)
    }

    updatePirateHealthBar() {
        const percentage = this.pirateCurrentHealth / (PIRATE_MAX_HEALTH / 100)
        let color

        if (percentage >= 60) {
            color = 0x4caf50
        } else if (percentage >= 40) {
            color = 0xffc107
        } else if (percentage <= 39.9) {
            color = 0xf44336
        }
        this.pirateHealthBar.clear()
        this.pirateHealthBar.fillStyle(color as number, 1)
        this.pirateHealthBar.fillRect(0, 0, 100, 10)
        this.pirateHealthBar.scaleX = percentage / 100
    }

    movePirateHealthBar() {
        this.pirateHealthBar.x = this.body.x - 50
        this.pirateHealthBar.y = this.body.y - 50
    }
}
