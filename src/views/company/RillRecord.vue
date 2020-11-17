<style scoped>
.xz-date {
  height: 44px;
  background: #f7f7f7;
  line-height: 44px;
  padding: 0 14px;
}
.xz-date button {
  background: #fff;
  height: 22px;
  border-radius: 14px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
}
.xz-date button img {
  height: 12px;
  margin-left: 4px;
}
.qymx li {
  padding: 10px 14px;
  align-items: center;
  justify-content: space-between;
}
.qymx li + li {
  border-top: 1px solid #eee;
}
.qymx li p {
  line-height: 21px;
}
.qymx li h2 {
  font-size: 18px;
  font-weight: bold;
}
.qymx li h2.zs {
  color: #ff8c04;
}
.qymx li h2.zs1 {
  text-align: right;
}
.qymx li h2.zs1 span {
  color: #ff8c04;
  font-size: 12px;
}
.qymx li h2.zs1 label {
  color: #999;
  font-size: 12px;
}
.qymx li h2.zs1 span.sb {
  color: red;
  font-size: 12px;
}
.qymx li p span {
  color: #4285f4;
}
.qymx li p label {
  color: #999;
  font-size: 12px;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">充值记录</h1>
    </header>
    <div class="content" ref="scrollBox">
      <div class="xz-date">
        <button @click="IsKeyword = true">
          {{ keyWordTime }}<img src="../../assets/images/down.svg" />
        </button>
      </div>
      <ul
        class="qymx"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="15"
      >
        <li v-for="(item, index) in RecordList" :key="index" style="display:flex;">
          <p>
            账户充值<br /><label>
              {{
                $util.formatDate.format(item.createTime,
                  "MM-dd hh:mm"
                )
              }}
              </label>
          </p>
          <h2 class="zs1">
            +{{ item.reqAmount.toFixed(2) }}<br />
            <span v-if="item.status == 0">申请中</span>
            <span class="sb" v-if="item.status == 2">审核失败</span><br />
            <label v-if="item.status == 1">{{ item.replyReason }}</label>
          </h2>
        </li>
        <li v-if="isLoading" class="loading-box" style="background: #fff;">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>
        <li class="noneData" v-show="noneData" style="padding: 0;border:0">
          <img src="../../assets/images/none-fp.svg" />
          <span>暂无充值记录</span>
        </li>
      </ul>
    </div>
    <mt-popup
          v-model="IsKeyword"
          position="bottom"
          class="mint-popup"
          style="width:100%;"
        >
          <mt-picker
            :slots="SearchData"
            @change="onChangeSearch"
            valueKey="id"
            :showToolbar="true"
          >
            <Slot>
              <div class="me-tel" style="padding:10px 10px;background:#f7f7f7;">
                <div @click="btnPickCancle">取消</div>
                <div style="color:green;" @click="btnPickOk">确定</div>
              </div>
            </Slot>
          </mt-picker>
        </mt-popup>
  </div>
</template>
<script>
import { GetRillRecordList } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      RecordList: [],
      loading: false,
      limit: 15,
      currentPage: 0,
      total: 0,
      isLoading: false,
      noneData: false,
      SearchData: [],
      IsKeyword: false,
      keyWordTime: "本月",
      startTime:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+"01",
      endTime:new Date().getFullYear()+"-"+(new Date().getMonth()+2)+"-"+"01"
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
    let dataVla = this.getMonthData(new Date("2019-11-01"));
    this.SearchData = [
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
    getMonthData(date) {
      var list = [];
      var y = date.getFullYear();
      var d = { id: y, list: [] };

      var monthNum = 12;
      if (y == new Date().getFullYear()) {
        monthNum = new Date().getMonth() + 1;
      }
      for (var m = date.getMonth() + 1; m <= monthNum; m++) {
        d.list.push({ id: m });
      }
      list.push(d);
      y++;
      for (y; y <= new Date().getFullYear(); y++) {
        var d = { id: y, list: [] };
        if (y < new Date().getFullYear()) {
          for (var m = 1; m <= 12; m++) {
            d.list.push({ id: m });
          }
        } else {
          for (var m = 0; m <= new Date().getMonth(); m++) {
            d.list.push({ id: m + 1 });
          }
        }
        list.push(d);
      }
      return list;
    },
    btnPickCancle() {
      this.IsKeyword = false;
      this.startTime = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+"01";
      this.endTime=new Date().getFullYear()+"-"+(new Date().getMonth()+2)+"-"+"01";
    },
    btnPickOk() {
      this.IsKeyword = false;
      this.btnSearch();
    },
    onChangeSearch(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      if (
        picker.getValues()[0].id == new Date().getFullYear() &&
        picker.getValues()[1].id == new Date().getMonth() + 1
      ) {
        this.keyWordTime = "本月";
        this.startTime=new Date().getFullYear()+"-"+(new Date().getMonth() + 1)+"-"+"01"
        this.endTime=new Date().getFullYear()+"-"+(new Date().getMonth() + 2)+"-"+"01"
      } else {
        this.keyWordTime =
          picker.getValues()[0].id + "年" + picker.getValues()[1].id + "月";
           this.startTime=picker.getValues()[0].id+"-"+picker.getValues()[1].id+"-"+"01";
           this.endTime=picker.getValues()[0].id+"-"+Number(Number(picker.getValues()[1].id)+1)+"-"+"01";
      }
    },
    loadMore() {
      this.isLoading = true;
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
        limit: this.limit,
        startTime: this.startTime,
        endTime: this.endTime
      };
      GetRillRecordList(params).then(data => {
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
      });
    },
    btnSearch(){
      	this.RecordList = [];
				this.currentPage = 1;
        this.$refs.scrollBox.scrollTop = 0;
        this.GetRecordList(1);
    }
  }
};
</script>
