<template>
  <div>
    <header-component />
    <main class="mt-10 mx-auto max-w-7xl px-4 py-3 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="sm:text-center lg:text-left">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Chat in your rooms with</span>
            <span class="block text-indigo-600 xl:inline"> Chat Rooms </span>
          </h1>
          <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Web application that lets you register, login and chat with people sharing common interests with you through chat rooms.
          </p>
          <p>Printing profile data {{ profileData }}</p>
        </div>
      </main>
    <footer-component />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as authTypes from '../store/modules/auth/auth-types';
import HeaderComponent from "../components/common/header.vue";
import HeroSection from "../components/common/hero-section.vue";
import FooterComponent from "../components/common/footer.vue";

export default {
  name: "Home",
  components: {
    HeaderComponent,
    HeroSection,
    FooterComponent
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
  },
};
</script>
