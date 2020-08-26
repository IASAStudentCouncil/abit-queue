<template>
    <div>
        <div
            v-if="!allowed"
        >
            <form @submit.prevent="addPersonHandler">
                <label for="add">Add person number...</label>
                <input type="number" id="add">
                <button type="submit">Add</button>
            </form>
            <form @submit.prevent="addPersonHandler">
                <label for="delete">Delete person number...</label>
                <input type="number" id="delete">
                <button type="submit">Delete</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Admin",
    data: () => ({
        allowed: false
    }),
    async mounted() {

    }
}
</script>