<template>
  <div
    class="shadow my-3 overflow-y-visible border-b border-gray-200 sm:rounded-lg"
  >
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Created By
          </th>
          <th
            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Created At
          </th>
          <th
            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="rooms.length > 0" class="bg-white divide-y divide-gray-200">
        <tr v-for="room in rooms" :key="room._id">
          <td class="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
            {{ room.name }}
          </td>
          <td class="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
            {{ room.createdBy.firstName + " " + room.createdBy.lastName }}
          </td>
          <td class="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
            {{ room.createdAt | formatDate }}
          </td>
          <td
            class="px-6 py-3 text-sm text-center leading-5 text-gray-500 font-medium"
          >
            <t-button @click="navigateToChatRoom(room)"> Join Room </t-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "RoomsList",
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  filters: {
    formatDate(value) {
      return dayjs(value).format("MMMM D, YYYY");
    },
  },
  methods: {
    navigateToChatRoom(room) {
      this.$router.push({
        name: "RoomDetail",
        params: { roomName: room.name },
      });
    },
  },
};
</script>
