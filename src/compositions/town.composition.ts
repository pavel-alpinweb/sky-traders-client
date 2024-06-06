import Phaser from "phaser"
import { LEVEL_WIDTH, TOWN_SIZE } from "../configs/gameplay.config.ts"

export const townComposition = {
    uploadTown(scene: Phaser.Scene, name: string) {
        scene.load.image("town", `/assets/towns/${name}-screen.png`)
    },

    uploadClouds(scene: Phaser.Scene) {
        scene.load.image("clouds", "/assets/vfx/clouds-screen.png")
    },

    createTown(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(LEVEL_WIDTH / 2, TOWN_SIZE / 2, "town")
    },

    createClouds(scene: Phaser.Scene) {
        return scene.add.tileSprite(LEVEL_WIDTH / 2, TOWN_SIZE / 2, LEVEL_WIDTH, 310, "clouds")
    },

    moveClouds(clouds: Phaser.GameObjects.TileSprite) {
        clouds.tilePositionX += 0.5
    },
}
