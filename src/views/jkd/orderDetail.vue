<style scoped>
.yddxqxwz {
  border-top: 6px solid #eee;
  margin-top: 14px;
  padding: 14px;
}
.yddxqxwz h2 {
  border-left: 2px solid #fd9523;
  height: 14px;
  line-height: 14px;
  padding-left: 4px;
  padding-bottom: 2px;
}
.yddxqxwz .last-p {
  font-size: 14px;
  color: #333;
}
.yddxqxwz .last-p span {
  font-size: 14px;
  color: #fd9523;
}
.other-amount {
  background: #f7f7f7;
  padding: 8px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8px;
}
.other-amount span {
  font-size: 12px;
}
.other-amount-span {
  display: flex;
  align-items: center;
  width: 50%;
}
</style>
<template>
  <div>
    <header>
      <a @click="$router.replace(redirect)" class="iconfont icon-back"></a>
      <h1 class="tab-title">订单详情</h1>
    </header>
    <div class="content">
      <ul class="yddxqwk">
        <li>
          <h3>
            <i>
              <b>{{ sendCityName }}</b>
              {{ SendUserName }}
            </i>
            <em>
              <img src="../../assets/images/cjt.svg" alt />
              {{ orderStatus }}
            </em>
            <i>
              <b>{{ ReCityName }}</b>
              {{ ReUserName }}
            </i>
          </h3>
        </li>
      </ul>
      <div class="yddxqnk">
        <p>
          <s>
            <a v-bind:href="'tel:' + sendPhone">{{ sendPhone }}</a>
          </s>
          <img src="../../assets/images/jz.svg" alt />
          <span>{{ SendUserName }}</span>
        </p>
        <i>{{ sendAddress }}</i>
        <p>
          <s>
            <a v-bind:href="'tel:' + RePhone">{{ RePhone }}</a>
          </s>
          <img src="../../assets/images/sz.svg" alt />
          <span>{{ ReUserName }}</span>
        </p>
        <i>{{ reAddress }}</i>
      </div>
      <div class="yddxqxwz">
        <h2>物品信息</h2>
        <p>物品名称：{{ goodName }}</p>
        <p>物品类型：{{ goodType }}</p>
        <p>寄件数量：{{ goodCount }} 件</p>
        <p v-if="status == 1 || status == 2">预估重量：{{ weigth }} kg</p>
        <p v-else>实际重量：{{ Sweigth }} kg</p>
        <p v-if="expressPrice != null && expressPrice != '' && payType == 1 && status!=9">
          实际运费
          <span>
            <i v-if="marketExpressPrice != expressPrice">￥{{ marketExpressPrice.toFixed(2) }}</i>
            ￥{{ expressPrice.toFixed(2) }}
          </span>
        </p>
        <p v-if="insuranceAmount != null && insuranceAmount != '' && payType == 1 && status!=9">
          保价费用
          <span>￥{{ insuranceAmount.toFixed(2) }}</span>
        </p>
        <p
          v-for="(item, index) in priceDetail"
          :key="index"
          v-show="item.amount.toFixed(2) > 0 && payType == 1 && status!=9"
        >
          {{ item.charges }}
          <span>￥{{ item.amount.toFixed(2) }}</span>
        </p>
        <p v-show="this.subsidyAmount > 0 && payType == 1 && status!=9">
          活动抵扣
          <span>￥-{{ this.subsidyAmount }}</span>
        </p>
        <p v-show="this.couponAmount > 0 && payType == 1 && status!=9">
          支付优惠
          <span>￥-{{ this.couponAmount }}</span>
        </p>
        <p class="last-p" v-if="Samount != null && Samount != '' && payType == 1 && status!=9">
          {{ priceTitle }}（含保费）
          <span>￥{{ Samount.toFixed(2) }}</span>
        </p>
      </div>
      <div class="yddxqxwz">
        <h2>订单信息</h2>
        <p>物流公司：{{ logisticsName }}</p>
		<p v-for="(item, index) in serviceList">{{item.serviceTitle}}：{{item.serviceValue}}</p>
     
        <p>订单编号：{{ mastCode }}</p>
        <p
          v-clipboard:copy="ydCode"
          v-clipboard:success="onCopy"
          style="font-size:12px;display:flex;align-items:center;"
        >
          运单号 ：{{ ydCode
          }}
          <img
            style="width: 14px;margin-left: 6px;"
            src="../../assets/images/copy1.svg"
          />
        </p>

        <p>
          下单时间：{{
          $util.formatDate.format(createDate, "yyyy-MM-dd hh:mm:ss")
          }}
        </p>
      </div>
      <div class="yddxqxwz" style="margin-bottom:44px;" v-if="goodMemo != null && goodMemo != ''">
        <h2>寄件备注</h2>
        <p>{{ goodMemo }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getExpress } from "../../api/api";
export default {
  data() {
    return {
      redirect: "",
      mastCode: "",
      ydCode: "",
      sendCityName: "",
      SendUserName: "",
      sendPhone: "",
      ReCityName: "",
      ReUserName: "",
      RePhone: "",
      orderStatus: "",
      sendTime: "",
      weigth: "",
      goodType: "",
      amount: "",
      Sweigth: "",
      Samount: "",
      sendAddress: "",
      reAddress: "",
      goodName: "",
      goodCount: "",
      createDate: "",
      insurancePrice: "",
      insuranceAmount: "",
      status: 0,
      otherPrice: 0,
      otherPriceDescription: "",
      expressPrice: 0,
      marketExpressPrice: 0,
      logisticsName: "",
      goodMemo: "",
      priceDetail: [],
      priceTitle: "实付款",
      payType: 1,
      backSignBill: 1, //0=否1=是
      subsidyAmount: 0,
      couponAmount: 0,
	  deliveryType:"",
	  payTypeval:"",
	  backSignBillval:"",
	  serviceList:[]
    };
  },
  mounted() {
    $("body").css("background", "#fff");
    this.redirect = this.$route.query.redirect;
    this.mastCode = this.$route.query.mastCode;
    let params = {
      mastCode: this.mastCode
    };
    //获取订单详情
    getExpress(params).then(data => {
      if (!data) return;
      this.goodName = data.estimateGoods.name;
      this.goodType = data.estimateGoods.category;
      this.goodCount = data.estimateGoods.count;
      this.weigth = data.estimateGoods.weight;
      this.logisticsName = data.expressCompanyName;
      this.ydCode = data.expressCode;
      this.insuranceAmount = data.insurancePrice;
      this.goodMemo = data.memo;
      this.createDate = data.createTime;
      this.sendCityName = data.expressFrom.areaInfo.city;
      this.sendPhone = data.expressFrom.phone;
      this.SendUserName = data.expressFrom.name;
      this.ReCityName = data.expressTo.areaInfo.city;
      this.ReUserName = data.expressTo.name;
      this.RePhone = data.expressTo.phone;
      this.orderStatus = data.statusText;
      this.amount = data.estimatePrice;
      this.priceDetail = data.priceDetail;
      this.sendAddress =
        data.expressFrom.areaInfo.province +
        data.expressFrom.areaInfo.city +
        data.expressFrom.areaInfo.area +
        data.expressFrom.address;
      this.reAddress =
        data.expressTo.areaInfo.province +
        data.expressTo.areaInfo.city +
        data.expressTo.areaInfo.area +
        data.expressTo.address;
      this.status = data.status;
      this.Sweigth = data.goods.weight;
      this.Samount = data.price;
      this.otherPrice = data.otherPrice;
      this.otherPriceDescription = data.otherPriceDescription;
      this.expressPrice = data.expressPrice;
      this.marketExpressPrice = data.marketExpressPrice;
	  if(this.$util.isNotEmpty(data.serviceList)){
		  this.serviceList=data.serviceList;
	  }
	  // this.deliveryType=data.serviceList[1].serviceValue;
   //    this.payTypeval = data.serviceList[0].serviceValue; //支付方式: 1-寄付; 2-到付
   //    this.backSignBillval = data.serviceList[2].serviceValue; //是否签回单
      this.subsidyAmount = data.subsidyAmount;
      this.couponAmount = data.couponAmount;
	  this.payType=data.payType;
      console.log(data.payType, data.backSignBill);
      if (data.status == 1 || data.status == 2) {
        this.priceTitle = "预估价格";
      }
    });
  },
  methods: {
    onCopy() {
      this.$toast({ duration: 1000, message: "复制成功", position: "top" });
    }
  }
};
</script>
