<template>
    <div class="container">
        <h1>Черга</h1>
        <div class="link-wrap">
            <router-link to="/">Головна</router-link>
        </div>
        <div class="queue">
            <p 
                class="num"
                v-for="q of queue"
                :key="q"
            >
                {{ q | number(q) }}
            </p>
        </div>
    </div>
</template>

<style scoped>
    .queue {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    h1 {
        margin-bottom: 30px;
    }

    p {
        margin: 15px 30px;
        font-size: 26px;
        width: 45px;
    }

    h1, p {
        text-align: center;
    }
</style>

<script>
export default {
    name: 'AllQueue',
    props: ['queue'],
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    }
}
</script>