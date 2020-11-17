<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/me')"></a>
      <h1 class="tab-title">我的奖励金</h1>
     <router-link :to="{path:'/jljCashRecord',query:{ redirect: $router.currentRoute.fullPath }}" class="menu">提现记录</router-link>
    </header>
    <div class="content">
      <div class="jlj">
        <h2><label>共收入{{count}}笔，可用余额为</label><span>￥</span>{{amount.toFixed(2)}}</h2>
        <router-link :to="{path:'/jljCash',query:{ redirect: $router.currentRoute.fullPath }}" ><img src="../../assets/images/jlj-tx.svg" />提现</router-link >
      </div>
      <div class="jlj-mx" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <h2>奖励收益</h2>
        <ul v-for="(item,index) in RecordList" :key="index">
          <h2><span> {{
                $util.formatDate.format(item.date,
                  "yyyy年MM月"
                )
              }}</span><label>收入￥{{item.totalAmount.toFixed(2)}}</label></h2>
          <li v-for="(detailItem,detailIndex) in item.detail" :key="detailIndex">
            <p>
              {{detailItem.cmpyName}}<br /><label><span>总运费{{detailItem.expressFeeAmount}}元</span>交易{{detailItem.count}}笔</label>
            </p>
            <label>+{{detailItem.referralFee.toFixed(2)}}</label>
          </li>
        </ul>
        <ul style="height:calc(100vh - 200px);">
          <li v-if="isLoading" class="loading-box" style="background: #fff;padding-top:50px;border-bottom;flex;flex-flow: column;align-items: center">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>
        <li class="noneData" v-show="noneData" style="padding: 0;border:0;display: flex;flex-flow: column;align-items: center">
           <img src="../../assets/images/none-commx.svg" style="width:20%;" />
          <span>暂无提现记录</span>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {GetReferralInfo,GetReferralList} from '../../api/api'
export default {
  data() {
    return {
      count:0,
      amount:0.00,
      RecordList:[],
      loading: false,
      limit: 15,
      currentPage: 0,
      total: 0,
      isLoading: false,
      noneData: false,
    }
  },
  mounted() {
    $("body").css("background", "#fff");
    GetReferralInfo().then(data=>{
      if(!data) return;
      this.count =data.count;
      this.amount = data.amount;
    })
  },
  methods:{
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        if (this.currentPage > 0) {
          if (this.RecordList.length >= this.total) {
            this.loading = true;
            this.isLoading = false;
            return false;
          }
        }
        ++this.currentPage;
        this.loading = false;
        this.GetRecordList(this.currentPage);
      }, 1000);
    },
     GetRecordList(page) {
       let params = {
        page: page,
        limit: this.limit
      };
      GetReferralList(params).then(data=>{
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
          this.RecordList = this.RecordList.concat(data.list);
        }
      })
     }
  }
};
</script>
