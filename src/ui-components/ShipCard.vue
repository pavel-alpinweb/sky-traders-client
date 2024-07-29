<script setup lang="ts">
import { Ship } from "../types/interfaces.ts"
import { ShipCardMode } from "../types/types.ts"
import IconVelocity from "/public/assets/icons/ship-params/velocity.svg"
import IconAim from "/public/assets/icons/ship-params/aim.svg"
import IconArmor from "/public/assets/icons/ship-params/shield.svg"
import IconFuel from "/public/assets/icons/ship-params/fuel.svg"
import IconGold from "/public/assets/icons/resources/gold.svg"
import { computed } from "vue"
import { useProgressBarColor } from "../utils/utils.ts"

const props = defineProps<{
    color: string
    ship: Ship
    mode: ShipCardMode
    playerGold: number
    variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain"
}>()

const selectShipEmit = defineEmits<{
    (event: ShipCardMode, value: Ship): void
}>()

const selectShip = (): void => {
    selectShipEmit(props.mode, props.ship)
}

const roundedCurrentFuel = computed<number>(() => {
    return Math.round(props.ship.currentFuel)
})

const roundedCurrentHealth = computed<number>(() => {
    return Math.round(props.ship.currentHealth)
})

const actionsLabel = computed<string>(() => {
    return props.mode === "select" ? "Выбрать" : "Купить"
})

const fuelPercentage = computed<number>(() => props.ship.currentFuel / (props.ship.maxFuel / 100))
const fuelBarColor = useProgressBarColor(fuelPercentage)

const healthPercentage = computed<number>(() => props.ship.currentHealth / (props.ship.maxHealth / 100))
const healthBarColor = useProgressBarColor(healthPercentage)
</script>

<template>
    <v-card class="mx-auto ship-card" :color="`${props.color}-darken-4`" :variant="variant">
        <v-dialog v-if="props.mode === 'select'" max-width="600">
            <template #activator="{ props: activatorProps }">
                <v-btn class="ship-card__description-trigger" v-bind="activatorProps" :color="`${props.color}-darken-4`" size="x-small" variant="flat" icon="mdi-script-text-outline" />
            </template>
            <template #default="{ isActive }">
                <v-card :title="props.ship.name" :color="`${props.color}-lighten-5`">
                    <v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="props.color" text="Закрыть" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-img class="align-end" :src="`/public/assets/ships/${props.ship.type}/${props.ship.type}-shop.png`" height="200">
            <v-card-subtitle :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
                <IconVelocity class="ship-card__param-icon" v-tooltip="'Скорость'" /> {{ props.ship.velocity }}
            </v-card-subtitle>
            <v-card-subtitle :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
                <IconAim class="ship-card__param-icon" v-tooltip="'Урон'" /> {{ props.ship.damage }}
            </v-card-subtitle>
            <v-card-subtitle :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
                <IconArmor class="ship-card__param-icon" v-tooltip="'Максимальный запас прочности'" /> {{ props.ship.maxHealth }}
            </v-card-subtitle>
            <v-card-subtitle :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
                <IconFuel class="ship-card__param-icon" v-tooltip="'Максимальный запас топлива'" /> {{ props.ship.maxFuel }}
            </v-card-subtitle>
        </v-img>
        <v-card-title>{{ props.ship.name }}</v-card-title>
        <v-card-subtitle v-if="props.mode === 'select'" :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
            <IconArmor class="ship-card__param-icon" v-tooltip="'Состояние корабля'" />
            <div class="ship-card__bar">
                <v-progress-linear :color="healthBarColor" :model-value="healthPercentage" height="10" rounded />
            </div>
            <span>{{ roundedCurrentHealth }} / {{ props.ship.maxHealth }}</span>
        </v-card-subtitle>
        <v-card-subtitle v-if="props.mode === 'select'" :class="`ship-card__param text-subtitle-1 align-center d-flex text-${props.color}-darken-5 font-weight-black`">
            <IconFuel class="ship-card__param-icon" v-tooltip="'Текущий запас топлива'" />
            <div class="ship-card__bar">
                <v-progress-linear :color="fuelBarColor" :model-value="fuelPercentage" height="10" rounded />
            </div>
            <span>{{ roundedCurrentFuel }} / {{ props.ship.maxFuel }}</span>
        </v-card-subtitle>
        <v-card-subtitle
            v-if="props.mode === 'build'"
            class="ship-card__param text-subtitle-1 align-center d-flex font-weight-black"
            :class="`${props.playerGold < ship.price ? 'text-red-accent-4 text-decoration-line-through' : `text-${props.color}-darken-5`}`"
        >
            <IconGold class="ship-card__param-icon" v-tooltip="'Стоимость покупки'" /> {{ props.ship.price }}
        </v-card-subtitle>
        <v-card-actions>
            <v-btn :color="props.color" :disabled="props.playerGold < ship.price && props.mode === 'build'" @click="selectShip">{{ actionsLabel }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped lang="scss">
.ship-card {
    position: relative;
    &__description-trigger {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 2;
    }
    &__param {
        opacity: 1;
        margin-top: 5px;
    }
    &__param-icon {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }
    &__bar {
        flex-grow: 1;
        margin-right: 10px;
    }
}
</style>
