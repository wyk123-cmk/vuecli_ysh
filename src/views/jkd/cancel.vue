<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">取消订单</h1>
    </header>
    <div class="content">
      <ul class="qxdd">
        <h2>请选择取消订单的原因</h2>
        <h3>告诉我们原因，我们将不段优化提升自己的服务</h3>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="1"
            class="qxdd-radio"
          />快递员未按预约时间上门
        </li>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="2"
            class="qxdd-radio"
          />上门时间/地点修改
        </li>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="3"
            class="qxdd-radio"
          />联系不到快递员
        </li>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="4"
            class="qxdd-radio"
          />已发货
        </li>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="5"
            class="qxdd-radio"
          />我不需要寄件了
        </li>
        <li>
          <input
            name="rdoCancel"
            type="radio"
            v-model="resonValue"
            value="6"
            class="qxdd-radio"
          />其他原因
        </li>
        <textarea
          v-if="resonValue == 6"
          name="textarea"
          rows="6"
          class="qxdd-textarea"
          v-model="remark"
        ></textarea>
      </ul>
      <input type="button" class="qxdd-an" value="提交" @click="btnSubmit" />
    </div>
  </div>
</template>
<script>
import { cancelOrderAjax } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      resonValue: 0,
      remark: "",
      mastCode: "",
      ctype:0
    };
  },
  watch: {
    resonValue(val) {
      switch (Number(val)) {
        case 1:
          this.remark = "快递员未按预约时间上门";
          break;
        case 2:
          this.remark = "上门时间/地点修改";
          break;
        case 3:
          this.remark = "联系不到快递员";
          break;
        case 4:
          this.remark = "已发货";
          break;
        case 5:
          this.remark = "我不需要寄件了";
          break;
        case 6:
          this.remark = "";
          break;
      }
    }
  },
  mounted() {
    $("body").css("background", "#f7f7f7");
    this.mastCode = this.$route.query.mastCode;
    this.ctype = this.$route.query.ctype;
    this.redirect =
      this.$route.query.redirect == undefined
        ? "/ckd"
        : this.$route.query.redirect;
  },
  methods: {
    btnSubmit() {
      if (this.resonValue == 0) {
        MessageBox.alert("请选择取消原因");
        return;
      } else if (!this.$util.isNotEmpty(this.remark) && this.resonValue == 6) {
        MessageBox.alert("其他原因不能为空");
        return;
      } else {
        let params = {
          mastCode: this.mastCode,
          reason: this.remark
        };
        cancelOrderAjax(params).then(data => {
            if (data) {
              if(this.ctype==1){
                this.$router.replace("ckd");
              }else{
                 this.$router.replace(this.redirect);
              }
            }
          });
      }
    }
  }
};
</script>
