<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">分账测试</h1>
    </header>
    <div class="content">
      <div class="cznrwk">
        <h2>保险金</h2>
        <p>
          <span>￥</span>
          <input type="number" v-model="money1" class="cznrwk-p-input" />
        </p>
        <h2>运费</h2>
        <p>
          <span>￥</span>
          <input type="number" v-model="money2" class="cznrwk-p-input" />
        </p>
        <h2>总金额</h2>
        <p>
            <span>￥{{sumMoney}}</span>
        </p>
      </div>
      <input type="button" class="cznrwk-czan" @click="payment" value="支付" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      redirect: "",
      money1: "",
      money2:"",
      sumMoney:""
    };
  },
  watch:{
      money1(val){
         val=val==="" ? 0 : parseFloat(val);
           let mo=this.money2==="" ?0 :parseFloat(this.money2);
          this.sumMoney=parseFloat(val+mo);
      },
      money2(val){
        val=val==="" ? 0 : parseFloat(val);
         let mo=this.money1==="" ?0 :parseFloat(this.money1);
          this.sumMoney=parseFloat(val+mo);
      }
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    payment() {
    this.$util.wxPayment({ money1: this.money1,money2:this.money2,sumMoney:this.sumMoney, redirect: this.redirect });
    }
  }
};
</script>