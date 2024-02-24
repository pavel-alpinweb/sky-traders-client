<script setup lang="ts">
import { useGameScene } from "../../game/scenes/game.scene.ts"
import { onMounted } from "vue"
import { Game } from "phaser"
onMounted(() => {
    const game: Game = useGameScene()
    console.log("Start game!", game)
})
</script>

<template>
    <div id="game" class="game-screen"></div>
</template>

<style scoped lang="scss">
.game-screen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
