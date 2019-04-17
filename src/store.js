import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    events: [],
    editEvent: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setEvents(state, events) {
      state.events = events;
    },
    setEditEvent(state, event) {
      state.editEvent = event;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async newEvent(context, data) {
      try {
        //console.log(data.getAll('name'))
        await axios.post('/api/events', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getEvents(context) {
      try {
        let response = await axios.get("/api/events");
        context.commit('setEvents', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getEditEvent(context, data) {
      try{
        console.log(data)
        let response = await axios.get("/api/events/one", {
          params: {
            ID: data
          }
        });
        context.commit('setEditEvent', response.data);
        return "";
      } catch (error) {
        console.log(error);
        return error.response.data.message;
      }
    },
    async editEvent(context, data) {
      try {
        let response = await axios.put("/api/events/" + data.id, data)
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteEvent(context, data) {
      try {
          let response = await axios.delete("/api/events/" + data);
      } catch (error) {
          console.log(error);
      }
  }
}
})
