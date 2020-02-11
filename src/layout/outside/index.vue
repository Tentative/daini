<template>
  <div class="outside">
    <modal />
    <toolbar />
    <app-main />
    <tipbar />
  </div>
</template>

<script>
import Toolbar from "@/layout/outside/toolbar/index";
import AppMain from "@/layout/outside/appMain/index";
import tipbar from "@/layout/outside/tipbar/index";
import Modal from "@/layout/outside/modal";

export default {
  name: "outside",
  components: { Modal, tipbar, AppMain, Toolbar },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
.outside {
  width: calc(100vw - 65px);
  display: flex;
  flex-direction: column;
  // background-color: #f0f0f1;
  padding-left: 65px;
  background: #102a43;
  background-image: url("https://uploads.codesandbox.io/uploads/user/c3fb8e8a-35ea-4232-b5d6-0f3c5373510b/LVs7-dots.png");
  background-size: contain;
}
</style>
