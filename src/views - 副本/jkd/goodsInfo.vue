<style scoped>
.yfgs-num {
  border: 1px solid #eee;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  font-weight: 0;
  border-radius: 4px;
}
.yfgs-num a {
  width: 36px;
  height: 36px;
  background: #f7f7f7;
  font-size: 18px;
  text-align: center;
}
.yfgs-num input {
  width: 36px;
  text-align: center;
}
.yfgs-num i {
  width: 26px;
  text-align: left;
}
.typeactive {
  background: #50a8ff;
  color: #fff;
  border: 1px solid #50a8ff;
}
.packActive {
  background: #ff0000;
  color: #fff;
}
.swzpsh li span {
  margin-right: 5px;
}
.packname {
  /* height: 36px;
  border: 1px solid #f7f7f7; */
  padding-left: 10px;
  width: 60%;
  box-sizing: border-box;
  /* margin-bottom: 16px;
  border-radius: 5px; */
}
.packname[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: url(../../assets/images/cancel.svg) no-repeat right;
  background-size: 16px 16px;
}
.search-name {
  background: #fff;
  position: fixed;
  z-index: 10001;
  top: 90px;
  width: 100%;
  right: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-left: 10px;
  border-top: 0;
  left: 0;
  overflow: scroll;
}
.search-name li {
  height: 32px;
  line-height: 32px;
}

.bzlx-bag {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-top: 1px solid #eee;
}
.nrwk.hpxx {
  border-top: 1px solid #eee;
}
.nrwk.hpxx li {
  padding: 12px 0;
}
.nrwk.hpxx li span {
  font-weight: normal;
  color: #999;
}
.jjbz {
  border: 1px solid #eeeeee;
  width: 96%;
  padding: 6px;
  margin-bottom: 12px;
  font-size: 12px;
}
.tip {
    margin: 20px 14px 0;
    font-size: 12px;
    color: red;
    text-align: justify;
}
</style>
<template>
  <div>
    <header>
      <a
        class="iconfont icon-back"
        @click="!this.redirect?$router.go(-1):$router.replace(this.redirect)"
      ></a>
      <h1 class="tab-title">物品信息</h1>
    </header>
    <div class="content" style="z-index:1">
      <div class="bzlx-bag">
        <h2>
          物品名称
          <i style="color:red;font-size:12px;">（必填）</i>
        </h2>
        <input
          type="search"
          placeholder="输入物品名称"
          autocomplete="off"
          class="packname"
          v-model="txtGoodName"
        />
      </div>
      <ul class="nrwk hpxx">
        <li @click="IsShowPackType = true">
          <span class="iconfont yjt">{{ txtGoodType }}</span>物品类型
        </li>
      </ul>
      <ul class="bzlx">
        <h2>寄件备注</h2>
        <textarea rows="2" class="jjbz" placeholder="寄件备注仅自己可见，当发货量大时，方便财务统计" v-model="goodMemo"></textarea>
      </ul>
      <ul class="nrwk2">
        <li>
          <h2 style="line-height:36px;">寄件数量</h2>
          <span class="yfgs-num">
            <a style="border-right:1px solid #eee;" @click="btnReduce(1)">-</a>
            <input
              type="number"
              v-model="txtnum"
              style="width:62px;"
              onkeyup="this.value=this.value.replace(/D/g,'')"
              onafterpaste="this.value=this.value.replace(/D/g,'')"
            />
            <a style="border-left:1px solid #eee;" @click="btnPlus(1)">+</a>
          </span>
        </li>
        <li>
          <h2>
            预估重量
            <i style="color:red;font-size:12px;">（必填）</i>
            <span>最终重量以快递员核算为准</span>
          </h2>
          <span class="yfgs-num">
            <a style="border-right:1px solid #eee;" @click="btnReduce(0)">-</a>
            <input
              type="number"
              v-model="txtweight"
              onkeyup="this.value=this.value.replace(/D/g,'')"
              onafterpaste="this.value=this.value.replace(/D/g,'')"
            />
            <i>kg</i>
            <a style="border-left:1px solid #eee;" @click="btnPlus(0)">+</a>
          </span>
        </li>
        <li v-if="pageType != 'small'">
          <h2>体积填写</h2>
          <div class="good-tj">
            <span>
              <input type="number" class="nrwk1-li-span-input" placeholder="长" v-model="txtLong" />
              <em>cm</em>
              <s>*</s>
            </span>
            <span>
              <input type="number" class="nrwk1-li-span-input" placeholder="宽" v-model="txtWidth" />
              <em>cm</em>
              <s>*</s>
            </span>
            <span>
              <input type="number" class="nrwk2-li-span-input" placeholder="高" v-model="txtheight" />
              <em>cm</em>
            </span>
            <p>
              <i>m³</i>
              <input type="number" class="nrwk2-li-p-input" placeholder="0.000" v-model="txtCubic" />总体积：
            </p>
          </div>
        </li>
      </ul>
      <ul class="swzpsh">
        <h2>给快递员捎话</h2>
        <textarea rows="2" class="swzpsh-textarea" placeholder=" 给小哥捎句话吧……" v-model="txttalk"></textarea>
        <h3>
          <span style="color:#333;">注意：纸箱需额外收费</span>
          <i :class="{ packActive: ispack === true }" @click="btnIsPack">带纸箱</i>
          <i :class="{ packActive: isjd === true }" @click="btnIsjd">带胶带</i>
          <i :class="{ packActive: islink === true }" @click="btnIslink">上门前联系</i>
        </h3>
      </ul>
	 <p class="tip">
		 注：因平台相关优惠折扣与物流产品相关，为确保您可享受平台便利，望合理填写产品重量及体积，预估与实际重量差距过大会产生无折扣订单，敬请留意！
	 </p>
		  
      <p
        style="padding-left: 14px; padding-right: 14px; padding-top: 12px; margin-bottom:90px; margin-top: 12px;"
      >
        <input type="button" class="dlnrwk-an" value="确定" @click="btnSumit" />
      </p>
    </div>
    <div class="search-name" v-show="isSearch">
      <ul>
        <li
          v-for="(item, index) in goodList"
          :key="index"
          @click="btnGetGoodName(item.goodsName)"
        >{{ item.goodsName }}</li>
      </ul>
    </div>
    <mt-popup v-model="IsShowPackType" position="bottom" class="mint-popup" style="width:100%;">
      <mt-picker :slots="PackTypeDatalList" @change="OnPackTypeChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { getGoodNameList } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      pageType: "",
      txtGoodName: "",
      txtGoodType: "",
      txtweight: "",
      selectTypeName: "仪器整机",
      ispack: false,
      txttalk: "",
      txtCubic: "",
      txtheight: "",
      txtWidth: "",
      txtLong: "",
      packTypeBig: [
        "仪器整机",
        "仪器设备",
        "试剂耗材",
        "化玻设备",
        "实验家具",
        "其他"
      ],
      packTypeSmall: [
        "文件",
        "仪器整机",
        "仪器设备",
        "试剂耗材",
        "化玻设备",
        "其他"
      ],
      PackTypeDatalList: [],
      IsShowPackType: false,
      isSearch: false,
      goodList: [],
      isjd: false,
      islink: false,
      txtnum: 1,
      goodMemo: ""
    };
  },
  computed: {
    txtCubic1: function() {
      try {
        if (this.txtLong > 0 && this.txtLong > 0 && this.txtLong > 0) {
          let long = Number(this.txtLong);
          let height = Number(this.txtheight == "" ? 0 : this.txtheight);
          let width = Number(this.txtWidth == "" ? 0 : this.txtWidth);
          let cubicMeter = (long * height * width) / 1000000;
          return cubicMeter;
        }
      } catch (e) {}
    }
  },
  watch: {
    txtCubic1(val) {
      this.txtCubic = val > 0 ? val : "";
    },
    txtGoodName(val) {
      if (this.$util.isNotEmpty(val)) {
        if (this.goodList.length > 0) {
          if (this.goodList.some(item => item.goodsName == val) === false) {
            this.getGoodList();
          }
        } else {
          if (this.$util.isNotEmpty(this.$store.state.goodInfo)) {
            if (this.$store.state.goodInfo.goodName == val) {
            } else {
              this.getGoodList();
            }
          } else {
            this.getGoodList();
          }
        }
      } else {
        this.isSearch = false;
      }
    },
    txtnum(val) {
      if (val < 1) {
        this.txtnum = 1;
      }
    },
    txtweight(val) {
      if (val !== "") {
          if (this.txtweight <= 0) {
            this.txtweight = 1;
          }
        if (this.pageType === "small") {
          if (this.txtweight >= 20) {
            this.txtweight = 20;
          }
        }
      }
    }
  },
  mounted() {
    $("body").css("background", "#fff");
    // this.redirect = this.$route.query.redirect;
    this.pageType = this.$route.query.pageType;

    if (this.$store.state.goodInfo != null) {
      this.txtGoodName = this.$store.state.goodInfo.goodName;
      this.txtweight = this.$store.state.goodInfo.weigth;
      this.txtCubic = this.$store.state.goodInfo.cubic;
      this.txtheight = this.$store.state.goodInfo.height;
      this.txtWidth = this.$store.state.goodInfo.width;
      this.txtLong = this.$store.state.goodInfo.long;
      this.txttalk = this.$store.state.goodInfo.remark;
      this.txtnum = this.$store.state.goodInfo.goodNum;
      this.txtGoodType = this.$store.state.goodInfo.packType;
      this.goodMemo = this.$store.state.goodInfo.goodMemo;
    }
    if (this.pageType == "small") {
      this.PackTypeDatalList = [
        {
          flex: 1,
          values: this.packTypeSmall,
          textAlign: "center"
        }
      ];
      if (!this.$util.isNotEmpty(this.txtGoodType)) {
        this.txtGoodType = "文件";
      }
    } else {
      this.PackTypeDatalList = [
        {
          flex: 1,
          values: this.packTypeBig,
          textAlign: "center"
        }
      ];
      if (!this.$util.isNotEmpty(this.txtGoodType)) {
        this.txtGoodType = "仪器整机";
      }
    }
  },
  methods: {
    OnPackTypeChange(picker, values) {
      if (values.length <= 0) return;
      this.txtGoodType = values[0];
    },
    btnGetGoodName(val) {
      this.txtGoodName = val;
      this.isSearch = false;
    },
    getGoodList() {
      getGoodNameList({ goodsName: this.txtGoodName }).then(data => {
        if (!data) return;
        this.goodList = data;
        if (this.goodList.length > 0) {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      });
    },
    Valid() {
      if (this.txtweight === "" || this.txtweight === null) {
        this.$toast({ duration: 1000, message: "预估重量不能为空" });
        return false;
      }
      if (this.txtGoodName === "" || this.txtGoodName === null) {
        this.$toast({ duration: 1000, message: "物品名称不能为空" });
        return false;
      }
      if (this.txtGoodType === "" || this.txtGoodType === null) {
        this.$toast({ duration: 1000, message: "物品类型不能为空" });
        return false;
      }
      if (this.pageType !== "small") {
        if (this.txtweight < 20) {
          this.$toast({ duration: 1500, message: "大件重量不得小于20公斤，小件寄快递更实惠" });
          return false;
        }
      }
      return true;
    },
    btnSumit() {
      if (this.Valid()) {
        let height = Number(this.txtheight == "" ? 0 : this.txtheight);
        let width = Number(this.txtWidth == "" ? 0 : this.txtWidth);
        let long = Number(this.txtLong == "" ? 0 : this.txtLong);
        let cubicMeter = (long * height * width) / 1000000;
        if (cubicMeter != this.txtCubic) {
          this.txtheight = "";
          this.txtWidth = "";
          this.txtLong = "";
        }
        this.txtweight =
          parseFloat(this.txtweight == "" ? 0 : this.txtweight) < 1
            ? 1
            : parseFloat(this.txtweight);
        this.$store.state.goodInfo = {
          packType: this.txtGoodType,
          goodName: this.txtGoodName,
          weigth: this.txtweight,
          width: this.txtWidth,
          height: this.txtheight,
          long: this.txtLong,
          cubic: this.txtCubic,
          remark: this.txttalk,
          goodNum: this.txtnum,
          goodMemo: this.goodMemo
        };
        this.goodList = [];
        // this.$router.push({
        //   path: this.redirect
        // });
        !this.redirect ? this.$router.go(-1) : $router.replace(this.redirect);
      }
    },
    btnIsPack() {
      if (this.ispack) {
        this.ispack = false;
        this.txttalk = this.txttalk.replace("请带纸箱 ", "");
      } else {
        this.ispack = true;
        this.txttalk += "请带纸箱 ";
      }
    },
    btnIsjd() {
      if (this.isjd) {
        this.isjd = false;
        this.txttalk = this.txttalk.replace("请带胶带 ", "");
      } else {
        this.isjd = true;
        this.txttalk += "请带胶带 ";
      }
    },
    btnIslink() {
      if (this.islink) {
        this.islink = false;
        this.txttalk = this.txttalk.replace("上门前联系 ", "");
      } else {
        this.islink = true;
        this.txttalk += "上门前联系 ";
      }
    },
    btnReduce(nt) {
      if (nt === 0) {
        this.txtweight = Number(this.txtweight) - 1;
      } else {
        this.txtnum = Number(this.txtnum) - 1;
      }
    },
    btnPlus(nt) {
      if (nt === 0) {
        this.txtweight = Number(this.txtweight) + 1;
      } else {
        this.txtnum = Number(this.txtnum) + 1;
      }
    }
  }
};
</script>
