<template>
  <div id="403-page">
    <center>
      <p>
        You are not allowed to view this page. Please
        <router-link to="/login"> login </router-link>
      </p>
    </center>
  </div>
</template>

<script>
export default {
  name: "forbidden"
};
</script>

<style scoped></style>
