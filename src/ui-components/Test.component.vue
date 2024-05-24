<script setup lang="ts">
import { useTown } from "../store/town.ts"

const townStore = useTown()
</script>

<template>
    <img :src="`/assets/towns/${townStore.name}-screen.png`" alt="town" />
</template>

<style scoped lang="scss"></style>
