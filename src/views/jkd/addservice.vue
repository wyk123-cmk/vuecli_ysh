<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="btnback"></a>
			<h1 class="tab-title">增值服务</h1>
		</header>
		<div class="content" style="padding-bottom: 60px;">
			<ul class="nrwk">
				<li @click="showZZFW(1)"><span class="iconfont yjt">{{thremark}}</span>提货方式</li>
				<li @click="showZZFW(2)"><span class="iconfont yjt">{{qdremark}}</span>签单返还</li>
				<li @click="showZZFW(3)"><span class="iconfont yjt">{{fkremark}}</span>付款方式</li>
			</ul>
			<button class="zzfw-btn" @click="btnOK()">确认</button>
		</div>


		<mt-popup v-model="isShowPayType" position="bottom" class="show-pay-layers">
			<ul class="layer-fkfs" v-if="isShowFkfs">
				<h2>付款方式</h2>
				<p class="way-pay"><label :class="item.sel?'active':''" v-for="(item, i) in fklist" :key="i" @click="btnSelFK(item.remark)">{{item.remark}}</label></p>
				<span>到付不享受折扣，价格以小哥确认为准</span>
			</ul>
			<ul class="layer-fkfs" v-if="isShowQdfh">
				<h2>签单返还</h2>
				<p class="way-pay"><label :class="item.sel?'active':''" v-for="(item, i) in qdlist" :key="i" @click="btnSelQD(item.remark)">{{item.remark}}</label></p>

				<h4>顺丰快运：5元/票；德邦快递：大件20元/票，快递为普通价格(不打折)</h4>

			</ul>
			<ul class="layer-fkfs" v-if="isShowTh">
				<h2>提货方式</h2>
				<p class="way-pay"><label :class="item.sel?'active':''" v-for="(item, i) in thlist" :key="i" @click="btnSelTH(item.remark)">{{item.remark}}</label></p>
				<h4 v-if="showqt" style="color: red;">注：含6元其他费</h4>
				<h4 v-if="isShowdb"> 注：送货费根据不同城市收费标准不一致，如需上楼，进仓等特殊服务，还需额外收取费用，详细咨询快递小哥</h4>


			</ul>
		</mt-popup>
	</div>
</template>

<script>
	import {
		GetServiceList
	} from '../../api/api.js'
	export default {
		data() {
			return {
				aa: "",
				redirect: "",
				selectcomp: "",
				isShowPayType: false,
				isShowTh: false,
				isShowFkfs: false,
				isShowQdfh: false,
				issf: false,
				thlist: [],
				qdlist: [],
				fklist: [],
				isShowdb: false,
				thremark: "派送",
				qdremark: "无需返还",
				fkremark: "寄付",
				ServiceList: [],
				thid: "",
				qdid: "",
				fkid: "",
				serviceName: [],
				isclick: false,
				thremark_parm: "",
				qdremark_parm: "",
				fkremark_parm: "",
				serviceNames: [],
				showqt: false,
				thotherPrice: "",
				qdotherPrice: "",
				fkotherPrice: ""

			}
		},
		created() {
			this.redirect = this.$route.query.redirect;
			if (this.selectcomp !== "undefined" || this.selectcomp !== "") {
				this.selectcomp = this.$route.query.selectcomp;
				if (this.selectcomp == "db001") {
					this.isShowdb = true;
				}
			} else {
				this.selectcomp = "sf001";
			}
			var parms = {
				companyCode: this.selectcomp
			}
			GetServiceList(parms).then(data => {
				console.log(data);
				if (data[0].listDetail !== null) {
					var list = data[0].listDetail;
					list.forEach(item => {
						if (item.isDefault == 1) {

							item.sel = true;
							this.thid = item.serviceValue;
							this.thremark = item.remark;

						} else {
							item.sel = false
						}
					});
					console.log(list);
					this.thlist = list
				}
				if (data[1].listDetail !== null) {
					var list2 = data[1].listDetail;
					list2.forEach(item => {
						if (item.isDefault == 1) {
							item.sel = true;
							this.qdid = item.serviceValue;
							this.qdremark = item.remark;
						} else {
							item.sel = false
						}
					});
					console.log(list2);
					this.qdlist = list2;
				}
				if (data[2].listDetail !== null) {
					var list0 = data[2].listDetail;
					list0.forEach(item => {
						if (item.isDefault == 1) {
							item.sel = true;
							this.fkid = item.serviceValue;
							this.fkremark = item.remark;
						} else {
							item.sel = false
						}
					});
					console.log(list0);
					this.fklist = list0;
				}

			})
		},
		methods: {
			btnback() {
				if (!this.$route.query.redirect) {
					this.$router.go(-1);
				} else {
					this.$router.replace(this.$route.query.redirect);

				}
			},
			btnSelTH(code) {
				this.thlist.forEach(item => {
					if (item.remark == code) {
						item.sel = true;
						if (this.selectcomp == "db001" && item.remark == "自提" && item.sel == true) {
							this.showqt = true;
						}
						this.thremark = item.remark;
						this.thid = item.serviceValue;
						this.thotherPrice=item.otherPrice;
						if (item.isDefault == 0) {
							this.thremark_parm = item.remark;

						}
					} else {
						item.sel = false;
					}
				})
			},
			btnSelQD(code) {
				this.qdlist.forEach(item => {
					if (item.remark == code) {
						item.sel = true;
						this.qdremark = item.remark;
						this.qdid = item.serviceValue;
						this.qdotherPrice=item.otherPrice;
						if (item.isDefault == 0) {
							this.qdremark_parm = item.remark;

						}

					} else {
						item.sel = false;
					}
				})
			},
			btnSelFK(code) {
				this.fklist.forEach(item => {
					if (item.remark == code) {
						item.sel = true;
						this.fkremark = item.remark;
						this.fkid = item.serviceValue;
						this.fkotherPrice=item.otherPrice;
						if (item.isDefault == 0) {
							this.fkremark_parm = item.remark;

						}
					} else {
						item.sel = false;
					}
				})
			},
			btnOK() {

				if (this.thremark_parm == "" && this.qdremark_parm == "" && this.fkremark_parm == "") {
					this.serviceNames == ""
				} else {
					this.serviceNames.push(this.thremark_parm, this.qdremark_parm, this.fkremark_parm);

				}
				// this.ServiceList.push(this.thid, this.qdid, this.fkid);
				this.ServiceList = [{
						serviceKey: "DeliveryType",
						serviceValue: this.thid,
						remark: this.thremark
					},
					{
						serviceKey: "BackSignBill",
						serviceValue: this.qdid,
						remark: this.qdremark
					},
					{
						serviceKey: "PayType",
						serviceValue: this.fkid,
						remark: this.fkremark
					}
				];
				console.log(this.ServiceList);
				this.$store.state.serviceNames = this.$util.trimSpaces(this.serviceNames);
				this.$store.state.ServiceList = this.ServiceList;
				this.$store.state.ServicePrice = (this.$util.isNotEmpty(this.thotherPrice)?this.thotherPrice:0)+(this.$util.isNotEmpty(this.qdotherPrice)?this.qdotherPrice:0)+(this.$util.isNotEmpty(this.fkotherPrice)?this.fkotherPrice:0);
				console.log(this.$store.state.ServicePrice);
				this.$router.replace({
					path: this.redirect,
					query: {
						red: "addservice"
					}
				});
			},

			showZZFW(val) {
				this.isShowPayType = true;
				if (val == 1) {
					this.isShowTh = true;
					this.isShowQdfh = false;
					this.isShowFkfs = false;
				}
				if (val == 2) {
					this.isShowQdfh = true;
					this.isShowTh = false;
					this.isShowFkfs = false;
				}
				if (val == 3) {
					this.isShowFkfs = true;
					this.isShowQdfh = false;
					this.isShowTh = false;
				}

			}
		}
	}
</script>

<style scoped>
	.show-pay-layers {
		width: 100%;
	}

	.layer-fkfs {
		background: #fff;
		padding: 24px 14px;
		margin-top: 10px;
	}

	.layer-fkfs h2 {
		font-size: 15px;
	}

	.way-pay label {
		display: flex;
		align-items: center;
		margin-right: 10px;
		height: 30px;
		padding: 0 14px;
		background: #f7f7f7;
		margin-bottom: 10px;
	}

	.way-pay label.active {
		background: #d6ebff;
		background-image: url(../../assets/images/xz1.svg);
		background-position: right bottom;
		background-repeat: no-repeat;
		background-size: 15px;
	}

	.layer-fkfs p {
		display: flex;
		margin: 10px 0;
		flex-flow: wrap;
	}

	.layer-fkfs h4 {
		font-size: 12px;
		color: #666;
		text-align: justify;
	}

	.layer-fkfs span {
		font-size: 12px;
		color: red;
	}

	.layer-fkfs .tkwk-radio {
		background: #fff;
	}

	.zzfw-btn {
		width: 94%;
		height: 36px;
		line-height: 36px;
		background: #4385f5;
		color: #fff;
		margin: 20px 3%;
		border-radius: 2px;
	}
</style>
