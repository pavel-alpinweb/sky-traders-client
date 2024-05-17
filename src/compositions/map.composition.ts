import Phaser from "phaser"

export const mapComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image(ship, `/assets/ships/${ship}.png`)
    },

    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("map", "/assets/backgrounds/map3.jpg")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add.image(window.innerWidth / 2, window.innerHeight / 2, "map")
    },

    addMapTown(scene: Phaser.Scene, key: string): Phaser.Types.Physics.Arcade.SpriteWithStaticBody {
        return scene.physics.add.staticSprite(1375, 500, key)
    },
}
