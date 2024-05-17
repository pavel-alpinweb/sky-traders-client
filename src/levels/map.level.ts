import { engineConfig } from "../configs/engine.config.ts"
import Phaser from "phaser"
import { MapScene } from "../scenes/game.scene.ts"

export function useMapLevel(callback: () => void) {
    const gameContainer = <HTMLDivElement>document.getElementById("game")
    const config = {
        ...engineConfig,
        parent: gameContainer,
        scene: new MapScene(callback),
    }

    return new Phaser.Game(config)
}
