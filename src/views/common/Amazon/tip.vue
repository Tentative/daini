<template>
  <div>
    <center>
      <p>Amazon filter | :</p>
    </center>
    <el-checkbox v-model="model.FiltroAlert">FiltroAlert</el-checkbox>
    <el-button @click="reloadTable">Aggiorna con nuovi filtri </el-button>
  </div>
</template>

<script>
export default {
  name: "tip",
  data() {
    return {
      model: {
        FiltroAlert: false
      }
    };
  },
  methods: {
    reloadTable() {
      this.$store.dispatch("amazon");
    }
  }
};
</script>

<style scoped></style>
