<style scoped>
.search-box {
  background: #fff;
  border-top: 1px solid #f7f7f7;
  padding: 10px 14px;
}
.search-box input {
  background: #f7f7f7;
  height: 36px;
  border-radius: 36px;
  width: 100%;
  background-image: url(../../assets/images/search.svg);
  background-repeat: no-repeat;
  background-position: left 10px center;
  background-size: 16px;
  padding-left: 32px;
}
.search-box button {
  background: #fff;
  float: right;
  height: 36px;
  width: 36px;
}
.group {
  background: #fff;
  margin-top: 5px;
}
.group li {
  padding: 10px 14px;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f7f7f7;
}
.xzk {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #fff;
  -webkit-appearance: none;
  border: 1px solid #eee;
}
.xzk:checked {
  background: url(../../assets/images/chosed.svg) no-repeat center;
  border: 1px solid #4385f5;
}
.select {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  background: #4285f4;
  line-height: 46px;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.select img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.b-admin{
  background:#fd9523;color:#fff;font-size:12px;padding:2px;margin-left: 4px;border-radius: 4px;
}

</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/mycompany')"></a>
      <h1 class="tab-title">成员</h1>
      <router-link
        :to="{
          path: '/addEmployee',
          query: { redirect: $router.currentRoute.fullPath }
        }"
        class="menu"
        ><img src="../../assets/images/add-cy.svg"
      /></router-link>
    </header>
    <div class="content">
      <div class="search-box">
        <input type="search" placeholder="搜索" v-model="keyWord" />
        <!--<button @click="isShowChoose = true" v-show="!isShowChoose">
          选择
        </button>-->
        
      </div>
      <ul
        class="group"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        ref="scrollBox"
      >
        <li
          v-for="(item, index) in EmployeeList"
          :key="index"
          style="display:flex;"
          @click="btnAdmin(item.id)"
        >
          <p style="line-height:26px;">{{ item.userName }}
          <span style="font-size:14px;color:#999;">{{ item.phone }}</span><i v-if="item.isMaster" class="b-admin">管理员</i></p>
         
        </li>
        <li
          v-if="isLoading"
          class="loading-box"
          style="background: #f7f7f7;display:flex;flex-flow:column;margin-top:30px;"
        >
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt" style="text-align:center;"
            >加载中...</span
          >
        </li>

        <li
          class="noneData"
          v-show="noneData"
          style="background: #f7f7f7;padding: 0;border:0;display:none;"
        >
          <img src="../../assets/images/none-ry.svg" />
          <span>暂无成员</span>
        </li>
      </ul>
    </div>
    
    <mt-actionsheet :actions="actionList" v-model="IsShowSet"> </mt-actionsheet>
  </div>
</template>
<script>
import {
  GetCompanyUserList,
  CompanyEmployeeDelete,
  SetCompanyUserAdmin
} from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  inject: ["reload"],
  data() {
    return {
      EmployeeList: [],
      loading: false,
      isLoading: false,
      noneData: false,
      currentPage:0,
      total: 0,
      limit: 15,
      keyWord: "",
      actionList: [{ name:"设置管理员", method: this.btnSetAdmin },{name: "删除", method: this.btndeleteAdmin}],
      IsShowSet: false,
      userId: ""
    };
  },
  watch: {
    keyWord(val) {
      this.SearchData();
    }
  },
  methods: {
    btnCancel() {
    },
    btnAdmin(id) {
        this.IsShowSet = true;
        this.userId = id;
    },
    btnSetAdmin() {
      SetCompanyUserAdmin({ value: this.userId }).then(data => {
        if (!data) return;
        this.reload();
      });
    },
    btndeleteAdmin() {
      if (this.userId<= 0) {
        this.$toast({ duration: 1000, message: "请选择删除的员工信息" });
        return false;
      } else {
       MessageBox.confirm("确定要删除吗?").then(action => {
 CompanyEmployeeDelete([this.userId]).then(data => {
          if (!data) return;
          MessageBox.alert("删除成功").then(data => {
            this.reload();
          });
        });
       })
       
      }
    },
    SearchData() {
      this.EmployeeList = [];
      this.currentPage = 1;
      this.$refs.scrollBox.scrollTop = 0;
      this.getEmployeeList(1);
    },
    loadMore() {
      this.isLoading = true;
      setTimeout(() => {
        if (this.currentPage > 0) {
          if (this.EmployeeList.length >= this.total) {
            this.loading = true;
            this.isLoading = false;
            return false;
          }
        }
         ++this.currentPage;
        this.getEmployeeList(this.currentPage);
      }, 1000);
    },
    getEmployeeList(cpage) {
       this.isLoading = false;
      let params = {
        limit: this.limit,
        page: cpage,
        keyWord: this.keyWord
      };
      GetCompanyUserList(params).then(data => {
        this.loading=false
        if (data == undefined) {
          this.noneData = true;
          return false;
        }
        if (data.total == 0) {
          this.noneData = true;
          return false;
        }
        if (data.list != null && data.list.length > 0) {
          this.noneData = false;
          this.total=data.total;
          this.EmployeeList = this.EmployeeList.concat(data.list);
        }
        
      });
    }
  }
};
</script>
