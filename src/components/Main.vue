<template>
  <div v-show="isLoggedIn">
    <el-button secondary
      ><router-link to="/amz">
        AMZ
      </router-link>
    </el-button>
    <el-button secondary>
      Graphs
    </el-button>
    <el-button secondary>
      Retailer
    </el-button>
    <el-button secondary>
      Items
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "homepage",
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  }
};
</script>

<style></style>
