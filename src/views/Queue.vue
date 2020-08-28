<template>
    <div class="container">
        <div class="logo-wrap">
            <h3>IASA</h3>
            <img src="img/logo.svg">
        </div>
        <div class="link-wrap">
            <router-link to="/queue">Подивитися всю чергу</router-link>
        </div>
        <div class="table-wrap">
            <div 
                class="table"
                v-for="(q, idx) of que"
                :key="q.id"
            >
                <h4>СТІЛ №{{idx + 1}}</h4>
                <p class="number">{{q | number(q)}}</p>
            </div>
            <div class="table next mt">
                <h4>Next</h4>
                <p class="number">{{next | number(next)}}</p>
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
            return this.queue[3] ? this.queue[3] : 0
        }
    },
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    }
}
</script>
