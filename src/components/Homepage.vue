<template>
  <div class="hello">
    <div v-if="isLogged">
      <center>
        <span>Welcome to your main page</span>
      </center>
    </div>
    <div v-else>
      <center>
        <span
          >You are not logged in. Please
          <router-link to="/login"> login </router-link> to view this page</span
        >
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "homepage",
  computed: {
    isLogged() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
