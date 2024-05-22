import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export const mapComposition = {
    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("map", "/assets/tiles/surface.png")
    },

    tileMapUpload(scene: Phaser.Scene) {
        scene.load.tilemapTiledJSON("tilemap", "/assets/levels/dev.json")
    },

    islandUpload(scene: Phaser.Scene) {
        scene.load.image("island-grass-big", "/assets/islands/island-grass-big.png")
        scene.load.image("island-grass-small", "/assets/islands/island-grass-small.png")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add
            .tileSprite(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2, LEVEL_WIDTH * 8, LEVEL_HEIGHT * 8, "map")
            .setScale(0.8)
            .setAlpha(0.6)
            .setScrollFactor(0.5)
            .postFX.addBlur(0, 2, 2, 0.2, 0xcdf8ef, 2)
    },

    addMapTown(scene: Phaser.Scene, key: string): Phaser.Types.Physics.Arcade.SpriteWithStaticBody {
        return scene.physics.add.staticSprite(1375, 500, key)
    },

    createLevel(scene: Phaser.Scene): Phaser.Tilemaps.Tilemap {
        return scene.make.tilemap({ key: "tilemap" })
    },

    createIslands(map: Phaser.Tilemaps.Tilemap) {
        const islandsBottom = map.createFromObjects("islandsBottom", { gid: 2, key: "island-grass-big" })
        const islandsTop = map.createFromObjects("islandsTop", { gid: 1, key: "island-grass-small" })
        const islandsMiddle = map.createFromObjects("islandMiddle", { gid: 3, key: "island-grass-small" })
        for (const island of islandsTop) {
            // eslint-disable-next-line
            // @ts-ignore
            island.setScrollFactor(0.95).setScale(0.95)
        }
        for (const island of islandsMiddle) {
            // eslint-disable-next-line
            // @ts-ignore
            island.setScrollFactor(0.75).setScale(0.75)
        }
        for (const island of islandsBottom) {
            // eslint-disable-next-line
            // @ts-ignore
            island.setScrollFactor(0.5).setScale(0.5)
        }
    },
}
