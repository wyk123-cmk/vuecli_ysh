<style scoped>
.payment-con{
	position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
}
</style>
<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">订单支付</h1>
		</header>
		<div class="content payment-con">
			<ul class="qfkwk">
				<h2>￥<i>{{orderAmount}}</i></h2>
				<p><i>仪众宏鑫贸易有限公司</i>
				<span>收款方</span></p>
			</ul>
			<!-- <div class="dbxzan1"><a href="xzdz.html">立即支付</a></div> -->
			<div class="dbxzan1"><a href="javascript:;" @click="immediatePayment">立即支付</a></div>
		</div>
	</div>
</template>
	
<script>
import { Pay } from "../../api/api";
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			redirect: "",
			mastCode: "",
			orderAmount: "0.00"
		}
	},
	mounted() {
		this.redirect = this.$route.query.redirect;
		this.mastCode = this.$route.query.code;
		if(this.$store.state.orderAmount != undefined){
			this.orderAmount = this.$store.state.orderAmount;
		}else{
			 this.$router.replace("/jkd");
		}
	},
	methods: {
		immediatePayment(){
			Pay({value: this.mastCode}).then(data => {
				if(data == undefined) return false;
				if(data.errCode == "2001"){
					MessageBox.confirm("支付金额不足，需跳转充值界面进行充值！").then(action => {
						this.$router.push({
							path: "/myRefill",
							query: {
								redirect: "ckd",
							}
						});
					}).catch(err => { 
					});
				}
				if(data.errCode == "200"){
					MessageBox.confirm("支付成功！").then(action => {
						this.$router.push({
							path: "/ckd",
						});
					}).catch(err => { 
					});
				}
			})
		}
	}
};
</script>