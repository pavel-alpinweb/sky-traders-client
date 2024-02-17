import * as Phaser from "phaser"

export function useGameScene() {
    const gameContainer = <HTMLDivElement>document.getElementById("game")

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameContainer,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        scene: {
            preload,
            create,
            update,
        },
    }

    function preload() {}

    function create() {}

    function update() {}

    return new Phaser.Game(config)
}
