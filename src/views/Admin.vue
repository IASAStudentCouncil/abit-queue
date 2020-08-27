<template>
    <div class="admin">
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
                    :key="q"
                >
                    {{q}}
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

<style>
    .admin{
        color: black !important;
    }
</style>

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
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    },
    methods: {
        async tryToLogin() {
            console.log("try to login")
            const formData = {
                email: this.login,
                password: this.pass
            }

            try {
                let res = await this.$store.dispatch('login', formData)
                if(res){
                    this.allowed = true
                } else {
                this.allowed = false
                this.pass = ''
                this.login = ''
                }
                
            } catch (e) {
                this.pass = ''
                this.login = ''
                throw e
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
                await this.$store.dispatch('deletePersonFromQueue', {number: this.numToDel})
                this.numToDel = 0
                this.$emit('update')
            } catch (e) {
                throw e
            }
        }
    
    }
}
</script>
