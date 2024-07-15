import Phaser from "phaser"
import { Pirate } from "../objects/Pirate.object.ts"

export const piratesComposition = {
    piratesShipsUpload(scene: Phaser.Scene) {
        scene.load.image("shark", "/assets/ships/shark/shark-map.png")
        scene.load.image("spawner", "/assets/tiles/spawner.jpg")
    },

    createSpawners(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, pirates: Pirate[]) {
        const spawns = map.createFromObjects("spawners", { name: "shark", key: "spawner" })

        for (const spawn of spawns) {
            const pirate = new Pirate(scene, spawn)
            pirates.push(pirate)
        }
    },
}
