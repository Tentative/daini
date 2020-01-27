<template>
  <div>
    <div v-if="authorized" id="home"></div>
    <p>{{ count }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import store from "@/store";

export default {
  name: "home",
  components: {
    HelloWorld,
    Login
  },
  data() {
    return {
      authorized: ""
    };
  },
  created() {
    console.log("Store check: ");
    console.log(this.$store);
    console.log(this.$store.state.permission.role);
    console.log(this.$route);
  },
  methods: {
    goRepo() {
      window.open("https://github.com/tarnishablec/frog-admin");
    },
    goEle() {
      window.open("https://element.eleme.cn/#/en-US");
    },
    goEcharts() {
      window.open("https://echarts.baidu.com/examples/");
    },
    goRx() {
      window.open("https://github.com/vuejs/vue-rx");
    }
  },
  computed: {
    count() {
      return this.$store.state.permission.role;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  text-align: center;

  & > div {
    margin: 50px 0;
  }
}

#github-link {
  color: black;
}
</style>
