<template>
  <div id="app" :style="STYLE_VARIABLES">
    <layout />
  </div>
</template>

<script>
import Layout from "@/layout";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Layout
  },
  created() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
  computed: {
    ...mapGetters({
      STYLE_VARIABLES: "STYLE_VARIABLES",
      role: "role",
      showRole: "showRole",
      isLoggedIn: "isLoggedIn",
      authStatus: "authStatus"
    })
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  color: #2c3e50;
  overflow: hidden;
}

body {
  white-space: nowrap;
  margin: 0;
  padding: 0;
}
</style>
