<template>
    <div>
        <div v-if="user">
            <div class="header">

                <table>
                    <tr>
                        <th><a @click="toggleNewEvent"><i class="fas fa-calendar-plus"></i></a></th>
                        <th><a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a></th>
                        <th>Week of April 14 - 20, 2019</th>
                    </tr>
                </table>
            </div>
            <br>
            <escape-event @escape="escape" @uploadFinished="uploadFinished" />
            <new-event :show="show" @escape="escape" @uploadFinished="uploadFinished" />
            <div>
                <table class="week">
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                    <one-week :sunday="sunday" :monday="monday" :tuesday="tuesday" :wednesday="wednesday"
                        :thursday="thursday" :friday="friday" :saturday="saturday" />
                </table>
            </div>

        </div>
        <div v-else>
            <p>If you would like to use the planner, please register for an account or login.</p>
            <router-link to="/register" class="pure-button">Register</router-link> or
            <router-link to="/login" class="pure-button">Login</router-link>
        </div>
    </div>
</template>

<script>
    // import OneDay from "@/components/OneDay.vue";
    import NewEvent from "@/components/NewEvent.vue";
    import EscapeEvent from "@/components/EscapeEvent.vue";
    import OneWeek from "@/components/OneWeek.vue"

    export default {
        name: 'week',
        data() {
            return {
                show: false,
                dateContext: [
                    "2019-04-14",
                    "2019-04-15",
                    "2019-04-16",
                    "2019-04-17",
                    "2019-04-18",
                    "2019-04-19",
                    "2019-04-20"
                ]
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            sunday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[0])
            },
            monday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[1])
            },
            tuesday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[2])
            },
            wednesday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[3])
            },
            thursday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[4])
            },
            friday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[5])
            },
            saturday() {
                return this.$store.state.events.filter(event => event.date === this.dateContext[6])
            }
        },
        async created() {
            await this.$store.dispatch("getUser");
            await this.$store.dispatch("getEvents")
        },
        methods: {
            async logout() {
                try {
                    this.error = await this.$store.dispatch("logout");
                } catch (error) {
                    console.log(error);
                }
            },
            async uploadFinished() {
                this.show = false;
                try {
                    this.error = await this.$store.dispatch("getEvents");
                } catch (error) {
                    console.log(error);
                }
            },
            escape() {
                this.show = false;
            },
            toggleNewEvent() {
                this.show = true;
            },
        },
        components: {
            //OneDay,
            OneWeek,
            NewEvent,
            EscapeEvent
        }
    }
</script>

<style scoped>
    .pure-button {
        margin: 0px 20px;
    }

    .header {
        display: inline;
    }

    .header .button {
        margin-left: 50px;
        order: 2;
    }


    .header {
        display: flex;
    }

    .header a {
        color: #222;
        font-size: 2em;
    }

    .header svg {
        margin-top: 12px;
    }

    .fa-calendar-plus,
    .fa-sign-out-alt {
        color: rgb(55, 93, 197);
        padding: 0;
        margin: 10px;
        font-size: 2em;
    }

    p {
        margin: 0px;
    }

    .week {
        padding: 25px;
        padding-top: 100px;
        margin-top: 25pxpx;

    }

    .week th,
    .week td {
        padding: 25px;

    }
</style>