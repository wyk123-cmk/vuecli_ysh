<style scoped>
.content > div{
	position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
}
</style>
<template>
	<div>
		<header>
			<a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
			<h1 class="tab-title">历史开票</h1>
		</header>
        <div class="content">
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="lishifp" v-for="(item, i) in ajaxData" :key="i">
					<div class="ls-top">
						<p>{{item.billTypeText}}<span>
							 {{
              $util.formatDate.format(item.postTime, "yyyy-MM-dd hh:mm")
            }}
							</span></p>
						<span v-if="item.state == 1" style="color:#FD9523">{{item.stateText}}</span>
						<span v-if="item.state == 3" style="color:#999">{{item.stateText}}</span>
						<span v-if="item.state == 2">{{item.stateText}}</span>
					</div>
					<h2>{{item.expressCompany}}</h2>
					<div class="ls-bottom">
						<p>发票代码<span>{{item.invoiceCode}}</span></p>
						<p>发票号码<span>{{item.invoiceNo}}</span></p>
						<h3><span>￥</span>{{item.amount}}</h3>
					</div>
				</div>
				<div v-if="isLoading" class="loading-box" style="padding-left: 10px;margin-top: 20px;">
					<mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
					<span class="loading-more-txt">加载中...</span>
				</div>
			</div>
			<div class="noneData" v-show="noneData">
				<img src="../../assets/images/none-fp.svg" />
				<span>暂无内容</span>
			</div>
        </div>
    </div>
</template>
<script>
import { getGetList } from "../../api/api";
export default {
	data() {
		return {
			redirect: "",
			isLoading: false,
			loading: false,
			currentPage: 1,
			limit: 5,
			total: 0,
			ajaxData: [],
			noneData: false
		}
	},
	mounted() {
		this.redirect = this.$route.query.redirect;
	},
	created() {
		
	},
	methods: {
		loadMore(){
			//无限加载函数
			this.isLoading = true;
			this.ajaxList(this.currentPage);
		},
		ajaxList(_page){
			getGetList({
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
		}
	}
};
</script>