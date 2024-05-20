import Phaser from "phaser"
import { BASIC_SHIP_ANGULAR_VELOCITY, BASIC_SHIP_ROTATION_VELOCITY, BASIC_SHIP_SCALE, BASIC_SHIP_SPEED, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"

export const playerComposition = {
    initPlayer(
        scene: Phaser.Scene,
        ship: string,
        x: number,
        y: number
    ): Phaser.Physics.Arcade.Image & {
        body: Phaser.Physics.Arcade.Body
    } {
        const player = scene.physics.add.image(x, y, ship).setScale(BASIC_SHIP_SCALE).refreshBody()
        player?.preFX?.addShadow()
        scene.cameras.main.setBackgroundColor(0xcdf8ef).startFollow(player)
        return player
    },

    movePlayer(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }): Phaser.Math.Vector2 {
        const target = new Phaser.Math.Vector2()
        scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            console.log("target", {
                x: pointer.x,
                y: pointer.y,
            })
            target.x = pointer.x
            target.y = pointer.y

            scene.physics.moveToObject(player, target, BASIC_SHIP_SPEED)
            player.setAngularVelocity(BASIC_SHIP_ANGULAR_VELOCITY).refreshBody()
        })

        return target
    },

    rotatePlayer(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.Math.Vector2): void {
        const angleToPointer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, target.x, target.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(player.body.rotation, angleToPointer)
        const distance = Phaser.Math.Distance.BetweenPoints(player, target)

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TARGET_TOLERANCE)) {
            player.body.rotation = angleToPointer
            player.setAngularVelocity(0)
        } else {
            player.setAngularVelocity(Math.sign(angleDelta) * BASIC_SHIP_ANGULAR_VELOCITY)
        }

        if (distance < TARGET_TOLERANCE) {
            player.body.reset(target.x, target.y)
            scene.physics.velocityFromRotation(Phaser.Math.DegToRad(player.body.rotation), BASIC_SHIP_ROTATION_VELOCITY, player.body.velocity)
        }
    },
}
