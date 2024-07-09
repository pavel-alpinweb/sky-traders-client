import Phaser from "phaser"
import { Pirate } from "../objects/Pirate.object.ts"
import { weaponComposition } from "./weapon.composition.ts"

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

    hitOnPirateHandler(scene: Phaser.Scene, pirate: Pirate, playerBullets: Phaser.Physics.Arcade.Group, playerShipDamage: number) {
        scene.physics.add.collider(
            playerBullets,
            pirate.body,
            () => {},
            (pirateBody, bullet) => {
                weaponComposition.explosionOnHit(pirateBody, bullet)
                pirate.pirateCurrentHealth -= pirate.pirateCurrentHealth >= playerShipDamage ? playerShipDamage : pirate.pirateCurrentHealth

                if (pirate.pirateCurrentHealth <= 0 && pirate.body.body) {
                    pirate.death()
                }
            }
        )
    },
}
