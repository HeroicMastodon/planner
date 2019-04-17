<template>
    <div>
        <div v-if="user">
        <edit-event-form />
        </div>
    </div>
</template>

<script>
    import EditEventForm from "@/components/EditEventForm.vue"

    export default {
        name: "EditEvent",
        components: {
            EditEventForm,
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        }
    }
</script>