<style scoped>
	.dd-time {
  display: block;
}
.dd-time li {
  display: inline-block;
  margin-top: 10px;
}
/* .nrwk li em{
  overflow: hidden;
  font-weight: bold;
  display: block;
} */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.daodaactive {
  border: 1px solid #0f84f3;
  background: url(../../assets/images/xzdg.svg) no-repeat bottom right;
  background-size: 28px;
}
.daodaFactive {
  color: #fff;
}
.show-pass-button {
  background: rgb(66, 133, 244);
  width: 100%;
  height: 44px;
  line-height: 44px;
  position: absolute;
  bottom: 0px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  letter-spacing: 5px;
}
.show-pass-input {
  margin: 10% 0px 10px 10%;
}
.show-pass-input input {
  width: 90%;
  height: 36px;
  border: 1px solid #f7f7f7;
  line-height: 36px;
  border-radius: 4px;
}
.show-pass-h {
  text-align: center;
  font-size: 16px;
  background: rgb(247, 247, 247);
  padding: 10px;
  letter-spacing: 2px;
}
.show-pass {
  display: flex;
  flex-flow: column;
}
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
.layer-fkfs {
  background: #fff;
  padding: 14px;
}
.layer-fkfs h2 {
  font-size: 15px;
  padding-top: 10px;
}
.layer-fkfs label {
  display: flex;
  align-items: center;
  margin-right: 20px;
  height: 30px;
  padding: 0 16px;
  background: #f7f7f7;
}
.layer-fkfs p {
  display: flex;
  margin: 10px 0;
}
.zs_dz{
	padding: 7px 15px;
	    font-size: 12px;
	    color: #666666;
}
.layer-fkfs h4 {
  font-size: 12px;
  padding: 20px 0 10px;
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
.show-pay-layers {
  width: 100%;
}
.red_tit {
  color: #ff0000;
  font-size: 13px;
  text-align: right;
}
.tab-time a.disabled{
  color: #999;
}
.yhq-layer{    
	position: absolute;
    top: -20px;
    font-size: 12px;
    background:#f8ead6;
   left:0;right:0;
    height: 20px;
    line-height: 20px;
    padding: 0 14px;
	display:flex;
	justify-content: space-between;
	color: #ff8c04;
	z-index: 100;
}
.picker-item.picker-selected{
	color: #000;
	    font-weight: bold!important;
	}
.yhq-layer button{background:rgba(0,0,0,0)}
.yhq-layer button.quxiao:before{content: "\e61f";color: #ff8c04;}

</style>
<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="btnBack"></a>
			<h1 class="tab-title">{{pageType=='big'?'寄大件':'寄快递'}}</h1>
		</header>
		<div class="content" style="padding-bottom:80px;">
			<div class="jswk">
				<p>
					<a @click="btnAddressInfo(1)">
						<img src="../../assets/images/jz.svg" />
						<span v-if="addressStoreData != null">
							{{
              addressStoreData == null
              ? "寄件人信息"
              : addressStoreData.userName
              }}
							<i>
								{{
                addressStoreData == null
                ? "点击填写寄件地址"
                : addressStoreData.prociarName + addressStoreData.address
                }}
							</i>
						</span>
						<span v-else>
							寄件人信息
							<i>点击填写寄件地址</i>
						</span>
					</a>
					<router-link :to="{
              path: '/addressList',
              query: {
                redirect: backUrl,
                jtype: 'send'
              }
            }">
						<em>地址簿</em>
					</router-link>
				</p>
				<p>
					<a @click="btnAddressInfo(2)">
						<img src="../../assets/images/sz.svg" />
						<span v-if="readdressStoreData != null">
							{{
              readdressStoreData == null
              ? "收件人信息"
              : readdressStoreData.userName
              }}
							<i>
								{{
                readdressStoreData == null
                ? "点击填写收件地址"
                : readdressStoreData.prociarName +
                readdressStoreData.address
                }}
							</i>
						</span>
						<span v-else>
							收件人信息
							<i>点击填写收件地址</i>
						</span>
					</a>
					<router-link :to="{
              path: '/addressList',
              query: {
                redirect: backUrl,
                jtype: 'rep'
              }
            }">
						<em>地址簿</em>
					</router-link>
				</p>
			</div>
			<ul class="nrwk">
				<li @click="showEmpressModel = true" v-show="isClaimCompany">
					<span class="iconfont yjt">{{ ExpressCompanyType }}</span>
					寄件形式
				</li>
				<li @click="btnCompanyClick">
					<em class="iconfont yjt" style="font-weight:bold;display:flex;overflow:hidden;color:#333;" v-if="companyImg">
						<img style="margin-right:4px;width:24px;height:24px" :src="companyImg" v-show="isPic" />
						{{ selectCompanyName }}
					</em>
					<em class="iconfont yjt" :style="redirect=='jkd'?'color:#999999':'color:#333'" style="font-weight:bold;display:flex;overflow:hidden;color:#999999;"
					 v-else>{{ selectCompanyName }}</em>
					物流公司
				</li>
				<li @click="btnSendTime" v-if="redirect=='jkd'">
					<span class="iconfont yjt">
						{{
            selectNo == 1
            ? ""
            : selectNo == 2
            ? "明天"
            : selectNo == 3
            ? "后天"
            : ""
            }}
						{{ sendTime }}
					</span>期望上门时间
				</li>
				<li>
					<router-link :to="{
              path: '/goodsInfo',
              query: { redirect: this.backUrl,pageType: this.pageType }
            }">
						<em class="iconfont yjt" v-if="goodInfoData == null || goodInfoData.goodName == ''">{{ "请填写" }}</em>
						<em class="iconfont yjt" style="font-weight:bold;display:block;overflow:hidden;color:#333;" v-else>{{ goodInfoData.goodName }}</em>
						物品信息
						<i>（必填）</i>
					</router-link>
				</li>
				<li @click="btnBj">
					<em class="iconfont yjt" v-if="insuranceAll === '' || insuranceAll === ''">请填写保价信息</em>
					<em class="iconfont yjt" style="font-weight:bold;display:flex;align-items: center;height: 16px;color:#333;" v-else>
						￥{{ insuranceAll }}
						<i v-if="$util.isNotEmpty(insurance)" style="background:red;color:#fff;font-size:10px;padding:0px 5px;border-radius:8px;">￥{{ insurance }}</i>
					</em>
					保价
					<i v-if="pageType=='big'">（必填）</i>
				</li>
				<li @click="btnZzfw">
					<em class="iconfont yjt" :style="serviceNames=='提货方式、签单返还等'?'':'color:red'">{{serviceNames}}</em>
					增值服务
				</li>
			</ul>
			<ul class="dayin">
				<li><input class="switch switch-animbg" type="checkbox" v-model="datacheck">启用电子面单</li>
			</ul>
			<ul class="zhushi_dz">
				<li class="zs_dz">注：启用电子面单后需打印出电子面单并且要自行联系快递员揽件</li>
			</ul>
			<ul class="daoda" v-if="moneyList.length > 0" style="margin-top:5px;z-index:0">
				<h2>产品类型</h2>
				<div style="display: flex;flex-direction: column;" v-for="(item, index) in moneyList" :key="index">
					<li @click="btnSelProductType(item, index)" :class="{ daodaactive: selectProduct == index }">
						<h3>
							<span>
								<label>{{ item.productName }}</label>
								<br />
								{{
                item.receivedTime == "" || item.receivedTime == null
                ? "——"
                : item.receivedTime
                }}
							</span>
						</h3>
						<p v-if="item.price > 0">
							￥
							<span>{{ item.price }}</span>
							<br />
							<label v-if="item.price != item.originalPrice">
								市场价
								<span>￥{{ item.originalPrice }}</span>
							</label>
						</p>
						<p v-else>——</p>
					</li>

					<div v-if="
              $util.isNotEmpty(item.otherPriceMemo)
            " style="text-align:right;font-size:12px;color:red;padding-bottom:10px">{{ item.otherPriceMemo }}</div>
					<div v-if="item.specialMemo!=''" style="text-align:right;font-size:12px;color:red;padding-bottom:10px">{{item.specialMemo}}</div>
				</div>
			</ul>
			<div class="tkwk" v-if="redirect=='jkd'">
				<input id="ckbAgree" type="checkbox" class="tkwk-radio" v-model="IsAgree" />
				<!-- <label for="radio"></label> -->
				<span style="font-size:12px;">
					<label for="ckbAgree">我已阅读并同意</label>
					<br />
					<a @click="isCaluse = true" style="font-size:12px;color:#4285f4;">《仪商汇快运服务协议》</a>
				</span>
				<span style="font-size:12px;">
					<a @click="isComCaluse = true" style="font-size:12px;color:#4285f4; text-indent:4em;">{{ ComESATitle }}</a>
				</span>
			</div>
		</div>
		<div class="gjljxdwk">
			<div class="yhq-layer" v-if="isShowYhq && redirect=='jkd'">你有{{count}}张可用优惠券，支付时将会自动抵扣<button class="iconfont quxiao"
				 @click="isShowYhq=false"></button></div>
			<a @click="btnSubmit" v-if="redirect=='jkd'">立即下单</a>
			<a v-else @click="UpdateDraf">立即保存</a>
			<span>
				预估：
				<s v-if="selectPayType==1">￥{{ sumMoney == "" || sumMoney == 0.0 ? "--" : sumMoney }}</s>
				<s v-else>￥--</s>
				<!-- 	<button @click="btnShowPayType">
					服务信息
					<img src="../../assets/images/top-jt.svg" />
				</button> -->
			</span>
			<i>最终费用以系统核实价格为准</i>
		</div>
		<!-- <mt-popup v-model="isShowPayType" position="bottom" class="show-pay-layers">
			<ul class="layer-fkfs">
				<h2>付款方式</h2>
				<p>
					<label class="way-pay" for="name" @click="clickSelectPayType(1)" :class="{ layerfkfshover: selectPayType === 1 }">寄付</label>
					<label class="way-pay" for="name" @click="clickSelectPayType(2)" :class="{ layerfkfshover: selectPayType === 2 }">到付</label>
				</p>
				<span v-if="selectPayType == 2">注：到付不享受折扣，价格以小哥确认为准</span>
				<h2>签单返还</h2>
				<p>
					<label class="way-pay" @click="btnQd" :class="{ layerfkfshover: isQd === true }">原件返还</label>
				</p>
				<ul>
					<li style="font-size: 12px; color: #999">签单返还收费标准</li>
					<li style="font-size: 12px; color: #999">顺丰快运：5元/票</li>
					<li style="font-size: 12px; color: #999">德邦快递：大件20元/票，快递为普通价格(不打折)</li>
				</ul>
			</ul>
		</mt-popup> -->
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
				<!--   <button class="time-btn" @click="showTime = false">确认</button> -->
			</div>
		</mt-popup>
		<mt-popup v-model="showCompany" position="bottom" class="mint-popup" style="width:100%;">
			<mt-picker :slots="companyList" @change="onCompanyChange" value-key="companyName"></mt-picker>
		</mt-popup>
		<mt-popup v-model="isCaluse" popup-transition="popup-fade" style="width:90%;height:calc(100vh - 110px);border-top-left-radius: 6px;border-top-right-radius:6px;">
			<div class="fuwutiaokwk" style="overflow:scroll;height:calc(100vh - 200px)" v-html="YSHESA"></div>
		</mt-popup>
		<mt-popup v-model="isComCaluse" popup-transition="popup-fade" style="width:90%;height:calc(100vh - 110px);border-top-left-radius: 6px;border-top-right-radius:6px;">
			<div class="fuwutiaokwk" id="btnComCaluse" style="overflow:scroll;height:calc(100vh - 200px)" v-html="ComESA"></div>
		</mt-popup>
		<mt-popup v-model="showEmpressModel" position="bottom" class="mint-popup" style="width:100%;">
			<mt-picker :slots="ExpressModelList" @change="onExpressModelChange" value-key="name"></mt-picker>
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
					<!-- <li><p><img src="../../assets/images/qyzh.svg">企业账户</p><input class="fksf-xz" checked type="radio" name="fkfs"></li> -->
				</ul>
				<button class="btn-grxx" @click="btnPassSubmit">确定</button>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import {
		GetDrafInfo,
		UpdateDraf,
		getExpressCompany,
		getEstimatePrice,
		getExpressPost,
		getDefaultAddress,
		getYSHESGInfo,
		getInsurancePrice,
		IsClaimCompany,
		GetCouponCountModel,
		GetServiceList
	} from "../../api/api";
	import {
		MessageBox
	} from "mint-ui";
	export default {
		name: "page-tab-container",
		data() {
			return {
				goodsInfoCG: [],
				isShowPayType: false,
				datacheck: false,
				SendCode: "",
				RepiCode: "",
				sendTime: "",
				showTime: false,
				selectNo: 1,
				companyList: [],
				expressCompanyModel: [],
				selectCompanyName: "",
				selectStartTime: 8,
				selectEndTime: 19,
				selectUrl: "",
				IsAgree: false,
				showCompany: false,
				selectCode: "",
				companyTimeData: [],
				companyTimeSlots: [],
				isdisplay: false,
				goodInfoData: null,
				addressStoreData: null,
				readdressStoreData: null,
				sumMoney: "",
				moneyList: "",
				createTime: "",
				newgoods: {},
				insuranceAll: "",
				insurance: "",
				productType: "",
				isPic: false,
				companyImg: "",
				isCaluse: false,
				isComCaluse: false,
				YSHESA: "",
				ComESA: "",
				ComESATitle: "",
				sending: false,
				selectProduct: 0,
				ExpressCompanyType: "",
				ExpressCompanyTypeId: 0,
				showEmpressModel: false,
				showPass: false,
				txtpass: "",
				isClaimCompany: false,
				ExpressModelList: [],
				ServiceList: [],
				insuranceUpper: 0,
				selectPayType: 1,
				pageType: "big",
				backUrl: "",
				isQd: false,
				isTimeTab: true,
				isShowYhq: false,
				count: 0,
				selList: [],
				yhqCount: "",
				thid: "",
				qdid: "",
				fkid: "",
				thremark: "",
				qdremark: "",
				fkremark: "",
				serviceNames: "",
				iscg: ""
			};
		},
		mounted() {

			$("body").css("background", "#f7f7f7");
			if (this.$route.query.pageType) {
				this.pageType = this.$route.query.pageType;
			}
			this.backUrl = this.$route.fullPath;

			IsClaimCompany().then(data => {
				this.isClaimCompany = data;

				if (this.isClaimCompany == true) {
					if (
						this.ExpressCompanyTypeId == "" ||
						this.ExpressCompanyTypeId == null
					) {
						this.ExpressCompanyTypeId = !this.$util.isNotEmpty(
								this.$store.state.jkdExpressModelId
							) ?
							0 :
							this.$store.state.jkdExpressModelId;
						this.ExpressCompanyType = !this.$util.isNotEmpty(
								this.$store.state.jkdExpressModelName
							) ?
							"请选择" :
							this.$store.state.jkdExpressModelName;
					}
				} else {
					this.ExpressCompanyTypeId = 1;
					this.ExpressCompanyType = "个人";
					this.GetCouponCountModel(1);
				}
				this.ExpressModelList = [{
					flex: 1,
					values: [{
							id: 0,
							name: "请选择"
						},
						{
							id: 1,
							name: "个人"
						},
						{
							id: 2,
							name: "企业"
						}
					],
					defaultIndex: this.ExpressCompanyTypeId,
					textAlign: "center"
				}];
			});
			if (
				localStorage.getItem("expressListData") != null &&
				localStorage.getItem("expressListData") != undefined
			) {
				let expressList = JSON.parse(localStorage.getItem("expressListData"));
				this.$store.state.goodInfo = expressList.goodInfo;
				this.$store.state.addressInfo = expressList.addressInfo;
				this.$store.state.repaddressInfo = expressList.repaddressInfo;
				this.$store.state.InsuredPrice = expressList.InsuredPrice;
				this.$store.state.InsuredPriceAll = expressList.InsuredPriceAll;
				this.$store.state.OrderInfo = expressList.OrderInfo;
				this.$store.state.jkdselectTimeData = expressList.jkdselectTimeData;
				this.$store.state.selectCompanyName = expressList.selectCompanyName;
				this.$store.state.selectCompanyCode = expressList.selectCompanyCode;
				this.$store.state.CompanyImg = expressList.CompanyImg;
				this.$store.state.ComESATitle = expressList.ComESATitle;
				this.$store.state.ComESA = expressList.ComESA;
				this.IsAgree = expressList.IsAgree;
				this.$store.state.jkdExpressModelId = expressList.jkdExpressModelId;
				this.$store.state.jkdExpressModelName = expressList.jkdExpressModelName;
				localStorage.removeItem("expressListData");
			}

			this.addressStoreData = this.$store.state.addressInfo;
			console.log(this.addressStoreData)
			this.readdressStoreData = this.$store.state.repaddressInfo;
			// this.SendCode = this.addressStoreData.addressCode;
			// this.RepiCode = this.readdressStoreData.addressCode;


			this.goodInfoData = this.$store.state.goodInfo;
			console.log(this.$store.state.goodInfo);

			this.insuranceAll =
				this.$store.state.InsuredPriceAll == undefined ?
				"" :
				this.$store.state.InsuredPriceAll;
			this.insurance =
				this.$store.state.InsuredPrice == undefined ?
				"" :
				this.$store.state.InsuredPrice;
			getYSHESGInfo().then(data => {
				if (!data) return;
				this.YSHESA = data;
			});

			if (this.addressStoreData != null && this.addressStoreData != undefined) {
				this.SendCode = this.addressStoreData.addressCode;
			} else {
				getDefaultAddress().then(data => {
					if (!data) return;
					this.SendCode = data.contactsCode;
					this.addressStoreData = {
						addressCode: data.contactsCode,
						userName: data.name,
						userPhone: data.phone,
						address: data.address,
						areaCode: data.areaInfo.areaCode,
						prociarName: data.areaInfo.province + data.areaInfo.city + data.areaInfo.area
					};
					this.$store.state.addressInfo = this.addressStoreData;
				});
			}
			if (this.readdressStoreData != null) {
				this.RepiCode = this.readdressStoreData.addressCode;
			}
			try {
				if (this.$store.state.jkdselectTimeData != null) {
					this.selectNo = this.$store.state.jkdselectTimeData.selectNo;
					this.sendTime = this.$store.state.jkdselectTimeData.sendTime;
				} else {
					this.selectNo = undefined;
					this.sendTime = "一小时内";
				}
			} catch (e) {
				this.selectNo = 1;
				this.sendTime = "一小时内";
			}
			this.ServiceList = this.$store.state.ServiceList == undefined ? this.selList : this.$store.state.ServiceList;
			console.log(this.ServiceList);
			if (this.ServiceList.length !== 0) {
				if (this.$util.isNotEmpty(this.ServiceList[2])) {
					if (this.ServiceList[2].serviceValue == "1") {
						this.selectPayType = 2;
					} else {

						this.selectPayType = 1;
					}
				}

			}

			this.$store.state.selectPayType = this.selectPayType;
			console.log(this.$store.state.selectPayType);
			console.log(this.$store.state.serviceNames);
			this.serviceNames =!this.$util.isNotEmpty(this.$store.state.serviceNames)? '提货方式、签单返还等' : this.$store.state.serviceNames.toString().replace(
				/,/g, '-');
		},
		created() {


			if (this.pageType == "big") {
				document.title = "寄大件-仪商汇快运";
			} else {
				document.title = "寄快递-仪商汇快运";
			}
			if (this.$store.state.isShowYhq == true) {
				this.isShowYhq = true;
				this.count = this.$store.state.count;
			} else {
				this.isShowYhq = false;
			}

			this.redirect = this.$route.query.redirect;
			if (this.$route.query.redirect == "bulkexpress") {

				if (this.$store.state.expressMode == 1) {
					this.ExpressCompanyTypeId = 1;
					this.ExpressCompanyType = "个人";
				}
				if (this.$store.state.expressMode == 2) {
					this.ExpressCompanyTypeId = 2;
					this.ExpressCompanyType = "企业";
				}

				if (this.$store.state.expressCompanyCode == "sf001") {
					this.selectCode = "sf001";
					this.selectCompanyName = "顺丰快运";
				} else {
					this.selectCode = "db001";
					this.selectCompanyName = "德邦快递";
				}

			}

			getExpressCompany({
				companyType: this.pageType
			}).then(data => {
				var companymodel = {
					agreementContent: "",
					agreementUrl: "",
					companyCode: "",
					companyName: "请选择物流公司",
					endTime: 0,
					logoPath: "",
					startTime: 0
				};
				//data.splice(0, 0, companymodel);
				if (this.$route.query.redirect !== "bulkexpress") {
					let comDefault = [];
					if (
						localStorage.getItem("ExpressCompanyTypeId") != null &&
						localStorage.getItem("ExpressCompanyTypeId") != undefined
					) {
						if (!this.$util.isNotEmpty(this.$store.state.jkdExpressModelId)) {
							this.ExpressCompanyTypeId = localStorage.getItem(
								"ExpressCompanyTypeId"
							);
						} else {
							this.ExpressCompanyTypeId = this.$store.state.jkdExpressModelId;
						}
						if (!this.$util.isNotEmpty(this.$store.state.jkdExpressModelName)) {
							var typeid = localStorage.getItem("ExpressCompanyTypeId");
							if (typeid == "1") {
								this.ExpressCompanyType = "个人";
								this.GetCouponCountModel(typeid);
							} else {
								this.ExpressCompanyType = "企业";
								this.GetCouponCountModel(typeid);
							}

						} else {
							this.ExpressCompanyType = this.$store.state.jkdExpressModelName;
						}
					}

					if (
						localStorage.getItem("defaultCompanyCode") != null &&
						localStorage.getItem("defaultCompanyCode") != undefined
					) {
						comDefault = data.find(
							item => item.companyCode == localStorage.getItem("defaultCompanyCode")
						);
					} else {
						comDefault = data.find(c => c.companyName.indexOf("顺丰") > -1);
					}
					if (!data) return;
					if (this.$util.isNotEmpty(this.$store.state.upperAmount)) {
						this.insuranceUpper = this.$store.state.upperAmount;
					} else {
						this.insuranceUpper = comDefault.insuranceUpper;
					}
					if (this.$util.isNotEmpty(this.$store.state.selectCompanyCode)) {
						this.selectCode = this.$store.state.selectCompanyCode;
						this.GetAddServices();
					} else {
						this.selectCode = comDefault.companyCode;
						this.GetAddServices();
					}
					if (this.$util.isNotEmpty(this.$store.state.selectCompanyName)) {
						this.selectCompanyName = this.$store.state.selectCompanyName;
					} else {
						this.selectCompanyName = comDefault.companyName;
					}
					if (this.$util.isNotEmpty(this.$store.state.CompanyImg)) {
						this.companyImg = this.$store.state.CompanyImg;
						this.isPic = true;
					} else {
						this.companyImg = comDefault.logoPath;
					}
					if (this.$util.isNotEmpty(this.companyImg)) {
						this.isPic = true;
					}
					if (this.$util.isNotEmpty(this.$store.state.ComESA)) {
						this.ComESA = this.$store.state.ComESA;
					} else {
						this.ComESA = comDefault.agreementContent;
					}
					if (this.$util.isNotEmpty(this.$store.state.ComESATitle)) {
						this.ComESATitle = this.$store.state.ComESATitle;
					} else {
						this.ComESATitle = comDefault.agreementUrl;
					}
					if (this.$util.isNotEmpty(this.$store.state.selectPayType)) {
						this.selectPayType = this.$store.state.selectPayType;
					} else {
						this.selectPayType = 1;
					}
					let that = this;
					$.each(data, function(index, item) {
						if (item.companyCode == that.selectCode) {
							that.selectStartTime = item.startTime;
							that.selectEndTime = item.endTime;
						}
					});
					this.expressCompanyModel = data;
					let dcIndex = data.findIndex(function(res) {
						return (res.companyCode == comDefault.companyCode) + 1;
					});

					this.companyList = [{
						flex: 1,
						values: data,
						textAlign: "center",
						defaultIndex: dcIndex
					}];
					let dt = new Date();

					if (dt.getHours() > this.selectEndTime - 2 && this.selectCompanyName == "德邦快递") {
						this.sendTime="两小时内";
						this.isTimeTab = false;
						this.btnSelectTime(2);
						return false;
					}
					if (dt.getHours() > this.selectEndTime - 1 && this.selectCompanyName == "顺丰快运") {
							this.sendTime="一小时内";
						this.isTimeTab = false;
						this.btnSelectTime(2);
						return false;
					}
				} else {
					this.companyList = [{
						flex: 1,
						values: data,
						textAlign: "center",
						defaultIndex: 0
					}];

					let copm = [];
					copm = data.find(
						item => item.companyCode == this.$store.state.expressCompanyCode
					);
					this.insuranceUpper = copm.insuranceUpper;
				}





				if (this.$store.state.jkdselectTimeData != null) {
					this.btnSelectTime(this.$store.state.jkdselectTimeData.selectNo);
				} else {
					if (this.selectCompanyName == "顺丰快运") {
						this.sendTime = "一小时内";
					} else {
						this.sendTime = "两小时内";
					}
					this.btnSelectTime(1);
				}

				this.isTimeTab = true;
			});
			this.sumMoney = parseFloat(
				parseFloat(this.sumMoney == "" ? 0 : this.sumMoney) +
				parseFloat(
					this.insurance == "" || this.insurance == undefined ?
					0 :
					this.insurance
				) 
			).toFixed(2);
		},
		watch: {
			isCaluse(val) {
				if (val === false) {
					$(".fuwutiaokwk")[0].scrollTop = 0;
				}
			},
			isComCaluse(val) {
				if (val === false) {
					$("#btnComCaluse")[0].scrollTop = 0;
				}
			},
			addressStoreData(val) {
				this.btnGetPrice();
			},
			readdressStoreData(val) {
				this.btnGetPrice();
			},
			ServiceList(val){
				this.btnGetPrice();
			},
			sendTime(val) {
				this.btnGetPrice();
			},
			goodInfoData(val) {
				this.btnGetPrice();
			},
			selectCode(val) {
				this.btnGetPrice();
			},
			ExpressCompanyTypeId(val) {
				this.btnGetPrice();
			},
			
		},
		methods: {
			btnQd() {
				if (this.isQd) {
					this.isQd = false;
				} else {
					this.isQd = true;
				}
			},
			UpdateDraf() {
				console.log(this.goodInfoData);
				this.newgoods = {
					weight: this.goodInfoData.weigth,
					volume: this.goodInfoData.cubic <= 0 ? 0 : this.goodInfoData.cubic,
					category: this.goodInfoData.packType,
					name: this.goodInfoData.goodName,
					count: this.goodInfoData.goodNum,

				}
				var parms = {
					id: this.$route.query.id,
					fromContactsCode: this.SendCode,
					toContactsCode: this.RepiCode,
					companyCode: this.selectCode,
					sendTime: this.createTime,
					goodsInfo: this.newgoods,
					insurance: this.insuranceAll,
					productType: this.productType,
					remark: this.goodInfoData.remark,
					expressMode: this.ExpressCompanyTypeId,
					memo: this.goodInfoData.goodMemo,
					serviceList: this.ServiceList,
					isBillExpress: this.datacheck,
					packageService: this.goodInfoData.packageservice
				}
				UpdateDraf(parms).then(data => {
					console.log(data);
					if (data) {
						this.$toast({
							duration: 1000,
							message: "更新成功"
						});
						this.$router.push({
							path: "/bulkexpress",
							query: {
								redirect: this.$route.fullPath,
							}
						})
					}
				})
			},
			//根据选择公司获取默认增值服务
			GetAddServices() {

				console.log(this.selectCode);
				var parms = {
					companyCode: this.selectCode
				}
				GetServiceList(parms).then(data => {
					console.log(data);
					if (data[1].listDetail !== null) {
						var list = data[1].listDetail;
						list.forEach(item => {
							if (item.isDefault == 1) {
								this.thid = item.serviceValue;
								this.thremark = item.remark;
							}
						});
					}
					if (data[2].listDetail !== null) {
						var list2 = data[2].listDetail;
						list2.forEach(item => {
							if (item.isDefault == 1) {
								this.qdid = item.serviceValue;
								this.qdremark = item.remark;
							}
						});
					}
					if (data[0].listDetail !== null) {
						var list0 = data[0].listDetail;
						list0.forEach(item => {
							if (item.isDefault == 1) {
								this.fkid = item.serviceValue;
								this.fkremark = item.remark;
							}
						});
					}
					this.selList = [{
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
					// console.log(this.selList);
					this.ServiceList = this.$store.state.ServiceList == undefined ? this.selList : this.$store.state.ServiceList;
					console.log(this.ServiceList);

				})


			},
			GetCouponCountModel(typeid) {
				GetCouponCountModel().then(data => {
					if (typeid == 1) {
						if (data.userCount !== 0) {
							this.isShowYhq = true;
							this.count = data.userCount;
							console.log(this.count);
						} else {
							this.isShowYhq = false;
						}
					}

					if (typeid == 2) {
						if (data.companyCount !== 0) {
							this.isShowYhq = true;
							this.count = data.companyCount;
						} else {
							this.isShowYhq = false;
						}

					}
					this.$store.state.isShowYhq = this.isShowYhq;
					this.$store.state.count = this.count;

				})
			},
			btnCompanyClick() {
				let companyCode = this.selectCode;
				let dcIndex = this.expressCompanyModel.findIndex(function(res) {
					return res.companyCode == companyCode;
				});
				this.companyList[0].defaultIndex = dcIndex;
				this.showCompany = true;
			},
			btnShowPayType() {
				if (this.isShowPayType) {
					this.isShowPayType = false;
				} else {
					this.isShowPayType = true;
				}
			},
			btnBack() {
				this.$store.state.goodInfo = null;
				this.$store.state.addressInfo = null;
				this.$store.state.repaddressInfo = null;
				this.$store.state.InsuredPrice = 0;
				this.$store.state.InsuredPriceAll = "";
				this.$store.state.jkdselectTimeData = null;
				this.$store.state.selectCompanyName = "";
				this.$store.state.selectCompanyCode = "";
				this.$store.state.CompanyImg = "";
				this.$store.state.ComESATitle = "";
				this.$store.state.reds = "";
				this.$store.state.ComESA = "";
				this.$store.state.jkdExpressModelId = "";
				this.$store.state.jkdExpressModelName = "";
				this.$store.state.selectPayType = "";
				this.$store.state.serviceNames = "",
					this.$store.state.ServiceList = null

				if (this.$route.query.redirect == "bulkexpress") {
					this.$router.replace("bulkexpress");
				} else {
					this.$router.replace("jkd");
				}
			},
			btnSelProductType(itemInfo, itemindex) {
				this.insurance = itemInfo.insurancePrice;
				console.log(itemInfo.insurancePrice);
				this.sumMoney = "";
				this.productType = itemInfo.productType;
				this.selectProduct = itemindex;
				this.sumMoney = parseFloat(
					parseFloat(itemInfo.price) +
					parseFloat(this.insurance == "" ? 0 : this.insurance) 
				).toFixed(2);
			},
			btnZzfw() {
				console.log(this.selectCompanyName);
				this.$router.push({
					path: "/addservice",
					query: {
						redirect: this.$route.fullPath,
						selectcomp: this.selectCode,


					}
				})
			},
			Valid() {
				if (this.SendCode === "" || this.SendCode === null) {
					this.$toast({
						duration: 1000,
						message: "寄件人不能为空"
					});
					return false;
				}
				if (this.RepiCode === "" || this.RepiCode === null) {
					this.$toast({
						duration: 1000,
						message: "收件人不能为空"
					});
					return false;
				}
				if (this.sendTime === "" || this.sendTime === null) {
					this.$toast({
						duration: 1000,
						message: "请选择期望上门时间"
					});
					return false;
				}
				
				if (this.goodInfoData === null || this.goodInfoData==undefined) {
					
					this.$toast({
						duration: 1000,
						message: "请填写物品信息"
					});
					return false;
				} else if (
					this.goodInfoData.goodName === null ||
					this.goodInfoData.goodName === ""
				) {
						
					this.$toast({
						duration: 1000,
						message: "请填写物品信息"
					});
					return false;
				} else if (
					this.goodInfoData.weigth === null ||
					Number(this.goodInfoData.weigth) == 0 ||
					this.goodInfoData.weigth == ""
				) {
					this.$toast({
						duration: 1000,
						message: "请填写物品重量信息"
					});
					return false;
				}
				if (this.selectCode === "" || this.selectCode === null) {
					this.$toast({
						duration: 1000,
						message: "请选择物流公司"
					});
					return false;
				}
				if (this.insuranceAll === "" || this.insuranceAll === null) {
					if (this.pageType === "big") {
						this.$toast({
							duration: 1000,
							message: "请填写保价信息"
						});
						return false;
					}
				}
				if (this.IsAgree === false) {
					this.$toast({
						duration: 1000,
						message: "请详细阅读条款并勾选"
					});
					return false;
				}
				if (this.selectCode == "db001" && this.datacheck == true && this.goodInfoData.packageservice == "") {
					this.$toast({
						duration: 1000,
						message: "请选择包装材质"
					});
					return false;
				}
				if (this.productType == "" || this.productType == null) {
					this.$toast({
						duration: 1000,
						message: "请选择价预估价格"
					});
					return false;
				}
				if (
					this.ExpressCompanyTypeId == "" &&
					this.ExpressCompanyTypeId <= 0 &&
					this.isClaimCompany == true
				) {
					this.$toast({
						duration: 1000,
						message: "请选择寄件形式"
					});
					return false;
				}
				return true;
			},
			btnPass() {
				this.showPass = true;
			},
			btnPassSubmit() {
				if (this.txtpass == "" || this.txtpass == null) {
					this.$toast({
						duration: 1000,
						message: "请输入企业支付密码"
					});
					return false;
				} else {
					this.btnOkSubmit();
				}
			},
			btnSubmit() {
				if (this.Valid()) {
					if (this.ExpressCompanyTypeId == 2 && this.selectPayType == 1) {
						this.btnPass();
					} else {
						this.btnOkSubmit();
					}
				}
			},
			clickSelectPayType(type) {
				this.selectPayType = type;
				this.$store.state.selectPayType = type;
			},
			btnOkSubmit() {

				if (this.sending === true) {
					return;
				}
				let _backSignBill = this.isQd ? 1 : 0;
				this.showPass = false;
				let params = {
					fromContactsCode: this.SendCode,
					toContactsCode: this.RepiCode,
					companyCode: this.selectCode,
					sendTime: this.createTime,
					estimateGoods: {
						weight: this.goodInfoData.weigth,
						volume: this.goodInfoData.cubic <= 0 ? 0 : this.goodInfoData.cubic,
						category: this.goodInfoData.packType,
						name: this.goodInfoData.goodName,
						count: this.goodInfoData.goodNum
					},
					PackageService: this.goodInfoData.packageservice,
					insurance: this.insuranceAll,
					productType: this.productType,
					remark: this.goodInfoData.remark,
					insuranceCompanyCode: this.selectCode,
					expressType: this.pageType,
					expressMode: this.ExpressCompanyTypeId,
					password: this.txtpass,
					memo: this.goodInfoData.goodMemo,
					serviceList: this.ServiceList,
					isBillExpress: this.datacheck
					// payType: this.selectPayType, //支付方式: 1-寄付; 2-到付
					// BackSignBill: _backSignBill
				};
				this.sending = true;
				getExpressPost(params).then(data => {
					let errorData = this.$store.state.lastError;
					if (!data) {
						if (errorData != null) {
							if (errorData.errCode > 2000) {
								//充值 跳转充值页面 myRefill
								MessageBox.confirm(errorData.message)
									.then(action => {
										let expressListData = {
											goodInfo: this.$store.state.goodInfo,
											addressInfo: this.$store.state.addressInfo,
											repaddressInfo: this.$store.state.repaddressInfo,
											InsuredPrice: this.$store.state.InsuredPrice,
											InsuredPriceAll: this.$store.state.InsuredPriceAll,
											OrderInfo: this.$store.state.OrderInfo,
											jkdselectTimeData: this.$store.state.jkdselectTimeData,
											selectCompanyName: this.$store.state.selectCompanyName,
											selectCompanyCode: this.$store.state.selectCompanyCode,
											CompanyImg: this.$store.state.CompanyImg,
											ComESATitle: this.$store.state.ComESATitle,
											ComESA: this.$store.state.ComESA,
											IsAgree: this.IsAgree,
											jkdExpressModelId: this.ExpressCompanyTypeId,
											jkdExpressModelName: this.ExpressCompanyType
										};
										localStorage.setItem(
											"expressListData",
											JSON.stringify(expressListData)
										);
										this.$router.push({
											path: "/myRefill",
											query: {
												redirect: this.backUrl
											}
										});
									})
									.catch(() => {
										this.sending = false;
									});
							} else {
								this.sending = false;
							}
						} else {
							this.sending = false;
						}
					} else {
						localStorage.setItem("defaultCompanyCode", this.selectCode);
						localStorage.setItem(
							"ExpressCompanyTypeId",
							this.ExpressCompanyTypeId
						);
						this.$store.state.goodInfo = null;
						this.$store.state.addressInfo = null;
						this.$store.state.repaddressInfo = null;
						this.$store.state.InsuredPrice = 0;
						this.$store.state.InsuredPriceAll = "";
						this.$store.state.OrderInfo = data;
						this.$store.state.jkdselectTimeData = null;
						this.$store.state.selectCompanyName = "";
						this.$store.state.selectCompanyCode = "";
						this.$store.state.CompanyImg = "";
						this.$store.state.ComESATitle = "";
						this.$store.state.ComESA = "";
						this.$store.state.jkdExpressModelId = "";
						this.$store.state.jkdExpressModelName = "";
						this.$store.state.selectPayType = "";
						this.$router.push({
							path: "/orderInfo",
							query: {
								redirect: this.backUrl,
								mastCode: data.mastCode,
								sendTime: data.sendTime
							}
						});
					}
				});
			},
			btnGetPrice() {
				if (
					this.addressStoreData != null &&
					this.readdressStoreData != null &&
					this.sendTime != "" &&
					this.goodInfoData != null &&
					this.selectCode != ""
				) {
					console.log(this.sendTime);
					let sdate = new Date();
					let year = sdate.getFullYear();
					let month = sdate.getMonth() + 1;
					let day = sdate.getDate();
					let hour = sdate.getHours() + 1;
					let lastDay= new Date(year,month,0).getDate();
					console.log(lastDay);
					if (this.selectNo === 2) {
						day = day + 1;
						if(day>lastDay){
							month=month+1;
							day=1;
						}
					} else if (this.selectNo === 3) {
						day = day + 2;
						if(day>lastDay){
							month=month+1;
							day=1;
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
					} 
					if (this.selectNo == 2 && this.sendTime == "两小时内") {
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
					console.log(this.goodInfoData);

					var params = {
						fromAddress: this.addressStoreData.address,
						toAddress: this.readdressStoreData.address,
						companyCode: this.selectCode,
						weight: this.goodInfoData.weigth,
						areaCodeFrom: this.addressStoreData.areaCode,
						areaCodeTo: this.readdressStoreData.areaCode,
						sendTime: this.createTime,
						ExpressMode: this.ExpressCompanyTypeId,
						insuranceValue: this.insuranceAll,
						volume: parseFloat(this.goodInfoData.cubic) <= 0 ? 0 : parseFloat(this.goodInfoData.cubic),
						serviceDeliveryTypeInfo: this.ServiceList
					};
					getEstimatePrice(params).then(data => {
						// console.log(data);
						if (!data) {
							this.sumMoney="";
							this.moneyList = [];
							return;
						}
						this.moneyList = data;
						this.productType = data[0].productType;
						this.insurance = data[0].insurancePrice;
						this.selectProduct = 0;
						if (this.$util.isNotEmpty(data.insurancePrice)) {
							this.insurance = data[0].insurancePrice;
						}
						this.sumMoney = parseFloat(
							parseFloat(data[0].price) +
							parseFloat(this.insurance == "" ? 0 : this.insurance)).toFixed(2);
					});
				}
			},
			onCompanyTimeChange(picker, values) {
				if (values.length <= 0) return;
				this.sendTime = values[0];
				this.$store.state.jkdselectTimeData = {
					selectNo: this.selectNo,
					sendTime: this.sendTime
				};
			},
			onExpressModelChange(picker, values) {
				if (values.length < 1) return;
				this.ExpressCompanyType = picker.getValues()[0].name;
				this.ExpressCompanyTypeId = picker.getValues()[0].id;
				this.$store.state.jkdExpressModelId = this.ExpressCompanyTypeId;
				this.$store.state.jkdExpressModelName = this.ExpressCompanyType;
				this.$store.state.expressMode = this.ExpressCompanyTypeId;
				this.GetCouponCountModel(this.ExpressCompanyTypeId);
			},
			btnSelectTime(tn) {

				let dt = new Date();
				if (!this.isTimeTab && tn == 1) return false;
				this.companyTimeData = [];
				this.selectNo = tn;
				let startNum = this.selectStartTime;
				let initTimeList = [];
				if (tn === 1 && dt.getHours() >= this.selectStartTime && dt.getHours() < this.selectEndTime) {
					if (this.selectCompanyName == "顺丰快运" || this.selectCompanyName == "") {
						this.companyTimeData.push("一小时内");
						initTimeList.push("一小时内");
					} else {
						this.companyTimeData.push("两小时内");
						initTimeList.push("两小时内");
					}
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
			},
			onCompanyChange(picker, values) {
				let dt = new Date();
				if (values.length < 1) return;

				if (this.insuranceAll != null && this.insuranceAll != "") {
					let params = {
						CompanyCode: picker.getValues()[0].companyCode,
						Amount: this.insuranceAll
					};
					getInsurancePrice(params).then(data => {
						this.$store.state.InsuredPrice = data;
						this.$store.state.InsuredPriceAll = this.insuranceAll;
						this.insurance = parseFloat(data);
					});
				}

				this.selectCompanyName = picker.getValues()[0].companyName;
				this.selectStartTime = picker.getValues()[0].startTime;
				this.selectEndTime = picker.getValues()[0].endTime;
				this.ComESATitle = picker.getValues()[0].agreementUrl;
				this.ComESA = picker.getValues()[0].agreementContent;
				this.selectCode = picker.getValues()[0].companyCode;
				this.companyImg = picker.getValues()[0].logoPath;
				if (this.companyImg != null && this.companyImg != "") {
					this.isPic = true;
				}
				this.insuranceUpper = picker.getValues()[0].insuranceUpper;
				this.$store.state.upperAmount = this.insuranceUpper;
				this.$store.state.selectCompanyCode = this.selectCode;
				this.$store.state.selectCompanyName = this.selectCompanyName;
				this.$store.state.CompanyImg = this.companyImg;
				this.$store.state.ComESA = this.ComESA;
				this.$store.state.ComESATitle = this.ComESATitle;
				this.isTimeTab = true;
				this.$store.state.expressCompanyCode = this.selectCode;
				if (this.selectCompanyName == "顺丰快运") {
					this.sendTime = "一小时内";
				} else {
					this.sendTime = "两小时内";
				}

				if (dt.getHours() > this.selectEndTime - 2 && this.selectCompanyName == "德邦快递") {
					this.sendTime = "两小时内";
					this.isTimeTab = false;

					this.btnSelectTime(2);
					return false;
				}
				if (dt.getHours() > this.selectEndTime - 1 && this.selectCompanyName == "顺丰快运") {
					this.sendTime = "一小时内";
					this.isTimeTab = false;
					this.btnSelectTime(2);
					return false;
				}
				this.btnSelectTime(1);
				this.selList = [];
				this.serviceNames = "提货方式、签单返还等";
				this.GetAddServices();
			},
			btnSendTime() {
				if (this.selectCode === "" || this.selectCode === null) {
					this.$toast({
						duration: 1000,
						message: "请选择物流公司"
					});
					return false;
				} else {
					this.showTime = true;
				}
			},
			btnAddressInfo(fn) {
				var _addressCode = fn === 1 ? this.SendCode : this.RepiCode;
				console.log(this.SendCode);
				if (_addressCode === "" || _addressCode === null) {
					//跳转新增地址
					this.$router.push({
						path: "/addressAdd",
						query: {
							redirect: this.backUrl
						}
					});
				} else {
					this.$router.push({
						path: "/addressEdit",
						query: {
							redirect: this.backUrl,
							addressCode: _addressCode
						}
					});

				}
				//编辑地址


			},
			btnBj() {
				if (this.selectCode === "" || this.selectCode === null) {
					this.$toast({
						duration: 1000,
						message: "请选择物流公司"
					});
					return false;
				} else {
					this.$router.push({
						path: "/insuredPrice",
						query: {
							redirect: this.backUrl,
							amount: this.insuranceAll,
							pageType: this.pageType,
							code: this.selectCode,
							upperAmount: this.insuranceUpper
						}
					});
				}
			}
		},
		beforeDestroy() {
			console.log("destory");
			this.$store.state.reds = ""
		}
	};
</script>
