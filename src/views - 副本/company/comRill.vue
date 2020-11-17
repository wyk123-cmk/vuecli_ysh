<style scoped>
.qycz {
  background: linear-gradient(#ff822e 1%, #fff 60%);
  padding: 20px 14px;
}
.czzh {
  background: url(../../assets/images/bank.svg) no-repeat bottom -30px right -30px,
    linear-gradient(135deg, #fef7d3, #fbe5b4);
  height: 140px;
  border-radius: 10px;
  padding: 14px;
  position: relative;
  box-shadow: 0 0 4px #ffc8a3;
}
.czzh p,
.czzh h2,
.czzh h4 {
  color: #bb6838;
}
.czzh p {
  font-size: 14px;
  padding-bottom: 16px;
}
.czzh h4 {
  font-size: 12px;
  padding-bottom: 16px;
}
.czzh h2 {
  font-size: 7vw;
  text-align: justify;
  width: 100%;
}
.copy {
  position: absolute;
  font-size: 12px;
  text-align: center;
  transform: scale(0.68);
  right: 14px;
  color: #918263;
}
.copy img {
  width: 20px;
  height: 20px;
}
.qycz > p {
  color: #999;
  font-size: 12px;
  padding-top: 10px;
  text-align: justify;
  line-height: 20px;
}
.scpz {
  background: #fff;
  padding: 14px;
  border-top: 8px solid #f7f7f7;
}
.scpz textarea {
  width: calc(100% - 20px);
  margin-top: 10px;
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
}
.upload img {
  width: 68px;
  height: 68px;
  position: absolute;
}
.upload {
  position: relative;
  height: 80px;
}
.upload input {
  position: absolute;
  height: 68px;
  width: 68px;
  opacity: 0;
}
.comp-btn {
  position: fixed;
  left: 0;
  right: 0;
  height: 46px;
  background: #4285f4;
  line-height: 46px;
  bottom: 0;
  text-align: center;
}
.comp-btn input {
  background: #4285f4;
  color: #fff;
  height: 46px;
  line-height: 46px;
  width: 100%;
}

::-webkit-input-placeholder {
  color: #999;
  font-size: 16px;
}
.sc-qyzz-file {
  z-index: 2;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">企业充值</h1>
      <router-link
        :to="{
          path: 'RillRecord',
          query: { redirect: $router.currentRoute.fullPath }
        }"
        class="menu"
        >充值记录</router-link
      >
    </header>
    <div class="content" style="overflow-x:hidden;">
      <div class="qycz">
        <div class="czzh">
          <div class="copy" style="margin-top:15px;">
            <img src="../../assets/images/copy.svg" /><br />
            <span
              v-clipboard:copy="
                CompanyName + '\r\n' + BankName + '\r\n' + BankCode + '\r\n'
              "
              v-clipboard:success="onCopy"
              >复制</span>
          </div>
          <p>账户名称<br />{{ CompanyName }}</p>
          <h4>开户行<br />{{ BankName }}</h4>
          <h2>{{ BankCode }}</h2>
        </div>
        <p>
          <span style="">友情提示：</span
          >线下充值后，请上传您的付款凭证（银行转账交易回单截图），工作日上班时间(09:00-18:00)平台将在收到款后2小时为您充值。
        </p>
      </div>
      <div class="scpz">
        <h2>充值金额</h2>
        <span style="display:flex;flex-flow:row;padding-top:10px;"
          ><i style="font-size:24px;">￥</i>
          <input
            type="number"
            v-model.number.trim="txtAmount"
            pattern="[0-9]{,6}"
            @input="handleAmountChange"
            style="color:#E60000;font-size:24px;width:100%;"
            placeholder="请输入充值金额"
        /></span>
      </div>
      <div class="scpz" style="margin-bottom: 60px;">
        <h2>上传凭证</h2>
        <textarea rows="3" placeholder="备注：" v-model="Remark"></textarea>
        <div
          class="upload"
          v-if="BankImgUrl == '' || BankImgUrl == null"
          @click="UploadImg"
        >
          <img src="../../assets/images/add-pic.svg" />
          <input
            type="file"
            accept="image/jpeg, image/png, image/bmp"
            class="sc-qyzz-file"
            @change="UploadImgWeb"
            ref="rill"
            v-if="isWeb == true"
          />
        </div>
        <div class="upload" v-else @click="UploadImg">
          <img :src="BankImgUrl" />
          <input
            type="file"
            accept="image/jpeg, image/png, image/bmp"
            class="sc-qyzz-file"
            @change="UploadImgWeb"
            ref="rill"
            v-if="isWeb == true"
          />
        </div>
      </div>
    </div>
    <div class="comp-btn">
      <input
        type="submit"
        value="提交凭证"
        @click="btnRill"
        :disabled="isSubmit"
      />
    </div>
  </div>
</template>
<script>
import {
  UploadFile,
  GetCompanyAmount,
  CompanyRill,
  UploadFileWeb
} from "../../api/api";
import wxutil from "../../common/js/wx.js";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      CompanyName: "",
      BankName: "",
      BankCode: "",
      BankImgUrl: "",
      Remark: "",
      isSubmit: false,
      txtAmount: "",
      isWeb: false
    };
  },
  mounted() {
    $("body").css("background", "#f7f7f7");
    this.redirect = this.$route.query.redirect;
    GetCompanyAmount().then(data => {
      this.CompanyName = data.companyName;
      this.BankCode = data.bankAccount
        .replace(/\s/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1" + " ");
      this.BankName = data.bank;
    });
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isWeb = false;
    } else {
      this.isWeb = true;
    }
  },
  methods: {
    UploadImgWeb(event) {
      if (this.$refs.rill.files.length < 1) return;
      let file = this.$refs.rill.files[0];
      let param = new FormData();
      param.append("update_file", file);
      param.append("FileName", "CompanyRillRecord");
      UploadFileWeb(param, progress => {}).then(data => {
        this.$indicator.close();
        if (!data) return;
        this.BankImgUrl = data;
      });
    },
    handleAmountChange(e) {
      this.txtAmount = e.target.value;
      this.txtAmount = this.txtAmount.replace(/^\./g, "0.");
      this.txtAmount = this.txtAmount.replace(/\.{2,}/g, ".");
      this.txtAmount = this.txtAmount
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      this.txtAmount = this.txtAmount.replace(
        /^()*(\d+)\.(\d\d).*$/,
        "$1$2.$3"
      );
    },
    btnRill() {
      if (this.BankImgUrl == "" || this.BankImgUrl == null) {
        this.$toast({ duration: 1000, message: "请上传充值凭证" });
        return;
      } else if (this.txtAmount == "" || this.txtAmount == null) {
        this.$toast({ duration: 1000, message: "请填写充值金额" });
        return;
      } else {
        this.isSubmit = true;
        let params = {
          credentials: this.BankImgUrl,
          remark: this.Remark,
          amount: this.txtAmount
        };
        CompanyRill(params).then(data => {
          if (data) {
            this.isSubmit = false;
            MessageBox.alert("充值申请已提交,请等待审核").then(action => {
              this.$router.push({
                path: "/mycompany"
              });
            });
          }
        });
      }
    },
    onCopy() {
      this.$toast({ duration: 1000, message: "复制成功", position: "top" });
    },
    UploadImg() {
      if (this.isWeb) {
        this.UploadImgWeb();
        return;
      }
      let that = this;
      wxutil.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          let localIds = res.localIds[0];
          that.BankImgUrl = localIds;
          wxutil.uploadImage({
            chooseImageId: localIds,
            success: function(resup) {
              let servesId = resup.serverId;
              let params = { mediaId: servesId, FileName: "CompanyRillRecord" };
              UploadFile(params).then(data => {
                that.BankImgUrl = data;
              });
            }
          });
        }
      });
    }
  }
};
</script>
