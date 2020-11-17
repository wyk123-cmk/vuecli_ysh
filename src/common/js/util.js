var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) {
		s = '0' + s;
	}
	return s;
};
import {
	wxappid
} from './config.js'
import wxutil from './wx.js'
import {
	type
} from 'os';
const wx = require('weixin-js-sdk')

export default {
	wx,
	wxshare(info) {
		wxutil.wxshare(info);
	},
	chooseWXPay(info) {
		//alert(JSON.stringify(info))
		wxutil.chooseWXPay(info);
	},
	isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true; // 是微信端
		} else {
			return false;
		}
	},
	IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	},
	trimSpaces(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] ==""|| array[i] == null || typeof(array[i]) == "undefined") {
				array.splice(i, 1);
				i = i - 1;

			}
			

		}
		return array;
		console.log(array);
	},
	wxPayment(param) {
		var data = localStorage.getItem("wxpay");
		localStorage.setItem("wxpay", JSON.stringify(param))
		let url =
			"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
			wxappid +
			"&redirect_uri=" +
			encodeURIComponent('http://' +
				window.location.host + '/wxpay') +
			"&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect";
		window.location.href = url;
	},
	isPhoneNumber(val) {
		// return /^1[0-9]{10}$/.test(val);
		let reg =
			/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1\d{10})$)|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4}$))/;
		return reg.test(val);
	},
	isValidPassword(val) {

		if (/^.{6,20}$/.test(val)) {
			return true;
		}
		_this.$toast({
			duration: 1000,
			message: "密码长度6-20位"
		});
		return false;
	},
	isNotEmpty(val) {
		return (val != null && val != "" && val != undefined);
	},
	isIOS() {
		let u = navigator.userAgent;
		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if (isiOS) {
			return true;
		} else {
			return false;
		}
	},
	isEmail(val) {
		return (/.+@.+\..+$/.test(val))
	},
	methods: {
		getQueryStringByName(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			var context = "";
			if (r != null)
				context = r[2];
			reg = null;
			r = null;
			return context == null || context == "" || context == "undefined" ? "" : context;
		}
	},
	downloadFile(res, filepath) {
	  if (!res) {
	    return
	  }
	  if (window.navigator.msSaveBlob) {  // IE以及IE内核的浏览器
	    try {
	      window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
	      // window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
	    } catch (e) {
	      console.log(e)
	    }
	  } else {
	    // let url = window.URL.createObjectURL(new Blob([res]))
	    let link = document.createElement('a')
	    link.style.display = 'none'
	    link.href = filepath
	    link.setAttribute('download', filepath)// 文件名
	    document.body.appendChild(link)
	    link.click()
	    document.body.removeChild(link) // 下载完成移除元素
		return true;
	  //   window.URL.revokeObjectURL(url) // 释放掉blob对象
	  }
	},
	formatDate: {
		format: function(date, pattern) {
			if (!date) {
				return '';
			}
			var myDate = new Date(date + '+0800');
			if (myDate == 'Invalid Date') {
				date = date.replace(/T/g, ' '); //去掉T
				date = date.replace(/-/g, '/');
				date = date.replace(/\.\d+/, ' '); //去掉毫秒
				myDate = new Date(date + '+0800');
			}
			date = myDate;
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, function($0) {
				switch ($0.charAt(0)) {
					case 'y':
						return padding(date.getFullYear(), $0.length);
					case 'M':
						return padding(date.getMonth() + 1, $0.length);
					case 'd':
						return padding(date.getDate(), $0.length);
					case 'w':
						return date.getDay();
					case 'h':
						return padding(date.getHours(), $0.length);
					case 'm':
						return padding(date.getMinutes(), $0.length);
					case 's':
						return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse: function(dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
				var _date = new Date(1970, 0, 1);
				for (var i = 0; i < matchs1.length; i++) {
					var _int = parseInt(matchs2[i]);
					var sign = matchs1[i];
					switch (sign.charAt(0)) {
						case 'y':
							_date.setFullYear(_int);
							break;
						case 'M':
							_date.setMonth(_int - 1);
							break;
						case 'd':
							_date.setDate(_int);
							break;
						case 'h':
							_date.setHours(_int);
							break;
						case 'm':
							_date.setMinutes(_int);
							break;
						case 's':
							_date.setSeconds(_int);
							break;
					}
				}
				return _date;
			}
			return null;
		}
	},
	isEmailAddress: function(emailaddress) {
		if (emailaddress === '') {
			return false;
		}
		var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (!reg.test(emailaddress)) {
			return false;
		}
		return true;
	},
	stripAddress(s) { //地址自动识别过滤特殊字符
		s = s.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3');
		s = s.replace(/(\d{3}) (\d{4}) (\d{4})/g, '$1$2$3');
		var pattern = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？-]"
		);
		var rs = '';
		for (var i = 0; i < s.length; i++) {
			rs = rs + s.substr(i, 1).replace(pattern, ' ');
		}
		rs = rs.replace(/[\r\n]/g, '');
		return rs;
	},
	AddressAuto: function(val, addressArray) {
		let obj = {};
		let copyaddress = JSON.parse(JSON.stringify(val));
		copyaddress = copyaddress.split(' ');
		obj = {
			name: copyaddress[0],
			phone: copyaddress[1],
			address: copyaddress[2]
		}
		// copyaddress.forEach((res, index) => {
		//     if (res) {
		//         if (res.length == 1) {
		//             res += 'XX'; // 过滤掉一位的名字或者地址
		//         }
		//         let addressObj = this.smatrAddress(res, addressArray);
		//         obj = Object.assign(obj, addressObj);
		//         console.log(addressObj,res)
		//         if (JSON.stringify(addressObj) === '{}') {
		//             obj.name = res.replace('XX', '');
		//         }
		//     }
		// });
		console.log(obj)
		return obj;
	},
	smatrAddress: function(event, addressList) {
		let smartObj = {};
		let address = event;
		address = this.stripAddress(address);
		//电话匹配
		let phone = address.match(
			/(86-[1][0-9]{10}) | (86[1][0-9]{10})|([1][0-9]{10})/g
		);
		if (phone) {
			smartObj.phone = phone[0];
			address = address.replace(phone[0], '');
		}
		let matchAddress = '';
		//查找省
		let matchProvince = [];
		for (let endIndex = 0; endIndex < address.length; endIndex++) {
			matchAddress = address.slice(0, endIndex + 2);
			addressList.forEach(res => {
				if (res.title.indexOf(matchAddress) > -1) {
					matchProvince.push({
						province: res.title,
						matchValue: matchAddress
					});
				}
			})
		}
		matchProvince.forEach(res => {
			res.index = 0;
			matchProvince.forEach(el => {
				el.index++;
				if (res.matchValue.length > el.matchValue.length) {
					el.matchValue = res.matchValue;
				}
			})
		})
		if (matchProvince.length > 0) {
			let province = matchProvince.reduce((p, v) => (p.index < v.index ? v : p));
			smartObj.province = province.province;
			address = address.replace(province.matchValue, '');
		}
		//市查找
		let matchCity = [];
		matchAddress = '';
		for (let endIndex = 0; endIndex < address.length; endIndex++) {
			matchAddress = address.slice(0, endIndex + 2);
			addressList.forEach(el => {
				if (el.title.indexOf(smartObj.province) > -1) {
					el.list.forEach(ci => {
						if (ci.title.indexOf(matchAddress) > -1) {
							matchCity.push({
								city: ci.title,
								matchValue: matchAddress
							})
						}
					})

				}
			})
		}
		matchCity.forEach(res => {
			res.index = 0;
			matchCity.forEach(el => {
				if (res.city == el.city) {
					el.index++;
					if (res.matchValue.length > el.matchValue.length) {
						el.matchValue = res.matchValue;
					}
				}
			})
		});
		if (matchCity.length > 0) {
			let city = matchCity.reduce((p, v) => (p.index < v.index ? v : p));
			smartObj.city = city.city;
			address = address.replace(city.matchValue, '');
		}
		//区查找
		let matchArea = [];
		matchAddress = '';
		for (let endIndex = 0; endIndex < address.length; endIndex++) {
			matchAddress = address.slice(0, endIndex + 2);
			addressList.forEach(el => {
				if (el.title.indexOf(smartObj.province) > -1) {
					el.list.forEach(ci => {
						if (ci.title.indexOf(smartObj.city) > -1) {
							ci.list.forEach(ar => {
								if (ar.title.indexOf(matchAddress) > -1) {
									matchArea.push({
										area: ar.title,
										areaCode: ar.code,
										matchValue: matchAddress
									})
								}
							})
						}
					})

				}
			})
		}
		matchArea.forEach(res => {
			res.index = 0;
			matchArea.forEach(el => {
				if (res.area == el.area) {
					el.index++;
					if (res.matchValue.length > el.matchValue.length) {
						el.matchValue = res.matchValue;
					}
				}
			})
		})
		if (matchArea.length > 0) {
			let area = matchArea.reduce((p, v) => (p.index < v.index ? v : p));
			smartObj.area = area.area;
			smartObj.areaCode = area.areaCode;
			address = address.replace(area.matchValue, '');
		}
		if (smartObj.province) {
			smartObj.address = address;
		}
		return smartObj;
	}
};
