import * as Phaser from "phaser"

class GameScene extends Phaser.Scene {
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
        this.add.image(400, 300, "sky")
        this.player = this.physics.add.image(400, 300, "ship").setScale(0.2).refreshBody()
        this.target = new Phaser.Math.Vector2()
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.target.x = pointer.x
            this.target.y = pointer.y

            this.physics.moveToObject(this.player, this.target, 200)
            this.player.setAngularVelocity(180).refreshBody()
        })
    }

    update() {
        const angleToPointer = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.player.x, this.player.y, this.target.x, this.target.y))
        const angleDelta = Phaser.Math.Angle.ShortestBetween(this.player.body.rotation, angleToPointer)
        const tolerance = 4
        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target)

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, tolerance)) {
            this.player.body.rotation = angleToPointer
            this.player.setAngularVelocity(0)
        } else {
            this.player.setAngularVelocity(Math.sign(angleDelta) * 180)
        }

        if (distance < tolerance) {
            this.player.body.reset(this.target.x, this.target.y)
            this.physics.velocityFromRotation(Phaser.Math.DegToRad(this.player.body.rotation), 90, this.player.body.velocity)
        }
    }
}

export function useGameScene() {
    const gameContainer = <HTMLDivElement>document.getElementById("game")

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameContainer,
        scene: GameScene,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false,
            },
        },
    }

    return new Phaser.Game(config)
}
