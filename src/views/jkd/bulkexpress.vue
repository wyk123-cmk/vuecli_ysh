<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="btnback()"></a>
			<h1 class="tab-title">批量寄</h1>
			<span class="menu" @click="plsc()" style="padding-top:14px;font-size:13px;">批量上传</span>
		</header>
		<div class="content" style="padding-bottom: 60px;padding-top:44px;">
			<ul class="nrwk" style="border-top:6px solid #eee; position: fixed;left: 0;right: 0;">
				<li @click="btnSendTime()"><span class="iconfont yjt">{{
            selectNo == 1
            ? "今天"
            : selectNo == 2
            ? "明天"
            : selectNo == 3
            ? "后天"
            : ""
            }}{{sendTime}}</span>期望上门时间</li>
				<li><input class="switch switch-animbg" type="checkbox" v-model="checkdata">启用电子面单</li>
			</ul>
			<ul class="plj-list" style="padding-top:109px;">
				<li v-for="(item, i) in jklist" :key="i">
					<p><label><input type="checkbox" v-model="jkdatachecked" :value="item.id" @click="checkedClick($event,item)">{{item.estimateGoods.category}}{{item.estimateGoods.name}}</label><label><button><img
								 src="../../assets/images/edit.svg" @click="GetDrafInfo(item.id,item.estimateGoods.weight)"></button><button><img
								 src="../../assets/images/delete.svg" @click="DeleteDrafs(item.id)"></button></label></p>
					<div class="plj-xq">
						<p><span v-if="item.expressFrom!==null">{{item.expressFrom.areaInfo.province}}-{{item.expressFrom.name}}</span><span
							 style="color:red;" v-else>请补全寄件信息</span><br><span v-if="item.expressTo!==null">{{item.expressTo.areaInfo.province}}-{{item.expressTo.name}}</span><span
							 style="color:red;" v-else>请补全收件信息</span></p>
						<span>{{item.estimateGoods.name}}<br><i>￥{{item.estimatePrice}}</i></span>
					</div>
				</li>
			</ul>

		</div>
		<div class="gjljxdwk">
			<label><input type="checkbox" v-model="checked" @click="checkAll($event)">全选</label>
			<a @click="btnSubmit()">立即下单</a>
			<span>预估：<s>￥--{{sumMoney}}</s><i>最终费用以快递小哥核实为准</i></span>

		</div>

		<mt-popup v-model="showTime" position="bottom" class="mint-popup" style="width:100%;">
			<div class="layer-time">
				<div class="time">
					<div class="tab-time">
						<a :class="{ tabtimeactive: selectNo == 1, disabled: !isTimeTab }" @click="btnSelectTime(1)" id="lbltoday">今天</a>
						<a :class="{ tabtimeactive: selectNo == 2 }" @click="btnSelectTime(2)">明天</a>
						<a :class="{ tabtimeactive: selectNo == 3 }" @click="btnSelectTime(3)">后天</a>
					</div>
					<ul class="time-time">
						<mt-picker :slots="companyTimeSlots" @change="onCompanyTimeChange" ref="timePicker"></mt-picker>
					</ul>
				</div>

			</div>
		</mt-popup>
		<mt-popup v-model="showPass" class="mint-popup" style="width:100%;" position="bottom">
			<div class="fkfs">
				<h2>
					立即支付
					<button @click="showPass = false">
						<img src="../../assets/images/guanbi.svg" />
					</button>
				</h2>
				<p>
					<span>￥</span>
					{{ sumMoney }}
				</p>
				<ul class="fk-way">
					<li>
						<input class="fksf-xz" style="margin-left:30px" type="password" v-model="txtpass" placeholder="请输入企业支付密码"
						 autofocus="true" />
					</li>
					<li>
						<p><img src="../../assets/images/qyzh.svg">企业账户</p><input class="fksf-xz" checked type="radio" name="fkfs">
					</li>
				</ul>
				<button class="btn-grxx" @click="btnPassSubmit">确定</button>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import {
		GetExpressDraftList,
		getExpressCompany,
		DeleteDraf,
		GetDrafInfo,
		BatchPost,
		EvaluationDraf
	} from "../../api/api";
	import {
		MessageBox,
		Indicator
	} from "mint-ui";
	export default {
		data() {
			return {
				id: "",
				imgs: "",
				checked: false,
				showPass: false,
				jklist: [],
				txtpass: "",
				jkdatachecked: false,
				jkdatachecked: [],
				showTime: false,
				selectNo: 1,
				selectStartTime: "",
				companyTimeSlots: [],
				selectEndTime: "",
				isTimeTab: true,
				sendTime: "一小时内",
				checkdata: false,
				ajaxData: [],
				gjIdList: [],
				addressStoreData: {},
				sumMoney: "",
				ysumMoney: "",
				showPassA: false,
				page: 1,
				limit: 5,
				total: "",
				sumPrice: "",
				insprice: 0,
				readdressStoreData: {},
				goodInfo: {}
			}
		},
		created() {
			console.log(this.sendTime);
			this.sendTime = "一小时内";
			this.redirect = this.$route.query.redirect;
			this.GetList(this.page);



			getExpressCompany({
				companyType: "All"
			}).then(data => {
				
				var startArr = [];
				var endArr = [];
				let that = this;
				$.each(data, function(index, item) {
					startArr.push(item.startTime);
					endArr.push(item.endTime)
				});
				var st = startArr.reduce((num1, num2) => {
					return num1 > num2 ? num1 : num2
				})
				var et = endArr.reduce((num1, num2) => {
					return num1 > num2 ? num1 : num2
				})
				that.selectStartTime = st;
				that.selectEndTime = et;

			})
		
			let dt = new Date();

			if (dt.getHours() > (that.selectEndTime - 2)) {
				console.log("456");
				this.sendTime = "一小时内";
				this.selectNo = 2;

			}
			this.isTimeTab = true;

		},
		watch: {
			jkdatachecked: {
				handler() {
					console.log(this.jkdatachecked);
					if (this.jkdatachecked.length == this.ajaxData.length) {
						this.checked = true;
					} else {
						this.checked = false;
						this.sumMoney = "0"
					}
					if (this.jkdatachecked.length == 0) {
						this.sumMoney = "0"
					}
				},
				deep: true
			}
		},
		mounted() {
			$("body").css("background", "#f7f7f7");
			this.backUrl = this.$route.fullPath;
		},
		methods: {
			btnback() {
				this.$router.replace('jkd');
			},
			btnSubmit() {
				this.EvaluationDraf(this.jkdatachecked);


			},
			plsc() {
				this.$router.push({
					path: "/jkdexecl",
					query: {
						redirect: "bulkexpress"
					}
				})
			},
			GetList(_page) {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				});
				var parms = {
					page: _page,
					limit: this.limit
				}
				GetExpressDraftList(parms).then(data => {

					Indicator.close();
					// var cm=localStorage.getItem('isFirst');
					// if(!this.$util.isNotEmpty(cm))
					// {
					if (data.pageNo == "1") {
						data.list.forEach((item, i) => {
							if (item.errorText !== "") {
								this.$toast({
									duration: 2000,
									message: "第" + (i + 1) + "个订单" + item.errorText
								});
								return false;
							}

						})

					}




					if (data.list) {
						this.checked = false;
					}

					if (data.pageNo == "1") {
						this.jkdatachecked = [];
					}

					this.total = data.total;

					this.ajaxData = this.jklist.concat(data.list);


					// console.log(this.ajaxData.length);
					if (data.total == 0) {
						//如果数据为空   去掉组件this.listData = data.list;
						this.jklist = data.list;
						this.noneData = true;
						this.$Context.delScrollLoad();
						return false;
					}
					this.noneData = false;
					if (data.total < this.limit) {
						//如果数据小于等于limit 去掉组件
						this.jklist = data.list;

						this.$Context.delScrollLoad();
						return false;
					}
					if (Math.ceil(data.total / this.limit) >= _page) {
						console.log("44");

						this.jklist = this.jklist.concat(data.list);
						console.log(this.jklist);
						this.total = data.total;
						let that = this;
						this.$Context.loading = false;
						this.$Context.setScrollLoad($(".scroll"), function() {
							_page++
							that.GetList(_page);
						});
					}
				})
			},
			btnPassSubmit() {
				if (this.txtpass == "" || this.txtpass == null) {
					this.$toast({
						duration: 1000,
						message: "请输入企业支付密码"
					});
					return false;
				} else {
					console.log("正常")
					this.BatchPost(this.jkdatachecked);
				}
			},
			EvaluationDraf(gjidlist) {
				let sdate = new Date();
				let year = sdate.getFullYear();
				let month = sdate.getMonth() + 1;
				let day = sdate.getDate();
				let hour = sdate.getHours() + 1;
				let lastDay = new Date(year, month, 0).getDate();
				console.log(lastDay);
				if (this.selectNo === 2) {
					day = day + 1;
					if (day > lastDay) {
						month = month + 1;
						day = 1;
					}
				} else if (this.selectNo === 3) {
					day = day + 2;
					if (day > lastDay) {
						month = month + 1;
						day = 1;
					}
				}
				let shour = this.sendTime.split("-");
				if (this.selectNo == 2 && this.sendTime == "一小时内") {
					let _h = this.selectStartTime + 1;
					if (shour.length > 1) {
						hour = _h;
					} else {
						hour = _h + ":00";
					}
				} else {
					if (shour.length > 1) {
						hour = shour[1];
					} else {
						hour = hour + ":" + sdate.getMinutes();
					}
				}

				this.createTime = year + "-" + month + "-" + day + " " + hour;
				console.log(this.createTime);

				var parms = {
					idList: gjidlist,
					sendTime: this.createTime,
					isBillExpress: this.checkdata,
					password: "",
				}
				EvaluationDraf(parms).then(data => {
					console.log(data);
					this.insprice = 0;
					console.log(this.showPass);
					var selArg = [];
					if (data) {
						data.drafList.forEach(item => {
							this.jklist.forEach(items => {
								if (item.id == items.id) {
									items.estimatePrice = item.estimatePrice;
								}
							})
							if (item.isPayType == 2) {
								console.log("44");
								this.sumMoney = ""
							} else {
								this.insprice = this.insprice + item.insurancePrice;
							}

							console.log(this.insprice);
							if (item.status == 0) {
								selArg.push(item.status);
							}
							if (item.status == 1) {
								this.$toast({
									duration: 1000,
									message: "数据导入失败"
								});
								return
							}
							if (item.status == 0) {
								this.$toast({
									duration: 1000,
									message: "导入数据已被删除"
								});
								return
							}
						})
						if (this.insprice > 0) {
							this.sumMoney = parseFloat(parseFloat(data.sumPrice) + parseFloat(this.insprice)).toFixed(2);
							console.log(this.sumMoney)
						}
						if (selArg.length == data.drafList.length) {
							this.$toast({
								duration: 1000,
								message: "数据导入正常"
							});
							var message = '您当前订单共' + data.total + '单,消费金额共' + this.sumMoney + ',数据导入正常'
							MessageBox.confirm(message).then(action => {
								this.showPassA = data.isPass;
								if (this.showPassA == true) {
									this.showPass = true;
								} else {
									this.showPass = false;
									this.BatchPost(this.jkdatachecked);
								}

							})
						}

					}

				})
			},
			BatchPost(gjidlist) {
				var parms = {
					idList: gjidlist,
					sendTime: this.createTime,
					isBillExpress: this.checkdata,
					password: this.txtpass,
				}
				BatchPost(parms).then(datas => {
					console.log(datas);
					if (datas == true) {
						this.showPass = false;
						this.$toast({
							duration: 1000,
							message: "下单成功"
						})
						this.jklist = [];
						this.GetList(1);

						// for (var i = 0; i < this.jklist.length; i++) {
						// 	var item = this.jklist[i];
						// 	if (item.id == gjidlist[i]) {
						// 		this.jklist.splice(i, 1)
						// 	}
						// }
					}
					let errorData = this.$store.state.lastError;
					console.log(errorData);

					// if (!datas) {
					if (errorData) {
						console.log(errorData.errCode);
						if (errorData.errCode == 1104) {
							MessageBox.confirm(errorData.message).then(action => {
								console.log("企业资金不足");
								this.$router.push({
									path: "/comRill",
									query: {
										redirect: "bulkexpress"
									}
								})
							})
						}
						if (errorData.errorCode == 1005) {
							console.log("请输入密码");
							MessageBox.confirm(errorData.message).then(action => {
								this.showPass = true;

							})
						}

						if (errorData.errCode > 2000) {
							MessageBox.confirm(errorData.message).then(action => {
								this.$router.push({
									path: "/myRefill",
									query: {
										redirect: this.backUrl
									}
								});
							});
						}
					}

				})
			},
			checkedClick(e, data) {
				if (e.target.checked) {
					// console.log(this.jkdatachecked);
					console.log(data.id);



				} else {

				}
			},
			checkAll(e) { // 点击全选事件
				if (e.target.checked) {
					this.ajaxData.forEach((el, i) => {
						if (this.jkdatachecked.indexOf(el.id) == '-1') {
							this.jkdatachecked.push(el.id);

						}
					});

				} else { // 全不选选则清空绑定的数组
					this.jkdatachecked = [];
					// this.totalSum = 0;
				}
			},
			btnSendTime() {


				this.showTime = true;
				this.btnSelectTime(this.selectNo);
			},
			btnSelectTime(tn) {
				let dt = new Date();
				if (!this.isTimeTab && tn == 1) return false;
				this.companyTimeData = [];
				this.selectNo = tn;
				let startNum = this.selectStartTime;
				console.log(startNum);
					console.log(this.selectStartTime);
				let initTimeList = [];
				if (tn === 1 && dt.getHours() >= this.selectStartTime && dt.getHours() < this.selectEndTime) {

					this.companyTimeData.push("一小时内");
					initTimeList.push("一小时内");

					startNum = dt.getHours() + 1;
				}
				for (var i = startNum; i < this.selectEndTime; i++) {
					let endNum = i + 1;
					this.companyTimeData.push(i + ":00-" + endNum + ":00");
					if (initTimeList.length == 0) {
						initTimeList.push(i + ":00-" + endNum + ":00");
					}
				}
				this.companyTimeSlots = [{
					flex: 1,
					values: this.companyTimeData,
					textAlign: "center",
					defaultIndex: 0
				}];
				this.$nextTick(() => {
					this.$refs.timePicker.setValues(initTimeList);
				});
				this.createTime = "一小时内";
				console.log(this.createTime);
			},
			onCompanyTimeChange(picker, values) {

				console.log(values);
				console.log(this.selectNo);
				if (values.length <= 0) return;
				this.sendTime = values[0];
				// this.$store.state.jkdselectTimeData = {
				// 	selectNo: this.selectNo,
				// 	sendTime: this.sendTime
				// };
				let sdate = new Date();
				let year = sdate.getFullYear();
				let month = sdate.getMonth() + 1;
				let day = sdate.getDate();
				let hour = sdate.getHours() + 1;
				let lastDay = new Date(year, month, 0).getDate();
				console.log(lastDay);
				if (this.selectNo === 2) {
					day = day + 1;
					if (day > lastDay) {
						month = month + 1;
						day = 1;
					}
				} else if (this.selectNo === 3) {
					day = day + 2;
					if (day > lastDay) {
						month = month + 1;
						day = 1;
					}
				}
				let shour = this.sendTime.split("-");
				if (this.selectNo == 2 && this.sendTime == "一小时内") {
					let _h = this.selectStartTime + 1;
					if (shour.length > 1) {
						hour = _h;
					} else {
						hour = _h + ":00";
					}
				} else {
					if (shour.length > 1) {
						hour = shour[1];
					} else {
						hour = hour + ":" + sdate.getMinutes();
					}
					this.createTime = year + "-" + month + "-" + day + " " + hour;
					console.log(this.createTime);
				}
			},
			GetDrafInfo(id, weight) {
				if (weight >= 20) {
					var pageType = "big"
				} else {
					var pageType = "small"
				}
				var parm = {
					Id: id
				}
				GetDrafInfo(parm).then(data => {
					console.log(data);
					this.addressStoreData = {
						addressCode: data.expressFrom.contactsCode,
						userName: data.expressFrom.name,
						userPhone: data.expressFrom.name,
						address: data.expressFrom.address,

						areaCode: this.$util.isNotEmpty(data.expressFrom.areaInfo) ? data.expressFrom.areaInfo.areaCode : "",
						prociarName: this.$util.isNotEmpty(data.expressFrom.areaInfo) ? data.expressFrom.areaInfo.province + data.expressFrom
							.areaInfo.city + data.expressFrom.areaInfo.area : ""

					};
					this.readdressStoreData = {
						addressCode: data.expressTo.contactsCode,
						userName: data.expressTo.name,
						userPhone: data.expressTo.name,
						address: data.expressTo.address,
						areaCode: this.$util.isNotEmpty(data.expressTo.areaInfo) ? data.expressTo.areaInfo.areaCode : "",
						prociarName: this.$util.isNotEmpty(data.expressTo.areaInfo) ? data.expressTo.areaInfo.province + data.expressTo
							.areaInfo.city + data.expressTo.areaInfo.area : ""

					}
					this.$store.state.addressInfo = this.addressStoreData;
					this.$store.state.repaddressInfo = this.readdressStoreData;
					this.goodInfoData = data.goodsInfo;
					this.$store.state.goodInfo = {
						weigth: this.goodInfoData.weight, //未修改过  来自批量下单详情的物品重量
						cubic: (this.goodInfoData.volume) <= 0 ? 0 : (this.goodInfoData.volume),
						packType: this.goodInfoData.category,
						goodName: this.goodInfoData.name,
						goodNum: this.goodInfoData.count,
						goodMemo: data.memo,
						remark: data.remark,
						packageservice: data.packageService

					}
					this.$store.state.InsuredPriceAll = data.insurance;
					var selArr = [];
					data.serviceList.forEach(item => {
						if (item.isDefault == 0) {
							selArr.push(item.remark);
						}
					})
					console.log(selArr);
					this.$store.state.serviceNames = selArr.toString().replace(
						/,/g, '-');;
					this.$store.state.ServiceList = data.serviceList;
					this.$store.state.expressMode = data.expressMode;
					this.$store.state.expressCompanyCode = data.expressCompanyCode;
					this.$router.push({
						path: "/express",
						query: {
							redirect: "bulkexpress",
							id: id,
							pageType: pageType
						}
					})
				})


			},
			DeleteDrafs(id) {
				MessageBox.confirm("确定要删除此单吗？").then(action => {
					var parm = {
						value: id
					}
					DeleteDraf(parm).then(data => {
						console.log(data);
						if (data) {
							this.$toast({
								duration: 1000,
								message: "删除成功"
							})
							this.page = 1;
							// this.GetList();
						}
						for (var i = 0; i < this.jklist.length; i++) {
							var item = this.jklist[i];
							if (item.id == id) {
								this.jklist.splice(i, 1)
							}
						}

					})

				});

			}
		},
		beforeDestroy() {
			MessageBox.close(false);
		}
	}
</script>

<style scoped>
	.gjljxdwk span button {
		height: 19px;
		border: 1px solid #eee;
		border-radius: 19px;
		font-size: 12px;
		padding-left: 8px;
		padding-right: 6px;
		margin-left: 10px;
		background: #fff;
		line-height: 19px;
	}

	.gjljxdwk span button img {
		height: 10px;
		vertical-align: middle;
		margin-left: 2px;
		margin-bottom: 2px;
	}

	.yjttime {
		font-weight: bold;
		color: #333;
	}

	.tstit {
		color: red;
	}

	.gjljxdwk label {
		float: left;
		padding-left: 14px;
		display: flex;
		align-items: center;
		padding-top: 20px;
	}

	.gjljxdwk i {
		padding-left: 0;
		float: none;
		width: auto;
	}

	.gjljxdwk span {
		text-align: right;
		width: auto;
		padding-top: 14px;
		float: right;
		padding-right: 14px;
	}

	.plj-list li {
		margin-top: 6px;
		background: #fff;
	}

	.plj-list li>p {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 10px 14px;
		justify-content: space-between;
	}

	.plj-list li>p label {
		display: flex;
		align-items: center;
	}

	.plj-list li label button {
		background: #fff;
	}

	.plj-list li label button img {
		width: 16px;
		height: 16px;
		margin-left: 10px;
	}

	.gjljxdwk input,
	.plj-list li label input {
		width: 16px;
		height: 16px;
		-webkit-appearance: none;
		border-radius: 8px;
		border: 1px solid #ccc;
		margin-right: 4px;
	}

	.gjljxdwk input:checked,
	.plj-list li label input:checked {
		width: 16px;
		height: 16px;
		background: url(../../assets/images/xz2.svg) no-repeat center;
		border: none;
	}

	.plj-xq {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
	}

	.plj-xq span {
		text-align: right;
		line-height: 24px;
		color: #4285F4;
	}

	.plj-xq p {
		line-height: 24px;
	}

	.plj-xq span {
		color: #666;
	}

	.plj-xq span i {
		color: red;
	}
</style>
