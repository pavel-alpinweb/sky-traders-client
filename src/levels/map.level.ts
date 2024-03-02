import { engineConfig } from "../configs/engine.config.ts"
import Phaser from "phaser"
import { MapScene } from "../scenes/game.scene.ts"

export function useMapLevel() {
    const gameContainer = <HTMLDivElement>document.getElementById("game")
    const config = {
        ...engineConfig,
        parent: gameContainer,
        scene: MapScene,
    }

    return new Phaser.Game(config)
}
