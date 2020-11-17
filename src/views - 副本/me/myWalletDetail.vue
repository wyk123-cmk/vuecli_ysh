<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h2 class="tab-title">钱包明细</h2>
    </header>
    <div class="content">
      <p class="jy-way">
        <a class="iconfont xia" @click="btnSearchType">交易类型</a>
      </p>
      <ul class="wallet-detail nrlbwk">
        <li v-for="(item, index) in walletData" :key="index">
          <router-link
            :to="{
              path: '/myWalletInfo',
              query: {
                redirect: $router.currentRoute.fullPath,
                walletId: item.id
              }
            }"
          >
            <p>
              {{ item.amountText }}
              <span>{{
                $util.formatDate.format(item.logTime,
                  "yyyy-MM-dd hh:mm"
                )
              }}</span>
            </p>
            <h2 class="zhichu" v-if="item.amountType%2==1">
              -{{ item.amount.toFixed(2) }}
            </h2>
            <h2 class="zhichu" v-else style="color:#fd9523;">
              +{{ item.amount.toFixed(2) }}
            </h2>
          </router-link>
        </li>
         <li v-if="isLoading" class="loading-box" style="background: #fff;">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>
        <li class="noneData" v-show="noneData" style="padding: 0;border:0">
          <img src="../../assets/images/none-commx.svg" />
          <span>暂无内容</span>
        </li>
      </ul>
    </div>
    <div class="jy-layer">
      <span @click="btnSelSub(1)">全 部</span>
      <span @click="btnSelSub(2)">收 入</span>
      <span @click="btnSelSub(3)">支 出</span>
    </div>
  </div>
</template>
<script>
import { getMyWalletLog } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      isOpen: false,
      limit: 15,
      page: 1,
      billType: "",
      walletData: [],
      isLoading:false,
      noneData:false
    };
  },
  created() {
    this.getWalletData(1);
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    btnSelSub(tn) {
      switch (tn) {
        case 1: //全部
          this.billType = "";
          break;
        case 2: //收入
          this.billType = "Refill";
          break;
        case 3: //支出
          this.billType = "Payment";
          break;
      }
      this.isOpen = false;
      $(".jy-layer").css("display", "none");
      this.walletData = [];
      this.getWalletData(1);
    },
    btnSearchType() {
      if (!this.isOpen) {
        this.isOpen = true;
        $(".jy-layer").css("display", "flex");
      } else {
        this.isOpen = false;
        $(".jy-layer").css("display", "none");
      }
    },
    getWalletLimit(params) {
      getMyWalletLog(params).then(data => {
        if (data.total <= 0){
          this.noneData=true;
          return;
        } 
        this.noneData=false;
        let total = data.total;
        let pageNew = parseInt(total / this.limit);
        if (total / this.limit > parseInt(total / this.limit)) {
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
          this.walletData = this.walletData.concat(data.list);
        }
      });
    },
    getWalletData(ntpage) {
      var params = {
        limit: this.limit,
        page: ntpage,
        amountType: this.billType
      };
      this.getWalletLimit(params);
    },
    nextPage(nt) {
      this.page++;
      let currentPage = this.page;
      this.getWalletData(currentPage);
    }
  }
};
</script>
