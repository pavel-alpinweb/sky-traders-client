import Phaser from "phaser"
import { BULLET_VELOCITY } from "../configs/gameplay.config.ts"
import { EventBus } from "../utils/utils.ts"

export const weaponComposition = {
    uploadBullets(scene: Phaser.Scene, ship: string) {
        scene.load.image("bullets", `/assets/projectiles/${ship}-bullet.png`)
        scene.load.image("pirate-bullets", "/assets/projectiles/shark-bullet.png")
    },

    uploadVFX(scene: Phaser.Scene) {
        scene.load.atlas("explosion", "/assets/vfx/explosion.png", "/assets/vfx/explosion.json")
    },

    initVFXAnimations(scene: Phaser.Scene) {
        scene.anims.create({
            key: "explosion",
            frames: scene.anims.generateFrameNames("explosion", {
                start: 1,
                end: 4,
                zeroPad: 0,
                suffix: ".png",
            }),
            frameRate: 10,
            repeat: 1,
        })
    },

    init(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
        return scene.physics.add.group()
    },

    fire(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, body: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, texture: string): void {
        if (bullets.get()) {
            const bullet = bullets.create(body.x, body.y, texture).setScale(0.7)
            bullet.angle = body.angle
            bullet.setBodySize(50, 50)
            scene.physics.velocityFromAngle(body.angle, BULLET_VELOCITY, bullet.body.velocity)

            bullet.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                function () {
                    const { world } = scene.physics
                    bullet.disableBody(true, true)
                    bullets.remove(bullets.getLast(true), true, true)
                    world.remove(bullet.body)
                },
                this
            )
        }
    },

    // eslint-disable-next-line
    // @ts-ignore
    explosionOnHit(body, bullet) {
        bullet.setVelocity(0)
        bullet.anims.play("explosion", true)
        bullet.body.enable = false
    },

    hitOnPlayerHandler(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }) {
        scene.physics.add.collider(
            bullets,
            player,
            () => {},
            (player, bullet) => {
                weaponComposition.explosionOnHit(player, bullet)
                EventBus.emit("damage-player")
            }
        )
    },

    hitOnPirateHandler(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group, pirate: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }, playerDamage: number) {
        scene.physics.add.collider(
            bullets,
            pirate,
            () => {},
            (pirate, bullet) => {
                weaponComposition.explosionOnHit(pirate, bullet)
                EventBus.emit("damage-pirate", playerDamage)
            }
        )
    },
}
