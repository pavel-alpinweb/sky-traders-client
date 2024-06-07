<script setup lang="ts">
import TradeWidget from "../ui-components/TradeWidget.component.vue"
import TradeTable from "../ui-components/TradeTable.component.vue"
</script>

<template>
    <div class="market-window">
        <div class="market-window__trade-widget-container">
            <TradeWidget />
        </div>
        <div class="market-window__container">
            <TradeTable />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
