import { engineConfig } from "../configs/engine.config.ts"
import Phaser from "phaser"
import { MapScene } from "../scenes/game.scene.ts"
import { Coords } from "../types/interfaces.ts"

export function useMapLevel(coords: Coords, ship: string) {
    const gameContainer = <HTMLDivElement>document.getElementById("game")
    const config = {
        ...engineConfig,
        parent: gameContainer,
        scene: new MapScene(coords, ship),
    }

    return new Phaser.Game(config)
}
