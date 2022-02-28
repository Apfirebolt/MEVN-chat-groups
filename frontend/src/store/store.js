import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/auth';
import room from './modules/rooms/room';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    room
  }
});