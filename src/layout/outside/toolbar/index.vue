<template>
  <div id="toolbar">
    <sidebar-activator />
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link
      ><span v-if="isLoggedIn">
        |
        <a @click="logout()">Logout</a></span
      >
      <span v-else> | <router-link to="/login">Login</router-link></span>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
import SidebarActivator from "@/layout/outside/toolbar/sidebarActivator";
import { mapGetters } from "vuex";

export default {
  name: "toolbar",
  components: { SidebarActivator },

  computed: {
    ...mapGetters({
      authStatus: "authStatus",
      isLoggedIn: "isLoggedIn",
      isTemp: "isTemp"
    }),
    isTemp() {
      return sessionStorage.getItem("jwtUtente");
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";
a {
  cursor: pointer;
}

#toolbar {
  height: var(--toolbar-height);
  display: inline-flex;
  flex-wrap: nowrap;
}

.nav {
  text-align: center;
  margin: auto 2.5%;
}

.spacer {
  flex: 0.5;
}
</style>
