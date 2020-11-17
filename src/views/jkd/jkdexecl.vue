<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="btnback()"></a>
			<h1 class="tab-title">批量寄</h1>
		</header>
		<div class="content">
			<p class="lot-up">+批量上传
				<input type="file" @change="UploadSqImgWeb" ref="excel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
			</p>
			<p>
				<!--  <img v-if="sqImgUrl == ''" /> -->
				<img :src="sqImgUrl" />
				<label v-if="sqImgUrl!==''">寄快递表格</label>
			</p>
			<a class="download" @click="downLoadFile()"><button class="iconfont yjt">下载模板</button></a>
		</div>
	</div>
</template>

<script>
	import {
		UploadFileWebExecl,
		ImportExpressDraft,
		GetExpressDraftList
	} from "../../api/api";
	import {
		MessageBox
	} from "mint-ui";
	import wxutil from "../../common/js/wx.js";
	export default {
		data() {
			return {
				id: "",
				imgs: "",
				isWeb: false,
				sqImgUrl: '',
				page: 1,
				limit: 5
			}
		},
		created() {

			this.redirect = this.$route.query.redirect;

		},
		mounted() {
			$("body").css("background", "#f7f7f7");
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isWeb = false;
			} else {
				this.isWeb = true;
			}
			var u = navigator.userAgent;
			if (!!u.match(/AppleWebKit.*Mobile.*/)) {
				alert("批量导入手机端暂时无法使用，请使用PC微信或者登录电脑后访问http://express.1718china.cn使用");
				this.$router.replace("/jkd");
			}
		},
		methods: {
			btnback() {
				this.$router.replace(this.redirect);
			},
			downLoadFile() {
				var filepath = "http://test3.1718china.cn/templates/excel/批量下单模板.xlsx";
				var name = "批量下单模板.xlsx";
				this.$util.downloadFile(name, filepath);
				
			},
			UploadSqImgWeb(event) {
				if (this.$refs.excel.files.length < 1) return;
				let file = this.$refs.excel.files[0];
				console.log(file);
				let fileName = file.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
				let fileNameLength = file.name.length; //取到文件名长度
				let fileFormat = file.name.substring(fileName, fileNameLength); //截
				console.log(fileFormat);
				let param = new FormData();
				param.append("update_file", file);
				param.append("FileType", fileFormat);
				UploadFileWebExecl(param, progress => {}).then(data => {
					console.log(data);
					this.$indicator.close();
					// if (!data) return;

					if (data) {
						this.$toast({
							duration: 1000,
							message: "数据导入成功"
						});
						this.$router.push({
							path: "/bulkexpress",
							query: {
								redirect: "jkdexecl"


							}
						})

					}

				});



			},
		}
	}
</script>

<style scoped>
	.lot-up {
		background: #fff;
		margin: 14px 14px 10px;
		border-radius: 4px;
		height: 50px;
		line-height: 50px;
		position: relative;
		text-align: left;
		padding-left: 14px;
	}

	.lot-up input {
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-radius: 4px;
		opacity: 0;
		position: absolute;
		left: 0;
		right: 0;
	}

	.download {
		text-align: center;
		color: #132645;
		display: block;
	}

	.download button {
		background: #f7f7f7;
		color: #132645;
		font-size: 12px;
	}

	.download button.iconfont.yjt:after {
		color: #132645;
		font-size: 12px;
		padding-left: 2px;
	}
</style>
