<template>
  <div>
    <div v-if="user">
      <div class="header">

        <table>
          <tr>
            <th><a @click="toggleNewEvent"><i class="fas fa-calendar-plus"></i></a></th>
            <th><a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a></th>
          </tr>
        </table>
      </div>
      <br>
      <escape-event @escape="escape" @uploadFinished="uploadFinished" />
      <new-event :show="show" @escape="escape" @uploadFinished="uploadFinished" />
      <h1>Calandar view coming soon...</h1>

    </div>
    <div v-else>
      <p>If you would like to use the planner, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
  import NewEvent from "@/components/NewEvent.vue";
  import EscapeEvent from "@/components/EscapeEvent.vue";

  export default {
    name: 'mypage',
    components: {
      NewEvent,
      EscapeEvent
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    data() {
      return {
        show: false,
      }
    },
    created() {
      this.$store.dispatch("getUser");
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
    }
  }
</script>

<style scoped>
  .pure-button {
    margin: 0px 20px;
  }

  .header {
    display: flex;
  }

  .header .button {
    margin-left: 50px;
    order: 2;
  }

  .fa-calendar-plus,
    .fa-sign-out-alt {
        color: rgb(55, 93, 197);
        padding: 0;
        margin: 10px;
        font-size: 2em;
    }
</style>