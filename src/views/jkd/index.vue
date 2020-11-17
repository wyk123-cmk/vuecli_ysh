<style scoped>
	@import '../../../static/index.css';
</style>
<template>

	<div class="bod_ht" ref="homePage">

		<div class="sydbwk">
			<span>公告</span>
			<Marquee loop="-1" scrolldelay="200"> {{this.notice}} </Marquee>
		</div>
		<div class="logoimg">
			<img src="../../assets/images/logo-img.svg"><label>仪商汇快运</label>
		</div>
		<div class="sydtwk">
			<mt-swipe :auto="4000" :showIndicators="false" style="height:200px;padding-top:0px;">
				<mt-swipe-item v-for="(item,index) in slides" :key="index">
					<img :lang="item.link" :src="item.image" @click="ImgRous(item.link)" />
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="jj-box">
			<div class="syanwk">
				<a @click="btnExpress(2)"><img src="../../assets/images/jj2.svg" alt="" /><label>寄大件<br><span>仪器仪表整机设备</span></label></a>
				<a @click="btnExpress(1)"><img src="../../assets/images/jj1.svg" alt="" /><label>寄快递<img src="../../assets/images/9zhe.svg"><br><span>一小时取件</span></label></a>
			</div>
			<div class="syanwk">
				<a @click="btnExpress(4)"><img src="../../assets/images/jj3.svg" alt="" /><label>批量寄<br><span>方便快捷</span></label></a>
				<a @click="btnyhh()"><img src="../../assets/images/jj4.svg" alt="" /><label>领券中心<br><span>有未领取的优惠券</span></label></a>
			</div>
			<div class="syanwk">
				<a @click="btnExpress(3)"><img src="../../assets/images/jj5.svg" alt="" /><label>电子面单<br><span>自助打印面单</span></label></a>

			</div>
		</div>
		<!-- <ul class="jijian">
			<li @click="btnExpress(2)"><a class="iconfont yjt"><img src="../../assets/images/jj.svg">
					<p>寄大件<span>仪器&nbsp;&nbsp;&nbsp;仪表&nbsp;&nbsp;&nbsp;整机&nbsp;&nbsp;&nbsp;设备</span></p>
				</a></li>
			<li @click="btnExpress(1)"><a class="iconfont yjt"><img src="../../assets/images/jdj.svg">
					<p><span style="font-size: 14px; color: #333;">寄快递&nbsp;&nbsp;<label class="sf_nine">发顺丰文件限时限量9折优惠</label> </span><span>文件&nbsp;&nbsp;&nbsp;物品&nbsp;&nbsp;&nbsp;一小时寄件</span></p>
				</a></li>
			<li @click="btnyhh()"><a class="iconfont yjt"><img src="../../assets/images/yhq-index.svg">
					<p>领券中心<span :style="isShow?'color:red':'color:#999'">{{yhqContent}}</span></p>
				</a></li>

		</ul> -->
	</div>
</template>
<script>
	import {
		getMainIndex,
		IsNewCoupon,
		GetExpressDraftList,
		GetCompanyClaimInfo
	} from "../../api/api";
	export default {
		data() {
			return {
				islogin: this.$Context.isLogin(),
				notice: "",
				slides: [],
				yhqContent: "",
				isShow: false,
				clientHeight: '',
				token: "",
				ismaster:false
			};
		},
		mounted() {
			var token = localStorage.getItem('token');
			this.token = token;
			// 获取浏览器可视区域高度
			this.clientHeight = `${document.documentElement.clientHeight}` //document.body.clientWidth;
			// console.log(this.clientHeight);
			window.onresize = function temp() {
				this.clientHeight = `${document.documentElement.clientHeight}`;
			};

			$("body").css("background", "#fff")
		},
		watch: {
			// 如果 `clientHeight` 发生改变，这个函数就会运行
			clientHeight: function() {
				this.changeFixed(this.clientHeight)
			}
		},

		created() {
			getMainIndex().then(data => {
				this.notice = data.notice;
				this.slides = data.slides;
			});
			IsNewCoupon().then(data => {
				if (data == true) {
					this.yhqContent = "您有未领取的优惠券";
					this.isShow = true;
				} else {
					this.yhqContent = "领取更多优惠券";
					this.isShow = false;
				}
			});
			GetCompanyClaimInfo().then(data=>{
				console.log(data);
				if(data){
					if(data.isMaster==true){
						this.ismaster=true;
					}
				}
				
			})
		},
		methods: {
			ImgRous(url) {
				window.location.href = url;
			},
			changeFixed(clientHeight) { //动态修改样式
				// console.log(clientHeight);
				this.$refs.homePage.style.height = (clientHeight - 59) + 'px';

			},
			GetImportList() {
				var parms = {
					page: 1,
					limit: 5
				}
				GetExpressDraftList(parms).then(data => {
					console.log(data);
					if (data.total!==0) {
						this.$router.push({
							path: "/bulkexpress",
							query: {
								redirect: "jkd"

							}
						});
					} else {
						this.$router.push({
							path: "/jkdexecl",
							query: {
								redirect: "jkd"

							}
						});
					}
				})
			},
			btnyhh() {
				if (!this.islogin) {
					this.$router.push({
						path: "/login",
						query: {
							redirect: "jkd"
						}
					});
				} else {
					this.$router.push({
						path: "/yhq",
						query: {
							redirect: "jkd",
							ismaster:this.ismaster

						}
					});
				}
			},
			btnExpress(tn) {
				if (!this.islogin) {
					this.$router.push({
						path: "/login",
						query: {
							redirect: "jkd"
						}
					});
				}
				if (tn === 1) {
					this.$router.push({
						path: "/express",
						query: {
							redirect: "jkd",
							pageType: "small"
						}
					});
				}
				if (tn === 2) {
					this.$router.push({
						path: "/express",
						query: {
							redirect: "jkd",
							pageType: "big"
						}
					});
				}
				if (tn === 3) {
					if (this.$util.IsPC() == true) {
						window.location.href = "/page/pc-md"
					} else {
						window.location.href = "/page/pc-md"
					}

				}
				if (tn === 4) {
					this.GetImportList()
				}
			},
		}

	}
</script>
<style scoped="scoped">
	.bod_ht {
		overflow-y: scroll;
		height: 500px;
	}

	.jj-box {
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .1);
		margin: 14px;
	}

	.sydtwk {
		height: 200px;
	}

	.mint-swipe {
		width: 100%;
		height: 200px;
		padding-top: 0px;
	}

	.mint-swipe .mint-swipe-items-wrap {
		position: absolute !important;
		overflow: hidden;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
	}

	.logoimg {
		display: flex;
		align-items: center;
		margin-bottom: 14px;
		margin-top: 10px;
	}

	.logoimg label {
		font-size: 22px;
		font-weight: bold;
		color: #4285F4;
	}

	.logoimg img {
		width: 50px;
		height: 50px;
		margin-left: 14px;
		margin-right: 10px;
	}
</style>
