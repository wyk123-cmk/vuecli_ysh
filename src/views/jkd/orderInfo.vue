<template>
  <div>
    <header>
      <router-link to="/jkd" class="iconfont icon-back"></router-link>
      <h1 class="tab-title">寄快递</h1>
      <span class="menu" @click="deleteOrder">取消订单</span>
    </header>
    <div class="content">
      <div class="xdztwk">
        <img src="../../assets/images/cb.svg" alt />
        <p>
          快递员已接单，请耐心等待
          <span>
            您期望的上门时间（{{
            this.sendTime == ""
            ? ""
            : this.$util.formatDate.format(
            this.sendTime,
            "yyyy-MM-dd hh:mm"
            )
            }}以前取件）已通知快递员，请保持电话畅通
          </span>
        </p>
      </div>
      <div class="ydd-cz">
        <div class="ckxqan2" @click="btnAgain">
          <a>再寄一单</a>
        </div>
        <div class="ckxqan" @click="btnView">
          <a>查看详情</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cancelOrderAjax } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      mastCode: "",
      ftype: "",
      sendTime: ""
    };
  },
  created() {
    this.mastCode = this.$route.query.mastCode;
    this.ftype = this.$route.query.ftype;
    this.sendTime = this.$route.query.sendTime;
  },
  methods: {
    deleteOrder() {
      this.$router.push({
        path: "/cancel",
        query: {
          redirect: this.$route.fullPath,
          mastCode: this.mastCode,
          ctype: 1
        }
      });
    },
    btnView() {
      this.$router.push({
        path: "/orderDetail",
        query: { mastCode: this.mastCode, redirect: "ckd" }
      });
    },
    btnAgain() {
      if (!this.$route.query.redirect) {
        this.$router.replace("/jkd");
      } else {
        this.$router.replace(this.$route.query.redirect);
      }
    }
  },
  mounted() {
    $("body").css("background", "#fff");
  }
};
</script>
