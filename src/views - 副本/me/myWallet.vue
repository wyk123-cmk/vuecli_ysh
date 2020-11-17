<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/me')"></a>
      <router-link class="menu" :to="{path:'/myWalletDetail',query:{redirect:$router.currentRoute.fullPath}}">钱包明细</router-link>
    </header>
    <div class="content">
      <div class="wallet">
        <img src="../../assets/images/wallet.svg" />
        <p>我的钱包</p>
        <h2>
          <span>￥</span>{{amountInt}}<span>{{amountYushu}}</span>
        </h2>
        <div class="qbmx">
          <label >￥{{available}}<span>可用零钱</span></label>|
          <label>￥{{frozen}}<span>冻结资金</span></label>
        </div>
      </div>
      <div class="wallet-btn">
        <router-link :to="{path:'/myCash',query:{redirect: '/myWallet'}}">提现</router-link>
        <router-link :to="{path:'/myRefill',query:{redirect:'/myWallet'}}">充值</router-link>
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
      amountInt: 0,
      amountYushu: ".00",
      frozen:"",
      available:""
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
  },
  created() {
    getMyWalletAmount().then(data => {
      if(data.amount >0){
        this.$store.state.myAmount=data.available.toFixed(2);
        let amount = data.amount.toString().split('.');
        this.amountInt = amount[0];
        if (amount.length>=2) {
          this.amountYushu ="." +amount[1];
        }
      }
      this.frozen=data.frozen.toFixed(2);
      this.available=data.available.toFixed(2);
    });
  }
};
</script>