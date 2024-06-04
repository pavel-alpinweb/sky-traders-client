<script setup lang="ts">
import { router } from "../router.ts"

const goToMap = () => {
    router.push({ path: "/game" })
}
</script>

<template>
    <div class="town-screen">
        <div id="town" class="town-screen__background"></div>
        <div class="town-screen__content">
            <button @click="goToMap">Покинуть город</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.town-screen {
    width: 100vw;
    height: 100vh;
    background-color: #a7efff;
    position: relative;

    &__background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    &__content {
        position: relative;
        z-index: 1;
    }
}
</style>
