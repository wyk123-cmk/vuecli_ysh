<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/comInvoice')"></a>
      <h2 class="tab-title">历史发票</h2>
    </header>
    <div
      class="content"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="lishifp" v-for="(item,index) in HistoryList" :key="index">
        <div class="ls-top">
          <p>{{item.billType  }}<span>{{  $util.formatDate.format(item.createTime,
                  "yyyy-MM-dd hh:mm"
                )}}</span></p>
          <span v-if="item.status ==1">开票中</span>
          <span style="color:#FD9523" v-if="item.status  ==2">开票成功</span>
           <span style="color:#999" v-if="item.status  ==3">已关闭</span>
        </div>
        <h2>{{item.invoiceName  }}</h2>
        <div class="ls-bottom">
          <p>发票代码<span>{{item.invoiceCode  }}</span></p>
          <p>发票号码<span>{{item.invoiceNo  }}</span></p>
          <h3><span>￥</span>{{item.invoiceMoney.toFixed(2)}}</h3>
        </div>
      </div>

      <div v-if="isLoading" class="loading-box" style="background: #fff;margin:30% 40%;">
        <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
      </div>
        <div class="noneData" v-show="noneData" style="background: #f7f7f7;padding: 0;border:0">
       <img src="../../assets/images/none-fp.svg" />
          <span>暂无内容</span>
      </div>
    </div>
  </div>
</template>
<script>
import { GetCompanyInvoiceLogList } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      HistoryList: [],
      loading: false,
      limit: 10,
      currentPage: 0,
      total: 0,
      isLoading: true,
      noneData: false    
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
  },
  methods:{
      loadMore() {
      this.loading = true;
      setTimeout(() => {
        if (this.currentPage > 0) {
          if (this.HistoryList.length >= this.total) {
            this.loading = true;
            this.isLoading = false;
            return false;
          }
        }
        ++this.currentPage;
        this.loading = false;
        this.GetHistoryList(this.currentPage);
      }, 1000);
    },
    GetHistoryList(cpage){
        let params = {
        page: cpage,
        limit: this.limit
      };
      GetCompanyInvoiceLogList(params).then(data=>{
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
          this.HistoryList = this.HistoryList.concat(data.list);
        }
      })
    }
  }
};
</script>
