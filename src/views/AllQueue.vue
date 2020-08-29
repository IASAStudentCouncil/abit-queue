<template>
    <div class="container">
        <h1>Черга</h1>
        <div class="link-wrap">
            <router-link to="/">Головна</router-link>
        </div>
        <div class="queue-wr">
            <p 
                class="num"
                v-for="(q, i) of queue"
                :key="q"
            >
               {{i + 1}}. {{ q | number(q) }}
            </p>
        </div>
    </div>
</template>

<style scoped>

    h1 {
        margin-bottom: 30px;
    }

    p {
        margin-top: 15px;
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