
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">商品保价</h1>
    </header>
    <div class="content">
      <ul class="spbjwk">
        <li>
          <div class="baojia">
          <span>声明价值</span>
          <label>
          <input
            type="number"
            class="spbjwk-li-input"
            :placeholder="placeholderTxt"
            v-model="amount"
          />
            <i>元</i>
            </label>
          </div>
          <em>预估费用：{{ bjmoney }}元</em>
        </li>
        <h2>说明</h2>
        <span v-html="contents"></span>
      </ul>
    </div>
    <div class="spbjan">
      <a @click="btnNoPrice" v-show="isPrice">
        <h2>不保价</h2>
      </a>
      <a @click="btnOkPrice">
        <h3>确认保价</h3>
      </a>
    </div>
  </div>
</template>
<script>
import { getInsurancePrice,getInsuranceAgreeInfo } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      bjmoney: "-",
      amount: "",
      // IsAgree: false,
      pageType:"",
      CompanyCode:"",
      contents:"",
      upperAmount:0,
      placeholderTxt:"1-500000整数",
      isPrice:false
    };
  },
  watch: {
    amount(val) {
      if (val != "") {
        if(parseFloat(val)>this.upperAmount){
           this.$toast({ duration: 1000, message: "保费不能超过"+this.upperAmount });
           return false;
        }else{
          this.setPrice(val);
        }
      } else {
        this.bjmoney = 0;
      }
    }
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
    this.pageType=this.$route.query.pageType;
    this.CompanyCode=this.$route.query.code;
    this.upperAmount=this.$route.query.upperAmount;
    this.placeholderTxt="1-"+this.upperAmount+"整数";
    if(this.$util.isNotEmpty(this.$route.query.amount)){
      this.amount = this.$route.query.amount;
    }
    // else if(this.pageType=="small"){
    //   this.amount=300;
    // }
    this.isPrice = this.pageType==="small" ;
   if(!this.isPrice){
         $(".spbjan h3").css("width","90%")
      }
    let params={
      companyCode:this.$route.query.code,
      expressType:this.pageType
    }
    getInsuranceAgreeInfo(params).then(data=>{
      if(!data) return;
      this.contents = data;
    })
    if (this.amount != "") {
      this.setPrice(parseFloat(this.amount).toFixed(2));
    }
  },
  methods: {
    setPrice(vm) {
      if (vm > 0) {
        let params ={
          CompanyCode:this.CompanyCode,
          Amount:vm,
          ExpressType:this.pageType
        }
        getInsurancePrice(params).then(data => {
          this.bjmoney = data;
        });
      }
    },
    btnNoPrice() {
      this.$store.state.InsuredPrice = 0;
      this.$store.state.InsuredPriceAll = "不保价";
      this.$router.replace({ path: this.redirect });
    },
    btnOkPrice() {
      let amt= this.amount=="不保价" || !this.$util.isNotEmpty(this.amount) ? 0:parseFloat(this.amount);
      if(amt<=0){
        this.$toast({ duration: 1000, message: "请填写保价金额" });
        return false;
      }
      if(parseFloat(this.amount)>parseFloat(this.upperAmount)){
         this.$toast({ duration: 1000, message: "保费不能超过￥"+this.upperAmount });
           return false;
        }
      this.$store.state.InsuredPrice =parseFloat(this.bjmoney);
      this.$store.state.InsuredPriceAll = parseFloat(this.amount);
      this.$router.replace({ path: this.redirect });
    }
  }
};
</script>
