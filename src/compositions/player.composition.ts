import Phaser from "phaser"
import { EventBus } from "../utils/utils.ts"
import { BASIC_SHIP_ANGULAR_VELOCITY, BASIC_SHIP_SCALE, BASIC_SHIP_SPEED, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"
export const playerComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image(ship, `/assets/ships/${ship}.png`)
    },

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
        scene.cameras.main.setBackgroundColor(0xa7efff).startFollow(player).setZoom(0.6)
        return player
    },

    initTarget(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }): Phaser.GameObjects.Image {
        return scene.add.image(player.x, player.y, "ship").setAlpha(0.4).setScale(BASIC_SHIP_SCALE)
    },

    movePlayer(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image) {
        scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            target.x = pointer.worldX
            target.y = pointer.worldY

            scene.physics.moveToObject(player, target, BASIC_SHIP_SPEED)
        })
    },

    onMovingPlayer(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image, scene: Phaser.Scene) {
        const distance = Phaser.Math.Distance.BetweenPoints(player, target)
        if (player.body.speed > 0) {
            scene.physics.moveToObject(player, target, BASIC_SHIP_SPEED)
            player.body.velocity.scale(Phaser.Math.SmoothStep(distance, 0, 20))
            this.rotatePlayer(player, target)
        }
        if (distance < TARGET_TOLERANCE) {
            player.body.reset(target.x, target.y)
        }
    },

    rotatePlayer(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, target: Phaser.GameObjects.Image): void {
        const angleToPointer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, target.x, target.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(player.body.rotation, angleToPointer)

        target.angle = angleToPointer
        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TARGET_TOLERANCE)) {
            player.body.rotation = angleToPointer
            player.setAngularVelocity(0)
        } else {
            player.setAngularVelocity(Math.sign(angleDelta) * BASIC_SHIP_ANGULAR_VELOCITY)
        }
    },

    flyOnTown(player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, towns: Phaser.Physics.Arcade.StaticGroup, scene: Phaser.Scene): void {
        scene.physics.add.overlap(player, towns, (player, town) => {
            EventBus.emit("fly-on-town", {
                coords: {
                    // eslint-disable-next-line
                    // @ts-ignore
                    x: player.x,
                    // eslint-disable-next-line
                    // @ts-ignore
                    y: player.y,
                },
                // eslint-disable-next-line
                // @ts-ignore
                town: town.name,
            })
        })
    },
}
