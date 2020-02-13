<template>
  <div id="app" :style="STYLE_VARIABLES">
    <layout />
  </div>
</template>

<script>
import Layout from "@/layout";
import { mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  name: "app",
  components: {
    Layout
  },
  created() {
    this.getAddress();
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
      authStatus: "authStatus",
      isSession: "isSession"
    })
  },
  methods: {
    getAddress() {
      return new Promise(resolve => {
        this.$axios.get("https://api.ipify.org/?format=json").then(res => {
          console.log(res);
          let ipUtente = res.data.ip;
          console.log(ipUtente);
          this.$store.commit("get_address", ipUtente);
          resolve();
        });
      });
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
<style lang="scss">
/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
