<template>
    <div>
        <div class="event" v-for="event in events" v-bind:key="event._id">
            <router-link to="/edit" class="eventLink">
                <span @click="setEvent(event._id)">
                    <p class="eventName">{{event.name}} {{event.time}}</p>
                    <p class="eventDescription">{{event.description}}</p>
                </span>
            </router-link>
        </div>
    </div>


</template>

<script>
    import EditEventForm from "@/components/EditEventForm.vue"

    export default {
        name: 'OneDay',
        props: {
            events: Array
        },
        methods: {
            toggleEdit() {
                this.show = !this.show;
            },
            setEvent(eventID) {
                console.log("something")
                this.show = true;
                try {
                    let error = this.$store.dispatch("getEditEvent", eventID);
                    this.show = true;
                } catch (error) {
                    console.log(error);
                }
            },
            escape() {
                console.log("closing")
                this.show = false;
            },
            toggleNewEvent() {
                this.show = true;
            },
            async uploadFinished() {
                this.show = false;
                try {
                    this.error = await this.$store.dispatch("getEvents");
                } catch (error) {
                    console.log(error);
                }
            },
        },
        data() {
            return {
                id: '',
                show: false,
            }
        },
        components: {
            EditEventForm
        }
    }
</script>

<style scoped>
    .event {
        border: black 2px solid;
    }

    .eventName {
        padding-left: 5px;
    }

    .eventDescription {
        padding-left: 20px;
    }

    .eventLink {
        text-decoration: none;
        color: black;
    }
</style>