<template>
  <div>
    <header style="background: #4285f4">
      <a
        class="iconfont icon-back"
        @click="$router.replace(redirect)"
        style="color: #FFFFFF"
      ></a>
      <h1 class="tab-title"></h1>
    </header>

    <div class="content" style="padding-top: 43px;">
      <div class="ddgzdbwk">
        <i
          ><b>{{ logisticsData.expressFrom.areaInfo.city }}</b
          >{{ logisticsData.expressFrom.name }}</i
        >
        <em style="color: #FFFFFF">
          <img src="../../assets/images/bscjt.svg" alt="" />{{
            logisticsData.expressStatusText
          }}</em
        >
        <i
          ><b>{{ logisticsData.expressTo.areaInfo.city }}</b
          >{{ logisticsData.expressTo.name }}
        </i>
      </div>
      <div class="ddgxbtwk">
        订单跟踪<a
          style="padding-right: 14px;float: right;"
          @click="btnOrderInfo"
          >详情</a
        >
      </div>
      <ul
        class="ddgznrwk"
        style="background: #FFFFFF"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li
          v-for="(item, i) in detailsList"
          :key="i"
          style="i==0?'color: #fd5a6f':''"
        >
          <img
            v-show="i == 0"
            src="../../assets/images/yuandian1.png"
            width="12"
            height="66"
            alt=""
          />
          <img
            v-show="i != 0"
            src="../../assets/images/yuandian.png"
            width="12"
            height="66"
            alt=""
          />
          {{ item.routeInfo }}
          <p :style="i == 0 ? 'color: #fd5a6f' : ''">
            {{
              $util.formatDate.format(item.routeTime, "MM-dd hh:mm")
            }}
          </p>
        </li>
        <li v-if="isLoading" class="loading-box" style="border:0">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中...</span>
        </li>
        <li v-show="noneInfo" style="color: #999;border: 0;margin-left: -18px;">
          暂无物流信息！
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getExpressRoute } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      code: "", //运单号
      currentPage: 1,
      limit: 10,
      loading: false,
      isLoading: false,
      total: 0,
      noneInfo: false,
      logisticsData: {
        expressFrom: {
          areaInfo: {}
        },
        expressTo: {
          areaInfo: {}
        },
        details: {
          list: {}
        }
      },
      detailsList: []
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    this.code = this.$route.query.code;
  },
  methods: {
    btnOrderInfo() {
      this.$router.push({
        path: "orderDetail",
        query: {
          mastCode: this.code,
          redirect: this.$router.currentRoute.fullPath
        }
      });
    },
    loadMore() {
      //寄件-无限加载函数
      this.isLoading = true;
      this.getInfo(this.currentPage);
    },
    getInfo(_page) {
      getExpressRoute({
        page: _page,
        limit: this.limit,
        mastCode: this.code
      }).then(data => {
        this.isLoading = false;
        if (data == undefined) {
          this.noneInfo = true;
          return false;
        }
        if (_page == 1) {
          this.logisticsData = data;
        }
        if (data.details.list != null && data.details.list.length > 0) {
          this.detailsList = this.detailsList.concat(data.details.list);
          this.total = data.details.total;
        } else {
          this.noneInfo = true;
          return false;
        }
        if (this.detailsList.length >= this.total) {
          this.loading = true;
          return false;
        }
        ++this.currentPage;
      });
    }
  }
};
</script>
