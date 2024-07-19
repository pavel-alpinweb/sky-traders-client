import Phaser from "phaser"
import IconSugar from "/public/assets/icons/resources/sugar.svg"
import IconCorn from "/public/assets/icons/resources/corn.svg"
import IconSpice from "/public/assets/icons/resources/spice.svg"
import IconGrain from "/public/assets/icons/resources/grain.svg"
import IconWood from "/public/assets/icons/resources/wood.svg"
import IconHemp from "/public/assets/icons/resources/hemp.svg"
import IconCotton from "/public/assets/icons/resources/cotton.svg"
import IconGunPower from "/public/assets/icons/resources/gunpowder.svg"
import IconCoal from "/public/assets/icons/resources/coal.svg"
import IconSteel from "/public/assets/icons/resources/steel.svg"
import IconIvory from "/public/assets/icons/resources/ivory.svg"
import IconGold from "/public/assets/icons/resources/gold.svg"
import IconSilk from "/public/assets/icons/resources/silk.svg"
import { IconList } from "../types/types.ts"
import { HEADING } from "../types/interfaces.ts"
import { UPDATE_MARKETS_INTERVAL, UPDATE_MARKETS_VALUE } from "../configs/gameplay.config.ts"

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

export const ICONS_LIST: IconList = {
    sugar: IconSugar,
    corn: IconCorn,
    spice: IconSpice,
    grain: IconGrain,
    wood: IconWood,
    hemp: IconHemp,
    cotton: IconCotton,
    gunpowder: IconGunPower,
    coal: IconCoal,
    steel: IconSteel,
    ivory: IconIvory,
    silk: IconSilk,
    gold: IconGold,
}

// eslint-disable-next-line
export const updateMarket = (townStore: any) => {
    return setInterval(() => {
        for (const town of townStore.towns) {
            for (const resource of town.resources) {
                if (resource[HEADING.VALUE] < resource[HEADING.MAX_VALUE] && resource.isGrow) {
                    const difference = resource[HEADING.MAX_VALUE] - resource[HEADING.VALUE]
                    townStore.increaseTownResource(town.id, resource.key, difference < UPDATE_MARKETS_VALUE ? difference : UPDATE_MARKETS_VALUE)
                    townStore.calculatePrice(resource)
                } else if (resource[HEADING.VALUE] > resource.optima) {
                    const difference = resource[HEADING.VALUE] - resource.optima
                    townStore.decreaseTownResource(town.id, resource.key, difference < UPDATE_MARKETS_VALUE ? difference : UPDATE_MARKETS_VALUE)
                    townStore.calculatePrice(resource)
                } else if (resource[HEADING.VALUE] === 0) {
                    townStore.increaseTownResource(town.id, resource.key, UPDATE_MARKETS_VALUE)
                    townStore.calculatePrice(resource)
                }
            }
        }
    }, UPDATE_MARKETS_INTERVAL)
}
