<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h2 class="tab-title">钱包明细</h2>
    </header>
    <div class="content">
      <div class="way">
        {{amountType}}
        <span>{{amount}}</span>
      </div>
      <div class="way-detail">
        <li>
          <label>类型</label>
          <span>{{amountType}}</span>
        </li>
        <li>
          <label>时间</label>
          <span>{{createTime}}</span>
        </li>
        <li>
          <label>交易单号</label>
          <span>{{orderNo}}</span>
        </li>
        <li>
          <label>钱包剩余</label>
          <span>{{amountAll}}</span>
        </li>
        <!-- <li>
          <label>备注</label>
          <span>{{remark}}</span>
        </li> -->
      </div>
    </div>
  </div>
</template>
<script>
import {getAmountLog} from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      walletId:0,
      amount:"",
      amountType:"",
      createTime:"",
      orderNo:"",
      amountAll:""
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
    this.walletId = this.$route.query.walletId;
    let params = {
      id:this.$route.query.walletId
    }
    getAmountLog(params).then(data=>{
     
      if (data.amountType===1) {
          this.amount="+"+data.amount.toFixed(2);
      }else{
         this.amount=="-"+data.amount.toFixed(2);
      }
       this.amountType=data.amountText;
      this.createTime=this.$util.formatDate.format(data.logTime,'yyyy-MM-dd hh:mm');
      this.orderNo=data.orderCode;
      this.amountAll = data.balance.toFixed(2);
    })
  }
};
</script>