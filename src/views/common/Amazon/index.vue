<template>
  <div>
    <el-button @click="reloadTable">Aggiorna con nuovi filtri</el-button>
    <fr-table
      v-loading="$asyncComputed.commentData"
      :data="commentData"
      :columns="columns"
      alignment="center"
      show-overflow-tooltip
      index
      pagination
    />
  </div>
</template>

<script>
export default {
  name: "amazon",
  data() {
    return {
      columns: ["ITEM", "AMZ PRICE", "OOS", "FT", "BB", "NEG_REV"],
      amz: {
        NumeroPagina: "1",
        ItemsPerPagina: "20",
        Categoria: null,
        FiltroAlert: "",
        FiltroInStock: "",
        FiltroFastTrack: "",
        FiltroBuyBox: "",
        FiltroNegativeReviews: ""
      }
    };
  },
  methods: {
    reloadTable() {
      this.$store.dispatch("amazon");
    }
  },
  asyncComputed: {
    async commentData() {
      return await this.$store.dispatch("amazon", this.amz);
    }
  }
};
</script>

<style lang="scss" scoped></style>
