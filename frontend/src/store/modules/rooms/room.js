import * as types from "./roomTypes";
import events from "../../../plugins/events";
import interceptor from "../../../plugins/interceptor";

const state = {
  rooms: [],
  count: 0,
  success: false,
  room: null,
};

const getters = {
  [types.GET_ROOM_COUNT]: (state) => state.count,
  [types.GET_CHAT_ROOM_DETAIL]: (state) => state.room,
  [types.GET_ALL_ROOMS]: (state) => state.rooms,
};

const mutations = {
  [types.SET_CHAT_ROOM_SUCCESS]: (state, payload) => {
    state.room = payload;
  },
  [types.SET_ALL_ROOMS_SUCCESS]: (state, payload) => {
    state.rooms = payload;
  },
  [types.SET_ROOMS_COUNT]: (state, payload) => {
    state.count = payload;
  },
};

const actions = {
  // Create A Chat Room Action
  [types.CREATE_CHAT_ROOM_REQUEST]: ({ commit }, payload) => {
    const url = "/rooms";
    interceptor
      .post(url, payload)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Chat Room created successfully",
            type: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Setting all chat rooms
  [types.GET_ALL_ROOMS_REQUEST]: ({ commit }, urlParams) => {
    const url = "/rooms";
    interceptor
      .get(url, {
        params: urlParams,
      })
      .then((response) => {
        commit(types.SET_ALL_ROOMS_SUCCESS, response.rooms);
        commit(types.SET_ROOMS_COUNT, response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Set single chat room data
  [types.GET_CHAT_ROOM_REQUEST]: ({ commit }, id) => {
    const url = `/rooms/${id}`;
    interceptor
      .get(url)
      .then((response) => {
        commit(types.SET_CHAT_ROOM_SUCCESS, response.room);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Delete a chat room
  [types.DELETE_CHAT_ROOM_REQUEST]: ({ commit }, id) => {
    const url = `/rooms/${id}`;
    interceptor
      .delete(url)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Chat Room deleted successfully",
            type: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Update a chat room
  [types.UPDATE_CHAT_ROOM_REQUEST]: ({ commit }, payload) => {
    const url = `/rooms/${payload._id}`;
    interceptor
      .patch(url, payload)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Chat Room updated successfully",
            type: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
