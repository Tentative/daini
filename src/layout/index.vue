<template>
  <div id="layout">
    <sidebar />

    <outside />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link
    ><span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
  </div>
</template>

<script>
import Sidebar from "@/layout/sidebar/index";
import Outside from "@/layout/outside/index";

export default {
  name: "layout",
  components: { Outside, Sidebar },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss">
#layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

body {
  margin: 0 !important ;
}
</style>
