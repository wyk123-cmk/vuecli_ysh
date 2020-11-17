<style scoped>
.setpasw {
  background: #fff;
}
.setpasw li {
  padding: 12px 14px;
}
.setpasw li button {
  float: right;
  color: #666;
  background: #fff;
}
.setpasw li + li {
  border-top: 1px solid #f7f7f7;
}
.btn-grxx {
  margin: 10px 14px;
  width: calc(100% - 28px);
  height: 40px;
  border-radius: 4px;
  background: #4285f4;
  color: #fff;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/mycompany')"></a>
      <h1 class="tab-title">设置支付密码</h1>
    </header>
    <div class="content">
      <label
        style="color:#999;font-size: 12px;padding:10px 14px ;display: block;"
        >设置密码前需要验证您的身份信息</label
      >
      <ul class="setpasw">
        <li>
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="SendCode"
            autocomplete="off"
          />
          <button @click="btnSend" v-show="cansentcode">获取验证码</button>
          <button v-show="!cansentcode" v-text="sentcodeTime + ' s'">
            获取验证码
          </button>
        </li>
        <li>
          <input
            type="password"
            placeholder="请输入支付密码"
            v-model="UserPass"
            autocomplete="off"
          />
        </li>
      </ul>
      <button class="btn-grxx" @click="btnSubmit">确定</button>
    </div>
  </div>
</template>
<script>
import { CompanySendCode, SetCompanyBankPass } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      cansentcode: true,
      sentcodeTime: 60,
      SendCode: "",
      UserPass: ""
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    btnSubmit() {
      if (this.SendCode == "" || this.SendCode == null) {
        this.$toast({ duration: 1000, message: "验证码不能为空" });
        return false;
      } else if (this.UserPass == "" || this.UserPass == null) {
        this.$toast({ duration: 1000, message: "密码不能为空" });
        return false;
      } else {
        let params = {
          payPassWord: this.UserPass,
          verificationCode: this.SendCode
        };
        SetCompanyBankPass(params).then(data => {
          if (data) {
            MessageBox.alert("密码设置成功").then(action => {
               this.$router.push({
                      path: "/mycompany",
                    });
            });
          } else {
            this.UserPass = "";
            this.SendCode = "";
          }
        });
      }
    },
    btnSend() {
      let params = {
        phone: this.UserPhone
      };
      CompanySendCode(params)
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
