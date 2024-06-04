import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export const townComposition = {
    uploadTown(scene: Phaser.Scene, name: string) {
        scene.load.image("town", `/assets/towns/${name}-screen.png`)
    },

    createTown(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2, "town")
    },
}
