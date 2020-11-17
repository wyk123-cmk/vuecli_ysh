<style scope>
.me-exit {
  background: #fff;
  text-align: center;
  margin-top: 10px;
  padding: 14px 0 14px 0;
}
.me-qy {
  padding: 14px;
  border-bottom: 1px solid #f7f7f7;
}
.me-qy label {
  float: right;
  line-height: 21px;
}
.me-tel{border-bottom: 1px solid #f7f7f7;}
</style>
<template>
  <div class="content" style="padding: 0;">
    <div class="me-top">
      <div class="me-banner"></div>
      <div class="user">
        <div v-if="islogin" class="user-img">
          <input
            type="file"
            accept="image/jpeg, image/png, image/bmp"
            ref="face"
            style="opacity:0;width:100%;height:100%;position:absolute;top:0;left:0;z-index:2"
            @change="uploadimg"
          />
          <div class="yhtx">
            <img
              src="../../assets/images/user.jpg"
              v-if="userLogo == '' || userLogo == null"
            />
            <img :src="userLogo" v-else />
          </div>
        </div>
        <div v-else class="user-img">
          <div class="yhtx">
            <router-link to="/Login">
              <img src="../../assets/images/user.jpg" />
            </router-link>
          </div>
        </div>
        <p v-if="!islogin">
          <router-link to="/Login">点击登录/注册</router-link>
        </p>
        <p v-if="islogin" @click="btnUserInfo">{{ userName }}</p>
        <div class="me-jsjian">
          <a @click="btnIsLogin(1)">
            <img src="../../assets/images/jijian.svg" />我寄的
          </a>
          <a @click="btnIsLogin(2)">
            <img src="../../assets/images/shoujian.svg" />我收的
          </a>
        </div>
      </div>
      <div class="me-item">
        <a @click="btnIsLogin(4)">
          <img src="../../assets/images/dizhi.svg" />地址薄
        </a>
        <a @click="btnIsLogin(5)">
          <img src="../../assets/images/qianbao.svg" />钱包
        </a>
		<a @click="btnIsLogin(9)">
		  <img src="../../assets/images/yhq.svg" />优惠券
		</a>
        <a @click="btnIsLogin(6)">
          <img src="../../assets/images/fapiao.svg" />发票申请
        </a>
        <a @click="btnIsLogin(7)">
          <img src="../../assets/images/dindan.svg" />我的订单
        </a>
      </div>
      <div class="me-qy" @click="btnCompanyInfo">
        我的企业<span
          ><img
            style="width:12px;margin-left:4px;"
            src="../../assets/images/NEW.svg"
        /></span>
        <label class="iconfont yjt"></label>
      </div>
      <div class="me-qy" @click="btnIsLogin(8)">
        奖励金<label class="iconfont yjt"></label>
      </div>
      <a class="me-tel" href="tel:010-51285752">
        <label>客服电话</label>
        <span>010-51285752</span>
      </a>
	  <div class="me-qy" @click="btnIsLogin(10)">
	    问题反馈<label class="iconfont yjt"></label>
	  </div>
    </div>
    <div class="me-exit" @click="btnExit" v-if="islogin && isWeb">
      <a>退出登录</a>
    </div>
  </div>
</template>
<script>
import { yqcH5Url } from "../../common/js/config";
import { getMeIndex, userExit, setHeard } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      islogin: this.$Context.isLogin(),
      userName: "",
      userPhone: "",
      companyName: "",
      isContract: false,
      VipExpiration: "",
      VipInfo: [],
      userLogo: "",
      companyId: "",
      claimStatus: "",
      replyReason: "",
      isWeb:false
    };
  },
  methods: {
    uploadimg(event) {
      if (this.$refs.face.files.length < 1) return;
      let file = this.$refs.face.files[0];
      let param = new FormData();
      param.append("update_file", file);
      setHeard(param, progress => {}).then(data => {
        this.$indicator.close();
        if (!data) return;
        this.userLogo = data;
      });
    },
    btnExit() {
      userExit().then(data => {
        localStorage.removeItem("token");
        this.$store.state.token = "";
        this.$router.push("/login");
      });
    },
    btnUserInfo() {
      this.$router.push({
        path: "/peopleInfo",
        query: {
          redirect: this.$router.currentRoute.fullPath
        }
      });
    },

   btnIsLogin(type) {
      if (!this.islogin) {
        this.$router.push({
          path: "/login",
          query: {
            redirect: "me"
          }
        });
        return;
      }
      switch (type) {
        case 1: //我寄的
          this.$router.push({
            path: "/ckd",
            query: {
              tabType: 1
            }
          });
          break;
        case 2: //我收的
          this.$router.push({
            path: "/ckd",
            query: {
              tabType: 2
            }
          });
          break;
        case 4: //地址
          this.$router.push({
            path: "/addressList",
            query: {
              redirect: "me"
            }
          });
          break;
        case 5: //钱包
          this.$router.push({
            path: "/myWallet",
            query: {
              redirect: "me"
            }
          });
          break;
        case 6: //发票 敬请期待
          // this.$toast({ duration: 2000, message: "暂未开通，敬请期待" });
          this.$router.push({
            path: "/applicationInvoice",
            query: {
              redirect: "me"
            }
          });
          break;
        case 7: //订单
          this.$router.push({
            path: "/ckd"
          });
          break;
        case 8: //奖励金
          this.$router.push({
            path: "/jlj"
          });
          break;
		  case 9: //优惠券
		    this.$router.push({
		      path: "/myyhq",
			  query: {
			    redirect: "me",
				pageType:"indi"
			  }
		    });
        break;
        case 10: //问题反馈
        window.location.href=yqcH5Url+"/feedback?getp=2";
		    
		    break;
      }
    },
    btnCompanyInfo() {
      if (!this.islogin) {
        this.$router.push({
          path: "/login",
          query: {
            redirect: "me"
          }
        });
        return;
      }
      if (this.companyId > 0 && this.claimStatus == 1) {
        this.$router.push({
          path: "/myCompany"
        });
      } else {
        if (this.claimStatus == "") {
          // this.$router.push({
          //   path: "/claim"
          // });
          location.href="/claim?redirect=%2Fme";
        } else if (Number(this.claimStatus) === 0) {
          //审核中
          this.$router.push({
            path: "/examine"
          });
        } else if (Number(this.claimStatus) === 2) {
          //失败
          this.$router.push({
            path: "/examineFail",
            reson: this.replyReason
          });
        }
      }
    }
  },
  mounted() {
    $("body").css("background", "#f7f7f7");
    var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeb=false;
      } else {
         this.isWeb=true;
      }
    if (this.islogin) {
      getMeIndex().then(data => {
        this.userName = data.userName;
        this.userPhone = data.userPhone;
        this.companyName = data.companyName;
        this.isContract = data.isContract;
        this.VipInfo = data.vipInfo;
        this.VipExpiration = data.vipExpiration;
        this.userLogo = data.logo;
        this.companyId = data.cmyId;
        this.claimStatus = data.status;
        this.replyReason = data.replyReason;
      });
    }
  },
  created() {}
};
</script>
