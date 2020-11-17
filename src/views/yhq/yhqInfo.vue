<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace('/yhq')"><br></a>
			<h1 class="tab-title">优惠券说明</h1>
		</header>
		<p v-html="content" class="con">

		</p>
	</div>
</template>

<script>
	import {
		GetCouponRemark
	} from '../../api/api.js'
	export default {
		data() {
			return {
				content: ""
			}
		},
		created() {
			GetCouponRemark().then(data => {
				console.log(data);
				this.content = data;
			})
		}

	}
</script>

<style scoped>
	.con {
		padding: 44px 14px;
		text-align: justify;
		line-height: 21px;
		/* padding-top: 50px;
		padding-left: 13px;
		width: 95%; */
	}
	p.last{
		text-align: right;
	}
	p.con p{
		padding-bottom: 10px;
	}
</style>
