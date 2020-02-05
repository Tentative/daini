<template>
  <div class="main">
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
          <a class="forgot-password" href="https://oxfordinformatics.com/"
            >Forgot password ?</a
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
    isLogged() {
      this.$store.state.isLoggedIn;
    }
  },
  created() {
    console.log(this.$route);
    this.login();
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
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
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    login() {
      // let username = this.model.username;
      // let password = this.model.password;
      // this.$store
      //   .dispatch("login", { username, password })
      //   .then(() => this.$router.push("/"))
      //   .catch(err => console.log(err));
      this.$axios
        .get("https://data.reevo.io", {
          headers: {
            "Content-Type": "application/json"
          },
          CodiceClient: "reevolacerba2020",
          VersioneClient: "0.0.1",
          IndirizzoIP: "172.21.117.132",
          UserAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 Edg/79.0.309.71",
          Url: "https://127.0.0.1",
          JsonWebToken: null,
          CodiceRichiesta: "Login",
          JsonRichiesta:
            '{"NomeUtente":"pablo.daini@gmail.com","Password":"12345","IsMemorizzaPassword":false}'
        })
        .then(res => {
          console.log("res");
        });
    }
  }
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
