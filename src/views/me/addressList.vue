<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">地址薄</h1>
		</header>
		<div class="content">
			<div class="sswk">
				<input type="text" class="sswk-input" placeholder="请输入姓名/电话/地区" v-model="keyword" />
				<input type="button" class="sswk-button" @click="getAddressData(1)" />
			</div>
			<ul class="tjdznrwk nrlbwk" style="margin-bottom:70px;">
				<li v-for="(item,index) in addressData" :key="index" :id="item.contactsCode">
					<h2 @click="btnSelect(item)">
						<i>
							<label v-show="item.isDefault">默认</label>
							{{item.name }}
							<a v-bind:href="'tel:' + item.phone">{{item.phone}}</a>
						</i>
						{{item.areaInfo.province+item.areaInfo.city+item.areaInfo.area+item.address }}
					</h2>
					<p>
						<span>
							<input v-show="item.isDefault===false" name="rdodefault" type="radio" class="tkwk-radio" :value="item.contactsCode"
							 :checked="item.isDefault" @click="btnRadio" style="background: #fff;" />
							<em v-show="item.isDefault===false">设为默认地址</em>
						</span>
						<label>
							<b @click="btnDel(item.contactsCode,this)">删除</b>
							<router-link :to="{path:'/addressEdit',query:{addressCode:item.contactsCode,redirect: $router.currentRoute.fullPath}}">
								<s>编辑</s>
							</router-link>
						</label>
					</p>
				</li>
			</ul>
			<div class="noneData" v-show="noneData">
				<img src="../../assets/images/none-dz.svg" />
				<span>暂无内容</span>
			</div>
			<!-- <div class="mygdl">没有更多了</div> -->
		</div>
		<router-link :to="{path:'/addressAdd',query:{redirect: $router.currentRoute.fullPath}}">
			<div class="dbxzan">
				<a>新增地址</a>
			</div>
		</router-link>
	</div>
</template>
<script>
	import {
		getAddressList,
		defaultAddress,
		delAddress
	} from "../../api/api";
	import {
		MessageBox
	} from "mint-ui";
	export default {
		data() {
			return {
				redirect: "",
				limit: 10,
				page: 1,
				addressData: [],
				keyword: "",
				jtype: "",
				noneData: false
			};
		},
		mounted() {
			this.redirect = this.$route.query.redirect;
			this.jtype = this.$route.query.jtype;
		},
		methods: {
			btnSelect(adinfo) {
				if (this.jtype === "send") {
					//寄件地址
					if (this.$store.state.repaddressInfo != null) {
						if (
							this.$store.state.repaddressInfo.addressCode ===
							adinfo.contactsCode
						) {
							MessageBox.alert("寄件人不能和收件人一致");
							return;
						}
					}
					this.$store.state.addressInfo = {
						addressCode: adinfo.contactsCode,
						userName: adinfo.name,
						userPhone: adinfo.phone,
						address: adinfo.address,
						areaCode: adinfo.areaInfo.areaCode,
						prociarName: adinfo.areaInfo.province +
							adinfo.areaInfo.city +
							adinfo.areaInfo.area
					};
					this.$router.replace({
						path: this.redirect,
						query: {
							red: "addressList",
							jtypes:this.jtype
						}
					});
				} else if (this.jtype === "rep") {
					//收件地址
					if (this.$store.state.addressInfo != null) {
						if (this.$store.state.addressInfo.addressCode === adinfo.contactsCode) {
							MessageBox.alert("收件人不能和寄件人一致");
							return;
						}
					}
					this.$store.state.repaddressInfo = {
						addressCode: adinfo.contactsCode,
						userName: adinfo.name,
						userPhone: adinfo.phone,
						address: adinfo.address,
						areaCode: adinfo.areaInfo.areaCode,
						prociarName: adinfo.areaInfo.province +
							adinfo.areaInfo.city +
							adinfo.areaInfo.area
					};
					this.$router.replace({
						path: this.redirect,
						query: {
							red: "addressList",
							jtypes:this.jtype
						}
					});
				} else if (this.jtype === "invoice") {
					this.$store.state.invoiceAddress = {
						addressCode: adinfo.contactsCode,
						userName: adinfo.name,
						userPhone: adinfo.phone,
						address: adinfo.address,
						areaCode: adinfo.areaInfo.areaCode,
						prociarName: adinfo.areaInfo.province +
							adinfo.areaInfo.city +
							adinfo.areaInfo.area
					};
					this.$router.replace({
						path: this.redirect
					});
				}
			},
			btnRadio(event) {
				let code = event.target.value;
				let deparam = {
					value: code
				};
				defaultAddress(deparam).then(data => {
					if (!data) return;
					location.reload();
				});
			},
			btnDel(code) {
				MessageBox.confirm("您确定要删除吗?").then(action => {
					let params = {
						value: code
					};
					delAddress(params).then(data => {
						if (data) {
							MessageBox.alert("删除成功").then(action => {
								$("#" + code + "").remove();
							});
						}
					});
				});
			},
			getAddressLimit(params) {
				getAddressList(params).then(data => {
					if (data == undefined) {
						this.noneData = true;
						return false;
					}
					if (data.total <= 0) {
						this.noneData = true;
						return false;
					}
					let total = data.total;
					let pageNew = parseInt(total / this.limit);
					if (total / this.limit > pageNew) {
						pageNew = pageNew + 1;
					}
					if (this.page > 1) {
						if (data != undefined && !data.list.length < this.limit) {
							//如果数据为空   去掉组件
							this.$Context.delScrollLoad();
						}
					}
					this.$Context.loading = false; //组件设置为可开启状态
					if (data.list.length == this.limit) {
						//如果数据量等于limit   开启器滑块事件
						let _this = this;
						
						this.$Context.setScrollLoad($(".nrlbwk"), function() {
							_this.nextPage(1);
						});
					} else {
						this.$Context.delScrollLoad();
					}
					if (pageNew >= params.page) {
						this.addressData = this.addressData.concat(data.list);
					}
				});
			},
			getAddressData(ntpage) {
				if (ntpage === 1) {
					this.addressData = [];
				}
				var params = {
					limit: this.limit,
					page: ntpage,
					keyword: this.keyword
				};
				this.getAddressLimit(params);
			},
			nextPage(nt) {
				this.page++;
				let currentPage = this.page;
				this.getAddressData(currentPage);
			}
		},
		created() {
			this.getAddressData(1);
		}
	};
</script>
