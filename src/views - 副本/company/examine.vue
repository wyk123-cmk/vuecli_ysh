<style scoped>
.zlsh {text-align:center;padding-top: 74px;}
	.zlsh img{width:116px;height: 116px;}
	.zlsh h2{font-size: 16px;font-weight: bold;padding: 20px 0;}
	.zlsh p{font-size: 14px;color:#999;padding-bottom: 20px;}
	.zlsh button{width:160px;height: 44px;border-radius: 44px;color:#fff;background: #4285F4}
</style>
<template>
    <div>
        <header>
	<a class="iconfont icon-back" @click="$router.replace('/me')"></a>
	<h1 class="tab-title">资料审核中</h1>
</header>
<div class="content" >
	<div class="zlsh">
		<img src="../../assets/images/shz.svg" alt="">
		<h2>资料审核中！</h2>
		<p>您的资料已提交上传审核，请耐心等待</p>
		<button @click="$router.replace('/me')">返回首页</button>
	</div>
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
    mounted(){
        $("body").css("background","#fff");
        this.redirect= this.$route.query.redirect;
    }
}
</script>