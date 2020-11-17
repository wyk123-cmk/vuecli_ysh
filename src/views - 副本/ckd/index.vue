<style scoped>
.content {
  padding-top: 0px;
}
.tab-ckd {
  top: 48px;
}
.mailing-content,
.receipt-content {
  top: 89px;
  background: #f7f7f7;
}
.order-detail {
  font-size: 14px;
  flex: 1;
  text-align: right;
}
.timeactive {
  border-bottom: 1px solid #0f84f3;
}
</style>
<template>
  <div>
    <div class="content" style="padding-bottom: 60px;padding-top: 0;">
      <div class="sswk">
        <div class="ckd-ss">
          <input type="text" class="sswk-input" placeholder="请输入姓名 、电话 、单号" v-model="keyword" />
          <input name="button" type="button" class="sswk-button" id="button" @click="btnSearch" />
        </div>
        <a @click="btnShowSearch" class="ckd-sx">
          <s>筛选</s>
        </a>
      </div>
      <p class="tab-ckd">
        <i
          class="tab-ckd-i"
          :class="navActive ? 'active' : ''"
          @click="navTab(1)"
        >我的寄件({{ total_m }})</i>
        <i
          class="tab-ckd-s"
          :class="!navActive ? 'active' : ''"
          @click="navTab(2)"
        >我的收件({{ total_r }})</i>
      </p>
      <div v-if="isLogin">
        <!-- 寄件 statrt -->
        <div class="mailing-content" v-show="navActive" ref="scrollBox_m">
          <ul
            class="ckdnrwk"
            v-infinite-scroll="loadMore_m"
            infinite-scroll-disabled="loading_m"
            infinite-scroll-distance="10"
          >
            <li v-for="(item, index) in waybillData_m" :key="index" :id="item.mastCode">
              <h2>
                <span
                  v-clipboard:copy="item.expressCode"
                  v-clipboard:success="onCopy"
                  style="font-size:12px;color:#999;display:flex;align-items:center;"
                >
                  运单号：{{ item.expressCode
                  }}
                  <img
                    src="../../assets/images/copy1.svg"
                  />
                </span>
                <span @click="btnview(item.mastCode)" class="order-detail">详情</span>
              </h2>
              <h3 @click="jumpPage(1, item.mastCode)">
                <i>
                  <b>{{ item.expressFrom.areaInfo.city }}</b>
                  {{ item.expressFrom.name }}
                </i>
                <em v-if="item.status == '9'" style="color:green">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{ item.statusText }}
                </em>
                <em v-if="item.status == '2'">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{ item.statusText }}
                </em>
                <em v-if="item.status == '3'" style="color:#E47800">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <em v-if="item.status == '4'" style="color:#4285f4">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <em v-if="item.status == '-1' || item.status == '1'" style="color:#999999">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <i>
                  <b>{{ item.expressTo.areaInfo.city }}</b>
                  {{ item.expressTo.name }}
                </i>
              </h3>
              <h2 v-if="item.status == '4'" style="padding: 0;padding-top: 12px;">
                签收时间：
                {{
                $util.formatDate.format(item.finishedTime,
                "yyyy-MM-dd hh:mm"
                )
                }}
              </h2>
              <h4 v-if="item.status == '1'">
                <s v-if="item.payType == 2">到付</s>
                <s v-if="item.payType == 1">
                  ￥
                  <b>{{ item.price }}</b>
                </s>
                <!-- <em>剩余：暂无</em> -->
                <i style="float: right;width: auto">
                  <a
                    href="javascript:;"
                    style="background: #f00;margin-left: 5px;"
                    @click="deleteOrder(item.mastCode)"
                  >取消</a>
                  <!-- <a href="javascript:;" @click="jumpPage(2, item.mastCode, item.price)">去付款</a> -->
                </i>
              </h4>
              <h4 v-if="item.status == '2' && item.payType == 1">
                <s>
                  ￥
                  <b>{{ item.price }}</b>
                </s>
                <!-- <em>剩余：暂无</em> -->
                <i style="float: right;width: auto">
                  <!-- <a href="javascript:;" style="background: #f00;margin-left: 5px;" @click="deleteOrder(item.mastCode)">取消</a> -->
                  <a href="javascript:;" @click="jumpPage(2, item.mastCode, item.price)">去付款</a>
                </i>
              </h4>
              <h4 style="padding: 0;padding-top: 12px;" v-if="item.status == 9">
                <i style="float: right;width: auto">
                  <a @click="removeOrder(item.mastCode)" style="background: #f00;margin-left: 5px;">删除</a>
                </i>
              </h4>
            </li>
            <li
              v-if="isLoading_m"
              class="loading-box"
              style="display:flex;align-items:center;justify-content:center;background:#f7f7f7;"
            >
              <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
              <span class="loading-more-txt">加载中...</span>
            </li>
            <li
              class="noneData"
              v-show="noneData_m"
              style="background: #f7f7f7;padding: 0;border:0"
            >
              <img src="../../assets/images/none-jj.svg" />
              <span>暂无内容</span>
            </li>
          </ul>
        </div>
        <!-- 寄件 end -->
        <!-- 收件 statrt-->
        <div class="receipt-content" v-show="!navActive" ref="scrollBox_r">
          <ul
            class="ckdnrwk"
            v-infinite-scroll="loadMore_r"
            infinite-scroll-disabled="loading_r"
            infinite-scroll-distance="10"
          >
            <li v-for="(item, index) in waybillData_r" :key="index">
              <h2>
                <span
                  v-clipboard:copy="item.expressCode"
                  v-clipboard:success="onCopy"
                  style="font-size:12px;color:#999;display:flex;align-items:center;"
                >
                  运单号：{{ item.expressCode
                  }}
                  <img
                    src="../../assets/images/copy1.svg"
                  />
                </span>
                <span @click="btnview(item.mastCode)" class="order-detail">详情</span>
              </h2>
              <h3 @click="jumpPage(1, item.mastCode)">
                <i>
                  <b>{{ item.expressFrom.areaInfo.city }}</b>
                  {{ item.expressFrom.name }}
                </i>
                <em v-if="item.status == '9'" style="color:green">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{ item.statusText }}
                </em>
                <em v-if="item.status == '1'">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <em v-if="item.status == '3'" style="color:#E47800">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <em v-if="item.status == '4'" style="color:#4285f4">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <em v-if="item.status == '-1'" style="color:#999999">
                  <img src="../../assets/images/cjt.svg" alt />
                  {{
                  item.statusText
                  }}
                </em>
                <i>
                  <b>{{ item.expressTo.areaInfo.city }}</b>
                  {{ item.expressTo.name }}
                </i>
              </h3>
              <h2 v-if="item.status == '4'" style="padding: 0;padding-top: 12px;">
                签收时间：{{
                $util.formatDate.format(item.finishedTime,
                "yyyy-MM-dd hh:mm"
                )
                }}
              </h2>
              <h4 v-if="item.status == '2'">
                <s v-if="item.payType == 2">到付</s>
                <s v-if="item.payType == 1">
                  ￥
                  <b>{{ item.price }}</b>
                </s>
                <!-- <em>剩余：暂无</em> -->
                <i style="float: right;width: auto">
                  <a
                    href="javascript:;"
                    style="background: #f00;margin-left: 5px;"
                    @click="deleteOrder(item.mastCode)"
                  >取消</a>
                  <a href="javascript:;" @click="jumpPage(2, item.mastCode, item.price)">去付款</a>
                </i>
              </h4>
              <h3 style="margin-top:10px;" v-if="item.status == 9">
                <i style="float: right;width: auto">
                  <a
                    href="javascript:;"
                    style="margin-left: 5px;color:#999;font-size:16px;"
                  >已取消</a>
                </i>
              </h3>
            </li>
            <li v-if="isLoading_r" class="loading-box" style="background: #fff;">
              <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
              <span class="loading-more-txt" style="text-align:center;">加载中...</span>
            </li>

            <li
              class="noneData"
              v-show="noneData_r"
              style="background: #f7f7f7;padding: 0;border:0"
            >
              <img src="../../assets/images/none-sj.svg" />
              <span>暂无内容</span>
            </li>
          </ul>
        </div>
        <!-- 收件 end-->
      </div>
    </div>
    <mt-popup id="showmore" v-model="showSearch" position="top" style="width:100%">
      <div class="sswk">
        <div class="ckd-ss">
          <input type="text" class="sswk-input" placeholder="请输入姓名 、电话 、单号" v-model="keyword" />
          <input name="button" type="button" class="sswk-button" id="button" @click="btnSearch" />
        </div>
        <a @click="btnShowSearch" class="ckd-sx">
          <s>筛选</s>
        </a>
      </div>
      <ul class="more-sx">
        <li>
          <h2>寄件形式</h2>
          <p>
            <!-- <span :class="{moreactive: searchModel==1}">个人</span> -->
            <span @click="searchModel = 1" :class="{ moreactive: searchModel === 1 }">个人</span>
            <span @click="searchModel = 2" :class="{ moreactive: searchModel === 2 }">企业</span>
          </p>
        </li>
        <li>
          <h2>运单状态</h2>
          <p>
            <span
              @click="btnSearchStatus(1)"
              :class="{ moreactive: searchStatus.indexOf(1) > -1 }"
            >待揽收</span>
            <span
              @click="btnSearchStatus(3)"
              :class="{ moreactive: searchStatus.indexOf(3) > -1 }"
            >运输中</span>
            <span
              @click="btnSearchStatus(4)"
              :class="{ moreactive: searchStatus.indexOf(4) > -1 }"
            >已签收</span>
            <span
              @click="btnSearchStatus(9)"
              :class="{ moreactive: searchStatus.indexOf(9) > -1 }"
            >已取消</span>
          </p>
        </li>
        <li>
          <h2>付款方式</h2>
          <p>
            <span @click="searchPaymode = 1" :class="{ moreactive: searchPaymode === 1 }">寄付</span>
            <span @click="searchPaymode = 2" :class="{ moreactive: searchPaymode === 2 }">到付</span>
          </p>
        </li>
        <li>
          <h2>订单日期</h2>
          <p>
            <span
              @click="btnStartSet"
              :class="{ timeactive: selectTimeNo == 1 }"
              style="margin-right: 10px;"
            >
              {{
              $util.isNotEmpty(searchStartTime) == true
              ? searchStartTime
              : "开始日期"
              }}
            </span>
            至
            <span @click="btnEndSet" :class="{ timeactive: selectTimeNo == 2 }">
              {{
              $util.isNotEmpty(searchEndTime) == true
              ? searchEndTime
              : "结束日期"
              }}
            </span>
          </p>
        </li>
        <p>
          <button @click="btnRest">重置</button>
          <button @click="btnOkSearch">确认</button>
        </p>
      </ul>
    </mt-popup>
    <mt-datetime-picker
      ref="picker"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="btnDateConfirm"
      v-model="pickerDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
    ></mt-datetime-picker>
  </div>
</template>
<script>
import { getSearchExpress, getExpressTotal, deleteOrder } from "../../api/api";
import { MessageBox, DatetimePicker } from "mint-ui";
export default {
  data() {
    return {
      showSearch: false,
      isLogin: this.$Context.isLogin(),
      limit: 5,
      expressType: "Sent",
      keyword: "",
      navActive: true,
      total_m: 0,
      total_r: 0,
      currentPage_m: 0,
      currentPage_r: 0,
      waybillData_m: [],
      waybillData_r: [],
      loading_m: false,
      loading_r: false,
      isLoading_m: false,
      isLoading_r: false,
      noneData_m: false,
      noneData_r: false,
      tabType: 1,
      searchModel: null,
      searchStatus: [],
      searchPaymode: null,
      searchStartTime: "",
      searchEndTime: "",
      // DateList:[],
      searchStartTime: "",
      searchEndTime: "",
      selectTimeNo: 1,
      pickerDate: "",
      startDate: new Date("2019-11-01"),
      endDate: new Date()
    };
  },
  created() {
    // if(!this.isLogin){
    // 	this.$router.push({
    // 		path: "/login",
    // 		query: {
    // 			redirect: "ckd"
    // 		}
    // 	});
    // 	return false;
    // }

    this.getTotal();
    let dataVla = this.getMonthData(new Date("2019-11-01"));
    this.DateList = [
      {
        flex: 1,
        values: dataVla,
        className: "slot1",
        textAlign: "center",
        defaultIndex: 0
      },
      {
        divider: true,
        content: "-",
        className: "slot2",
        defaultIndex: 0
      },
      {
        flex: 1,
        values: dataVla[0].list,
        className: "slot3",
        textAlign: "center",
        defaultIndex: 0
      }
    ];
  },
  methods: {
    btnSearchStatus(val) {
      if (this.searchStatus.indexOf(val) > -1) {
        this.searchStatus = this.searchStatus.filter(item => item != val);
      } else {
        this.searchStatus.push(val);
      }
    },
    btnDateConfirm(date) {
      if (this.selectTimeNo === 1) {
        this.searchStartTime = this.$util.formatDate.format(date, "yyyy-MM-dd");
      } else {
        this.searchEndTime = this.$util.formatDate.format(date, "yyyy-MM-dd");
      }
    },
    btnStartSet() {
      this.selectTimeNo = 1;
      if (this.$util.isNotEmpty(this.searchStartTime)) {
        this.pickerDate = new Date(this.searchStartTime);
      } else {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth();
        let day = nowDate.getDate();
        let defaultDate = year + "-" + month + "-" + day;
        this.pickerDate = new Date(defaultDate);
      }
      this.$refs.picker.open();
    },
    btnEndSet() {
      this.selectTimeNo = 2;
      if (this.$util.isNotEmpty(this.searchEndTime)) {
        this.pickerDate = new Date(this.searchEndTime);
      } else {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let day = nowDate.getDate();
        let defaultDate = year + "-" + month + "-" + day;
        this.pickerDate = new Date(defaultDate);
      }
      this.$refs.picker.open();
    },
    btnOkSearch() {
      if (this.$util.isNotEmpty(this.searchStartTime)) {
        if (!this.$util.isNotEmpty(this.searchEndTime)) {
          MessageBox.alert("结束日期不能为空");
          return false;
        } else if (
          new Date(this.searchStartTime) >= new Date(this.searchEndTime)
        ) {
          MessageBox.alert("结束日期不能小于开始日期");
          return false;
        }
      }
      this.btnSearch();
      this.showSearch = false;
    },
    btnRest() {
      this.searchModel = null;
      this.searchStatus = [];
      this.searchPaymode = null;
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.btnSearch();
      this.showSearch = false;
    },
    getMonthData(date) {
      var list = [];
      var y = date.getFullYear();
      var d = { id: y, list: [] };

      var monthNum = 12;
      if (y == new Date().getFullYear()) {
        monthNum = new Date().getMonth() + 1;
      }
      for (var m = date.getMonth() + 1; m <= monthNum; m++) {
        d.list.push({ id: (Array(2).join(0) + m).slice(-2) });
      }
      list.push(d);
      y++;
      for (y; y <= new Date().getFullYear(); y++) {
        var d = { id: y, list: [] };
        if (y < new Date().getFullYear()) {
          for (var m = 1; m <= 12; m++) {
            d.list.push({ id: (Array(2).join(0) + m).slice(-2) });
          }
        } else {
          for (var m = 0; m <= new Date().getMonth(); m++) {
            d.list.push({ id: (Array(2).join(0) + (m + 1)).slice(-2) });
          }
        }
        list.push(d);
      }
      return list;
    },
    onDateChange(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      if (this.selectTimeNo == 1) {
        this.searchStartTime =
          picker.getValues()[0].id + "-" + picker.getValues()[1].id;
      } else {
        this.searchEndTime =
          picker.getValues()[0].id + "-" + picker.getValues()[1].id;
      }
    },
    btnShowSearch() {
      if (this.showSearch) {
        this.showSearch = false;
      } else {
        this.showSearch = true;
      }
    },
    onCopy() {
      this.$toast({ duration: 1000, message: "复制成功", position: "top" });
    },
    btnview(code) {
      this.$router.push({
        path: "/orderDetail",
        query: { mastCode: code, redirect: "ckd" }
      });
    },
    getTotal: function() {
      getExpressTotal().then(data => {
        this.total_m = data.sendCount;
        this.total_r = data.receiveCount;
      });
    },
    jumpPage(type, code, price) {
      if (type == 1) {
        this.$router.push({
          path: "/logisticsInfo",
          query: {
            redirect: "ckd",
            code: code
          }
        });
      }
      if (type == 2) {
        this.$store.state.orderAmount = price;
        this.$router.push({
          path: "/payment",
          query: {
            redirect: "ckd",
            code: code
          }
        });
      }
    },
    deleteOrder(mastCode) {
      //取消订单
      this.$router.push({
        path: "/cancel",
        query: {
          redirect: this.$router.currentRoute.fullPath,
          mastCode: mastCode
        }
      });
    },
    removeOrder(mastCode) {
      MessageBox.confirm("确定要删除此单吗？").then(action => {
        let param = {mastCode:mastCode,reason:""}
        deleteOrder(param).then(data => {
          if (!data) return;
          this.btnOkSearch();
		   this.getTotal();
        });
      });
    },
    loadMore_m() {
      //寄件-无限加载函数
      this.isLoading_m = true;
      setTimeout(() => {
        if (this.currentPage_m > 0) {
          if (this.waybillData_m.length >= this.total_m) {
            this.loading_m = true;
            this.isLoading_m = false;
            return false;
          }
        }
        ++this.currentPage_m;
        this.getExpressList(this.currentPage_m, "Sent");
      }, 1000);
    },
    loadMore_r() {
      //收件-无限加载函数
      this.isLoading_r = true;
      setTimeout(() => {
        if (this.currentPage_r > 0) {
          if (this.waybillData_r.length >= this.total_r) {
            this.loading_r = true;
            this.isLoading_r = false;
            return false;
          }
        }
        ++this.currentPage_r;
        this.getExpressList(this.currentPage_r, "Receive");
      }, 100);
    },
    btnSearch: function() {
      //搜索
      if (this.navActive) {
        this.waybillData_m = [];
        this.currentPage_m = 1;
        this.$refs.scrollBox_m.scrollTop = 0;
      } else {
        this.waybillData_r = [];
        this.currentPage_r = 1;
        this.$refs.scrollBox_r.scrollTop = 0;
      }
      this.getExpressList(1, this.expressType);
    },
    navTab: function(index) {
      this.tabType = index;
      if (index == 1) {
        this.expressType = "Sent";
        this.navActive = true;
      }
      if (index == 2) {
        this.expressType = "Receive";
        this.navActive = false;
      }
      this.btnRest();
    },
    getExpressList(_page, _expressType, type) {
      let params = {
        limit: this.limit,
        page: _page,
        expressType: _expressType,
        keyword: this.keyword,
        mode: this.searchModel,
        status: this.searchStatus.length <= 0 ? null : this.searchStatus,
        paymode: this.searchPaymode,
        startTime: this.searchStartTime,
        endTime: this.searchEndTime
      };
      getSearchExpress(params).then(data => {
        if (params.expressType == "Sent") {
          this.isLoading_m = false;
          if (data == undefined) {
            this.noneData_m = true;
            return false;
          }
          if (data.total == 0) {
            this.noneData_m = true;
            return false;
          }
          if (data.list != null && data.list.length > 0) {
            this.noneData_m = false;
            this.waybillData_m = this.waybillData_m.concat(data.list);
          }
        } else {
          this.isLoading_r = false;
          if (!data) {
            this.noneData_r = true;
            return false;
          }
          if (data.total == 0) {
            this.noneData_r = true;
            return false;
          }
          if (data.list != null && data.list.length > 0) {
            this.noneData_r = false;
            this.waybillData_r = this.waybillData_r.concat(data.list);
          }
        }
      });
    }
  },
  mounted() {
    this.tabType = this.$route.query.tabType;
    if (!this.tabType) {
      this.navTab(1);
    } else {
      this.navTab(this.tabType);
    }
  }
};
</script>
