import Phaser from "phaser"

export const engineConfig = {
    type: Phaser.AUTO,
    width: 2048,
    height: 1536,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
}
