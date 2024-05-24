import Phaser from "phaser"

export const EventBus = new Phaser.Events.EventEmitter()

export function checkOverlap(spriteA: Phaser.GameObjects.GameObject, spriteB: Phaser.GameObjects.GameObject) {
    // eslint-disable-next-line
    // @ts-ignore
    const boundsA = spriteA.getBounds()
    // eslint-disable-next-line
    // @ts-ignore
    const boundsB = spriteB.getBounds()
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
}
