<style scoped>
.qy-infor {
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0px 14px;
}
.qy-infor li {
  padding: 12px 0px;
}
.qy-infor li span {
  padding-left: 10px;
}
.qy-infor li + li {
  border-top: 1px solid #f7f7f7;
}
.qy-infor li span {
  width: calc(100% - 45px);
}
.sc-qyzz {
  padding: 10px 14px;
  overflow: hidden;
}
.sc-qyzz a + a {
  margin-left: 4%;
}
.input-group {
  background: #fff;
}
.sc-qyzz a {
  display: block;
  float: left;
  width: 48%;
  text-align: center;
}
.sc-qyzz a label {
  color: #666;
  font-size: 12px;
}
.sc-qyzz a img {
  width: 100%;
}
.title {
  padding: 14px;
}
.sqsxa {
  padding-left: 14px;
}
.sqsxa a {
  background: #fff;
  color: red;
}
.sqsxa span {
  font-size: 12px;
  color: #999;
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
}
.packname {
  width: 75%;
  text-overflow: ellipsis;
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
  top: 124px;
  width: calc(100% - 40px);
  right: 0;
  height: auto;
  padding-bottom: 10px;
  margin: 0 14px;
  border: 1px solid #eee;
  padding-left: 10px;
  border-top: 0;
  left: 0;
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
.xzk {
  border: 1px solid #999;
}
.sc-qyzz-file {
  position: absolute;
  z-index: 2;
  width: 40%;
  height: 15%;
  opacity: 0;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/me')"></a>
      <h1 class="tab-title">认领公司</h1>
    </header>
    <div class="content" style="margin-bottom:100px;overflow: scroll;">
      <label
        style="color:#999;font-size: 12px;padding:10px 14px ;display: block;"
        >用户提交的申请信息，只作为审核使用，不会公开展示</label
      >
      <ul class="qy-infor">
        <li>
          企业名称<span>
            <input
              type="search"
              placeholder="请输入企业名称"
              autocomplete="off"
              class="packname"
              v-model="CompanyName"
          /></span>
        </li>
        <li @click="IsCompanyType = true">
          企业身份
          <span
            >{{ CompanyTypeTitle
            }}<a class="iconfont yjt" style="float:right;"></a
          ></span>
        </li>
      </ul>
      <form class="input-group" style="margin-top:8px;padding-bottom: 14px;">
        <div class="title">上传图片</div>
        <div class="sc-qyzz">
          <input
            type="file"
            accept="image/jpeg, image/png, image/bmp"
            class="sc-qyzz-file"
            @change="UploadYzImgWeb"
            ref="yz"
            v-if="isWeb == true"
          />
          <a @click="UploadYzImg">
            <img src="../../assets/images/yy.png" v-if="yzImgUrl == ''" />
            <img :src="yzImgUrl" v-else />
            <label>营业执照</label>
          </a>
          <input
            type="file"
            accept="image/jpeg, image/png, image/bmp"
            class="sc-qyzz-file"
            @change="UploadSqImgWeb"
            ref="sq"
            v-if="isWeb == true"
          />
          <a @click="UploadSqImg">
            <img src="../../assets/images/sq-book.png" v-if="sqImgUrl == ''" />
            <img :src="sqImgUrl" v-else />
            <label>授权说明书</label>
          </a>
        </div>
        <p class="sqsxa">
          <a href="http://express.1718china.cn/docs/yshsqsms.docx"
            >下载授权书模板</a
          >填写信息盖章拍照上传<br /><span
            >注：ios需要在Safari浏览器中打开文件进行下载</span
          >
        </p>
      </form>
      <div class="fwxy">
        <input
          name="radio"
          type="checkbox"
          class="xzk xy"
          v-model="IsAgree"
        />我已阅读并同意
        <i style="color:rgb(66, 133, 244)" @click="showxy = true"
          >《仪商汇平台认领服务协议》</i
        >
      </div>
    </div>
    <div class="comp-btn" @click="btnSubmit">
      <input type="submit" value="立即认证" />
    </div>
    <div class="search-name" v-show="isSearch">
      <ul>
        <li
          v-for="(item, index) in CompanyList"
          :key="index"
          @click="btnGetCompanyName(item.companyName)"
        >
          {{ item.companyName }}
        </li>
      </ul>
    </div>
    <mt-popup
      v-model="IsCompanyType"
      position="bottom"
      class="mint-popup"
      style="width:100%;"
    >
      <mt-picker
        :slots="CompanyTypeData"
        @change="onChangeCompanyType"
        value-key="name"
      ></mt-picker>
    </mt-popup>

    <mt-popup
      v-model="showxy"
      class="mint-popup"
      style="width:100%;height:calc(100vh - 110px);overflow:scroll;"
    >
    <div v-html="YSHclainAgree"></div>
    </mt-popup>
  </div>
</template>
<script>
import {
  UploadFile,
  getCompanyInfo,
  CompanyClaim,
  UploadFileWeb,
  getIsFinishUserInfo
} from "../../api/api";
import { MessageBox } from "mint-ui";
import wxutil from "../../common/js/wx.js";
import {AgreeContent} from "../../../static/js/claimAgree"
export default {
  data() {
    return {
      YSHclainAgree:AgreeContent,
      IsCompanyType: false,
      isSearch: false,
      CompanyName: "",
      CompanyList: [],
      CompanyTypeTitle: "请选择",
      CompanyTypeId: "0",
      CompanyTypeData: [
        {
          flex: 1,
          values: [
            { id: 0, name: "请选择" },
            { id: 1, name: "生产商" },
            { id: 2, name: "代理商" },
            { id: 3, name: "采购商" }
          ],
          textAlign: "center"
        }
      ],
      yzImgUrl: "",
      sqImgUrl: "",
      IsAgree: false,
      showxy: false,
      isWeb: false
    };
  },
  watch: {
    showxy(val) {
      if (val === false) {
        $(".yqcxyshow")[0].scrollTop = 0;
      }
    },
    CompanyName(val) {
      if (this.$util.isNotEmpty(val)) {
        if (this.CompanyList.length > 0) {
          if (
            this.CompanyList.some(item => item.companyName == val) === false
          ) {
            this.GetCompanyList();
          }
        } else {
          this.GetCompanyList();
        }
      } else {
        this.isSearch = false;
      }
    }
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isWeb = false;
    } else {
      this.isWeb = true;
    }
    getIsFinishUserInfo({ token: localStorage.getItem('token') }).then(IsFinish => {
      if (!IsFinish) {
        MessageBox.alert("认领企业需完善个人信息，立即完善").then(action => {
          this.$router.push({
            path: "/peopleInfo",
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          });
        });
      }
    });
  },
  methods: {
    UploadSqImgWeb(event) {
      if (this.$refs.sq.files.length < 1) return;
      let file = this.$refs.sq.files[0];
      let param = new FormData();
      param.append("update_file", file);
      param.append("FileName", "Company");
      UploadFileWeb(param, progress => {}).then(data => {
        this.$indicator.close();
        if (!data) return;
        this.sqImgUrl = data;
      });
    },
    UploadYzImgWeb(event) {
      if (this.$refs.yz.files.length < 1) return;
      let file = this.$refs.yz.files[0];
      let param = new FormData();
      param.append("update_file", file);
      param.append("FileName", "Company");
      UploadFileWeb(param, progress => {}).then(data => {
        this.$indicator.close();
        if (!data) return;
        this.yzImgUrl = data;
      });
    },
    Valid() {
      if (this.CompanyName == "" || this.CompanyName == null) {
        this.$toast({ duration: 1000, message: "认领企业名称不能为空" });
        return false;
      }
      if (this.CompanyTypeId == "" || this.CompanyTypeId == "0") {
        this.$toast({ duration: 1000, message: "请选择企业身份" });
        return false;
      }
      if (this.yzImgUrl == "" || this.yzImgUrl == null) {
        this.$toast({ duration: 1000, message: "请上传营业执照" });
        return false;
      }
      if (this.sqImgUrl == "" || this.sqImgUrl == null) {
        this.$toast({ duration: 1000, message: "请上传授权委托书" });
        return false;
      }
      if (this.IsAgree === false) {
        this.$toast({
          duration: 1000,
          message: "请仔细阅读《仪企查认证服务协议》并同意"
        });
        return false;
      }
      return true;
    },
    btnSubmit() {
      if (this.Valid()) {
        let params = {
          cmpyName: this.CompanyName,
          attachment1: this.yzImgUrl,
          attachment2: this.sqImgUrl,
          cmpyType: this.CompanyTypeId
        };
        CompanyClaim(params).then(data => {
          if (data == true) {
            this.$router.push({
              path: "/examine"
            });
          }
        });
      }
    },
    btnGetCompanyName(name, code) {
      this.CompanyName = name;
      this.isSearch = false;
    },
    GetCompanyList() {
      getCompanyInfo({ keyWord: this.CompanyName }).then(data => {
        if (!data) return;
        this.CompanyList = data;
        if (this.CompanyList.length > 0) {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      });
    },
    onChangeCompanyType(picker, values) {
      this.CompanyTypeTitle = picker.getValues()[0].name;
      this.CompanyTypeId = picker.getValues()[0].id;
    },
    UploadYzImg() {
      if (this.isWeb === true) return;
      let that = this;
      wxutil.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          let localIds = res.localIds[0];
          that.yzImgUrl = localIds;
          wxutil.uploadImage({
            chooseImageId: localIds,
            success: function(resup) {
              let servesId = resup.serverId;
              let params = { mediaId: servesId, FileName: "Company" };
              UploadFile(params).then(data => {
                that.yzImgUrl = data;
              });
            }
          });
        }
      });
    },
    UploadSqImg() {
      if (this.isWeb === true) return;
      let that = this;

      wxutil.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          let localIds = res.localIds[0];
          that.sqImgUrl = localIds;
          wxutil.uploadImage({
            chooseImageId: localIds,
            success: function(resup) {
              let servesId = resup.serverId;
              let params = { mediaId: servesId, FileName: "Company" };
              UploadFile(params).then(data => {
                that.sqImgUrl = data;
              });
            }
          });
        }
      });
    }
  }
};
</script>
