<script setup lang="ts">
import TradeWidget from "../ui-components/TradeWidget.component.vue"
import TradeTable from "../ui-components/TradeTable.component.vue"

const props = defineProps<{
    color: string
}>()
</script>

<template>
    <div class="market-window">
        <h3 :class="`text-${props.color}-darken-4 text-h3`">Рынок</h3>
        <div class="market-window__trade-widget-container">
            <TradeWidget :buy-price="16" :sell-price="23" :max-amount="262" :color="props.color" resource="corn" />
        </div>
        <div class="market-window__container">
            <TradeTable :color="props.color" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>