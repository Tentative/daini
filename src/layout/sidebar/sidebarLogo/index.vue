<template>
  <router-link id="sidebar-logo" to="/">
    <transition name="fade" mode="out-in">
      <span v-if="sidebarOpen" id="sidebar-logo-dash">Dashboard</span>
      <!-- span v-if="sidebarOpen" id="sidebar-logo-text">{{appTitle}}</span -->
      <img v-else src="../../../assets/logo.svg" alt="" />
    </transition>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sidebarLogo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      sidebarOpen: "sidebarOpen",
      appTitle: "appTitle"
    })
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: reevoFont;
  src: url("../../../assets/font/conthrax-sb.ttf");
}

#sidebar-logo {
  min-height: var(--toolbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 32px;
    height: 32px;
  }

  #sidebar-logo-text {
    display: inline;
    color: #fff;
    white-space: nowrap;
    line-height: var(--toolbar-height);
    font-size: 14px;
    font-family: frogFont, serif;
  }

  #sidebar-logo-dash {
    display: inline;
    color: #fff;
    white-space: nowrap;
    line-height: var(--toolbar-height);
    font-size: 14px;
    font-family: reevoFont, serif;
  }
}
</style>
