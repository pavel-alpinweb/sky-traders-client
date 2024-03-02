import * as Phaser from "phaser"
import { BASIC_SHIP_ANGULAR_VELOCITY, BASIC_SHIP_ROTATION_VELOCITY, BASIC_SHIP_SCALE, BASIC_SHIP_SPEED, TARGET_TOLERANCE } from "../configs/gameplay.config.ts"

export class MapScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }
    private target!: Phaser.Math.Vector2
    constructor() {
        super()
    }

    preload() {
        this.load.image("sky", "/assets/backgrounds/sky.png")
        this.load.image("ship", "/assets/ships/ship.png")
    }

    create() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, "sky")
        this.player = this.physics.add
            .image(window.innerWidth / 2, window.innerHeight / 2, "ship")
            .setScale(BASIC_SHIP_SCALE)
            .refreshBody()
        this.target = new Phaser.Math.Vector2()
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.target.x = pointer.x
            this.target.y = pointer.y

            this.physics.moveToObject(this.player, this.target, BASIC_SHIP_SPEED)
            this.player.setAngularVelocity(BASIC_SHIP_ANGULAR_VELOCITY).refreshBody()
        })
    }

    update() {
        const angleToPointer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.player.x, this.player.y, this.target.x, this.target.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(this.player.body.rotation, angleToPointer)
        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target)

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TARGET_TOLERANCE)) {
            this.player.body.rotation = angleToPointer
            this.player.setAngularVelocity(0)
        } else {
            this.player.setAngularVelocity(Math.sign(angleDelta) * BASIC_SHIP_ANGULAR_VELOCITY)
        }

        if (distance < TARGET_TOLERANCE) {
            this.player.body.reset(this.target.x, this.target.y)
            this.physics.velocityFromRotation(Phaser.Math.DegToRad(this.player.body.rotation), BASIC_SHIP_ROTATION_VELOCITY, this.player.body.velocity)
        }
    }
}
