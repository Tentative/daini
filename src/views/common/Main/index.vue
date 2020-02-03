<template>
  <div>
    <center>
      <h1>Main Page (not secured)</h1>
      <p v-if="!isLogged">
        Please go to <router-link to="/login"> login page </router-link> to
        login
      </p>
    </center>
  </div>
</template>

<script>
export default {
  name: "mainpage",
  computed: {
    isLogged() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style></style>
