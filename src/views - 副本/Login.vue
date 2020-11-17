<style scoped>
.login-con {
  background: #fff;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.logo-img {
  padding: 40px 24px 14px;
}
.logo-img img {
  width: 50px;
  height: 50px;
}
</style>
</style>
<template>
  <div>
    <div class="content login-con">
      <!-- <div style="display:flex;">
      <img src="../assets/images/Logo.png" style="width:80px;height:80px;margin:auto;" />
      </div>-->
      <div class="logo-img">
        <img src="../assets/images/logo-img.svg" />
      </div>
      <div class="dlbtwk">
        <h2>手机号快捷登录</h2>未注册用户登录默认成为平台用户
      </div>
      <ul class="dlnrwk">
        <li>
          <input type="text" class="dlnrwk-li-input" placeholder="请输入手机号" v-model="uphone" />
        </li>
        <li>
          <span v-show="cansentcode" @click="btnSend">获取验证码</span>
          <span v-show="!cansentcode" v-text="sentcodeTime+' s'">获取验证码</span>
          <input type="text" class="dlnrwk-li-input1" placeholder="请输入验证码" v-model="ucode" />
        </li>
        <input
          type="button"
          class="dlnrwk-an"
          value="登录"
          style="margin-top: 32px;"
          @click="btnLogin"
        />
      </ul>
      <!-- <div class="zcwjmmwk">
       <span @click="btnForget">忘记密码？</span> 
        <i @click="btnReg">立即注册</i>
      </div>-->
    </div>
  </div>
</template>
<script>
import {
  userLogin,
  sendPhone,
  getIsFinishUserInfo,
  WxLoginUserInfo
} from "../api/api";
import { wxappid } from "../common/js/config";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      uphone: "",
      ucode: "",
      cansentcode: true,
      sentcodeTime: 60,
      code: "",
      openId: ""
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    if (!this.redirect) this.redirect = "/jkd";
    if (this.isWechat()) {
      this.code = this.$route.query.code;
      this.wxlogin();
    }
  },
  methods: {
    isWechat() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    wxlogin() {
      var validCode = localStorage.getItem("validCode");//标记页面是发起跳转后返回的，还是刷新得到的
      if (validCode != 1 || !this.$util.isNotEmpty(this.code)) {
        //判断是否为空
        localStorage.setItem(
          "LoginRedirect",
          this.$route.query.redirect ? this.$route.query.redirect : "/jkd"
        );
        localStorage.setItem("validCode", 1);
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          wxappid +
          "&redirect_uri=" +
          encodeURIComponent("http://" + window.location.host + "/login") +
          "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      } else {
        localStorage.removeItem("validCode");
        WxLoginUserInfo({ value: this.code }).then(data => {
          if (data.status == 1 && this.$util.isNotEmpty(data.token)) {
            this.$toast({ duration: 1000, message: "登录成功" });
            this.$store.state.token = data.token;
            getIsFinishUserInfo({ token: data.token }).then(IsFinish => {
              if (!IsFinish) {
                this.$router.replace("/peopleInfo");
              } else {
                this.redirect = localStorage.getItem("LoginRedirect");
                if (this.redirect) {
                  this.$router.replace(this.redirect);
                } else {
                  this.$router.replace("/jkd");
                }
              }
            });
          } else {
            this.openId = data.openId;
          }
        });
      }
    },
    btnForget() {
      location.href = "http://m.1718china.cn/Account/ForgetPass?source=ysd";
    },
    btnReg() {
      location.href =
        "http://m.1718china.cn/Account/Register?source=ysd&phone=" +
        this.uphone;
    },
    valid() {
      if (this.uphone == "" || this.uphone == null) {
        this.$toast({ duration: 1000, message: "请输入手机号" });
        return false;
      }
      if (!this.$util.isPhoneNumber(this.uphone)) {
        this.$toast({
          duration: 1000,
          message: "手机格式有误，请输入有效的手机号"
        });
        return false;
      }
      if (this.ucode == "" || this.ucode == null) {
        this.$toast({ duration: 1000, message: "请输入手机验证码" });
        return false;
      }
      return true;
    },
    btnLogin() {
      if (!this.valid()) return;
      let lgparams = {
        phone: this.uphone,
        code: this.ucode,
        openId: this.openId
      };
      userLogin(lgparams).then(data => {
        if (data === "") {
          // MessageBox.confirm("对不起，您还没有注册，请前往注册?").then(
          //   action => {
          //     location.href =
          //       "http://m.1718china.cn/Account/Register?source=ysd&phone=" +
          //       this.uphone;
          //   }
          // );
          return;
        } else {
          if (!data) return;
          try {
            this.$toast({ duration: 1000, message: "登录成功" });
            this.$store.state.token = data;
            getIsFinishUserInfo({ token: data }).then(IsFinish => {
              if (!IsFinish) {
                this.$router.replace("/peopleInfo");
              } else {
                if (this.$route.query.redirect) {
                  this.$router.replace(this.$route.query.redirect);
                } else {
                  this.$router.replace("/jkd");
                }
              }
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    },
    btnSend() {
      if (this.uphone == "" || this.uphone == null) {
        this.$toast({ duration: 1000, message: "请输入手机号" });
        return false;
      }
      if (!this.$util.isPhoneNumber(this.uphone)) {
        this.$toast({
          duration: 1000,
          message: "手机格式有误，请输入有效的手机号"
        });
        this.$refs.uphone.focus();
        return false;
      }
      let params = {
        phone: this.uphone
      };
      _this = this;
      sendPhone(params)
        .then(data => {
          if (data) {
            this.cansentcode = false;
            var getcodeinval = setInterval(() => {
              this.sentcodeTime--;
              if (this.sentcodeTime <= 0) {
                this.cansentcode = true;
                clearInterval(getcodeinval);
              }
            }, 1000);
            _this.$toast({ duration: 1000, message: "验证码已发送" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>