import Phaser from "phaser"

export const mapAssetsUploadComposition = {
    playerShipUpload(scene: Phaser.Scene, ship: string): void {
        scene.load.image("ship", `/assets/ships/${ship}.png`)
    },

    mapBackgroundUpload(scene: Phaser.Scene): void {
        scene.load.image("sky", "/assets/backgrounds/sky.png")
    },
}
