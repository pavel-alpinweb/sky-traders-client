import Phaser from "phaser"

export const mapBackgroundComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image(ship, `/assets/ships/${ship}.png`)
    },

    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("sky", "/assets/backgrounds/sky.png")
    },

    addMapBackground(scene: Phaser.Scene): void {
        scene.add.image(window.innerWidth / 2, window.innerHeight / 2, "sky")
    },
}
