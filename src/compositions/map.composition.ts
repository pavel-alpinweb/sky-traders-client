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
        scene.load.image("island-ground-big", "/assets/islands/island-ground-big.png")
        scene.load.image("island-ground-small", "/assets/islands/island-ground-small.png")
        scene.load.image("island-sand-small", "/assets/islands/island-sand-small.png")
        scene.load.image("island-sand-big", "/assets/islands/island-sand-big.png")
    },

    townsUpload(scene: Phaser.Scene) {
        scene.load.image("start-01", "/assets/towns/start-01-map.png")
        scene.load.image("start-02", "/assets/towns/start-02-map.png")
        scene.load.image("middle", "/assets/towns/middle-map.png")
        scene.load.image("final-01", "/assets/towns/final-01-map.png")
        scene.load.image("final-02", "/assets/towns/final-02-map.png")
    },

    uploadClouds(scene: Phaser.Scene) {
        scene.load.image("clouds-top", "/assets/vfx/clouds-map-2.png")
    },

    createClouds(scene: Phaser.Scene, name: string, scale: number) {
        const container = scene.add.container(LEVEL_WIDTH / 2, LEVEL_HEIGHT / 2).setScrollFactor(0, 0)
        const clouds = scene.add.tileSprite(0, 0, LEVEL_WIDTH * 2, LEVEL_HEIGHT * 2, name).setScrollFactor(0.5, 0.5)

        clouds.setTileScale(scale, scale)
        container.add(clouds)

        return clouds
    },

    moveClouds(clouds: Phaser.GameObjects.TileSprite, speed: number, player: Phaser.Physics.Arcade.Image & { body: Phaser.Physics.Arcade.Body }) {
        clouds.setTilePosition(player.x * speed + speed, player.y * speed)
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
        const islandsGreenBigBottom = map.createFromObjects("islandsBottom", { name: "islandsBottom", key: "island-grass-big" })
        const islandsGroundBigBottom = map.createFromObjects("islandsBottom", { name: "islandGroundBig", key: "island-ground-big" })
        const islandsSandBigBottom = map.createFromObjects("islandsBottom", { name: "islandSandSmall", key: "island-sand-small" })
        const allBottomIslands = islandsGreenBigBottom.concat(islandsGroundBigBottom).concat(islandsSandBigBottom)

        const islandsGreenMiddle = map.createFromObjects("islandsMiddle", { name: "islandsMiddle", key: "island-grass-small" })
        const islandsGroundMiddle = map.createFromObjects("islandsMiddle", { name: "islandsGroundSmall", key: "island-ground-small" })
        const islandsSandMiddle = map.createFromObjects("islandsMiddle", { name: "islandSandBig", key: "island-sand-big" })
        const allMiddleIslands = islandsGreenMiddle.concat(islandsGroundMiddle).concat(islandsSandMiddle)

        const islandsGreenSmallTop = map.createFromObjects("islandsTop", { name: "islandsTop", key: "island-grass-small" })
        const islandsGreenSmallBig = map.createFromObjects("islandsTop", { name: "islandGrassBig", key: "island-grass-big" })
        const islandsGroundSmallTop = map.createFromObjects("islandsTop", { name: "islandGroundSmall", key: "island-ground-small" })
        const islandsSandSmallTop = map.createFromObjects("islandsTop", { name: "islandSandTop", key: "island-sand-small" })
        const allTopIslands = islandsGreenSmallTop.concat(islandsGreenSmallBig).concat(islandsGroundSmallTop).concat(islandsSandSmallTop)

        for (const island of allTopIslands) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.8).setScale(1).postFX.addBlur(0, 2, 2, 0.1, 0xa7efff, 2)
            island.setScrollFactor(0.8).setScale(0.9).setAlpha(0.9)
        }
        for (const island of allMiddleIslands) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.6).setScale(0.9).postFX.addBlur(0, 2, 2, 0.2, 0xa7efff, 2)
            island.setScrollFactor(0.6).setScale(0.7).setAlpha(0.7)
        }
        for (const island of allBottomIslands) {
            // eslint-disable-next-line
            // @ts-ignore
            // island.setScrollFactor(0.4).setScale(0.8).postFX.addBlur(0, 2, 2, 0.3, 0xa7efff, 2)
            island.setScrollFactor(0.5).setScale(0.6).setAlpha(0.6)
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
