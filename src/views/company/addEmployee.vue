<style scoped>
.tjcy{border-top:8px solid #f7f7f7;padding: 14px;background: #fff;}
	.tjcy li{border:1px solid #f7f7f7;padding: 14px;margin-bottom: 14px;border-radius: 4px;}
	.tjcy li input{margin-left: 10px;width:calc(100% - 5em);}
	.btn-grxx{margin:10px 14px;width:calc(100% - 28px);height: 40px;border-radius: 4px;background: #4285F4;color:#fff;}
	.grxx-tip{font-size:12px;padding: 10px 14px;color:red;line-height: 21px;}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">添加成员</h1>
    </header>
    <div class="content">
      <ul class="tjcy">
        <li>姓名<input type="text" placeholder="输入成员真实姓名" v-model="UserName" /></li>
        <li>手机<input type="text" placeholder="输入成员手机号" v-model="UserPhone" /></li>
        <li>部门<input type="text" placeholder="输入成员部门" v-model="UserPosition" /></li>
      </ul>
      <button class="btn-grxx" @click="btnAddUser">添加</button>
    </div>
  </div>
</template>
<script>
import {AddCompanyUser} from '../../api/api'
import { MessageBox } from "mint-ui";
export default {
    data(){
        return{
            redirect:"",
            UserName:"",
            UserPhone:"",
            UserPosition:""
        }
    },
    mounted(){
        this.redirect=this.$route.query.redirect;
    },
    methods:{
      btnAddUser(){
        if (this.UserName=="" || this.UserName==null) {
          this.$toast({duration:1000,message:"请填写成员姓名"});
          return false;
        }else if(this.UserPhone=="" || this.UserPhone==null){
          this.$toast({duration:1000,message:"请填写成员手机号"});
          return false;
        }else if(!this.$util.isPhoneNumber(this.UserPhone)){
          this.$toast({duration:1000,message:"手机号格式不正确"});
          return false;
        }else{
          let params={
            phone:this.UserPhone,
            userName:this.UserName,
            department:this.UserPosition
          };
          AddCompanyUser(params).then(data=>{
            if(!data) return;
            MessageBox.alert("成员添加成功").then(action => {
               this.$router.push('/employeeList');
            });
          })
        }
      }
    }
}
</script>
