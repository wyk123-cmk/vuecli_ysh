<style scoped>
.mint-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
}
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
.fqxqwk li {
  display: flex;
  align-items: center;
}
.fqxqwk-li-textfield {
  margin-top: 0;
}
.fqxqwk li .fqxqwk-li-textfield::-webkit-input-placeholder {
  color: #ccc;
  font-size: 13px;
}
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: 14px;
  height: 14px;
  font-size: 14px;
}

input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  background-color: #efeff8;
  color: #666666;
  width: 14px;
  height: 14px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 3px;
  border: 1px solid #ddd;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  font-size: 12px;
  font-weight: bold;
}
.sure_xx {
  margin-left: 10px;
  font-size: 14px;
}
.first_kp {
  color: red;
  font-size: 14px;
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
      <p class="zzfp">仪商汇快运发票类型可选专票和电子普票,无纸质普票,请谅解</p>
      <ul class="fqxqwk">
        <li>
          <span>发票类型：</span>
          <input
            type="radio"
            value="DInvoince"
            class="iconfont radio"
            name="rdoType"
            style="padding-right: 6px;"
            v-model="invoicetype"
          />
          <label>电子普票</label>

          <input
            type="radio"
            value="ZInvoince"
            class="iconfont radio"
            name="rdoType"
            style="padding-right: 6px;"
            v-model="invoicetype"
          />
          <label>专票</label>
        </li>
        <li>
          <span>发票抬头：</span>
          <label></label>
          <input
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写发票抬头"
            v-model="invoiceName"
          />
        </li>
        <li>
          <span>纳税人识别号：</span>
          <label></label>
          <input
            v-model="invoiceNumber"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写纳税人识别号"
          />
        </li>
        <li>
          <span>开户银行名称：</span>
          <label></label>
          <input
            v-model="bankName"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写开户银行名称"
          />
        </li>
        <li>
          <span>基本开户账号：</span>
          <label></label>
          <input
            v-model="bankCode"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写基本开户账号"
          />
        </li>
        <li>
          <span>注册场所地址：</span>
          <label></label>
          <input
            v-model="registAddress"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写注册场所地址"
          />
        </li>
        <li>
          <span>注册固定电话：</span>
          <label></label>
          <input
            v-model="mobile"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="企业开票请填写注册固定电话"
          />
        </li>
        <li>
          <span>发票项目：</span>
          <label></label>
          <p>{{ billType }}</p>
        </li>
        <li>
          <span>开票金额：</span>
          <label></label>
          <p>￥{{ Amount }}元</p>
        </li>
        <li>
          <textarea class="wengbqy" placeholder="备注" v-model="invoiceRemark"></textarea>
        </li>
      </ul>
      <ul class="fqxqwk">
        <li v-if="isShowPeople">
          <span>收票人手机：</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="请填写收票人手机"
            v-model="revicePhone"
          />
        </li>
        <li v-if="isShowPeople">
          <span>收票人姓名：</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="请填写收票人姓名"
            v-model="reviceName"
          />
        </li>
        <li>
          <span>收票人邮箱：</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="用来接收电子发票"
            v-model="reviceEmail"
          />
        </li>
        <li v-if="isShowPeople">
          <span>收票地址：</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="请选择"
            readonly="readonly"
            onfocus="this.blur();"
            v-model="reviceCity"
            @click="btnCity"
          />
        </li>
        <li v-if="isShowPeople">
          <span>详细地址：</span>
          <label for="textfield"></label>
          <input
            name="textfield"
            type="text"
            class="fqxqwk-li-textfield"
            placeholder="如凤凰小区一单元1501"
            v-model="reviceAddress"
          />
        </li>
        <li v-if="isFirstInvoice">
          <input type="checkbox" v-model="dataCheck" id="checkbox1" class="checkbox_box" />
          <label class="sure_xx">
            我已确认信息无误
            <a class="first_kp">首次开票</a>
          </label>
        </li>
      </ul>
      <p
        style="padding-left: 14px; padding-right: 14px; padding-top: 12px; margin-bottom:90px; margin-top: 12px;"
      >
        <input type="button" class="dlnrwk-an" value="确认开票" @click="btnSubmit" />
      </p>
    </div>
    <mt-popup v-model="isOkInfo" class="mint-popup">
      <div class="tanchuwk">
        <h2>发票信息确认</h2>
        <p>
          发票类型：
          <i>
            {{
            invoicetype == "DInvoince" ? "电子普票" : invoicetype == "ZInvoince" ? "专票" : ""
            }}
          </i>
        </p>
        <p>
          发票抬头：
          <i>{{ invoiceName }}</i>
        </p>
        <p>
          纳税人识别号：
          <i>{{ invoiceNumber }}</i>
        </p>
        <p v-if="isShowPeople">
          收票人手机号：
          <i>{{ revicePhone }}</i>
        </p>
        <h3>
          <em @click="btnCancel">取消</em>
          <s @click="btnOk">确认</s>
        </h3>
      </div>
    </mt-popup>
    <mt-popup v-model="isShowAddress" position="bottom" class="mint-popup">
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
        <p>1、线下充值后，如需开发票，此款项将不能退费，只能用于消费；</p>
        <p>2、申请增值税专用发票，每月只能申请一次，在20号之前申请统一在25号寄出；</p>
        <p>3、如有疑问，请添加客服微信(13811418661)。</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import {
  //getProvinceList,
  GetCompanyInvoiceInfo,
  CompanyInvoiceSubimt
} from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      idList: "",
      invoicetype: "",
      invoiceName: "",
      invoiceNumber: "",
      invoiceRemark: "",
      bankName: "",
      bankCode: "",
      registAddress: "",
      mobile: "",
      billType: "",
      Amount: "",
      reviceName: "",
      revicePhone: "",
      reviceEmail: "",
      reviceCity: "",
      reviceAddress: "",
      isShowPeople: true,
      isShowAddress: false,
      IsFirst: false,
      addressSlots: [],
      addressData: [],
      isOkInfo: false,
      isShowfp: false,
      isFirstInvoice: false,
      dataCheck: false
    };
  },
  watch: {
    invoicetype(val) {
      if (val == "DInvoince") {
        this.isShowPeople = false;
      } else {
        this.isShowPeople = true;
      }
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    this.idList = this.$route.query.idList;
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
    GetCompanyInvoiceInfo(this.idList).then(data => {
      if (!data) return;
      this.invoiceNumber = data.invoiceNumber;
      this.registAddress = data.cmpyAddress;
      this.mobile = data.cmpyTel;
      this.bankName = data.bank;
      this.bankCode = data.bankAccount;
      this.Amount = data.invoiceMoney.toFixed(2);
      this.billType = data.invoiceProject;
      this.invoiceName = data.invoiceName;
      this.reviceName = data.name;
      this.revicePhone = data.invoicePhone;
      this.isFirstInvoice = data.isFirstInvoice;
    });
  },
  methods: {
    btnCancel() {
      this.isOkInfo = false;
    },
    btnOk() {
      let params = {
        rechargeCodeList: this.idList,
        billType: this.invoicetype,
        invoiceName: this.invoiceName,
        invoiceNumber: this.invoiceNumber,
        invoiceRemark: this.invoiceRemark,
        bank: this.bankName,
        bankAccount: this.bankCode,
        cmpyAddress: this.registAddress,
        cmpyTel: this.mobile,
        name: this.reviceName,
        phone: this.revicePhone,
        email: this.reviceEmail,
        address: this.reviceCity + this.reviceAddress
      };
      CompanyInvoiceSubimt(params).then(data => {
        if (!data) {
          MessageBox.alert(this.$store.state.lastError.message).then();
          return;
        }

        MessageBox.alert("开票申请成功，等待审核").then(action => {
          this.$router.push({
            path: "/InvoiceHistory",
            redirect: "mycompany"
          });
        });
      });
    },
    Valid() {
      if (this.invoicetype == 0) {
        this.$toast({ duration: 1200, message: "请选择发票类型" });
        return false;
      }
      if (this.invoiceName == "") {
        this.$toast({ duration: 1200, message: "请填写发票抬头" });
        return false;
      }
      if (this.invoiceNumber == "") {
        this.$toast({ duration: 1200, message: "请填写纳税人识别号" });
        return false;
      }
      if (this.bankName == "") {
        this.$toast({ duration: 1200, message: "请填写开户银行" });
        return false;
      }
      if (this.bankCode == "") {
        this.$toast({ duration: 1200, message: "请填写银行账户" });
        return false;
      }
      if (this.registAddress == "") {
        this.$toast({ duration: 1200, message: "请填写注册所在场地" });
        return false;
      }
      if (this.mobile == "") {
        this.$toast({ duration: 1200, message: "请填写固定电话" });
        return false;
      }
      if (this.invoicetype == "ZInvoince" && this.reviceName == "") {
        this.$toast({ duration: 1200, message: "请填写收票人名称" });
        return false;
      }
      if (this.invoicetype == "ZInvoince" && this.revicePhone == "") {
        this.$toast({ duration: 1200, message: "请填写收票人手机" });
        return false;
      }
      if (this.reviceEmail == "") {
        this.$toast({ duration: 1200, message: "请填写收票人邮箱" });
        return false;
      } else if (!this.$util.isEmail(this.reviceEmail)) {
        this.$toast({ duration: 1200, message: "收票人邮箱格式错误" });
        return false;
      }
      if (this.invoicetype == "ZInvoince" && this.reviceCity == "") {
        this.$toast({ duration: 1200, message: "请选择收票人地址信息" });
        return false;
      }
      if (this.invoicetype == "ZInvoince" && this.reviceAddress == "") {
        this.$toast({ duration: 1200, message: "请填写收票人详细地址信息" });
        return false;
      }
      if (this.isFirstInvoice && !this.dataCheck) {
        this.$toast({
          duration: 1200,
          message: "您是首次开票，请验证并确认开票信息无误"
        });
        return false;
      }
      return true;
    },
    btnSubmit() {
      if (this.Valid() == true) {
        this.isOkInfo = true;
      }
    },
    btnCity() {
      this.isShowAddress = true;
    },
    onAddressChange(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      picker.setSlotValues(2, values[1].list);
      let arr = picker.getValues();
      this.reviceCity = `${arr[0].title}-${arr[1].title}-${arr[2].title}`;
    },
    btnPickCancle() {
      this.isShowAddress = false;
      this.reviceCity = "";
    },
    btnPickOk() {
      if (this.reviceCity === "" && this.addressData.length > 0) {
        this.reviceCity = `${this.addressData[0].title}-${this.addressData[0].list[0].title}-${this.addressData[0].list[0].list[0].title}`;
      }
      this.isShowAddress = false;
    }
  }
};
</script>
