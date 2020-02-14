<template>
  <div class="hello">
    <div>
      <center>
        <p v-if="porcamadonna || porcoddio">Welcome to your main page</p>
        <p v-else>
          You are not logged in. Please login to view this page
        </p>
        <Main v-if="porcamadonna || porcoddio" />
      </center>
    </div>
  </div>
</template>

<script>
import Main from "@/components/Main";
import { mapGetters } from "vuex";
export default {
  components: { Main },
  name: "homepage",
  computed: {
    // isAuth: function() {
    //   return this.$store.getters.isLoggedIn;
    // },
    // isLoading: function() {
    //   return this.$store.getters.authStatus;
    // },
    ...mapGetters({
      authStatus: "authStatus",
      isLoggedIn: "isLoggedIn",
      isTemp: "isTemp"
    }),
    porcoddio() {
      return sessionStorage.getItem("jwtUtente");
    },
    porcamadonna() {
      return this.$store.getters.isLoggedIn;
    }
  }
  // data() {
  //   return {
  //     loading: false
  //   };
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
