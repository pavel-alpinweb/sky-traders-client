import Phaser from "phaser"
import { BULLET_VELOCITY } from "../configs/gameplay.config.ts"

export const weaponComposition = {
    uploadBullets(scene: Phaser.Scene, ship: string) {
        scene.load.image("bullets", `/assets/projectiles/${ship}-bullet.png`)
    },

    init(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
        return scene.physics.add.group()
    },

    fire(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, body: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, texture: string): void {
        if (bullets.get()) {
            const bullet = bullets.create(body.x, body.y, texture).setScale(0.7)
            bullet.angle = body.angle
            scene.physics.velocityFromAngle(body.angle, BULLET_VELOCITY, bullet.body.velocity)
        }
    },
}
