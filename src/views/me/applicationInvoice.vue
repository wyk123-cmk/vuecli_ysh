<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">申请发票</h1><a class="menu" @click="btnPage(1)">历史开票</a>
		</header>
		<div class="content">
			<ul class="ckdnrwk1 ckdnrwk2" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<li v-for="(item, i) in ajaxData" :key="i" >
                    <h2>
						<input type="checkbox" v-model="checkData" :value="item.mastCode" @click="checkedClick($event,item)" class="iconfont radio" style="padding-right: 6px;">运单号：{{item.expressCode}}
					</h2>
                    <h3 @click="btnPage(2, item)">
						<i><b>{{item.expressFrom.areaInfo.city}}</b>{{item.expressFrom.name}}</i>
						<em style=" color:#E47800"><img src="../../assets/images/cjt.svg" alt=""/></em>
						<i><b>{{item.expressTo.areaInfo.city}}</b>{{item.expressTo.name}}</i>
						<s><span>￥{{item.price}}</span></s>
					</h3>
                </li>
				<li v-if="isLoading" class="loading-box" style="padding-left: 10px;background: #f7f7f7;">
					<mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
					<span class="loading-more-txt">加载中...</span>
				</li>
            </ul>
            <div class="fpspxbwk" v-show="ajaxData.length > 0">
		        <div class="all-xz">
	                <input type="checkbox" class="iconfont radio" style="padding-right: 6px;" v-model="checked" @click="checkAll($event)">
                    <span>全选</span>
	            </div>
				<input type="button" class="fpspxbwk-input" value="下一步" @click="btnPage(2)" />
				<i>合计：<em>{{totalSum == 0?'--':totalSum}}</em></i>
			</div>
			<div class="noneData" v-show="noneData">
				<img src="../../assets/images/none-fp.svg" />
				<span>暂无内容</span>
			</div>
        </div>
	</div>
</template>
	
<script>
import { getExpressList } from "../../api/api";
export default {
	data() {
		return {
			redirect: "",
			isLoading: false,
			loading: false,
			currentPage: 1,
			limit: 5,
			total: 0,
			totalSum: 0,
			ajaxData: [],
			checkData: [],
			checked: false,
			noneData: false
		}
	},
	mounted() {
		this.redirect = this.$route.query.redirect;
	},
	watch: {
		checkData: {
			handler(){
				if(this.checkData.length == this.ajaxData.length){
					this.checked = true;
				}else{
					this.checked = false;
				}
			},
            deep: true
		}
	},
	methods: {
		btnPage: function(type, data){
			if(type == 1){
				//历史开票
				this.$router.push({
					path: "/historicalInvoice",
					query: {
						redirect: this.$router.currentRoute.fullPath 
					}
				});
			}
			if(type == 2){
				//申请发票
				if(data == undefined){
					var _mastCode = this.checkData;
					var _totalSum = this.totalSum;
				}else{
					var _mastCode = [data.mastCode];
					var _totalSum = data.price;
				}
				if(_mastCode.length == 0){
					this.$toast({ duration: 1200, message: "请选择需要开的发票订单" });
					return false;
				}
				this.$store.state.orderInfo = {
					mastCode: _mastCode,
					totalSum: _totalSum
				};
				this.$router.push({
					path: "/invoiceSubmit",
					query: {
						redirect: this.$router.currentRoute.fullPath 
					}
				});
			}
		},
		loadMore(){
			//无限加载函数
			this.isLoading = true;
			this.ajaxList(this.currentPage);
		},
		ajaxList(_page){
			getExpressList({
				page: _page,
				limit: this.limit
			}).then(data => {
				this.isLoading = false;
				if(data == undefined) {
					this.noneData = true;
					return false;
				}
				if(data.total == 0){
					this.noneData = true;
					return false;
				}
				if(data.list != null && data.list.length > 0){
					this.ajaxData = this.ajaxData.concat(data.list);
					this.total = data.total;
				}
				if( this.ajaxData.length >= this.total){
					this.loading = true;
					return false;
				}
				++this.currentPage;
			});
		},
		checkedClick(e, data){
			if(e.target.checked){
				 this.totalSum = this.moneyFormat(parseFloat(data.price)+parseFloat(this.totalSum));
			}else{
				this.totalSum = this.moneyFormat(parseFloat(this.totalSum) - parseFloat(data.price));
			}
		},
		checkAll(e){ // 点击全选事件
			if(e.target.checked){
				this.ajaxData.forEach((el,i)=>{
					if(this.checkData.indexOf(el.mastCode) == '-1'){ 
						this.checkData.push(el.mastCode);
						this.totalSum = this.moneyFormat(parseFloat(el.price)+parseFloat(this.totalSum));
					}
				});
			}else { // 全不选选则清空绑定的数组
				this.checkData = [];
				this.totalSum = 0;
			}
		},
		moneyFormat(val){
			if(val == "" || val == null){
				return "0.00";
			}
			var value=Math.round(parseFloat(val)*100)/100;
			var xsd=value.toString().split(".");
			if(xsd.length == 1){
				value=value.toString()+".00";
				return value;
			}
			if(xsd.length>1){
				if(xsd[1].length<2) value=value.toString()+"0";
				return value;
			}
		}
	}
};
</script>