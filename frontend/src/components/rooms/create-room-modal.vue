<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="Chat Room Name" rules="required">
          <t-input-group
            label="Room Name"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="chatRoomData.name"
              type="text"
              name="Chat Room Name"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>

      <div class="flex justify-between mt-6">
        <t-button type="button" variant="error" @click="$emit('cancel')">
          Cancel
        </t-button>
        <t-button type="submit">
          Submit
        </t-button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as chatRoomTypes from '../../store/modules/rooms/roomTypes';

export default {
  name: 'AddBorrowForm',
  props: {
    room: {
      type: Object,
      required: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'create',
    },
  },
  data() {
    return {
      chatRoomData: {},
    };
  },
  mounted() {
    if (this.room) {
      this.chatRoomData = this.room;
    }
  },
  methods: {
    submitForm() {
      if (this.room) {
        this.$emit('updateChatRoom', this.chatRoomData);
      } else {
        this.$emit('submit', this.chatRoomData);
      }
    },
  },
};
</script>
