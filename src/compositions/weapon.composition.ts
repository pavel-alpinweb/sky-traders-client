import Phaser from "phaser"

export const weaponComposition = {
    init(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
        return scene.physics.add.group()
    },
}
