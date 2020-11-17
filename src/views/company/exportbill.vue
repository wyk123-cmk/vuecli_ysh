<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">导出账单</h1>
		</header>
		<div class="content">
			<ul class="dczd-box">
				<li><span style="margin-right: 10px;" @click="ShowDate(1)">{{startTime}}</span>至<span @click="ShowDate(2)">{{endTime}}</span></li>
			</ul>
			<ul class="tishi">注：账单导出周期不超过31天，核对账单如有疑义，请拨打客服热线010-51285751。</ul>
			<p class="dczd-btn" @click="ExportZD()"><button>导出</button></p>
		</div>

		<mt-datetime-picker ref="picker" v-model="pickerVisible" @confirm="handleConfirm" type="date" year-format="{value} 年"
		 month-format="{value} 月" date-format="{value} 日">
		</mt-datetime-picker>

	</div>
</template>

<script>
	import {
		ExcelCompanyCustomer
	} from '../../api/api.js'
	import {
		apihostFile
	} from "../../common/js/config"
	export default {
		data() {
			return {
				redirect: "",
				realyReson: "",
				showdate: false,
				pickerVisible: new Date(),
				seltime: "",
				types: "",
				startTime: "开始日期",
				endTime: "结束日期"
			}
		},
		mounted() {
			$("body").css("background", "#fff");
			this.redirect = this.$route.query.redirect;
			this.realyReson = this.$route.query.reson;
		},
		watch: {
			endTime(val) {
				if (val < this.startTime) {
					this.$toast({
						duration: 1000,
						message: "结束日期不能小于开始日期"
					});
					this.endTime = "";
					return false;
				}
			}
		},
		methods: {
			btnSubmit() {
				location.href = '/claim?redirect=%2Fme'
			},
			ShowDate(type) {
				this.showdate = true;
				this.$refs.picker.open();
				this.types = type;
			},
			ExportZD() {
				let params = {
					startDate: this.startTime,
					endDate: this.endTime
				};
				ExcelCompanyCustomer(params).then(data => {
					console.log(data);
					var content = JSON.parse(data);
					console.log(content);
					var filepath =content.filePath;
					console.log(filepath);
					this.$util.downloadFile(content,filepath);
					
				})
			},
			handleConfirm(e) {
				console.log(this.pickerVisible);
				this.seltime = this.$util.formatDate.format(this.pickerVisible, 'yyyy-MM-dd');
				console.log(this.seltime);
				if (this.types == 1) {
					this.startTime = this.seltime;
				} else {
					this.endTime = this.seltime;
				}
			}
		}
	}
</script>

<style scoped>
	.body {
		background: #FFFFFF;
	}

	.dczd-box {
		border-top: 1px solid #f7f7f7;
		background: #fff;
		padding-top: 14px;
		width: 100%;
		box-sizing: border-box;
	}

	.tishi {
		padding: 0px 15px;
		font-size: 13px;
		color: red;
	}


	.dczd-box li {
		margin-bottom: 20px;
		padding: 0 14px;
		display: flex;
		justify-content: space-between;
		line-height: 34px;
		color: #999;
		font-size: 13px;
	}

	.dczd-box li span {
		width: 100%;
		background: #f7f7f7;
		text-align: center;
		height: 34px;
		line-height: 34px;
		border-radius: 2px;
	}

	.dczd-box li span+span {
		margin-left: 10px;
	}

	.dczd-btn button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 46px;
		line-height: 46px;
		width: 100%;
		background: #4285f4;
		color: #fff;
	}
</style>
