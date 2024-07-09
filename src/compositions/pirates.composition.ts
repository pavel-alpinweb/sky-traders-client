import Phaser from "phaser"

export const piratesComposition = {
    piratesShipsUpload(scene: Phaser.Scene) {
        scene.load.image("shark", "/assets/ships/shark/shark-map.png")
        scene.load.image("spawner", "/assets/tiles/spawner.jpg")
    },
}
