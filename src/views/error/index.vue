<template>
  <div id="error">
    <router-link to="/">
      <center>
        <el-button secondary>Back</el-button>
      </center>
    </router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "error"
};
</script>

<style scoped>
#error {
}
</style>
