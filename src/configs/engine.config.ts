import Phaser from "phaser"
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "./gameplay.config.ts"

export const engineConfig = {
    type: Phaser.AUTO,
    width: LEVEL_WIDTH,
    height: LEVEL_HEIGHT,
}
