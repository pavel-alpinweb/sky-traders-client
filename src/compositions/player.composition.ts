import Phaser from "phaser"
import { EventBus } from "../utils/utils.ts"
import { BASIC_SHIP_SCALE, BASIC_SHIP_SPEED, FIRE_BUTTON, TARGET_HIDE_DISTANCE, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"
import { Ship } from "../types/interfaces.ts"
import { weaponComposition } from "./weapon.composition.ts"
export const playerComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image("ship", `/assets/ships/${ship}/${ship}-map.png`)
        scene.load.image("smoke", "/assets/vfx/smoke-particle.png")
    },

    initPlayer(
        scene: Phaser.Scene,
        x: number,
        y: number
    ): Phaser.Physics.Arcade.Image & {
        body: Phaser.Physics.Arcade.Body
    } {
        const emitter = scene.add.particles(0, 0, "smoke", {
            speed: {
                onEmit: () => player.body.speed * 0.1,
            },
            lifespan: {
                onEmit: () => Phaser.Math.Percent(player.body.speed, 0, 100) * 1000,
            },
            quantity: 1,
            scale: { start: 0.3, end: 0 },
        })
        const player = scene.physics.add.image(x, y, "ship").setScale(BASIC_SHIP_SCALE).refreshBody()
        emitter.startFollow(player)
        scene.cameras.main.setBackgroundColor(0xa7efff).startFollow(player).setZoom(0.6)
        return player
    },

    initTarget(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }): Phaser.GameObjects.Image {
        return scene.add.image(player.x, player.y, "ship").setAlpha(0.4).setScale(BASIC_SHIP_SCALE)
    },

    movePlayer(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image, ship: Ship) {
        scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            target.setAlpha(0.4)
            if (ship.currentFuel > 0) {
                target.x = pointer.worldX
                target.y = pointer.worldY

                scene.physics.moveToObject(player, target, BASIC_SHIP_SPEED)
            }
        })
    },

    onMovingPlayer(
        player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body },
        target: Phaser.GameObjects.Image,
        scene: Phaser.Scene,
        velocity: number,
        fuelConsumption: Phaser.Time.TimerEvent,
        healthConsumption: Phaser.Time.TimerEvent,
        ship: Ship
    ) {
        const distance = Phaser.Math.Distance.BetweenPoints(player, target)
        if (player.body.speed > 0 && ship.currentFuel > 0) {
            fuelConsumption.paused = false
            healthConsumption.paused = false
            this.rotatePlayer(player, target, ship.angularVelocity)
            scene.physics.moveToObject(player, target, velocity)
            player.body.velocity.scale(Phaser.Math.SmoothStep(distance, 0, 50))
        }
        if (ship.currentFuel <= 0) {
            target.x = player.x
            target.y = player.y
        }
        if (distance < TARGET_HIDE_DISTANCE) {
            fuelConsumption.paused = true
            healthConsumption.paused = true
            target.setAlpha(0)
        }
        if (distance < TARGET_TOLERANCE) {
            player.body.reset(target.x, target.y)
        }
    },

    rotatePlayer(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image, shipAngularVelocity: number): void {
        const angleToPointer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, target.x, target.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(player.body.rotation, angleToPointer)

        target.angle = angleToPointer
        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, 5)) {
            player.body.rotation = angleToPointer
            player.setAngularVelocity(0)
        } else {
            player.setAngularVelocity(Math.sign(angleDelta) * shipAngularVelocity)
        }
    },

    initFuelConsumption(scene: Phaser.Scene) {
        return scene.time.addEvent({
            paused: true,
            delay: 100,
            startAt: 100,
            callback: () => {
                EventBus.emit("decrease-fuel")
            },
            loop: true,
        })
    },

    initHealthConsumption(scene: Phaser.Scene) {
        return scene.time.addEvent({
            paused: true,
            delay: 100,
            startAt: 100,
            callback: () => {
                EventBus.emit("decrease-health")
            },
            loop: true,
        })
    },

    fire(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, texture: string): void {
        const fireButton = scene.input.keyboard?.addKey(FIRE_BUTTON)
        if (fireButton) {
            fireButton.on("up", () => {
                weaponComposition.fire(scene, bullets, player, texture)
            })
        }
    },

    death(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image) {
        const playerExplosion = scene.add.sprite(player.x, player.y, "death")
        playerExplosion.anims.play("death")
        player.body.enable = false
        player.setAlpha(0)
        target.setAlpha(0)
        playerExplosion.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            function () {
                player.destroy()
                playerExplosion.destroy()
                target.destroy()
                EventBus.emit("crush-ship-end")
            },
            this
        )
    },
}
