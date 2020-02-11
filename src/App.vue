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
    this.deleteSession();
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
  // beforeDestroy() {
  //   this.deleteSession();
  // },
  computed: {
    isSession: function() {
      return this.$store.getters.isSession;
    },
    ...mapGetters({
      STYLE_VARIABLES: "STYLE_VARIABLES",
      role: "role",
      showRole: "showRole",
      isLoggedIn: "isLoggedIn",
      authStatus: "authStatus",
      isSession: "isSession"
    })
  },
  methods: {
    deleteSession() {
      if (this.isSession == "false") {
        window.onbeforeunload = function() {
          localStorage.removeItem("frog-admin");
        };
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  /* color: #2c3e50; */
  color: #fff;
  overflow: hidden;
}

body {
  white-space: nowrap;
  margin: 0;
  padding: 0;
}
</style>
