<script setup lang="ts">
import TradeWidget from "../ui-components/TradeWidget.component.vue"
import TradeTable from "../ui-components/TradeTable.component.vue"
import { HEADING, ResourceTable } from "../types/interfaces.ts"
import { ref } from "vue"
import { usePlayer } from "../store/player.ts"

const props = defineProps<{
    color: string
}>()

const player = usePlayer()

const selectedResource = ref<ResourceTable>({
    [HEADING.NAME]: "",
    key: "",
    [HEADING.VALUE]: 0,
    [HEADING.BUY_PRICE]: 0,
    [HEADING.SELL_PRICE]: 0,
})

const toggleResource = (resource: ResourceTable) => {
    selectedResource.value = resource
}
</script>

<template>
    <div class="market-window">
        <h3 :class="`text-${props.color}-darken-4 text-h3`">Рынок</h3>
        <div class="market-window__trade-widget-container">
            <TradeWidget
                :buy-price="selectedResource[HEADING.BUY_PRICE]"
                :sell-price="selectedResource[HEADING.SELL_PRICE]"
                :max-amount="selectedResource[HEADING.VALUE]"
                :color="props.color"
                :resource="selectedResource.key"
                :player-gold="player.gold"
                :player-resource-amount="2000"
            />
        </div>
        <div class="market-window__container">
            <TradeTable :color="props.color" @toggle="toggleResource" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
