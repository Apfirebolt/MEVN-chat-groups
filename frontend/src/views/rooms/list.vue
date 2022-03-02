<template>
  <span>
    <div
      v-if="profileData"
      class="mx-auto bg-white w-3/4 my-2 p-2 shadow-sm rounded-md"
    >
      <div class="bg-white">
        <div class="flex justify-between items-center">
          <p class="text-2xl p-3 text-center text-blue-700">
            Welcome to Chat rooms, {{ profileData.firstName }}
          </p>
          <t-button @click="isCreateChatRoomFormOpened = true">
            Create Room
          </t-button>
        </div>
        <t-modal v-model="isCreateChatRoomFormOpened" header="Create Chat Room">
          <chat-room-form
            @submit="createChatRoom"
            @cancel="isCreateChatRoomFormOpened = false"
          />
        </t-modal>
      </div>
      <chat-room-list :rooms="allChatRooms" />
      <div class="flex justify-center my-3">
        <div class="class max-w-2xl">
          <t-pagination
            v-model="urlParams.page"
            :total-items="roomCount"
            :per-page="urlParams.limit"
            :limit="2"
          />
        </div>
      </div>
    </div>
    <loading v-else />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as authTypes from "../../store/modules/auth/auth-types";
import * as chatRoomTypes from "../../store/modules/rooms/roomTypes";
import ChatRoomForm from "../../components/rooms/create-room-modal.vue";
import ChatRoomList from "../../components/rooms/room-list.vue";
import Loading from "../../components/common/loading.vue";

export default {
  name: "About",
  components: {
    ChatRoomForm,
    ChatRoomList,
    Loading
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
      allChatRooms: chatRoomTypes.GET_ALL_ROOMS,
      roomCount: chatRoomTypes.GET_ROOM_COUNT,
    }),
  },
  watch: {
    $route() {
      this.getAllChatRoomsAction(this.urlParams);
    },
    urlParams: {
      handler: "updateRoute",
      deep: true,
    },
  },
  mounted() {
    this.getAllChatRoomsAction(this.urlParams);
  },
  data() {
    return {
      selectedRoom: null,
      isCreateChatRoomFormOpened: false,
      deleteMessage: "",
      urlParams: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    ...mapActions({
      addChatRoomAction: chatRoomTypes.CREATE_CHAT_ROOM_REQUEST,
      updateChatRoomAction: chatRoomTypes.UPDATE_CHAT_ROOM_REQUEST,
      deleteChatRoomAction: chatRoomTypes.DELETE_CHAT_ROOM_REQUEST,
      getAllChatRoomsAction: chatRoomTypes.GET_ALL_ROOMS_REQUEST,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "Rooms", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
    createChatRoom(payload) {
      this.addChatRoomAction(payload);
      this.isCreateChatRoomFormOpened = false;
      this.getAllChatRoomsAction();
    },
  },
};
</script>
