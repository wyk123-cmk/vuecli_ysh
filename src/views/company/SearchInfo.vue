<style scoped>
.tab-ckd {
  top: 48px;
}
.mailing-content,
.receipt-content {
  top: 89px;
}
.mailing-content {
  background-color: #f7f7f7;
}
.order-detail {
  float: right;
  font-size: 14px;
  flex: 1;
  text-align: right;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/mycompany')"></a>
      <h1 class="tab-title1">企业快递</h1>
    </header>
    <div class="content" style="padding-bottom: 60px;" ref="scrollBox">
      <div class="sswk">
        <input
          type="text"
          class="sswk-input"
          placeholder="请输入姓名 、电话 、单号"
          v-model="keyWord"
        />
        <input name="button" type="button" class="sswk-button" id="button" @click="btnSearch" />
      </div>
      <ul
        class="ckdnrwk"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        style="padding-top:50px"
      >
        <li v-for="(item, index) in ExpressData" :key="index" style="background:#fff;">
          <h2>
            <label style="font-weight:bold;padding-right:10px;">{{item.createUser}}</label>
             <span v-clipboard:copy="item.expressCode" v-clipboard:success="onCopy" style="font-size:12px;color:#999;display:flex;align-items:center;">
                   运单号：{{ item.expressCode }}<img src="../../assets/images/copy1.svg">
                 </span>
            <span class="order-detail" @click="btnview(item.mastCode)">详情</span>
          </h2>
          <h3 @click="jumpPage(item.mastCode)">
            <i
              ><b>{{ item.expressFrom.areaInfo.city }}</b
              >{{ item.expressFrom.name }}</i
            >
             <em v-if="item.status == '9'" style="color:green"><img src="../../assets/images/cjt.svg" alt />
                {{item.statusText}}
                </em>
            <em v-if="item.status == '1'"
              ><img src="../../assets/images/cjt.svg" alt />{{
                item.statusText
              }}</em
            >
            <em v-if="item.status == '2'"
              ><img src="../../assets/images/cjt.svg" alt="" />{{
                item.statusText
              }}</em
            >
            <em v-if="item.status == '3'" style=" color:#E47800"
              ><img src="../../assets/images/cjt.svg" alt="" />{{
                item.statusText
              }}</em
            >
            <em v-if="item.status == '4'" style="color:#4285f4"
              ><img src="../../assets/images/cjt.svg" alt="" />{{
                item.statusText
              }}</em
            >
            <em v-if="item.status == '-1'"
              ><img src="../../assets/images/cjt.svg" alt="" />{{
                item.statusText
              }}</em
            >
            <i
              ><b>{{ item.expressTo.areaInfo.city }}</b
              >{{ item.expressTo.name }}</i
            >
          </h3>
          <h4 v-if="item.isMine && item.status==1">
            <s>￥<b>{{item.price}}</b></s>
								<i style="float: right;width: auto">
									<a href="javascript:;" style="background: #f00;margin-left: 5px;" @click="deleteOrder(item.mastCode)">取消</a>
								</i>
					</h4>
           <h3 style="margin-top:10px;" v-if="item.status==9">
								<i style="float: right;width: auto">
									<a href="javascript:;" style="margin-left: 5px;color:#999;font-size:16px;">已取消</a>
								</i>
					</h3>
        </li>
        <li v-if="isLoading"  class="loading-box" style="background: #f7f7f7;padding: 0;border:0;margin:30%;">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>
        <li
          class="noneData"
          style="padding: 0;border:0;background: #f7f7f7;"
           v-show="noneData"
        >
          <img src="../../assets/images/none-jj.svg" />
          <span>暂无内容</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { GetCompanyExpressList } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      ExpressData: [],
      keyWord: "",
      loading: false,
      limit: 10,
      currentPage: 0,
      total: 0,
      isLoading: false,
      noneData: false
    };
  },
  mounted() {
    $("body").css("background","#f7f7f7");
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    onCopy() {
      this.$toast({ duration: 1000, message: "复制成功", position: "top" });
    },
    deleteOrder(mastCode){
       this.$router.push({
                path: "/cancel",
                query:{
                  redirect:this.$router.currentRoute.fullPath,
                  mastCode:mastCode
                }
              });
    },
    jumpPage(mastcode){
      this.$router.push({
					path: "/logisticsInfo",
					query: {
						redirect: "earchInfo",
						code: mastcode
					}
				});
    },
    btnSearch(){
      	this.ExpressData = [];
				this.currentPage = 1;
        this.$refs.scrollBox.scrollTop = 0;
        this.GetExpressList(1);
    },
    btnview(code){
			this.$router.push({
        path: "/orderDetail",
        query: { mastCode: code, redirect: this.$router.currentRoute.fullPath }
      });
		},
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        if (this.currentPage > 0) {
          if (this.ExpressData.length >= this.total) {
            this.loading = true;
            this.isLoading = false;
            return false;
          }
        }
        ++this.currentPage;
        this.loading = false;
        this.GetExpressList(this.currentPage);
      }, 1000);
    },
    GetExpressList(cpage) {
      let params = {
        page: cpage,
        limit: this.limit,
        keyword: this.keyWord
      };
      GetCompanyExpressList(params).then(data => {
        this.isLoading = false;
        if (data == undefined) {
          this.noneData = true;
          return false;
        }
        if (data.total == 0) {
          this.noneData = true;
          return false;
        }
        if (data.list != null && data.list.length > 0) {
          this.noneData = false;
          this.total=data.total;
          this.ExpressData = this.ExpressData.concat(data.list);
        }
      });
    }
  }
};
</script>
