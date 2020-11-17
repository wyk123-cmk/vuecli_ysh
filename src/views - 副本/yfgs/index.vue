<style scoped>
.yfgs-input {
  float: left;
  font-size: 16px;
  font-weight: normal;
  padding-left: 14px;
  width: 80%;
  height: 24px;
}
.mint-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
}
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
  height: 36px;
  line-height: 36px;
}
.yfgs-num i {
  width: 26px;
  text-align: left;
  height: 36px;
  line-height: 36px;
}
.content {
  padding-top: 0px;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
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
    <div class="content" style="padding-top: 0;">
      <div class="yfgsnrwk1">
        <p>
          <a href="#">
            <img src="../../assets/images/jz.svg" alt />
            <input
              type="text"
              class="yfgs-input"
              readonly="readonly"
              onfocus="this.blur();"
              placeholder="选择寄件地址"
              v-model="sendAddress"
              @click="btnSend"
            />
          </a>
        </p>
        <p>
          <img src="../../assets/images/sz.svg" alt />
          <input
            type="text"
            class="yfgs-input"
            placeholder="选择收件地址"
            readonly="readonly"
            onfocus="this.blur();"
            v-model="receiptAddress"
            @click="btnReceipt"
          />
        </p>
      </div>
      <ul class="nrwk2">
        <li @click="isShowCompany = true">
          物流公司
          <span style="display:flex;">
            <img style="margin-right:4px;width:24px;height:24px;" :src="companyImg" v-show="isPic" />
            {{ selectCompanyName }}
          </span>
        </li>
        <li>
          预估重量
          <span class="yfgs-num">
            <a style="border-right:1px solid #eee;" @click="btnReduce">-</a>
            <input
              type="number"
              placeholder="1"
              v-model="txtweight"
              onkeyup="this.value=this.value.replace(/D/g,'')"
              onafterpaste="this.value=this.value.replace(/D/g,'')"
            />
            <i>kg</i>
            <a style="border-left:1px solid #eee;" @click="btnPlus">+</a>
          </span>
        </li>
        <li>
          体积填写
          <div class="good-tj">
            <span>
              <input type="text" class="nrwk1-li-span-input" placeholder="长" v-model="txtLong" />
              <em>cm</em>
              <s>*</s>
            </span>
            <span>
              <input type="text" class="nrwk1-li-span-input" placeholder="宽" v-model="txtWidth" />
              <em>cm</em>
              <s>*</s>
            </span>
            <span>
              <input type="text" class="nrwk1-li-span-input" placeholder="高" v-model="txtheight" />
              <em>cm</em>
            </span>
            <p>
              <i>m³</i>
              <input type="text" class="nrwk2-li-p-input" placeholder="0" v-model="txtCubic" />总体积：
            </p>
          </div>
        </li>
        <li>
          寄件时间
          <span @click="showTime = true">
            {{
            selectNo == 1
            ? ""
            : selectNo == 2
            ? "明天"
            : selectNo == 3
            ? "后天"
            : ""
            }}
            {{ sendTime }}
          </span>
        </li>
		<p class="tip">
				 注：因平台相关优惠折扣与物流产品相关，为确保您可享受平台便利，望合理填写产品重量及体积，预估与实际重量差距过大会产生无折扣订单，敬请留意！
		</p>
        <p class="cx-btn">
          <input type="button" class="dlnrwk-an" value="查询" @click="btnSearch" />
        </p>
        <p
          v-show="isShow"
          class="cx-btn"
          style="color:red;text-align:right;padding:10px 10px 0px 0px;"
        >* 以下内容为估算值,请以实际揽收为准</p>
      </ul>
      <!-- <ul class="yfgslbnrwk" v-show="isShow">
        <p>
          <span>产品类型</span>
          <i>价格</i>
          <s>预计时效</s>
        </p>
        <li v-for="(item, index) in ProductList" :key="index">
          <span>{{ item.productName }}</span>
          <i style="color:red;">￥{{ item.price }}</i>
          <s>{{ item.receivedTime }}</s>
        </li>
      </ul>-->
      <ul class="daoda" style="margin-top:5px;margin-bottom:70px;" v-show="isShow">
        <h2>产品类型</h2>
        <div v-for="(item, index) in ProductList" :key="index">
          <li>
            <h3>
              <img src="../../assets/images/sf.png" v-if="item.companyCode === 'sf001'" />
              <img src="../../assets/images/db.png" v-if="item.companyCode === 'db001'" />
              <span>
                <label>{{ item.productName }}</label>
                <br />
                {{
                item.receivedTime == "" || item.receivedTime == null
                ? "——"
                : item.receivedTime
                }}
              </span>
            </h3>
            <p v-if="item.price>0">
              ￥
              <span>{{ item.price }}</span>
              <br />
              <label v-if="item.price != item.originalPrice">
                市场价
                <span>￥{{ item.originalPrice }}</span>
              </label>
            </p>
            <p v-else>
              <span>——</span>
            </p>
          </li>
          <p
            v-if="item.companyCode==='db001'&& $util.isNotEmpty(item.otherPriceMemo)"
            style="text-align: right; font-size: 12px; color: red; padding-bottom: 10px;"
          >{{item.otherPriceMemo}}</p>
          <p
            v-if="item.SpecialMemo!=''"
            style="text-align: right; font-size: 12px; color: red; padding-bottom: 10px;"
          >{{item.SpecialMemo}}</p>
        </div>
      </ul>
    </div>
    <mt-popup v-model="addShow" position="bottom" class="mint-popup">
      <mt-picker
        :slots="addressSlots"
        valueKey="title"
        @change="onAddressChange"
        :showToolbar="true"
        ref="addressPicker"
      >
        <Slot>
          <div class="me-tel">
            <div @click="btnPickCancle">取消</div>
            <div style="color:green;" @click="btnPickOk">确定</div>
          </div>
        </Slot>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="showTime" position="bottom" class="mint-popup" style="width:100%;">
      <div class="layer-time">
        <div class="time">
          <div class="tab-time">
            <a :class="{ tabtimeactive: selectNo == 1 }" @click="btnSelectTime(1)" id="lbltoday">今天</a>
            <a :class="{ tabtimeactive: selectNo == 2 }" @click="btnSelectTime(2)">明天</a>
            <a :class="{ tabtimeactive: selectNo == 3 }" @click="btnSelectTime(3)">后天</a>
          </div>
          <ul class="time-time">
            <mt-picker :slots="companyTimeSlots" @change="onCompanyTimeChange"></mt-picker>
          </ul>
        </div>
        <!-- <button class="time-btn" @click="btnOkTime">确认</button> -->
      </div>
    </mt-popup>
    <mt-popup v-model="isShowCompany" position="bottom" class="mint-popup" style="width:100%;">
      <mt-picker :slots="companyList" @change="onCompanyChange" value-key="companyName"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import {
  //getProvinceList,
  getEstimatePrice,
  getExpressCompany
} from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      sendCode: "",
      sendAddress: "",
      receiptAddress: "",
      recerptCode: "",
      addShow: false,
      addressSlots: [],
      addressData: [],
      expressType: 1,
      txtweight: 1,
      createTime: "",
      sendTime: "一小时内",
      showTime: false,
      selectNo: 1,
      companyTimeSlots: [],
      selectStartTime: 8,
      selectEndTime: 18,
      companyTimeData: [],
      ProductList: [],
      isShow: false,
      selectCompanyName: "全部",
      selectCompanyCode: "",
      isShowCompany: false,
      companyList: [],
      companyImg: "",
      isPic: false,
      txtCubic: 0,
      txtheight: "",
      txtWidth: "",
      txtLong: "",
      pIndex: 0,
      cIndex: 0,
      aIndex: 0,
      provinceValue: []
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
      this.txtCubic = val > 0 ? val : 0.01;
    },
    addShow(val) {
      if (val == true) {
        this.remeberIndex(); // 处理回显
        this.addressSlots = [];
        this.$nextTick(() => {
          this.addressSlots = [
            {
              flex: 1,
              values: this.addressData,
              className: "slot1",
              textAlign: "center",
              defaultIndex: this.pIndex
            },
            {
              flex: 1,
              values: this.addressData[this.pIndex].list,
              className: "slot2",
              textAlign: "center",
              defaultIndex: this.cIndex
            },
            {
              flex: 1,
              values: this.addressData[this.pIndex].list[this.cIndex].list,
              className: "slot3",
              textAlign: "center",
              defaultIndex: this.aIndex
            }
          ];
        });
      }
    },
    txtweight(val) {
      if (this.$util.isNotEmpty(val)) {
        if (parseFloat(val) <= 0) {
          this.txtweight = 1;
        }
      }
    }
  },
  mounted() {
    this.btnSelectTime(1);
    this.addressData = addressList;
    this.addressSlots = [
      {
        flex: 1,
        values: this.addressData,
        className: "slot1",
        textAlign: "center",
        defaultIndex: this.pIndex
      },
      {
        flex: 1,
        values: this.addressData[this.pIndex].list,
        className: "slot2",
        textAlign: "center",
        defaultIndex: this.cIndex
      },
      {
        flex: 1,
        values: this.addressData[this.pIndex].list[this.cIndex].list,
        className: "slot3",
        textAlign: "center",
        defaultIndex: this.aIndex
      }
    ];
    this.provinceValue = this.addressSlots;
    getExpressCompany({ companyType: "All" }).then(data => {
      data.push({ companyName: "全部", companyCode: "" });
      if (data.length <= 0) return;
      this.companyList = [
        {
          flex: 1,
          values: data,
          textAlign: "center"
        }
      ];
    });
  },
  methods: {
    remeberIndex() {
      let pName = "";
      let cName = "";
      let aName = "";
      if (
        this.expressType == 1 &&
        this.$util.isNotEmpty(this.sendCode) &&
        this.$util.isNotEmpty(this.sendAddress) &&
        this.addressData.length > 0
      ) {
        let addressItem = this.sendAddress.split("-");
        if (addressItem.length > 0) {
          pName = addressItem[0];
          cName = addressItem[1];
          aName = addressItem[2];
        }
      }
      if (
        this.expressType == 2 &&
        this.$util.isNotEmpty(this.recerptCode) &&
        this.$util.isNotEmpty(this.receiptAddress) &&
        this.addressData.length > 0
      ) {
        let addressItem = this.receiptAddress.split("-");
        if (addressItem.length > 0) {
          pName = addressItem[0];
          cName = addressItem[1];
          aName = addressItem[2];
        }
      }
      if (this.$util.isNotEmpty(pName.trim())) {
        let prinvoiceList = this.addressData.map(res => {
          return res.title;
        });
        this.pIndex = prinvoiceList.indexOf(pName);
      } else {
        this.pIndex = 0;
      }
      if (this.$util.isNotEmpty(cName.trim())) {
        let cityList = this.addressData[this.pIndex].list.map(res => {
          return res.title;
        });
        this.cIndex = cityList.indexOf(cName);
      } else {
        this.cIndex = 0;
      }
      if (this.$util.isNotEmpty(aName.trim())) {
        let areaList = this.addressData[this.pIndex].list[this.cIndex].list.map(
          res => {
            return res.title;
          }
        );
        this.aIndex = areaList.indexOf(aName);
      } else {
        this.aIndex = 0;
      }
    },
    onCompanyChange(picker, values) {
      if (values.length < 1) return;
      this.selectCompanyName = picker.getValues()[0].companyName;
      this.selectCompanyCode = picker.getValues()[0].companyCode;
      if (
        picker.getValues()[0].logoPath != null &&
        picker.getValues()[0].logoPath != ""
      ) {
        this.companyImg = picker.getValues()[0].logoPath;
        this.isPic = true;
      } else {
        this.isPic = false;
      }
    },
    btnOkTime() {
      this.showTime = false;
    },
    onCompanyTimeChange(picker, values) {
      if (values.length <= 0) return;
      this.sendTime = values[0];
    },
    btnSelectTime(tn) {
      this.companyTimeData = [];
      this.selectNo = tn;
      let startNum = this.selectStartTime;
      let dt = new Date();
      if (
        dt.getHours() >= this.selectStartTime &&
        dt.getHours() < this.selectEndTime &&
        tn === 1
      ) {
        this.companyTimeData.push("一小时内");
        startNum = dt.getHours() + 1;
      }
      for (var i = startNum; i < this.selectEndTime; i++) {
        let endNum = i + 1;
        this.companyTimeData.push(i + ":00-" + endNum + ":00");
      }
      this.companyTimeSlots = [
        {
          flex: 1,
          values: this.companyTimeData,
          textAlign: "center"
        }
      ];
    },
    btnSearch() {
      if (this.sendCode === "" || this.sendCode === null) {
        this.$toast({ duration: 1000, message: "请选择寄件地址" });
        return;
      }
      if (this.recerptCode === "" || this.recerptCode === null) {
        this.$toast({ duration: 1000, message: "请选择收件地址" });
        return;
      }
      let sdate = new Date();
      if (this.selectNo === 2) {
        sdate = new Date(sdate.setDate(sdate.getDate() + 1));
      } else if (this.selectNo === 3) {
        sdate = new Date(sdate.setDate(sdate.getDate() + 2));
      }

      let year = sdate.getFullYear();
      let month = sdate.getMonth() + 1;
      let day = sdate.getDate();
      let hour = sdate.getHours();
      let shour = this.sendTime.split("-");
      if (shour.length > 1) {
        hour = shour[0] + ":00";
      } else {
        hour = hour + ":" + sdate.getMinutes();
      }
      this.createTime = year + "-" + month + "-" + day + " " + hour;
      var params = {
        companyCode: this.selectCompanyCode,
        weight: this.txtweight,
        areaCodeFrom: this.sendCode,
        areaCodeTo: this.recerptCode,
        sendTime: this.createTime,
        volume: this.txtCubic <= 0 ? 0 : this.txtCubic
      };
      getEstimatePrice(params).then(data => {
        if (!data) return;
        this.isShow = true;
        this.ProductList = data;
      });
    },
    btnReduce() {
      if (this.txtweight - 1 <= 0) {
        this.txtweight = 1;
      } else {
        this.txtweight = Number(this.txtweight) - 1;
      }
    },
    btnPlus() {
      this.txtweight = Number(this.txtweight) + 1;
    },
    btnSend() {
      console.log("===");
      this.expressType = 1;
      this.addShow = true;
    },
    btnReceipt() {
      this.expressType = 2;
      this.addShow = true;
    },
    btnPickCancle() {
      this.addShow = false;
      if (this.expressType === 1) {
        this.sendAddress = "";
        this.sendCode = "";
      } else {
        this.receiptAddress = "";
        this.recerptCode = "";
      }
    },
    btnPickOk() {
      if (
        this.sendCode === "" &&
        this.sendAddress === "" &&
        this.addressData.length > 0 &&
        this.expressType === 1
      ) {
        this.sendCode = this.$refs.addressPicker.getValues()[2].code;
        this.sendAddress = `${this.$refs.addressPicker.getValues()[0].title}-${
          this.$refs.addressPicker.getValues()[1].title
        }-${this.$refs.addressPicker.getValues()[2].title}`;
      }
      if (
        this.recerptCode === "" &&
        this.receiptAddress === "" &&
        this.addressData.length > 0 &&
        this.expressType === 2
      ) {
        this.recerptCode = this.$refs.addressPicker.getValues()[2].code;
        this.receiptAddress = `${
          this.$refs.addressPicker.getValues()[0].title
        }-${this.$refs.addressPicker.getValues()[1].title}-${
          this.$refs.addressPicker.getValues()[2].title
        }`;
      }
      this.addShow = false;
      this.provinceValue = this.addressSlots;
    },
    onAddressChange(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      picker.setSlotValues(2, values[1].list);
      let arr = picker.getValues();
      if (this.expressType === 1) {
        this.sendCode = `${arr[2].code}`;
        this.sendAddress = `${arr[0].title}-${arr[1].title}-${arr[2].title}`;
      } else {
        this.recerptCode = `${arr[2].code}`;
        this.receiptAddress = `${arr[0].title}-${arr[1].title}-${arr[2].title}`;
      }
    }
  }
};
</script>
