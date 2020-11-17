<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/myCompany')"></a>
      <h1 class="tab-title">企业发票</h1>
      <router-link
        class="menu"
        :to="{ path: '/InvoiceHistory', query: { redirect: '/comInvoice' } }"
        >历史开票</router-link
      >
    </header>
    <div class="content" ref="scrollBox">
      <p class="zyfp">温馨提示：如需申开发票，此款项将不予退费，且仅能用于发货使用，望您知悉！</p>
      <ul
        class="qymx"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li
          v-for="(item, index) in InvoiceData"
          :key="index"
          style="display:flex;"
        >
          <div>
            <input
              type="checkbox"
              v-model="checkData"
              :value="item.id"
              @click="checkedClick($event, item)"
              class="iconfont radio"
              style="padding-right: 6px;"
            />
            <p>
              账户充值<br /><label>
                {{
                  $util.formatDate.format(item.createTime,
                    "yyyy-MM-dd hh:mm"
                  )
                }}</label
              >
            </p>
          </div>
          <h2 class="zs2">￥{{ item.amount.toFixed(2) }}</h2>
        </li>
        <li v-if="isLoading" class="loading-box" style="background: #fff;">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>
        <li
          class="noneData"
          v-show="noneData"
          style="background: #f7f7f7;padding: 0;border:0;display: flex;flex-flow:column;"
        >
          <img src="../../assets/images/none-fp.svg" />
          <span>暂无发票</span>
        </li>
      </ul>

      <div class="fpspxbwk" v-if="InvoiceData.length>0">
        <div class="all-xz">
          <input
            type="checkbox"
            class="iconfont radio"
            style="padding-right: 6px;"
            v-model="checked"
            @click="checkAll($event)"
          />
          <span>全选</span>
        </div>
        <input
          type="button"
          class="fpspxbwk-input"
          value="下一步"
          @click="btnPage()"
        /><i
          >合计：<em>{{ totalSum == 0 ? "---" : totalSum }}</em></i
        >
      </div>
    </div>
  </div>
</template>
<script>
import { GetCompanyInvoiceList } from "../../api/api";
export default {
  data() {
    return {
      InvoiceData: [],
      loading: false,
      limit: 10,
      currentPage: 0,
      total: 0,
      isLoading: false,
      noneData: false,
      checkData: [],
      totalSum: 0,
      checked: false
    };
  },
  watch: {
    checkData: {
      handler() {
        if (this.checkData.length == this.InvoiceData.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  methods: {
    btnPage() {
      if (this.checkData.length <= 0) {
        	this.$toast({ duration: 1000, message: "请选择开票订单" });
					return false;
      } else {
        this.$router.push({
          path: "/applyInvoice",
          query: {
            idList: this.checkData,
            redirect: "comInvoice"
          }
        });
      }
    },
    checkedClick(e, data) {
      if (e.target.checked) {
        this.totalSum = this.moneyFormat(
          parseFloat(data.amount) + parseFloat(this.totalSum)
        );
      } else {
        this.totalSum = this.moneyFormat(
          parseFloat(this.totalSum) - parseFloat(data.amount)
        );
      }
    },
    checkAll(e) {
      // 点击全选事件
      if (e.target.checked) {
        this.InvoiceData.forEach((el, i) => {
          if (this.checkData.indexOf(el.id) == "-1") {
            this.checkData.push(el.id);
            this.totalSum = this.moneyFormat(
              parseFloat(el.amount) + parseFloat(this.totalSum)
            );
          }
        });
      } else {
        // 全不选选则清空绑定的数组
        this.checkData = [];
        this.totalSum = 0;
      }
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        if (this.currentPage > 0) {
          if (this.InvoiceData.length >= this.total) {
            this.loading = true;
            this.isLoading = false;
            return false;
          }
        }
        ++this.currentPage;
        this.loading = false;
        this.GetInvoiceList(this.currentPage);
      }, 1000);
    },
    GetInvoiceList(cpage) {
      let params = {
        page: cpage,
        limit: this.limit
      };
      GetCompanyInvoiceList(params).then(data => {
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
          this.InvoiceData = this.InvoiceData.concat(data.list);
        }
      });
    },
    moneyFormat(val) {
      if (val == "" || val == null) {
        return "0.00";
      }
      var value = Math.round(parseFloat(val) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) value = value.toString() + "0";
        return value;
      }
    }
  }
};
</script>
