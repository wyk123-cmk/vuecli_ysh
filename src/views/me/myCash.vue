<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">提现</h1>
    </header>
    <div class="content">
      <div class="czwk">
        <img src="../../assets/images/wechat.svg" />
        <label>
          微信
          <span>1~2个工作日到账</span>
        </label>
      </div>
      <div class="cznrwk">
        <h2>提现金额</h2>
        <p>
          <span>￥</span>
          <input type="number" class="cznrwk-p-input" v-model="cashMoney" />
        </p>
        <label class="all-yue">
          当前账户可用余额
          <span>{{ amount }}</span
          >元，
          <button @click="btnCashAll">全部提现</button>
        </label>
        <label style="color:red;font-size:12px;padding:4px 0 0;display:block;"
          >（注：当日累计金额超过5000，到账时间会适当延迟）</label
        >
        <input
          type="button"
          class="cznrwk-czan"
          value="提现"
          @click="btnCash"
        />
        <label></label>
      </div>
    </div>
  </div>
</template>
<script>
import { Cash } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      amount: this.$store.state.myAmount,
      cashMoney: ""
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
  },
  watch: {
    cashMoney(val) {
      if (parseFloat(val) > 5000.0) {
        this.cashMoney = 5000;
        this.$toast({ duration: 1000, message: "单次提现不超过5000" });
      }
    }
  },
  methods: {
    btnCashAll() {
      if (parseFloat(this.amount) > 5000) {
        this.cashMoney = 5000;
      } else {
        this.cashMoney = this.amount;
      }
    },
    btnCash() {
      if (
        parseFloat(this.cashMoney).toFixed(2) <= 0 ||
        !this.$util.isNotEmpty(this.cashMoney)
      ) {
        this.$toast({ duration: 1000, message: "提现金额不正确" });
        return;
      } else {
        let params = { value: this.cashMoney };
        Cash(params).then(data => {
          let errorData = this.$store.state.lastError;
          if (!data) {
             if (errorData != null) {
                if (errorData.errCode== 2201) {
                   MessageBox.confirm("请先去完善您的用户信息").then(action => {
                     this.$router.push({
                  path: "/peopleInfo",
                  query: {
                    redirect:this.$router.currentRoute.fullPath
                  }
                });
                   })
                }
             }
          } else {
            MessageBox.alert("提现申请已提交，等待工作人员审核！").then(
              action => {
                this.$router.replace(this.redirect);
              }
            );
          }
        });
      }
    }
  }
};
</script>
