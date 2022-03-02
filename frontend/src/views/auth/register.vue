<template>
  <div class="min-h-full flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="m-3 w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-6">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="text-gray-700 space-y-4 flex flex-col"
              @submit.prevent="handleSubmit(attemptSignUp)"
            >
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <t-input-group
                    label="Your Username*"
                    :feedback="errors[0]"
                    :variant="errors.length > 0 ? 'danger' : ''"
                  >
                    <t-input
                      v-model="user.username"
                      placeholder="Username"
                      type="text"
                      name="username"
                      :variant="errors.length > 0 ? 'danger' : ''"
                    />
                  </t-input-group>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="First Name"
                  rules="required"
                >
                  <t-input-group
                    label="First Name*"
                    :feedback="errors[0]"
                    :variant="errors.length > 0 ? 'danger' : ''"
                  >
                    <t-input
                      v-model="user.firstName"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      :variant="errors.length > 0 ? 'danger' : ''"
                    />
                  </t-input-group>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Last Name"
                  rules="required"
                >
                  <t-input-group
                    label="Last Name*"
                    :feedback="errors[0]"
                    :variant="errors.length > 0 ? 'danger' : ''"
                  >
                    <t-input
                      v-model="user.lastName"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      :feedback="errors[0]"
                      :variant="errors.length > 0 ? 'danger' : ''"
                    />
                  </t-input-group>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <t-input-group
                    label="Email*"
                    :feedback="errors[0]"
                    :variant="errors.length > 0 ? 'danger' : ''"
                  >
                    <t-input
                      v-model="user.email"
                      placeholder="Email Address"
                      type="email"
                      name="email"
                      :variant="errors.length > 0 ? 'danger' : ''"
                    />
                  </t-input-group>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required|min:8"
                >
                  <t-input-group
                    label="Password*"
                    :feedback="errors[0]"
                    :variant="errors.length > 0 ? 'danger' : ''"
                  >
                    <t-input
                      v-model="user.password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      :feedback="errors[0]"
                      :variant="errors.length > 0 ? 'danger' : ''"
                    />
                  </t-input-group>
                </ValidationProvider>
              </div>
              <t-button type="submit"> Sign Up </t-button>
            </form>
          </ValidationObserver>
          <div class="flex items-center mt-4">
            <router-link :to="{ name: 'Login' }" class="text-blue-800">
              Already have an account ? Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async attemptSignUp() {
      const response = await this.$http.post("users/", this.user);
      if (response) {
        this.$toast.show({
          content:
            "Your have been registered successfully, please login and continue.",
          type: "success",
        });
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>
