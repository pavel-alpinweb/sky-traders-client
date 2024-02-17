<script setup lang="ts">
import { ref } from "vue"

const title = ref("Age of Sky Traders")
</script>

<template>
    <div class="app">
        <h1>{{ title }}</h1>
    </div>
</template>

<style lang="scss">
$color: #fff;

h1 {
    color: $color;
}
</style>
