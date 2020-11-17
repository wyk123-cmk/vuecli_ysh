<template>
<div>
    <header>
	<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
	<h1 class="tab-title">提现说明</h1>
</header>
<div class="content">
	<div class="jlj-txsm">
		<h2>提现时间说明：</h2>
		<p v-html="remark">
        </p>
	</div>
	
</div>
</div>
</template>
<script>
import {GetCashPrompt} from '../../api/api'
export default {
    data(){
        return{
            redirect:"",
            remark:""
        }
    },
    mounted(){
         $("body").css("background", "#fff");
       this.redirect = this.$route.query.redirect;
       GetCashPrompt().then(data=>{
           this.remark = data;
       })
    }
}
</script>