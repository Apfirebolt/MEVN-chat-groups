<template>
  <span>
    <div v-if="profileData" class="bg-white shadow-sm rounded-md">
      <p class="text-2xl p-3 text-center text-blue-700">
        Welcome to Chat rooms, {{ profileData.firstName }}
      </p>
      <t-button @click="joinRoom"> Join Room </t-button>
    </div>
    
    <p v-else class="text-3xl text-center my-4 text-red-500">Loading...</p>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import io from "socket.io-client";
import * as authTypes from "../../store/modules/auth/auth-types";

export default {
  name: "About",
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
  },
  created() {
    this.setupSocketConnection();
  },
  data() {
    return {
      socket: null,
      socketUrl: "http://localhost:5000/",
    };
  },
  methods: {
    setupSocketConnection() {
      this.socket = io(this.socketUrl);
    },
    joinRoom() {
      const name = this.profileData.firstName;
      const room = 'Draco';
      this.socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });

      this.socket.on("message", (payload) => {
        console.log('Data socket is ', payload)
      });
    },
  },
};
</script>
