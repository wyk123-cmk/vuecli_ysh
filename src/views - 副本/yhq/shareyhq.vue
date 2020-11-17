<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="btnnav"><br></a>
			<h1 class="tab-title">分享助力</h1>
		</header>
		<div>
			<img :src="imgs" class="imgs">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				imgs: ""
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.imgs = this.$route.query.img;
			this.redirect=this.$route.query.red;
			console.log(this.imgs);
		},
		methods: {
			btnnav() {
				this.$router.replace(this.redirect);
			}
		}
	}
</script>

<style scoped>
	.imgs {
		width: 100%;
		height: auto;
	}
</style>
