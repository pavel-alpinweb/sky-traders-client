<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const goToGame = (event: Event) => {
    event.preventDefault()
    router.push({ path: "/game" })
}
</script>

<template>
    <div class="start-screen">
        <form class="start-screen__form" @submit="goToGame">
            <button class="start-screen__btn">Play</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.start-screen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000 url("/assets/backgrounds/sky.png");
    background-size: cover;

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 500px;
    }

    &__input {
        width: 100%;
        height: 50px;
        border: 5px solid #9fcc3b;
        background-color: #ddedae;
        color: #111516;
        font-size: 50px;
        font-weight: bold;
        outline: none;
        padding: 10px;
        font-family: inherit;
    }

    &__btn {
        width: 60%;
        height: 153px;
        cursor: pointer;
        border: none;
        background: url("/assets/ui/btn01.png") no-repeat center;
        background-size: 100%;
        color: #603d11;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 50px;
        font-family: inherit;
        &:hover {
            background: url("/assets/ui/btn02.png") no-repeat center;
            background-size: 100%;
        }
    }
}
</style>
