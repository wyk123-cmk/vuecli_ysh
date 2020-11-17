<style scoped>
.comp {
  background: #4385f5;
  padding: 14px;
}
.comp h2 {
  font-size: 16px;
  color: #fff;
  padding: 4px 0 30px;
}
.comp > label {
  font-size: 13px;
  color: #eee;
  padding-bottom: 16px;
  display: block;
}
.comp p {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  padding-bottom: 10px;
}
.comp p label {
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  vertical-align: middle;
}
.comp p label span {
  font-size: 14px;
  color: #ff822e;
}
.me-comp {
  background: #fff;
}
.me-comp li {
  padding: 0px 0 10px 14px;
  line-height: 20px;
  display: flex;
}
.me-comp li p {
  width: calc(100% - 28px);
  padding-right: 14px;
  padding-top: 10px;
}
.me-comp li + li p {
  border-top: 1px solid #f7f7f7;
}
.me-comp li img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: 10px;
}
.me-comp li p span {
  float: right;
  color: #999;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/me')"></a>
      <h1 class="tab-title">我的企业</h1>
    </header>
    <div class="content">
      <div class="comp">
        <h2>{{ companyName }}</h2>
        <label>账户余额(元)</label>
        <p>
          {{ amount.toFixed(2) }}
          <label
            >冻结<span>{{ djamount.toFixed(2) }}</span
            >元</label
          >
        </p>
      </div>
      <ul class="me-comp" v-show="isAdmin">
        <li @click="btnJump(1)">
          <img src="../../assets/images/comp1.svg" />
          <p>充值<span class="iconfont yjt"></span></p>
        </li>
        <li @click="btnJump(2)">
          <img src="../../assets/images/comp2.svg" />
          <p>资金明细<span class="iconfont yjt"></span></p>
        </li>
		<li @click="btnJump(10)">
		  <img src="../../assets/images/comp2.svg" />
		  <p>企业优惠券<span class="iconfont yjt"></span></p>
		</li>
      </ul>
      <ul class="me-comp" style="border-top:8px solid #f7f7f7;">
        <li @click="btnJump(3)">
          <img src="../../assets/images/comp3.svg" />
          <p>企业快递<span class="iconfont yjt"></span></p>
        </li>
        <li @click="btnJump(4)" v-show="isAdmin">
          <img src="../../assets/images/comfp.svg" />
          <p>企业发票<span class="iconfont yjt"></span></p>
        </li>
        <li>
          <img src="../../assets/images/comp4.svg" />
          <a
            v-bind:href="userAdminPhone"
            style="border-top:1px solid #f7f7f7;width: calc(100% - 28px);padding-right: 14px;padding-top: 10px;"
          >
            管理员<span class="iconfont yjt" style="float:right;">{{
              admin
            }}</span>
          </a>
        </li>
        <li @click="btnJump(5)" v-show="isAdmin">
          <img src="../../assets/images/comp5.svg" />
          <p>成员<span class="iconfont yjt"></span></p>
        </li>

        <li @click="btnJump(6)" v-show="isAdmin">
          <img src="../../assets/images/comp6.svg" />
          <p>支付密码
            <span class="iconfont yjt" v-if="isPassword">已设置</span>
          <span class="iconfont yjt" v-if="!isPassword"></span>
          </p>
        </li>
        <li @click="btnJump(9)" v-show="isAdmin">
          <img src="../../assets/images/comp8.svg">
          <p>余额预警<span class="iconfont yjt"></span></p>
        </li>
        <li @click="btnJump(7)" v-show="isAdmin">
          <img src="../../assets/images/comp7.svg" />
          <p>企业日志<span class="iconfont yjt"></span></p>
        </li>
      </ul>
    </div>
    <div class="me-exit" @click="btnJump(8)" v-show="!isAdmin">
      <a>退出企业</a>
    </div>
  </div>
</template>
<script>
import { GetCompanyClaimInfo, ExitCompanyUser } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      amount: 0,
      djamount: 0,
      companyName: "",
      admin: "",
      isAdmin: false,
      userAdminPhone: "",
      isPassword: false
    };
  },
  mounted() {
    $("body").css("background", "#f7f7f7");
    GetCompanyClaimInfo().then(data => {
      let errorData = this.$store.state.lastError;
      if (!data) {
        if (errorData != null) {
          switch (errorData.errCode) {
            case 2101: //未认领
              // this.$router.push({ path: "/claim" });
              location.href="/claim?redirect=%2Fme";
              break;
            case 2102: //审核中
              this.$router.push({ path: "/examine" });
              break;
            case 2103: //认领失败
              this.$router.push({ path: "/examineFail" });
              break;
              default:
                MessageBox.alert("认领失败，联系系统管理员").then(action=>{
                   this.$router.push({ path: "/me" });
                })
                break;
          }
        }
      } else {
        this.companyName = data.cmpyName;
        this.amount = data.amount;
        this.djamount = data.frozenAmount;
        this.admin = data.adminName;
        this.isAdmin = data.isMaster;
        this.userAdminPhone = "tel:" + data.mtCode / ((data.id % 9) + 31);
        this.isPassword = data.isPassWord;
        if (!this.isPassword && this.isAdmin) {
          MessageBox.alert("您还没有设置支付密码，请去前往设置").then(
            action => {
              this.$router.push({ path: "/setPass" });
            }
          );
        }
      }
    });
  },
  methods: {
    btnJump(nt) {
      switch (nt) {
        case 1:
          // this.$router.push({
          //   path: "/comRill",
          //   query: {
          //     redirect: "myCompany"
          //   }
          // });
          location.href="/comRill?redirect=%2FmyCompany"
          break;
        case 2:
          this.$router.push({
            path: "/moneyDetail",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 3:
          this.$router.push({
            path: "/SearchInfo",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 4:
          this.$router.push({
            path: "/comInvoice",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 5:
          this.$router.push({
            path: "/employeeList",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 6:
          this.$router.push({
            path: "/setPass",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 7:
          this.$router.push({
            path: "/LogInfo",
            query: {
              redirect: "myCompany"
            }
          });
          break;
        case 8:
          MessageBox.confirm("确定要退出吗?").then(action => {
            ExitCompanyUser().then(data => {
              if (!data) return;
              MessageBox.alert("退出成功").then(action => {
                this.$router.push({
                  path: "/jkd"
                });
              });
            });
          });
          break;
        case 9:
          this.$router.push({
            path: "/BalanceAlert",
            query: {
              redirect: "myCompany"
            }
          });
          break;
		  case 10:
		    this.$router.push({
		      path: "/myyhq",
		      query: {
		        redirect: "myCompany",
				pageType:"comp"
		      }
		    });
		    break;
      }
    }
  }
};
</script>
