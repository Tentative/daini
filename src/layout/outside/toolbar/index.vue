<template>
  <div id="toolbar">
    <sidebar-activator />
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link
      ><span v-if="isAuth == 'success'"> | <a @click="logout">Logout</a></span>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
import SidebarActivator from "@/layout/outside/toolbar/sidebarActivator";

export default {
  name: "toolbar",
  components: { SidebarActivator },

  computed: {
    isAuth: function() {
      return this.$store.getters.authStatus;
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
