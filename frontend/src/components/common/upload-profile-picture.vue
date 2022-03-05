<template>
  <form
    class="w-1/2 mx-auto p-3"
    enctype="multipart/form-data"
    @submit.prevent="submitForm"
  >
    <img :src="currentImage" alt="Image Not Found" height="300" width="300" class="mx-auto my-3">
    <div class="space-y-2">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4"
      >
        <input
          ref="fileinput"
          type="file"
          class="hidden"
          multiple
          @change="updateProfilePicture"
        />
        <div>
          <p :class="errorText ? 'text-red-500' : ''">
            Update Your Profile Picture
          </p>
          <p class="text-red-500">
            {{ errorText }}
          </p>
        </div>
        <t-button
          class="flex justify-right w-64 items-center"
          type="button"
          @click.prevent="$refs.fileinput.click()"
        >
          <icon-component color="#fff" class="mx-2" name="upload" />
          Upload Profile Picture
        </t-button>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <t-button type="submit"> Update Profile Picture </t-button>
    </div>
  </form>
</template>

<script>
import IconComponent from "../common/svg-icon.vue";

export default {
  name: "ChangeProfilePicture",
  components: {
    IconComponent,
  },
  props: {
    currentImage: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      profilePicture: null,
      errorText: "",
      url: '',
    };
  },
  methods: {
    updateProfilePicture() {
      this.profilePicture = { ...this.$refs.fileinput.files };
      this.url = URL.createObjectURL(this.profilePicture);
    },
    async submitForm() {
      if (!this.profilePicture) {
        this.errorText = "No file chosen";
      } else {
        this.errorText = "";
        this.$emit("updateProfilePicture", this.profilePicture[0]);
      }
    },
  },
};
</script>
