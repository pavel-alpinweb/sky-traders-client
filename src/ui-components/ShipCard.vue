<script setup lang="ts">
import { Ship } from "../types/interfaces.ts"
import { ShipCardMode } from "../types/types.ts"

const props = defineProps<{
    color: string
    ship: Ship
    mode: ShipCardMode
}>()
</script>

<template>
    <v-card class="mx-auto" :color="`${props.color}-darken-4`" variant="tonal">
        <v-img :src="`/public/assets/ships/seagull/${props.ship.type}-shop.png`" height="200" />
        <v-card-title>{{ props.ship.name }}</v-card-title>
    </v-card>
</template>

<style scoped lang="scss"></style>
