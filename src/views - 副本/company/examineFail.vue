<style scoped>
.zlsh {text-align:center;padding-top: 74px;}
	.zlsh img{width:116px;height: 116px;}
	.zlsh h2{font-size: 16px;font-weight: bold;padding: 20px 0;}
	.zlsh p{font-size: 14px;color:#999;padding-bottom: 20px;}
	.zlsh button{width:160px;height: 44px;border-radius: 44px;color:#fff;background: #4285F4;}
</style>
<template>
    <div>
        <header>
	<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
	<h1 class="tab-title">认领失败</h1>
</header>
<div class="content" >
	<div class="zlsh">
		<img src="../../assets/images/shsb.svg" alt="">
		<h2>企业认领失败！</h2>
		<p>{{realyReson}}</p>
		<!-- <button @click="$router.replace('/claim')">重新提交</button> -->
        <button @click="btnSubmit">重新提交</button>
	</div>
</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            redirect:"",
            realyReson:""
        }
    },
    mounted(){
        $("body").css("background","#fff");
        this.redirect =!this.$util.isNotEmpty(this.$route.query.redirect) ? "/me" : this.$route.query.redirect;
        this.realyReson=this.$route.query.reson;
    },
    methods:{
        btnSubmit(){
        location.href='/claim?redirect=%2Fme'
        }
    }
}
</script>