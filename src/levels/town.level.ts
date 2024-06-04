import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "../configs/gameplay.config.ts"
import { TownScene } from "../scenes/town.scene.ts"

export function useTownLevel(name: string) {
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
        scene: new TownScene(name),
    }

    return new Phaser.Game(config)
}
