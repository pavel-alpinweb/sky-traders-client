import Phaser from "phaser"
import { BASIC_SHIP_ANGULAR_VELOCITY, BASIC_SHIP_SCALE, ENEMY_FIRE_DELAY, ENEMY_START_FIRE_DELAY, PIRATE_STOP_TOLERANCE, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"

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
            pirate.setAngularVelocity(Math.sign(angleDelta) * BASIC_SHIP_ANGULAR_VELOCITY)
        }

        scene.physics.moveToObject(pirate, player, velocity)
    },

    initFireTimer(scene: Phaser.Scene) {
        return scene.time.addEvent({
            paused: true,
            delay: ENEMY_FIRE_DELAY,
            startAt: ENEMY_START_FIRE_DELAY,
            callback: () => {},
            loop: true,
        })
    },
}
