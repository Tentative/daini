<template>
  <div class="main">
    <h2 class="logo">Reevo</h2>
    <div class="login">
      <el-card>
        <h2>Login</h2>
        <el-form
          class="login-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.native.prevent="login"
        >
          <el-form-item prop="username">
            <el-input
              v-model="model.username"
              placeholder="Email"
              prefix-icon="fas fa-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="model.password"
              placeholder="Password"
              type="password"
              prefix-icon="fas fa-lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="!loading"
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
              >Login</el-button
            >
          </el-form-item>
          <p class="error" v-show="authStat == 'error'">Unauthorized user</p>
          <el-checkbox v-model="model.IsMemorizzaPassword"
            >Keep logged in</el-checkbox
          >
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    authStat: function() {
      return this.$store.getters.authStatus;
    },
    created() {
      console.log(this.$route);
    }
  },
  data() {
    return {
      // Richiesta: {
      //   CodiceClient: "reevolacerba2020",
      //   VersioneClient: "0.0.1",
      //   IndirizzoIP: "79.7.38.148",
      //   UserAgent: "useragenttest",
      //   Url: "https://app.reevo.io/",
      //   JsonWebToken: null,
      //   CodiceRichiesta: "Login",
      //   JsonRichiesta: JSON.stringify(this.Richiesta)
      // },
      CodiceRichiesta: "Login",
      model: {
        username: "",
        password: "",
        IsMemorizzaPassword: false
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur"
          },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      let NomeUtente = this.model.username;
      let Password = this.model.password;
      let IsMemorizzaPassword = this.model.IsMemorizzaPassword;
      this.loading = true;
      this.$store
        .dispatch("login", {
          NomeUtente,
          Password,
          IsMemorizzaPassword
        })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*** LOGO ***/

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

.error {
  color: red;
}
</style>
<style lang="scss" scoped>
@font-face {
  font-family: reevoFont;
  src: url("/root/frog-admin/src/assets/font/Sketchalot.ttf");
}

.logo {
  font-family: "reevoFont";
  letter-spacing: 3px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
}

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
