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
        <div class="allowed" v-else>
            <div class="queue">
                <p
                    v-for="q of queue"
                    :key="q"
                >
                    {{q}}
                </p>
            </div>
            <div class="forms">
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
                <form @submit.prevent="swapPersonHandler">
                    <label for="swap">Swap two persons number...</label>
                    <input 
                        type="number" 
                        id="swap"
                        placeholder="first person"
                        v-model="firstSwap"
                    >
                    <input 
                        type="number" 
                        id="swap1"
                        placeholder="second person"
                        v-model="secondSwap"
                    >
                    <button type="submit">Swap</button>
                </form>
                <form @submit.prevent="freezePersonHandler">
                    <label for="pos">-15 positions for person number...</label>
                    <input 
                        type="number" 
                        id="pos"
                        v-model="numToFreeze"
                    >
                    <button type="submit">-15</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
    .admin{
        color: black !important;
        padding-left: 100px;
    }

    .allowed {
        display: flex;
        flex-direction: row;
    }

    .queue {
        margin-right: 50px;
    }

    form {
        margin-top: 30px;
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
        firstSwap: 0,
        secondSwap: 0,
        numToFreeze: 0,
        pass: '',
        login: ''
    }),
    mounted() {
        setInterval(() => {
            this.$emit('update')
        }, 3000)
    },
    methods: {
        async freezePersonHandler() {
            if(this.numToFreeze <= 0) {
                this.numToFreeze = 0
                return
            } 

            try {
                const idx = this.queue.indexOf(parseInt(this.numToFreeze))
                console.log(idx, 'index')
                await this.$store.dispatch('freezePerson', { idx })
                this.numToFreeze = 0
                this.$emit('update')
            } catch (e) {
                 this.numToFreeze = 0
                 throw e
            }
        },
        async swapPersonHandler() {
            if(this.firstSwap <= 0 || this.secondSwap <= 0) {
                this.firstSwap = 0
                this.secondSwap = 0
                return
            } else if (this.firstSwap > this.queue.length || this.secondSwap > this.queue.length) {
                this.firstSwap = 0
                this.secondSwap = 0
                return
            }

            try {
                const swapData = {
                    first: this.firstSwap,
                    second: this.secondSwap
                }
                await this.$store.dispatch('swapPersons', swapData)
                this.firstSwap = 0
                this.secondSwap = 0
                this.$emit('update')
            } catch (e) {
                this.firstSwap = 0
                this.secondSwap = 0
                throw e
            }
        },
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
