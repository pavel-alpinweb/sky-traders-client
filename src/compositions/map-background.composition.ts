import Phaser from "phaser"

export const mapBackgroundComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image(ship, `/assets/ships/${ship}.png`)
    },

    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("map", "/assets/backgrounds/map3.jpg")
        scene.load.image("town", "/assets/towns/town.png")
        scene.load.image("island", "/assets/backgrounds/island.png")
        scene.load.image("island2", "/assets/backgrounds/island2.png")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add.image(window.innerWidth / 2, window.innerHeight / 2, "map")
        scene.add.sprite(1375, 500, "town")?.preFX?.addShadow()
        scene.add.sprite(522, 942, "island").setScale(0.4)?.preFX?.addShadow()
        scene.add.sprite(1447, 1080, "island2").setScale(0.7)?.preFX?.addShadow()
    },
}
