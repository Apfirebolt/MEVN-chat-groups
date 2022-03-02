<template>
  <div class="min-h-full">
    <main v-if="roomData" class="py-10">
      <!-- Page header -->
      <t-modal v-model="isUpdateModalOpened" header="Update Chat Room">
        <chat-room-form
          @updateChatRoom="updateChatRoom"
          @cancel="isUpdateModalOpened = false"
          :room="roomData"
          mode="edit"
        />
      </t-modal>
      <t-modal v-model="isDeleteModalOpened" header="Delete Chat Room">
        <confirm-modal
          @submit="deleteChatRoom"
          @cancel="isDeleteModalOpened = false"
        />
      </t-modal>
      <div
        class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
      >
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Comments-->
          <section aria-labelledby="notes-title">
            <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="notes-title"
                    class="text-lg font-medium text-gray-900"
                  >
                    {{ roomData.name }}
                  </h2>
                </div>
                <div v-if="messages.length" class="px-4 py-6 sm:px-6">
                  <ul role="list" class="space-y-8">
                    <li v-for="(message, index) in messages" :key="index">
                      <div class="flex space-x-3">
                        <div class="flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div>
                          <div class="text-sm">
                            <a href="#" class="font-medium text-gray-900">{{
                              message.username
                            }}</a>
                          </div>
                          <div class="mt-1 text-sm text-gray-700">
                            <p>
                              {{ message.message }}
                            </p>
                          </div>
                          <div class="mt-2 text-sm space-x-2">
                            <!-- <span class="text-gray-500 font-medium"
                              >{{ message.sendBy.firstName + ' ' + message.sendBy.lastName }}</span
                            > -->
                            <button
                              v-if="message.sendBy === profileData._id"
                              class="text-gray-100 font-medium bg-red-400 px-2 py-1"
                              @click="deleteChatMessage(message._id)"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-6 sm:px-6">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <form action="#">
                      <div>
                        <label for="comment" class="sr-only">About</label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows="3"
                          v-model="message"
                          class="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Type your message"
                        ></textarea>
                      </div>
                      <div class="mt-3 flex items-center justify-between">
                        <button
                          type="submit"
                          @click.prevent="postNewMessage"
                          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="leaveRoom"
              class="inline-flex items-center justify-center px-4 py-2 my-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-red-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Leave Room
            </button>
          </section>
        </div>

        <section
          aria-labelledby="timeline-title"
          class="lg:col-start-3 lg:col-span-1"
        >
          <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
              Created by
              {{
                roomData.createdBy.firstName + " " + roomData.createdBy.lastName
              }}
            </h2>
            <div v-if="isRoomOwner" class="mt-6">
              <p class="my-4">Users currently chatting</p>
              <p
                v-for="user in users"
                :key="user"
                class="my-3 w-1/2 text-center px-2 py-1 leading-5 font-semibold rounded-full bg-red-100 text-green-800"
              >
                {{ user }}
              </p>

              <button
                type="button"
                @click="isDeleteModalOpened = true"
                class="inline-flex items-center justify-center px-4 py-2 my-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Delete Room
              </button>
              <button
                type="button"
                @click="isUpdateModalOpened = true"
                class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400 hover:bg-green-600 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Room
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
    <loading v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import interceptor from "../../plugins/interceptor";
import io from "socket.io-client";
import ChatRoomForm from "../../components/rooms/create-room-modal.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";
import * as authTypes from "../../store/modules/auth/auth-types";
import * as chatRoomTypes from "../../store/modules/rooms/roomTypes";
import Loading from "../../components/common/loading.vue";

export default {
  name: "About",
  components: {
    ChatRoomForm,
    ConfirmModal,
    Loading
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
      roomData: chatRoomTypes.GET_CHAT_ROOM_DETAIL,
    }),
    isRoomOwner() {
      return this.profileData._id === this.roomData.createdBy._id;
    },
  },
  created() {
    this.setupSocketConnection();
    this.joinUserRoom();
  },
  async mounted() {
    await this.getChatRoomAction(this.$route.params.roomName);
    this.getAllMessages();
  },
  beforeDestroy() {
    this.clearChatMessages();
  },
  data() {
    return {
      socket: null,
      isUpdateModalOpened: false,
      isDeleteModalOpened: false,
      messages: [],
      users: [],
      message: "",
      socketUrl: "http://localhost:5000/",
    };
  },
  watch: {
    roomData: {
      handler: "updateRoomData",
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      updateChatRoomAction: chatRoomTypes.UPDATE_CHAT_ROOM_REQUEST,
      deleteChatRoomAction: chatRoomTypes.DELETE_CHAT_ROOM_REQUEST,
      getChatRoomAction: chatRoomTypes.GET_CHAT_ROOM_REQUEST,
    }),
    async postNewMessage() {
      const payload = {
        roomId: this.roomData._id,
        userId: this.profileData._id,
        username: this.profileData.firstName + " " + this.profileData.lastName,
        roomName: this.roomData.name,
        message: this.message,
        sendBy: this.profileData,
      };
      this.message = "";
      this.socket.emit("sendMessage", { payload }, (error) => {
        if (error) {
          alert(error);
        }
      });
    },
    clearChatMessages() {
      this.socket.emit("clearMessages");
    },
    leaveRoom() {
      const username =
        this.profileData.firstName + " " + this.profileData.lastName;
      this.socket.emit("clearUser", { username }, (error) => {
        if (error) {
          alert(error);
        }
      });
    },
    joinUserRoom() {
      this.socket.on("joinUser", (users) => {
        this.users = users;
      });
      this.socket.on("leaveRoom", () => {
        this.$router.push({ name: "Rooms" });
      });
    },
    updateRoomData(newValue, oldValue) {
      if (newValue) {
        this.joinRoom();
        this.getApiMessages();
      }
    },
    getApiMessages() {
      const url = `/chats/${this.roomData._id}`;
      interceptor
        .get(url)
        .then((response) => {
          this.messages = response.chats;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllMessages() {
      this.socket.on("message", (messages) => {
        this.messages = messages;
      });
    },
    deleteChatMessage(messageId) {
      const url = `/chats/${this.roomData._id}/messages/${messageId}`;
      interceptor
        .delete(url)
        .then((response) => {
          if (response) {
            this.getApiMessages();
            this.$bus.emit("add_toast", {
              content: "Message deleted successfully",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateChatRoom(payload) {
      this.updateChatRoomAction(payload);
      this.isUpdateModalOpened = false;
      this.$router.push({
        name: "RoomDetail",
        params: { roomName: payload.name },
      });
    },
    deleteChatRoom() {
      this.deleteChatRoomAction(this.$route.params.roomName);
      this.isDeleteModalOpened = false;
      this.$router.push({ name: "Rooms" });
    },
    setupSocketConnection() {
      this.socket = io(this.socketUrl);
    },
    joinRoom() {
      const name = this.profileData.firstName + " " + this.profileData.lastName;
      const room = this.roomData && this.roomData.name;
      this.socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
    },
  },
};
</script>
