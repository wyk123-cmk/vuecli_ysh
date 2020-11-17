<template>
  <div style="width:100%;height:100%;text-align: center;display:flex;margin-top:20px;">
    <h6 style="margin:auto;font-size:16px">正在支付</h6>
  </div>
</template>
<script>
import { Refill } from "../../api/api";
export default {
  data() {
    return {
      money: "",
      redirect: "",
      code: ""
    };
  },
  mounted() {
    try {
      //debugger;
      var data = localStorage.getItem("wxpay");
      data = JSON.parse(data);
      this.money = data.money;
      this.redirect = data.redirect;
      this.code = this.$route.query.code;
      if (!this.code) {
      _this.$toast("获取支付信息失败，请重试");
      setTimeout(() => {
        this.$router.back(-2);
      }, 500);
      } else {
        this.payment();
      }
    } catch (err) {
      _this.$toast("获取支付信息失败，请重试");
      setTimeout(() => {
        this.$router.back(-2);
      }, 500);
    }
  },
  methods: {
    payment() {
      let _this = this;
       let params = { amount: this.money, code: this.code };
       Refill(params).then(data => {
        if (!data) {
          _this.$toast("支付失败，请重新发起支付");
          setTimeout(() => {
            this.$router.back(-2);
          }, 500);
          return;
        }
        //调用支付
        this.$util.chooseWXPay({
          timestamp: data.timestamp, // 支付签名时间戳
          nonceStr: data.nonceStr, // 支付签名随机串，不长于32 位
          package: "prepay_id=" + data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: data.paySign, // 支付签名
          success: function(res) {
            //支付成功
            _this.$router.replace(_this.redirect);
          },
          cancel: function(res) {
            _this.$router.replace(_this.redirect);
          }
        });
      });
    }
  }
};
</script>
