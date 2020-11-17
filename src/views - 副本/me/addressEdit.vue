<style scoped>
.mint-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
}
.address-textok {
  position: fixed;
  background: #fd9523;
  color: #fff;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  right: 18px;
  z-index: 3;
  font-size: 12px;
}
.xzdzwk li em {
  float: initial;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace(redirect)"></a>
      <h1 class="tab-title">编辑地址</h1>
    </header>
    <div class="content" style="padding-bottom:60px;">
      <ul class="xzdzwk">
        <li>
          <input
            type="text"
            class="xzdzwk-li-input1"
            placeholder="姓名"
            v-model="userName"
            ref="userName"
          />
        </li>
        <li>
          <input
            type="text"
            class="xzdzwk-li-input1"
            placeholder="手机号"
            v-model="userPhone"
            @click="btnPhone"
            ref="userPhone"
          />
        </li>
        <li>
          <input
            type="text"
            class="xzdzwk-li-input2"
            placeholder="省市区"
            readonly="readonly"
            onfocus="this.blur();"
            v-model="procitarea"
            @click="btnOpenPro"
          />
          <mt-popup v-model="addShow" position="bottom" class="mint-popup">
            <mt-picker
              :slots="addressSlots"
              valueKey="title"
              @change="onAddressChange"
              :showToolbar="true"
            >
              <Slot>
                <div class="me-tel">
                  <div @click="btnPickCancle">取消</div>
                  <div style="color:green;" @click="btnPickOk">确定</div>
                </div>
              </Slot>
            </mt-picker>
          </mt-popup>
        </li>
        <li>
          <input
            type="text"
            class="xzdzwk-li-input2"
            placeholder="详细地址（精确到门牌号）"
            v-model="address"
            ref="address"
          />
        </li>
        <li>
          <input type="text" class="xzdzwk-li-input2" placeholder="公司名称（选填)" v-model="companyName" />
        </li>
        <li style="padding-left: 16px;">
          <input
            name="chkDefault"
            type="checkbox"
            class="tkwk-radio"
            style="background: #fff;"
            v-model="IsDefault"
          />
          <em>设为默认地址</em>
          <span @click="btnClear">清空当前信息</span>
        </li>
        <p style="position:relative;">
          <textarea
            rows="6"
            class="xzdzwk-p-textarea"
            placeholder="粘贴地址信息,例:姓名,手机号,地址"
            v-model="txtContent"
          ></textarea>
          <a v-show="addCopyShow" class="address-textok" @click="btnCopyOk" style="position:absolute;bottom: 30px;right: 20px;">确定</a>
        </p>
      </ul>
    </div>
    <div class="dbxzan" @click="btnSubmit">
      <a>确定</a>
    </div>
  </div>
</template>
<script>
import {
  editAddress,
  getAddressInfo,
  //getProvinceList,
  GetAddressAutoInfo
} from "../../api/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      redirect: "",
      txtContent: "",
      userName: "",
      userPhone: "189**",
      address: "",
      companyName: "",
      IsDefault: false,
      addShow: false,
      addressData: [],
      AreaCode: "",
      procitarea: "",
      addressSlots: [],
      addCopyShow: false,
      ContactsCode: this.$route.query.addressCode,
      jtype: ""
    };
  },
  watch: {
    txtContent(val) {
      if (this.$util.isNotEmpty(val)) {
        this.addCopyShow = true;
      } else {
        this.addCopyShow = false;
      }
    }
  },
  methods: {
    btnPhone() {
      this.userPhone = "";
    },
    btnClear() {
      this.userName = "";
      this.userPhone = "";
      this.procitarea = "";
      this.AreaCode = "";
      this.address = "";
      this.companyName = "";
      this.IsDefault = false;
      this.txtContent = "";
    },
    btnCopyOk() {
      let addText = this.$util.stripAddress(this.txtContent);
      var parm = {
        addressText: addText
      };
      GetAddressAutoInfo(parm).then(data => {
        console.log(data);
        this.userName = data.name;
        this.userPhone = data.phone;
        this.address = data.detail;
		if(data.areaCode==""){
			 this.$toast({ duration: 1000, message: "自动识别失败，请手动选择省市区！" });
			 return false;
		}
		else{
			if (
			  this.$util.isNotEmpty(data.province) &&
			  this.$util.isNotEmpty(data.city) &&
			  this.$util.isNotEmpty(data.area)
			) {
			  this.procitarea = data.province + "-" + data.city + "-" + data.area;
			  this.AreaCode = data.areaCode;
			}
		}
       
      });
    },
    btnPickCancle() {
      this.AreaCode = "";
      this.procitarea = "";
      this.addShow = false;
    },
    btnPickOk() {
      if (
        this.AreaCode === "" &&
        this.procitarea === "" &&
        this.addressData.length > 0
      ) {
        this.AreaCode = this.addressData[0].list[0].list[0].code;
        this.procitarea = `${this.addressData[0].title}-${this.addressData[0].list[0].title}-${this.addressData[0].list[0].list[0].title}`;
      }
      this.addShow = false;
    },
    btnOpenPro() {
      this.addShow = true;
      if (
        this.AreaCode === "" &&
        this.procitarea === "" &&
        this.addressData.length > 0
      ) {
        this.AreaCode = this.addressData[0].list[0].list[0].code;
        this.procitarea = `${this.addressData[0].title}-${this.addressData[0].list[0].title}-${this.addressData[0].list[0].list[0].title}`;
      } else if (this.addressData.length > 0) {
        let addressItem = this.procitarea.split("-");
        if (addressItem.length > 0) {
          let prinvoiceList = this.addressData.map(res => {
            return res.title;
          });
          let pIndex = prinvoiceList.indexOf(addressItem[0]);
          this.addressSlots[0].defaultIndex = pIndex;
          let cityList = this.addressData[pIndex].list.map(res => {
            return res.title;
          });
          let cIndex = cityList.indexOf(addressItem[1]);
          this.addressSlots[1].defaultIndex = cIndex;
          let areaList = this.addressData[pIndex].list[cIndex].list.map(res => {
            return res.title;
          });
          let aIndex = areaList.indexOf(addressItem[2]);
          this.addressSlots[2].defaultIndex = aIndex;
        }
      }
    },
    onAddressChange(picker, values) {
      if (values.length < 1) return;
      picker.setSlotValues(1, values[0].list);
      picker.setSlotValues(2, values[1].list);
      let arr = picker.getValues();
      this.AreaCode = `${arr[2].code}`;
      this.procitarea = `${arr[0].title}-${arr[1].title}-${arr[2].title}`;
    },
    Valid() {
      if (!this.$util.isNotEmpty(this.userName.trim())) {
        this.$toast({ duration: 1000, message: "姓名不能为空" });
        this.$refs.userName.focus();
        return false;
      }
      if (this.userPhone.indexOf("*") < 0) {
        if (!this.$util.isNotEmpty(this.userPhone.trim())) {
          this.$toast({ duration: 1000, message: "手机号不能为空" });
          this.$refs.userPhone.focus();
          return false;
        } else if (!this.$util.isPhoneNumber(this.userPhone)) {
          this.$toast({ duration: 1000, message: "联系电话格式不正确" });
          this.$refs.userPhone.focus();
          return false;
        }
      }

      if (!this.$util.isNotEmpty(this.address.trim())) {
        this.$toast({ duration: 1000, message: "详细地址不能为空" });
        this.$refs.address.focus();
        return false;
      }
      if (!this.$util.isNotEmpty(this.AreaCode.trim())) {
        this.$toast({ duration: 1000, message: "请选择省市区" });
        return false;
      }
      return true;
    },
    btnSubmit() {
      if (!this.Valid()) return;
      if (this.userPhone.indexOf("*") > -1) {
        this.userPhone = "";
      }
      var addParams = {
        contactsCode: this.ContactsCode.trim(),
        name: this.userName.trim(),
        phone: this.userPhone,
        companyName: this.companyName.trim(),
        areaCode: this.AreaCode,
        address: this.address,
        isDefault: this.IsDefault
      };
      editAddress(addParams).then(data => {
        if (data != null) {
          MessageBox.alert("更新成功").then(action => {
            var addressData = {
              addressCode: data.contactsCode,
              userName: data.name,
              userPhone: data.phone,
              address: data.address,
              areaCode: data.areaInfo.areaCode,
              prociarName:
                data.areaInfo.province + data.areaInfo.city + data.areaInfo.area
            };
            if (this.jtype === "send") {
              this.$store.state.addressInfo = addressData;
            } else if (this.jtype === "rep") {
              this.$store.state.repaddressInfo = addressData;
            } else if (this.jtype === "invoice") {
              this.$store.state.invoiceAddress = addressData;
            }
            this.$router.replace({ path: this.redirect });
          });
        }
      });
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    this.jtype = this.$route.query.jtype;
    this.addressData = addressList;
    this.addressSlots = [
      {
        flex: 1,
        values: this.addressData,
        className: "slot1",
        textAlign: "center"
      },
      {
        flex: 1,
        values: this.addressData[0].list,
        className: "slot2",
        textAlign: "center"
      },
      {
        flex: 1,
        values: this.addressData[0].list[0].list,
        className: "slot3",
        textAlign: "center"
      }
    ];
  },
  created() {
    this.ContactsCode = this.$route.query.addressCode;
    var param = {
      contactsCode: this.ContactsCode
    };
    getAddressInfo(param).then(data => {
      this.userName = data.name;
      this.userPhone = data.phone;
      this.address = data.address;
      this.IsDefault = data.isDefault;
      this.companyName = data.companyName;
      this.procitarea =
        data.areaInfo.province +
        "-" +
        data.areaInfo.city +
        "-" +
        data.areaInfo.area;
      this.AreaCode = data.areaInfo.areaCode;
    });
  }
};
</script>
