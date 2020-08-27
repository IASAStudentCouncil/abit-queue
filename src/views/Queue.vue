<template>
    <div class="container">
        <div class="logo-wrap">
            <h3>IASA</h3>
            <img src="img/logo.svg">
        </div>

        <div class="table-wrap">
            <div 
                class="table"
                v-for="(q, idx) of que"
                :key="q.id"
            >
                <h4>СТІЛ №{{idx + 1}}</h4>
                <p class="number">{{q.number | number}}</p>
            </div>
            <div class="table next mt">
                <h4>Next</h4>
                <p class="number">{{next | number}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Queue',
    props: ['queue'],
    computed: {
        que() {
            return this.queue.slice(0, 3)
        },
        next() {
            return this.queue[0]
        }
    },
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    }
}
</script>