import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export const mapComposition = {
    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("map", "/assets/tiles/surface.png")
    },

    tileMapUpload(scene: Phaser.Scene) {
        scene.load.tilemapTiledJSON("tilemap", "/assets/levels/demo.json")
    },

    islandUpload(scene: Phaser.Scene) {
        scene.load.image("island-grass-big", "/assets/islands/island-grass-big.png")
        scene.load.image("island-grass-small", "/assets/islands/island-grass-small.png")
    },

    townsUpload(scene: Phaser.Scene) {
        scene.load.image("start-01", "/assets/towns/start-01-map.png")
        scene.load.image("start-02", "/assets/towns/start-02-map.png")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add
            .tileSprite(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2, LEVEL_WIDTH * 8, LEVEL_HEIGHT * 8, "map")
            .setScale(0.8)
            .setAlpha(0.6)
            .setScrollFactor(0.2)
            .postFX.addBlur(0, 2, 2, 0.2, 0xcdf8ef, 2)
    },

    createLevel(scene: Phaser.Scene): Phaser.Tilemaps.Tilemap {
        return scene.make.tilemap({ key: "tilemap" })
    },

    createIslands(map: Phaser.Tilemaps.Tilemap) {
        const islandsBottom = map.createFromObjects("islandsBottom", { name: "islandsBottom", key: "island-grass-big" })
        const islandsMiddle = map.createFromObjects("islandsMiddle", { name: "islandsMiddle", key: "island-grass-small" })
        const islandsTop = map.createFromObjects("islandsTop", { name: "islandsTop", key: "island-grass-small" })
        for (const island of islandsTop) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.8).setScale(1).postFX.addBlur(0, 2, 2, 0.1, 0xa7efff, 2)
            island.setScrollFactor(0.8).setScale(0.9).setAlpha(0.9)
        }
        for (const island of islandsMiddle) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.6).setScale(0.9).postFX.addBlur(0, 2, 2, 0.2, 0xa7efff, 2)
            island.setScrollFactor(0.6).setScale(0.8).setAlpha(0.8)
        }
        for (const island of islandsBottom) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.4).setScale(0.8).postFX.addBlur(0, 2, 2, 0.3, 0xa7efff, 2)
            island.setScrollFactor(0.4).setScale(0.7).setAlpha(0.7)
        }
    },

    createTowns(townsNames: string[], towns: Phaser.Physics.Arcade.StaticGroup, map: Phaser.Tilemaps.Tilemap): Phaser.GameObjects.GameObject[] {
        const townsArray: Phaser.GameObjects.GameObject[] = []
        for (const townName of townsNames) {
            const town = map.createFromObjects("towns", { name: townName, key: townName })
            towns.add(town[0])
            townsArray.push(town[0])
        }

        return townsArray
    },
}
