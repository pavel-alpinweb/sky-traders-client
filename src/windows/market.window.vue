<script setup lang="ts">
import TradeWidget from "../ui-components/TradeWidget.component.vue"
import TradeTable from "../ui-components/TradeTable.component.vue"
import { HEADING, ResourceTable, Transaction } from "../types/interfaces.ts"
import { computed, ref } from "vue"
import { usePlayer } from "../store/player.store.ts"
import { useTown } from "../store/town.store.ts"

const props = defineProps<{
    color: string
}>()

const player = usePlayer()
const town = useTown()

const selectedResource = ref<ResourceTable>({
    [HEADING.NAME]: "",
    key: "",
    [HEADING.VALUE]: 0,
    [HEADING.BUY_PRICE]: 0,
    [HEADING.SELL_PRICE]: 0,
    optima: 262,
    optimaBuyPrice: 16,
    optimaSellPrice: 23,
    [HEADING.MAX_VALUE]: 500,
    minBuyPrice: 10,
    minSellPrice: 13,
    maxBuyPrice: 26,
    maxSellPrice: 36,
    isGrow: true,
})

const toggleResource = (resource: ResourceTable) => {
    selectedResource.value = resource
    player.setCurrentResource(resource.key)
}

const buyHandler = (transaction: Transaction) => {
    player.decreaseGold(transaction.gold)
    player.addResource(transaction.resourceAmount)
    town.decreaseCurrentTownResource(selectedResource.value.key, transaction.resourceAmount)
}

const sellHandler = (transaction: Transaction) => {
    player.increaseGold(transaction.gold)
    player.removeResource(transaction.resourceAmount)
    town.increaseCurrentTownResource(selectedResource.value.key, transaction.resourceAmount)
}

const maxSellAmount = computed<number>(() => {
    const availableAmount = selectedResource.value[HEADING.MAX_VALUE] - selectedResource.value[HEADING.VALUE]
    if (player.currentResource?.value) {
        return player.currentResource?.value > availableAmount ? availableAmount : player.currentResource.value
    }

    return 0
})
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
                :resource="player.currentResource?.name ? player.currentResource.name : ''"
                :player-gold="player.gold"
                :player-resource-amount="maxSellAmount"
                @buy="buyHandler"
                @sell="sellHandler"
            />
        </div>
        <div class="market-window__container">
            <TradeTable :color="props.color" @toggle="toggleResource" :resources="town.currentTown.resources" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
