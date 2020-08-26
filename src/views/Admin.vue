<template>
    <div>
        <h1>ADMIN</h1>
        <div v-if="!allowed">
            <div>
                <form @submit.prevent="tryToLogin">
                    <input type="text" placeholder="login" v-model="login">
                    <input type="password" placeholder="password" v-model="pass">
                    <button type="submit">TRY</button>
                </form>
            </div>
        </div>
        <div v-else>
            <div class="queue">
                <p
                    v-for="q of queue"
                    :key="q.id"
                >
                    {{q.number}}
                </p>
            </div>
            <form @submit.prevent="addPersonHandler">
                <label for="add">Add person number...</label>
                <input 
                    type="number" 
                    id="add"
                    v-model="numToAdd"
                >
                <button type="submit">Add</button>
            </form>
            <form @submit.prevent="deletePersonHandler">
                <label for="delete">Delete person number...</label>
                <input 
                    type="number" 
                    id="delete"
                    v-model="numToDel"
                >
                <button type="submit">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Admin",
    props: ['queue'],
    data: () => ({
        allowed: false,
        numToAdd: 0,
        numToDel: 0,
        pass: '',
        login: ''
    }),
    methods: {
        async tryToLogin() {
            const formData = {
                email: this.login,
                password: this.pass
            }

            try {
                await this.$store.dispatch('login', formData)
                this.allowed = true
            } catch (e) {
                this.pass = ''
                this.login = ''
            }
        },
        async addPersonHandler() {
            if(this.numToAdd <= 0) {
                this.numToAdd = 0
                return
            }

            try {
                const person = await this.$store.dispatch('addPersonToQueue', {number: this.numToAdd})
                this.numToAdd = 0
                this.$emit('update')
            } catch (e) {
                throw e
            }
        },
        async deletePersonHandler() {
            if(this.numToDel <= 0) {
                this.numToDel = 0
                return
            }

            try {
                const id = this.queue.find(q => q.number === this.numToDel).id
                await this.$store.dispatch('deletePersonFromQueue', { id })
                this.numToDel = 0
                this.$emit('update')
            } catch (e) {
                throw e
            }
        }
    }
}
</script>