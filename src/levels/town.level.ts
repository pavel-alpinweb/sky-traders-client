import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"

export function useTownLevel(town: string) {
    const gameContainer = <HTMLDivElement>document.getElementById("town")
    const config = {
        container: gameContainer,
        type: Phaser.AUTO,
        width: LEVEL_WIDTH,
        height: LEVEL_HEIGHT,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false,
            },
        },
    }

    return new Phaser.Game(config)
}
