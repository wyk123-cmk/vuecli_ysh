<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">提现记录</h1>
    </header>
    <div class="content">
      <ul class="jlj-txjl"   v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="15">
        <li v-for="(item,index) in RecordList" :key="index">
          <p>提现<br /><label> {{
                $util.formatDate.format(item.createTime,
                  "yyyy-MM-dd hh:mm"
                )
              }}</label></p>
          <h2 class="zs1">-{{item.amount.toFixed(2)}}<br />
          <span v-if="item.status==0">审核中</span>
          <span class="sb" v-if="item.status==2">审核失败</span>
          <label v-if="item.status ==2">{{ item.reason}}</label>
          </h2>
        </li>
         <li v-if="isLoading" class="loading-box" style="background: #fff;">
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
</template>
<script>
import {GetJLJCashList} from '../../api/api'
export default {
  data() {
    return {
      redirect: "",
      RecordList:[],
      loading: false,
      limit: 15,
      currentPage: 0,
      total: 0,
      isLoading: false,
      noneData: false,
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
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
      GetJLJCashList(params).then(data=>{
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
