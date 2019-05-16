<template>
<transition v-if="show" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1 class="modal-title">New Event</h1>
                    </div>
                    <div class="modal-body">
                        <p v-if="error" class="error">{{error}}</p>
                        <!-- This form is the original form, simply remove all tags above and their correspondance to restore functionality -->
                        <form @submit.prevent="editEvent">
                            <input v-model="name" placeholder="Event Name">
                            <p></p>
                            <textarea v-model="description" placeholder="Description"></textarea>
                            <p></p>
                            <input v-model="date" type="date" name="Date">
                            <p></p>
                            <input v-model="time" type="time" name="Time">
                            <p></p>
                            <button type="button" @click="close" class="pure-button">Close</button>
                            <button type="submit" class="pure-button pure-button-secondary">Edit</button>
                            <button type="button" @click="deleteEvent" class="pure-button">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'EditEvent',
        props: {
            show: Boolean,
        },
        data() {
            return {
                error: '',
                name: '',
                description: '',
                date: '',
                time: '',
            }
        },

        async created() {
            this.name = await this.$store.state.editEvent.name;
            this.description = await this.$store.state.editEvent.description;
            this.date = await this.$store.state.editEvent.date;
            this.time = await this.$store.state.editEvent.time;
        },
        computed: {
            event() {
                return this.$store.state.editEvent
            },

        },
        methods: {
            close() {

                this.$emit('escape');
            },
            async editEvent() {
                if (this.name === '' || this.date === '') {
                    alert("Events require a name and date");
                    this.name = '';
                    this.description = '';
                    this.date = '';
                    this.time = '';
                    this.$emit('uploadFinished');
                    return;
                }
                if (this.time === '') {
                    this.time = "All Day";
                }
                try {
                    this.error = await this.$store.dispatch("editEvent", {
                        name: this.name,
                        description: this.description,
                        weekDay: (new Date(this.date + "T" + this.time)).getDay(),
                        date: this.date,
                        time: this.time,
                        id: this.$store.state.editEvent._id
                    });
                    if (!this.error) {
                        this.name = '';
                        this.description = '';
                        this.date = '';
                        this.time = '';
                        this.$emit('uploadFinished');
                    }
                } catch (error) {
                    console.log(error);
                }
                this.$router.go(-1)
            },
            async deleteEvent() {
                try {
                    let id = this.$store.state.editEvent._id;
                    let response = await this.$store.dispatch("deleteEvent", id);
                } catch (error) {
                    console.log(error);
                }
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    input {
        width: 100%;
    }

    textarea {
        width: 100%;
        height: 100px
    }

    .pure-button-secondary {
        float: right;
    }
</style>