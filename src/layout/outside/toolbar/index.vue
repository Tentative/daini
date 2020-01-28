<template>
  <div id="toolbar">
    <sidebar-activator />
    <div class="spacer"></div>
  </div>
</template>

<script>
import SidebarActivator from "@/layout/outside/toolbar/sidebarActivator";

export default {
  name: "toolbar",
  components: { SidebarActivator }
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

#toolbar {
  height: var(--toolbar-height);
  display: inline-flex;
  flex-wrap: nowrap;
}
</style>
