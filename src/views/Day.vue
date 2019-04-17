<template>
    <div>
        <div v-if="user">

            <table>
                <tr>
                    <th><a @click="toggleNewEvent"><i class="fas fa-calendar-plus"></i></a></th>
                    <th><a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a></th>
                    <th><h1>Tuesday April 16, 2019</h1></th>
                </tr>
            </table>
            <escape-event @escape="escape" @uploadFinished="uploadFinished" />
            <new-event :show="show" @escape="escape" @uploadFinished="uploadFinished" />
            
                
            <one-day :events="events" />
        </div>
        <div v-else>
            <p>If you would like to use the planner, please register for an account or login.</p>
            <router-link to="/register" class="pure-button">Register</router-link> or
            <router-link to="/login" class="pure-button">Login</router-link>
        </div>
    </div>
</template>

<script>
    import EscapeEvent from '@/components/EscapeEvent.vue'
    import NewEvent from '@/components/NewEvent.vue';
    import OneDay from '@/components/OneDay.vue';


    export default {
        name: 'day',
        components: {
            EscapeEvent,
            NewEvent,
            OneDay,

        },
        data() {
            return {
                show: false,
                dateContext: "2019-04-16",
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            events() {
                let temp = this.$store.state.events.filter(event => event.date === this.dateContext);
                return temp;
            }
        },
        async created() {
            await this.$store.dispatch("getUser");
            await this.$store.dispatch("getEvents");
        },
        methods: {
            async logout() {
                try {
                    this.error = await this.$store.dispatch("logout");
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
            async uploadFinished() {
                this.show = false;
                try {
                    this.error = await this.$store.dispatch("getEvents");
                } catch (error) {
                    console.log(error);
                }
            },
            compareTime(timeOne, timeTwo) {
                if (timeOne === '' || timeTwo === ''){
                    return false;
                }
                let one = timeOne.split(':');
                let two = timeOne.split(':');
                if (parseInt(one[0]) > parseInt(two[0])) {
                    return true;
                }
                if (one[0] === two[0]) {
                    if (parseInt(one[1]) > parseInt(two[1])) {
                        return true;
                    }
                    return false;
                }
                return false;

            }
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


    
</style>