<script setup lang="ts">
const props = defineProps<{
    fuel: number
}>()
</script>

<template>
    <div class="fuel-widget">
        <h1>Fuel Widget {{ props.fuel }}</h1>
    </div>
</template>

<style scoped lang="scss"></style>
