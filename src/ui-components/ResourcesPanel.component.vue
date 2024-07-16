<script setup lang="ts">
import { reactive } from "vue"
import { ResourcePanel } from "../types/interfaces.ts"
import { ICONS_LIST } from "../utils/utils.ts"
import { usePlayer } from "../store/player.store.ts"

const props = defineProps<{
    color: string
    gold: number
}>()
const player = usePlayer()

const goldSlot = reactive<ResourcePanel>({
    value: props.gold,
    name: "gold",
    title: "Золото",
})
</script>

<template>
    <div class="resources-panel">
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :width="615" :height="50" :elevation="10" border rounded>
            <div v-for="resource in player.resources" :key="resource.name" class="resources-panel__item">
                <component :is="ICONS_LIST[resource.name]" :class="`resources-panel__icon resources-panel__icon--${resource.name}`" v-tooltip="resource.title"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ resource.value }}</div>
            </div>
        </v-sheet>
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :height="50" :elevation="10" border rounded>
            <div class="resources-panel__item">
                <component :is="ICONS_LIST[goldSlot.name]" class="resources-panel__icon" v-tooltip="goldSlot.title"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ props.gold }}</div>
            </div>
        </v-sheet>
    </div>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/mixins.scss";

.resources-panel {
    display: flex;
    align-items: center;
    gap: 10px;

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        gap: 5px;
    }

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__icon {
        @include icon-styles;
    }
}
</style>
