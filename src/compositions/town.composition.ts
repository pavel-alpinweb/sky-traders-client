import Phaser from "phaser"
import { LEVEL_WIDTH, LEVEL_HEIGHT } from "../configs/gameplay.config.ts"

export const townComposition = {
    uploadTown(scene: Phaser.Scene, name: string) {
        scene.load.image("town", `/assets/towns/${name}-screen.png`)
    },

    uploadClouds(scene: Phaser.Scene) {
        scene.load.image("clouds-small", "/assets/vfx/clouds-screen.png")
        scene.load.image("clouds-dark", "/assets/vfx/clouds-screen-2.png")
        scene.load.image("clouds-big", "/assets/vfx/clouds-screen-3.png")
    },

    createTown(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2, "town")
    },

    createClouds(scene: Phaser.Scene, y: number, height: number, name: string) {
        return scene.add.tileSprite(LEVEL_WIDTH / 2, y, LEVEL_WIDTH, height, name)
    },

    moveClouds(clouds: Phaser.GameObjects.TileSprite, speed: number) {
        clouds.tilePositionX += speed
    },
}
