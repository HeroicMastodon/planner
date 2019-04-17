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
                        <form @submit.prevent="addEvent">
                            <input v-model="name" placeholder="Event Name">
                            <p></p>
                            <textarea v-model="description" placeholder="Description"></textarea>
                            <p></p>
                            <input v-model="date" type="date" name="Date">
                            <p></p>
                            <input v-model="time" type="time" name="Time">
                            <p></p>
                            <button type="button" @click="close" class="pure-button">Close</button>
                            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'NewEvent',
        props: {
            show: Boolean,
        },
        data() {
            return {
                name: '',
                description: '',
                date: '',
                time: '',
                error: '',
            }
        },
        methods: {
            close() {
                this.$emit('escape');
            },
            async addEvent() {
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
                    this.error = await this.$store.dispatch("newEvent", {
                        name: this.name,
                        description: this.description,
                        weekDay: (new Date(this.date + "T" + this.time)).getDay(),
                        date: this.date,
                        time: this.time
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
            },
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