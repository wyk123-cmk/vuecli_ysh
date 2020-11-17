
<style scoped>
.fpxz {
  padding: 14px;
  border-top: 1px solid #f7f7f7;
}
.fpxz h2 {
  padding-bottom: 14px;
  font-size: 14px;
  font-weight: bold;
}
.fpxz p {
  font-size: 13px;
  color: #666;
  padding-bottom: 4px;
  text-align: justify;
}
.fqxqwk > li > span {
  width: 98px;
}
.search-name {
  background: #fff;
  position: fixed;
  z-index: 10001;
  top: 180px;
  width: 100%;
  right: 0;
  height: 240px;
  padding-bottom: 10px;
  border-bottom: 5px solid #eee;
  padding-left: 10px;
  border-top: 0;
  left: 0;
  overflow: scroll;
}
.search-name li {
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">申请发票</h1>
      <a class="menu" @click="isShowfp=true">发票须知</a>
    </header>
    <div class="content">
      <p class="zzfp">根据相关规定，仪商汇快运暂时只提供电子发票，请谅解</p>
      <ul class="fqxqwk">
        <li>
          <span>发票类型</span>
          <input
            type="radio"
            class="iconfont radio"
            value="Company"
            v-model="invoiceOrderData.invoiceType"
            name="radio"
            @click="switchClick"
            style="padding-right: 6px;"
          />
          <label style="margin-right: 30px;">单位</label>
          <input
            type="radio"
            class="iconfont radio"
            value="Person"
            v-model="invoiceOrderData.invoiceType"
            name="radio"
            @click="switchClick"
            style="padding-right: 6px;"
          />
          <label>个人</label>
        </li>
        <li v-if="invoiceOrderData.invoiceType == 'Company'">
          <a>
            <span style="width: 96px;float: left;color: #999999;">发票抬头</span>
            <label></label>
            <input
              type="text"
              v-model="invoiceOrderData.invoiceName"
              class="fqxqwk-li-textfield"
              placeholder="请填写发票抬头"
            />
          </a>
          <!-- <ul>
            <li
              class="thisLi"
              v-for="(item,index) in searchData"
              :key="index"
              @click="selectName(item)"
              v-html="ruleTitle(item.companyName)"
            >{{item.companyName}}</li>
          </ul>-->
        </li>
        <li v-if="invoiceOrderData.invoiceType == 'Company'">
          <span>纳税人识别号</span>
          <label></label>
          <input
            type="text"
            v-model="invoiceOrderData.invoiceNumber"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写纳税人识别号"
          />
        </li>
        <li v-if="invoiceOrderData.invoiceType == 'Person'">
          <span>姓名</span>
          <label></label>
          <input
            type="text"
            v-model="invoiceOrderData.invoiceName"
            class="fqxqwk-li-textfield"
            placeholder="请填写开票人姓名"
          />
        </li>
        <li v-if="invoiceOrderData.invoiceType == 'Person'">
          <span>手机号</span>
          <label></label>
          <input
            type="text"
            v-model="invoiceOrderData.invoiceNumber"
            class="fqxqwk-li-textfield"
            placeholder="请填写开票人手机号"
          />
        </li>
        <li>
          <span>发票项目</span>
          <label></label>
          <p>国内货物运输代理服务</p>
        </li>
        <li>
          <span>开票金额</span>
          <label></label>
          <p>￥{{totalSum}}元</p>
        </li>
        <li>
          <textarea class="wengbqy" placeholder="备注" v-model="invoiceOrderData.invoiceRemark"></textarea>
        </li>
      </ul>
      <ul class="fqxqwk">
        <li>
          <span>收票人姓名</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            v-model="invoiceOrderData.name"
            class="fqxqwk-li-textfield"
            placeholder="请填写收票人姓名"
          />
        </li>
        <li>
          <span>收票人手机</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            v-model="invoiceOrderData.phone"
            class="fqxqwk-li-textfield"
            placeholder="请填写收票人手机"
          />
        </li>
        <li>
          <span>收票人邮箱</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            v-model="invoiceOrderData.mail"
            class="fqxqwk-li-textfield"
            placeholder="用来接收电子发票"
          />
        </li>
        <li>
          <span>收票地址</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            readonly
            class="fqxqwk-li-textfield"
            v-model="ProvinceCity"
            placeholder="请选择"
            @click="isShowAddress=true"
          />
        </li>

        <li>
          <span>详细地址</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            v-model="address"
            placeholder="详细地址"
          />
        </li>
      </ul>
      <p class="confirm-invoice">
        <input type="button" class="dlnrwk-an" @click="confirmInvoice" value="确认开票" />
      </p>
      <div
        v-if="isShow"
        style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.6);z-index: 3;"
      >
        <div class="tanchuwk" style="margin-top: 40%;">
          <h2>发票信息确认</h2>
          <p>
            发票类型：
            <i>{{invoiceOrderData.invoiceType=="Company"?'单位':'个人'}}</i>
          </p>
          <p v-if="invoiceOrderData.invoiceType == 'Company'">
            发票抬头：
            <i>{{invoiceOrderData.invoiceName}}</i>
          </p>
          <p v-if="invoiceOrderData.invoiceType == 'Company'">
            纳税人识别号：
            <i>{{invoiceOrderData.invoiceNumber}}</i>
          </p>
          <p v-if="invoiceOrderData.invoiceType == 'Person'">
            开票人姓名：
            <i>{{invoiceOrderData.invoiceName}}</i>
          </p>
          <p v-if="invoiceOrderData.invoiceType == 'Person'">
            开票人手机号：
            <i>{{invoiceOrderData.invoiceNumber}}</i>
          </p>
          <p>
            收票人邮箱：
            <i>{{invoiceOrderData.mail}}</i>
          </p>
          <h3>
            <em @click="cancel">取消</em>
            <s @click="twoConfirm">确认</s>
          </h3>
        </div>
      </div>
    </div>
    <div class="search-name" v-show="isSearch">
      <ul>
        <li
          v-for="(item, index) in searchData"
          :key="index"
          @click="selectName(item)"
        >{{ item.companyName }}</li>
      </ul>
    </div>
    <mt-popup v-model="isShowAddress" position="bottom" class="mint-popup" style="width:100%;">
      <mt-picker
        :slots="addressSlots"
        valueKey="title"
        @change="onAddressChange"
        :showToolbar="true"
      >
        <Slot>
          <div class="me-tel">
            <div @click="btnPickCancle">取消</div>
            <div style="color:green;" @click="btnPickOk">确定</div>
          </div>
        </Slot>
      </mt-picker>
    </mt-popup>
    <mt-popup
      v-model="isShowfp"
      class="mint-popup"
      position="right"
      style="height:calc(100vh - 0px)"
      popup-transition="popup-fade"
    >
      <div class="fpxz">
        <h2>
          <a class="iconfont icon-back" @click="isShowfp=false" style="margin-right:10px;"></a>发票须知
        </h2>
        <p>1、个人寄件，仪商汇快运暂时只提供增值税电子普通发票，请谅解</p>
        <p>2、请确定发票信息填写无误，点击“申请发票”，开票后不支持修改</p>
        <p>3、发票将在3-5个工作日内开好，电子普通发票以短信或邮件的形式发送至申请时填写的收票人手机或者邮箱上</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import {
  getInvoicePost,
  getMeIndex,
  getCompanyInfo,
  //getProvinceList
} from "../../api/api";
export default {
  data() {
    return {
      isShowAddress: false,
      addressSlots: [],
      addressData: [],
      redirect: "",
      totalSum: 0,
      IsFirst: false,
      isShow: false,
      isSearch: false,
      address: "", //收件人地址
      ProvinceCity: "", //收件人详细地址
      invoiceOrderData: {
        mastCodeList: [], //开票单号数组
        invoiceType: "Company", //发票类型 = ['Company', 'Person']
        invoiceName: "", //发票抬头
        invoiceNumber: "", //纳税人识别号（企业开票必须,个人身份证号）
        billType: "PInvoince", //发票形式 = ['PInvoince', 'EInvoince']
        invoiceRemark: "", //发票备注
        name: "", //收件人姓名
        phone: "", //手机号码
        mail: "",
        address: "" //收件人地址
      },
      userInfo: {},
      searchData: [],
      isShowfp: false
    };
  },
  watch: {
    "invoiceOrderData.invoiceName": function(val) {
      if (this.$util.isNotEmpty(val)) {
        if (this.searchData.length > 0) {
          if (this.searchData.some(item => item.companyName == val) === false) {
            this.GetCompantInfo();
          }
        } else {
          this.GetCompantInfo();
        }
      } else {
        this.isSearch = false;
      }
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    this.addressData = addressList;
    this.addressSlots = [
      {
        flex: 1,
        values: this.addressData,
        className: "slot1",
        textAlign: "center"
      },
      {
        flex: 1,
        values: this.addressData[0].list,
        className: "slot2",
        textAlign: "center"
      },
      {
        flex: 1,
        values: this.addressData[0].list[0].list,
        className: "slot3",
        textAlign: "center"
      }
    ];
    var orderInfo = this.$store.state.orderInfo;
    if (orderInfo != undefined) {
      this.invoiceOrderData["mastCodeList"] = orderInfo["mastCode"];
      this.totalSum = orderInfo["totalSum"];
    } else {
      //this.$router.replace("/jkd");
    }
    this.GetUserInfo();
  },
  methods: {
    confirmInvoice: function() {
      //确认开票
      if (
        this.invoiceOrderData.invoiceType == "Company" &&
        !this.$util.isNotEmpty(this.invoiceOrderData.invoiceName)
      ) {
        this.$toast({ duration: 1200, message: "请填写发票抬头" });
        return false;
      }
      if (
        this.invoiceOrderData.invoiceType == "Company" &&
        !this.$util.isNotEmpty(this.invoiceOrderData.invoiceNumber)
      ) {
        this.$toast({
          duration: 1200,
          message: "企业开票请填写纳税人识别号"
        });
        return false;
      }
      if (
        this.invoiceOrderData.invoiceType == "Person" &&
        !this.$util.isNotEmpty(this.invoiceOrderData.invoiceName)
      ) {
        this.$toast({ duration: 1200, message: "请填写开票人姓名" });
        return false;
      }
      if (
        this.invoiceOrderData.invoiceType == "Person" &&
        !this.$util.isNotEmpty(this.invoiceOrderData.invoiceNumber)
      ) {
        this.$toast({ duration: 1200, message: "请填写开票人手机号" });
        return false;
      }
      if (!this.$util.isNotEmpty(this.invoiceOrderData.name)) {
        this.$toast({ duration: 1200, message: "请填写收票人姓名" });
        return false;
      }
      if (!this.$util.isNotEmpty(this.invoiceOrderData.phone)) {
        this.$toast({ duration: 1200, message: "请填写收票人手机号" });
        return false;
      }
      if (!this.$util.isNotEmpty(this.invoiceOrderData.mail)) {
        this.$toast({ duration: 1200, message: "请填写收票人邮箱" });
        return false;
      }
      if (!this.$util.isNotEmpty(this.ProvinceCity)) {
        this.$toast({ duration: 1200, message: "请填写收票地址" });
        return false;
      }
      if (this.address == "") {
        this.$toast({ duration: 1200, message: "请填写收票地址" });
        return false;
      }

      // alert(isChecked);
      this.isShow = true;
      this.invoiceOrderData["address"] = this.ProvinceCity + this.address;
    },
    twoConfirm: function() {
      getInvoicePost(this.invoiceOrderData).then(data => {
        if (data == null) return false;
        if (data) {
          //历史开票
          this.$router.push({
            path: "/historicalInvoice",
            query: {
              redirect: "applicationInvoice?redirect=/me"
            }
          });
        }
      });
    },
    cancel: function() {
      this.isShow = false;
    },
    switchClick() {
      this.invoiceOrderData.invoiceName = "";
      this.invoiceOrderData.invoiceNumber = "";
    },
    GetUserInfo() {
      getMeIndex().then(data => {
        this.invoiceOrderData.name = data.userName;
        this.invoiceOrderData.phone = data.userPhone;
      });
    },
    GetCompantInfo() {
      getCompanyInfo({ keyWord: this.invoiceOrderData.invoiceName }).then(
        data => {
          if (!data) return;
          this.searchData = data;
          if (this.searchData.length > 0) {
            this.isSearch = true;
          } else {
            this.isSearch = false;
          }
        }
      );
    },
    selectName(item) {
      this.invoiceOrderData.invoiceName = item.companyName;
      this.invoiceOrderData.invoiceNumber = item.creditCode;
      this.isSearch = false;
    },
    onAddressChange(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      picker.setSlotValues(2, values[1].list);
      let arr = picker.getValues();
      this.ProvinceCity = `${arr[0].title}-${arr[1].title}-${arr[2].title}`;
    },
    btnPickCancle() {
      this.isShowAddress = false;
      this.ProvinceCity = "";
    },
    btnPickOk() {
      if (this.ProvinceCity === "" && this.addressData.length > 0) {
        this.ProvinceCity = `${this.addressData[0].title}-${this.addressData[0].list[0].title}-${this.addressData[0].list[0].list[0].title}`;
      }
      this.isShowAddress = false;
    }
  }
};
</script>