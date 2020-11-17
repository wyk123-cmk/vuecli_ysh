<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/jlj')"></a>
      <h1 class="tab-title">提现</h1>
      <button class="menu" style="background: #fff;" @click="$router.replace('/jlj')">完成</button>
    </header>
    <div class="content">
      <div class="jlj-sqcg">
        <img src="../../assets/images/wcjb.png" alt="" />
        <p>提现申请已提交<br /><span>等待管理员审核，请耐心等待</span></p>
      </div>
      <ul class="jlj-txxq">
        <h2>提现详情</h2>
        <li>微信账号<span>{{NiceName}}</span></li>
        <li>提现金额<span>{{CashAmount.toFixed(2)}}元</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
         NiceName:"",
         CashAmount:0.00
        }
    },
    mounted(){
        $("body").css("background","#fff");
        if(this.$util.isNotEmpty(this.$route.query.nickName)){
          this.NiceName=this.$route.query.nickName;
        }
        if(this.$util.isNotEmpty(this.$route.query.CashAmount)){
          this.CashAmount =this.$route.query.CashAmount;
        }
    }
}
</script>
