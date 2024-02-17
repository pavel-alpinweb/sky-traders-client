<script setup lang="ts">
import StartScreen from "./components/screens/Start.screen.vue"
import GameScreen from "./components/screens/Game.screen.vue"
</script>

<template>
    <div class="app">
        <GameScreen />
        <StartScreen />
    </div>
</template>

<style lang="scss">
$color: #fff;

h1 {
    color: $color;
}
</style>
