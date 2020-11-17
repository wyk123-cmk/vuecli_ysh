<style scoped>
.cznrwk button {
  background: #fe6603;
  width: 100%;
  height: 36px;
  line-height: 36px;
  color: #fff;
  border-radius: 36px;
  margin-top: 26px;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">奖励金提现</h1>
      <router-link
        :to="{
          path: '/cashExplain',
          query: { redirect: $router.currentRoute.fullPath }
        }"
        class="menu"
        >提现说明</router-link
      >
    </header>
    <div class="content">
      <div class="jlj-tx">
        <p>
          <img src="../../assets/images/wechat.svg" /><label>提现到微信</label>
        </p>
        <span>{{ userName }}</span>
      </div>
      <div class="cznrwk">
        <h2>提现金额</h2>
        <p>
          <span>￥</span
          ><input type="number" class="cznrwk-p-input" v-model="amount" />
        </p>
        <div>
          当前账户奖励金{{ amountAll.toFixed(2) }}元，<span @click="btnAllCash"
            >全部提现</span
          >
        </div>
        <button @click="btnCash">立即提现</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetWxUserInfo,
  GetReferralInfo,
  PostJLJCash,
  UpdateWxUserInfo
} from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      userName: "",
      amount: "",
      amountAll: 0.0
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
    GetWxUserInfo().then(data => {
      if (!data) return;
      if (data.UnAuthorized) {
        MessageBox.alert("请先关注“仪商汇”微信公众号").then(action => {
          this.$router.push({
            path: "/jlj"
          });
        });
      } else {
        this.userName = data.nick;
      }
    });
    GetReferralInfo().then(data => {
      if (!data) return;
      this.amountAll = data.amount;
    });
  },
  methods: {
    btnAllCash() {
      this.amount = this.amountAll > 0 ? this.amountAll.toFixed(2) : "";
    },
    btnCash() {
      if (
        parseFloat(this.amount).toFixed(2) <= 0 ||
        !this.$util.isNotEmpty(this.amount)
      ) {
        this.$toast({ duration: 1000, message: "您输入的提现金额不正确" });
        return;
      } else {
        PostJLJCash({ value: this.amount }).then(data => {
          let errorData = this.$store.state.lastError;
          if (!data) {
            if (errorData != null) {
              if (errorData.errCode == 2201) {
                MessageBox.confirm("请先去完善您的用户信息").then(action => {
                  this.$router.push({
                    path: "/peopleInfo",
                    query: {
                      redirect: this.$router.currentRoute.fullPath
                    }
                  });
                });
              }
            }
          } else {
            this.$router.push({
              path: "/cashApply",
              query: { nickName: data.nickName, cashAmount: data.amount }
            });
          }
        });
      }
    }
  }
};
</script>
