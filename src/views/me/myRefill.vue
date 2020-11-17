<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">充值</h1>
      <router-link class="menu"
       :to="{ path: '/RefillContent', query: { redirect: this.$router.currentRoute.fullPath }}"
       >
       充值说明</router-link>
    </header>
    <div class="content">
      <div class="czwk">
        <img src="../../assets/images/wechat.svg" />
        <label>微信充值</label>
      </div>
      <div class="cznrwk">
        <h2>充值金额</h2>
        <p>
          <span>￥</span>
          <input type="number" v-model="money" class="cznrwk-p-input" autofocus/>
        </p>
         <div class="zhye">可用余额<label>{{available}}</label>元</div>
        <input type="button" class="cznrwk-czan" @click="payment" value="充值" />
      </div>
     
    </div>
  </div>
</template>
<script>
import { getMyWalletAmount } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      money: "",
      available:""
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
  },
  created() {
    getMyWalletAmount().then(data => {
      this.available=data.available.toFixed(2);
    });
  },
  methods: {
    payment() {
		
      if (parseFloat(this.money) <= 0 || this.money=="") {
        this.$toast({ duration: 1000, message: "充值金额不正确" });
        return;
      } else {
        this.$util.wxPayment({ money: this.money, redirect: this.redirect });
      }
    }
  }
};
</script>