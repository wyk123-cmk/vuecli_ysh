<template>
    <div>
        <header>
            <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
            <h1 class="tab-title">充值说明</h1>
    </header>
    <div class="cz-content">
        <h2>充值说明:</h2>
        <p>1、因在估价时重量可能不准确，寄大件还会产生包装费、送货费等，所以在寄件时余额需大于预估金额。</p>
        <p>2、充值规则如下：（元/单位）<br/>
[1-50)≥100；<br/>
[50-100)≥200；<br/>
[100-200)≥300；<br/>
[200-300)≥500；<br/>
[300-400)≥600；<br/>
[400-500)≥700；<br/>
[500-600)≥800；<br/>
[600-700)≥900；<br/>
[700-800)≥1100；<br/>
[800-900)≥1300；<br/>
[900-1000)≥1500；<br/>
[1000-∞]≥1.5倍向上取整百。</p>
 <p>3、余额可随时提现。</p>
        <p style="padding-top:10px;color:#333;">如有疑问，请添加客服微信（13811418661）。</p>
    </div>

    </div>
</template>
<script>
export default {
  data(){
    return{
      redirect:""
    }
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect=this.$route.query.redirect;
  }
};
</script>