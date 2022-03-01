<template>
  <form
    class="font-medium text-gray-700"
    @submit.prevent="submitForm"
  >
    <p class="my-2">Are you sure you want to delete this chat room ?</p>
    <div class="flex justify-between mt-6">
      <t-button type="button" variant="error" @click="$emit('cancel')">
        Cancel
      </t-button>
      <t-button type="submit"> Submit </t-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    room: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (this.room) {
      this.chatRoomData = this.room;
    }
  },
  methods: {
    submitForm() {
      this.$emit("submit");
    },
  },
};
</script>
