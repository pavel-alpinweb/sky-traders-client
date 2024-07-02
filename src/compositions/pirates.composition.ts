import Phaser from "phaser"
import { BASIC_SHIP_SCALE } from "../configs/gameplay.config.ts"

export const piratesComposition = {
    piratesShipsUpload(scene: Phaser.Scene) {
        scene.load.image("shark", "/assets/ships/shark/shark-map.png")
    },

    initPirates(
        scene: Phaser.Scene,
        x: number,
        y: number
    ): Phaser.Physics.Arcade.Image & {
        body: Phaser.Physics.Arcade.Body
    } {
        return scene.physics.add.image(x, y, "shark").setScale(BASIC_SHIP_SCALE).refreshBody()
    },
}
