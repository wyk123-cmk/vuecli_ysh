
<style scoped>
.search-name {
  background: #fff;
  position: fixed;
  z-index: 10001;
  top: 97px;
  width: 100%;
  right: 0;
  height: 300px;
  padding-bottom: 10px;
  border: 1px solid #eee;
  padding-left: 10px;
  border-top: 0;
  left: 0;
  overflow: scroll;
}
.search-name li {
  height: 32px;
  line-height: 32px;
  margin: 5px 20px;
}
</style>
<template>
  <div>
    <header>
      <a v-if="stype == 1" class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">完善个人信息</h1>
    </header>
    <div class="content">
      <ul class="wsxx">
        <li>
          公司名称
          <input type="text" placeholder="请填写公司名称" v-model="CompanyName"  required />
        </li>
        <li>
          姓名
          <input type="text" placeholder="请填写您的真实姓名" v-model="userName" required />
        </li>
        <li>
          职位
          <input type="text" placeholder="请填写所任职务" v-model="userJob" required />
        </li>
      </ul>
      <button class="btn-grxx" @click="btnFinish">完成</button>
      <p class="grxx-tip">为确保您的账号安全及正常使用，依据国家相关法律法规，您需要填写实名资料，感谢您的理解与支持!</p>
    </div>
    <div class="search-name" v-show="isSearch">
      <ul>
        <li
          v-for="(item, index) in searchData"
          :key="index"
          @click="selectName(item.companyName)"
        >
          {{ item.companyName }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getMeIndex, UpdateUserInfo, userExit,getCompanyInfo } from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect:"",
      userName: "",
      userJob: "",
      CompanyName: "",
      stype: 0,
      searchData:[],
      isSearch:false
    };
  },
   watch:{
    CompanyName(val){
       if (this.$util.isNotEmpty(val)) {
        if (this.searchData.length > 0) {
          if (this.searchData.some(item => item.companyName == val) === false) {
            this.GetCompanyName();
          }
        } else {
         this.GetCompanyName();
        }
      } else {
        this.isSearch = false;
      }
    }
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect==undefined || this.$route.query.redirect=="" ? "/me" : this.$route.query.redirect;
    this.stype = this.$route.query.stype;
    getMeIndex().then(data => {
      if (!data) return;
      this.userName = data.userName;
      this.userJob = data.userJob;
      this.CompanyName = data.userCompanyName;
    });
  },
  methods: {
    Valid() {
      if (this.userName == null || this.userName == "") {
        this.$toast({ duration: 1000, message: "用户姓名不能为空" });
        return false;
      }
      if (this.userJob == null || this.userJob == "") {
        this.$toast({ duration: 1000, message: "职位信息不能为空" });
        return false;
      }
      if (this.CompanyName == null || this.CompanyName == "") {
        this.$toast({ duration: 1000, message: "公司名称不能为空" });
        return false;
      }
      return true;
    },
    btnFinish() {
      if (this.Valid() == true) {
        let params = {
          realName: this.userName,
          userCompanyName: this.CompanyName,
          position: this.userJob
        };
        UpdateUserInfo(params).then(data => {
          if (data) {
            if (this.stype == 0) {
              this.$router.replace("/jkd");
            } else {
              this.$router.replace("/me");
            }
          } else {
            MessageBox.alert("完善失败,请联系管理员").then(action=> {
              userExit().then(data => {
                localStorage.removeItem("token");
                this.$store.state.token = "";
                this.$router.push("/login");
              });
            });
          }
        });
      }
    },
    GetCompanyName()
    {
      getCompanyInfo({keyWord:this.CompanyName}).then(data=>{
        if(data.length<=0){
          this.isSearch=false;
        }else{
           this.isSearch=true;
        }
         this.searchData=data;  
      })
    },
    selectName(item)
    {
      this.CompanyName=item;
      this.isSearch=false;
    }
  }
};
</script>
