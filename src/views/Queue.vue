<template>
    <div>
        <h1>QUEUE</h1>
        <div 
            v-for="q of que"
            :key="q.id"
        >
            {{ q.number }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Queue',
    props: ['queue'],
    computed: {
        que() {
            return this.queue.slice(0, 4)
        }
    },
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    }
}
</script>