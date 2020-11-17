<template>
  <div>
    <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      <a @click="change('jkd')">
        <li :class="{ menuactive: this.menuroute == 'jkd' }">
          <a>
            <span class="iconfont footer1"></span>
            <br />寄快递
          </a>
        </li>
      </a>
      <a
        @click="change('ckd')"
        :class="{ menuactive: this.menuroute == 'ckd' }"
      >
        <li>
          <a>
            <span class="iconfont footer2"></span>
            <br />查快递
          </a>
        </li>
      </a>
      <a
        @click="change('yfgs')"
        :class="{ menuactive: this.menuroute == 'yfgs' }"
      >
        <li>
          <a>
            <span class="iconfont footer3"></span>
            <br />运费估算
          </a>
        </li>
      </a>
      <a @click="change('me')" :class="{ menuactive: this.menuroute == 'me' }">
        <li>
          <a>
            <span class="iconfont footer4"></span>
            <br />我
          </a>
        </li>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuroute: "jkd",
      name: "fade"
    };
  },
  beforeUpdate() {
    this.create();
  },
  created() {
    this.create();
  },
  methods: {
    create() {
      if (this.$store.state.menuroute) {
        this.menuroute =
          this.$store.state.menuroute == "logisticsInfo"
            ? "ckd"
            : this.$store.state.menuroute;
      } else {
        this.menuroute = "jkd";
      }
    },
    change(page) {
      this.menuroute = page;
      this.$router.push(page);
    }
  }
};
</script>
<style scoped>
.menuactive * {
  color: #4285F4 !important;
}
</style>
