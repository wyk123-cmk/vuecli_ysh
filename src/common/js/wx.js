const wx = require('weixin-js-sdk')
import { getwechatInfo } from '../../api/api'
import { Toast } from 'mint-ui'
import { MessageBox } from "mint-ui";

export default {
    data(){
        return{
            isReady:false
        }
    },
    config() {
        //debugger
        let u = navigator.userAgent;
        let url=window.location.href;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isiOS) {
			 url=window.location.href.split('#')[0] || window.location.href;
			} 
        let params = { url: url }
       
        getwechatInfo(params).then(data => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ["previewImage", "chooseImage", "uploadImage", "downloadImage", "onMenuShareAppMessage", "onMenuShareTimeline", "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    },
    chooseImage(info) {
        let _info = info;
        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            Toast("选择图片 ");
        });
        wx.ready(() => {
            wx.chooseImage({
                count: _info.count,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: _info.success
            });
        });
        this.config();
    },
    uploadImage(info) {
        let _info = info;
        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            Toast("上传图片  ");
        });
        wx.ready(() => {
            wx.uploadImage({
                localId: _info.chooseImageId,
                isShowProgressTips: 1,
                success: _info.success
            });
        });
        this.config();
    },
    chooseWXPay(info) {
        let _info = info;
        this.config();
        wx.error(function (res) {
            //debugger
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

        });
        wx.ready(() => {
            //alert("准备调用支付接口：" + JSON.stringify(_info))
            wx.chooseWXPay({
                timestamp: _info.timestamp, // 支付签名时间戳
                nonceStr: _info.nonceStr, // 支付签名随机串，不长于32 位
                package: _info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: _info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: _info.paySign, // 支付签名
                success: function (res) {
                    //支付成功
                    Toast("支付成功，感谢您的使用");
                    if (_info.success) _info.success();
                },
                cancel: function (res) {
                    Toast("您已取消支付");
                    if (_info.cancel) _info.cancel();
                }
            });
        });
    },
    wxshare(info) {
        let _info = info;
        //debugger
        this.config();
        wx.ready(() => {
            const share_title = _info.title
            const share_desc = _info.desc
            const share_link = _info.link
            const share_img = _info.imgUrl

            wx.onMenuShareAppMessage({
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: share_link, // 分享链接
                imgUrl: share_img, // 分享图标
                success: function () {
                    Toast('已成功分享给您的朋友')
                    if (_info.success) _info.success();
                },
                cancel: function () {
                    Toast('已取消分享')
                    if (_info.cancel) _info.cancel();
                }
            });

            wx.onMenuShareTimeline({
                title: share_title, // 分享标题
                link: share_link, // 分享链接
                imgUrl: share_img, // 分享图标
                success: function () {
                    Toast('已成功分享到朋友圈')
                    if (_info.success) _info.success();
                },
                cancel: function () {
                    Toast('已取消分享')
                    if (_info.cancel) _info.cancel();
                }
            })
            // wx.onMenuShareTimeline({
            //     title: share_title, // 分享标题
            //     link: share_link, // 分享链接
            //     imgUrl: share_img, // 分享图标
            //     success: function () {
            //         Toast('已成功分享到朋友圈')
            //         if (info.success) info.success();
            //     },
            //     cancel: function () {
            //         Toast('已取消分享')
            //         if (info.cancel) info.cancel();
            //     }
            // })
            // wx.onMenuShareAppMessage({
            //     title: share_title, // 分享标题
            //     desc: share_desc, // 分享描述
            //     link: share_link, // 分享链接
            //     imgUrl: share_img, // 分享图标
            //     success: function () {
            //         Toast('已成功分享给您的朋友')
            //         if (info.success) info.success();
            //     },
            //     cancel: function () {
            //         Toast('已取消分享')
            //         if (info.cancel) info.cancel();
            //     }
            // })
        })
    }
}

