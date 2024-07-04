import Phaser from "phaser"
import { BASIC_SHIP_SCALE, PIRATE_ANGULAR_VELOCITY, PIRATE_FIRE_DELAY, PIRATE_FIRE_DISTANCE, PIRATE_START_FIRE_DELAY, PIRATE_STOP_TOLERANCE, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"
import { weaponComposition } from "./weapon.composition.ts"

export const piratesComposition = {
    piratesShipsUpload(scene: Phaser.Scene) {
        scene.load.image("shark", "/assets/ships/shark/shark-map.png")
    },

    initPirates(
        scene: Phaser.Scene,
        x: number,
        y: number
    ): Phaser.Physics.Arcade.Image & {
        body: Phaser.Physics.Arcade.Body
    } {
        return scene.physics.add.image(x, y, "shark").setScale(BASIC_SHIP_SCALE).refreshBody()
    },

    movePirate(
        scene: Phaser.Scene,
        player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body },
        pirate: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body },
        velocity: number
    ) {
        const distance = Phaser.Math.Distance.BetweenPoints(pirate, player)
        const angleToPlayer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(pirate.x, pirate.y, player.x, player.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(pirate.body.rotation, angleToPlayer)

        if (distance < PIRATE_STOP_TOLERANCE) {
            pirate.body.reset(pirate.x, pirate.y)
        }

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TARGET_TOLERANCE)) {
            pirate.body.rotation = angleToPlayer
            pirate.setAngularVelocity(0)
        } else {
            pirate.setAngularVelocity(Math.sign(angleDelta) * PIRATE_ANGULAR_VELOCITY)
        }

        scene.physics.moveToObject(pirate, player, velocity)
    },

    initFireTimer(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, pirate: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }) {
        return scene.time.addEvent({
            paused: true,
            delay: PIRATE_FIRE_DELAY,
            startAt: PIRATE_START_FIRE_DELAY,
            callback: () => {
                weaponComposition.fire(scene, bullets, pirate, "pirate-bullets")
            },
            loop: true,
        })
    },

    fire(pirate: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, timer: Phaser.Time.TimerEvent) {
        const distance = Phaser.Math.Distance.BetweenPoints(pirate, player)

        timer.paused = distance > PIRATE_FIRE_DISTANCE
    },

    initPirateHealthBar(scene: Phaser.Scene, pirateX: number, pirateY: number): Phaser.Geom.Line {
        const graphics = scene.add.graphics({ lineStyle: { width: 5, color: 0x4caf50 } })
        const line = new Phaser.Geom.Line(0, 0, 100, 0)

        Phaser.Geom.Line.CenterOn(line, pirateX, pirateY - 50)
        graphics.strokeLineShape(line)

        return line
    },
}
