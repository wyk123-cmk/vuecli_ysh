<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">发票须知</h1>
		</header>
        <div class="content">
            <p>1、请确定发票信息填写无误，点击“申请发票”；</p>
			<p>2、发票将在3-5个工作日内开好；</p>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			redirect: "",
		}
	},
	mounted() {
		this.redirect = this.$route.query.redirect;
	},
	methods: {
		
	}
};
</script>