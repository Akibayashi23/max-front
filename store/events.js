import axios from "axios";

const apiUrl = "http://localhost:3000";

const state = {
  events: [],
};

const getters = {
  events: (state) =>
    state.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/v1/events`);
    commit("setEvents", response.data); // mutationを呼び出す
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

// 仮
// export const state = {
//   events: [],
// };

// export const getters = {
//   events: (state) =>
//     state.events.map((event) => {
//       return {
//         ...event,
//         start: new Date(event.start),
//         end: new Date(event.end),
//       };
//     }),
// };

// export const mutations = {
//   setEvents(state, payload) {
//     state.events = payload;
//   },
// };

// export const actions = {
//   fetchEvents({ context, data }) {
//     context.commit("setEvents", data); // mutationを呼び出す
//   },
// };
