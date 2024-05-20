import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export const mapComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image(ship, `/assets/ships/${ship}.png`)
    },

    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("map", "/assets/tiles/surface.png")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add
            .tileSprite(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2, LEVEL_WIDTH * 4, LEVEL_HEIGHT * 4, "map")
            .setScale(1.1)
            .setAlpha(0.8)
            .setScrollFactor(0.5)
            .postFX.addBlur(0, 2, 2, 0.2, 0xcdf8ef, 2)
    },

    addMapTown(scene: Phaser.Scene, key: string): Phaser.Types.Physics.Arcade.SpriteWithStaticBody {
        return scene.physics.add.staticSprite(1375, 500, key)
    },
}
