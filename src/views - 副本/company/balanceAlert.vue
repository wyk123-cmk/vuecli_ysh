<style scoped>
.switch {
	width: 56px;
	height: 22px;
	position: relative;
	background-color: #c3c0ba;
	border-radius: 22px;
	-webkit-appearance: none;
	float: right;
}
.switch:before{content: '';width: 18px;height:18px;position: absolute;top:2px;left:2px;border-radius: 20px;background-color: #fff;box-shadow:0 2px 4px 0 rgba(0, 35, 11, .2); }
.switch:after {content: '';position: absolute;top:2px;left:24px;color:#fff ;font-size: 13px;}
.switch:checked {border-color: #e06f42;box-shadow:#e06f42 0 0 0 16px inset;background-color:#e06f42;}
.switch:checked:before {left: 36px;}
.switch:checked:after {content: '';position: absolute;top:2px;left:7px;color:#fff ;font-size: 13px;}
.switch.switch-animbg { transition: background-color ease 0.4s; }
.switch.switch-animbg:before {transition: left 0.3s;}         
.switch.switch-animbg:checked {
	box-shadow: #dfdfdf 0 0 0 0 inset;
	background-color: #e06f42;
	transition: border-color 0.4s, background-color ease 0.4s;
}
.switch.switch-animbg:checked:before {transition: left 0.3s; }
.yeyj li {
	padding-top: 16px;
	padding-bottom: 16px;
	background-color: #FFFFFF;
	display: block;
	margin-top: 10px;
	padding-left: 14px;
	padding-right: 14px;
}
.txqs {
	display: block;
	border-bottom: 1px solid #F7F7F7;
	width: 100%;
	margin-top: 12px;
	margin-bottom: 12px;
	font-size: 18px;
	padding-bottom: 6px;
}
.txqs-bd {
	border-width: 0px;
	width: calc(100% - 22px);
	font-size: 18px;
}
.yeyj li s {
	color: #7B7B7B;
}
.yeyj-an {
	background-color: #0F84F4;
	color: #FFFFFF;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	display: block;
	border-radius: 4px;
	line-height: 40px;
	margin-top: 20px;
}
</style>
<template>
  <div>
    <header>
      <a class="iconfont icon-back" @click="$router.replace('/mycompany')"></a>
      <h1 class="tab-title">余额预警</h1>
    </header>
    <div class="content" >
		<ul class="yeyj">
			<li><input v-model="isChecked" :checked="isChecked" @click="clickChecked" class="switch switch-animbg" type="checkbox">余额不足提醒</li>
			<li>
				设置可用余额预警
				<p class="txqs">￥<input type="number" class="txqs-bd" :placeholder="warningAmount" v-model="warningAmount"></p>
				<s>当余额低于该值时，将通过微信提醒企业管理员</s>
			</li>
			<input class="yeyj-an" type="button" value="保存" @click="submit">
		</ul>
	</div>
  </div>
</template>
<script>
import { SetWarningAmount, GetCmpyWarningInfo} from '../../api/api'
import { MessageBox } from "mint-ui";
export default {
    data(){
        return{
			isChecked: false,
			warningAmount: "200.00",
        }
    },
    mounted(){
		GetCmpyWarningInfo().then(data => {
			if(data == undefined) return false;
			this.warningAmount = data.warningAmount; //预警金额
			this.isChecked = data.isWarning == 1?true:false; //是否预警1-是 0 - 否
		})
    },
    methods:{
		clickChecked(){
			this.isChecked = !this.isChecked;
		},
		submit(){
			let _isWarning = this.isChecked?1:0;
			SetWarningAmount({
				warningAmount: this.warningAmount,
				isWarning: _isWarning
			}).then(data => {
				MessageBox.alert("余额预警设置成功").then(action => {
					this.$router.replace('/mycompany')
				});
			})
		}
    }
}
</script>