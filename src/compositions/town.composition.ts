import Phaser from "phaser"

export const townComposition = {
    uploadTown(scene: Phaser.Scene, name: string) {
        scene.load.image("town", `/assets/towns/${name}-screen.png`)
    },

    createTown(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, "town")
    },
}
