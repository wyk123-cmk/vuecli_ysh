import axios from 'axios';
import { Indicator } from 'mint-ui'
import { apihost, appid } from '../common/js/config'

let base = apihost;

axios.interceptors.request.use(config => {
    config.headers['appId'] = appid;
    config.headers['token'] = localStorage.getItem("token");
    return config;
});

//返回拦截器
axios.interceptors.response.use(response => {
	console.log(response);
    if (response.data && response.data.errCode != "200") {
        _this.$store.state.lastError = response.data;
        if (response.data.errCode < 2000) {
            _this.$toast({ duration: 1500, message: response.data.message });
        }
        if (response.data.errCode == "403" || response.data.errCode == "401") {
            _this.$store.state.token = '';
            _this.$router.push({
                path: '/login',
                query: { redirect: _this.$router.currentRoute.fullPath }
            })
        }
        return undefined;//response;
    }
    else {
        return response.data.data;
    }
}, error => {
    debugger
    if (!error.response) {
        _this.$toast('服务器链接失败');
        return;
    }
    if (error.response.status == 403 || error.response.status == 401) {
        _this.$store.state.token = '';
        // if (localStorage.getItem("token")) {
        //     _this.$toast("登录超时，请重新登录");
        // }
        //返回 401 清除token信息并跳转到登录页面

        // _this.$router.push({
        //     path: '/login',
        //     query: { redirect: _this.$router.currentRoute.fullPath }
        // })
        if (_this.$router.currentRoute.fullPath.indexOf("/login") > -1) {
            return
        } else {
            _this.$router.replace({
                path: '/login',
                query: { redirect: _this.$router.currentRoute.fullPath }
            })
        }

    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

//等待所有方法返回
export const getAll = (funlist, callback) => {
    return axios.all(funlist).then(axios.spread(callback));
}

//全站通知
export const getGlobal = () => { return axios.get(`${base}/home/getglobal`); };
export const getwechatInfo = params => { return axios.get(`${base}/Wx/GetWeChatInfo`, { params: params }); };
//识别地址GET 
export const GetAddressAutoInfo = params => { return axios.get(`${base}/AddressBook/GetAddressAutoInfo`, { params: params }); }
//优惠券GET 
export const GetList = params => { return axios.get(`${base}/Coupon/GetList`, { params: params }); }
//可用个人优惠券
export const GetPageUserList = params => { return axios.get(`${base}/Coupon/GetPageUserList`, { params: params }); }
//认领优惠券 
export const PostVoucherCoupon = params => { return axios.post(`${base}/Coupon/PostVoucherCoupon`, params); }
//分享助力
export const PostCreateAssistInfo = params => { return axios.post(`${base}/Coupon/PostCreateAssistInfo`, params); }
//生成海报图路径
export const GetCouponWechatUrl = params => { return axios.get(`${base}/Coupon/GetCouponWechatUrl`, { params: params }); }
//是否有最新优惠券
export const IsNewCoupon = params => { return axios.post(`${base}/Coupon/IsNewCoupon`, params); }
//优惠券说明GET 
export const GetCouponRemark = params => { return axios.get(`${base}/Coupon/GetCouponRemark`, { params: params }); }
//获取优惠券个数
export const GetCouponCountModel = params => { return axios.get(`${base}/Coupon/GetCouponCountModel`, { params: params }); }
//增值服务GET 
export const GetServiceList = params => { return axios.get(`${base}/ExpressService/GetList`, { params: params }); }
//我的首页
export const getMeIndex = () => { return axios.get(`${base}/Account/Get`); };
//获取钱包金额
export const getMyWalletAmount = () => { return axios.get(`${base}/Wallet/GetAmount`); };
//获取钱包明细
export const getMyWalletLog = params => { return axios.get(`${base}/Wallet/GetLog`, { params: params }); };
//上传头像
export const setHeard = (params, progresscallback) => {
    return axios.post(`${base}/Account/ChangeLogo`, params, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
            var completeProgress = ((e.loaded / e.total) | 0);
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            progresscallback(completeProgress);
        }
    })
};

//上传图片
export const UploadFileWeb = (params, progresscallback) => {
    return axios.post(`${base}/Account/UploadFileWeb`, params, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
            var completeProgress = ((e.loaded / e.total) | 0);
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            progresscallback(completeProgress);
        }
    })
};
//上传表格
export const UploadFileWebExecl = (params, progresscallback) => {
    return axios.post(`${base}/Express/ImportExpressDraft`, params, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: e => {
            var completeProgress = ((e.loaded / e.total) | 0);
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            progresscallback(completeProgress);
        }
    })
};
//获取我的地址簿
export const getAddressList = params => { return axios.get(`${base}/AddressBook/GetListByPage`, { params: params }); };
//删除地址簿
export const delAddress = params => { return axios.post(`${base}/AddressBook/Remove`, params); };
//编辑地址簿
export const editAddress = params => { return axios.post(`${base}/AddressBook/Change`, params); };
//设置默认地址簿
export const defaultAddress = params => { return axios.post(`${base}/AddressBook/SetDefault`, params); };
//新增地址簿
export const addAddress = params => { return axios.post(`${base}/AddressBook/Post`, params); };
//获取地址簿信息
export const getAddressInfo = params => { return axios.get(`${base}/AddressBook/Get`, { params: params }); };

//登录页
export const userLogin = params => { return axios.post(`${base}/Account/Login`, params); };
//退出
export const userExit = () => { return axios.post(`${base}/Account/Logout`); }
//发送验证码
export const sendPhone = params => { return axios.post(`${base}/Account/SendCode`, params); };

//运费估算首页获取地址
//export const getProvinceList = ()=>{return axios.get(`${base}/Area/GetListEx`); };
//省市区信息
//export const getProCityAreaList = ()=>{return axios.get(`${base}/Area/GetList`); };
//查询估算
export const getEstimatePrice = params => { return axios.post(`${base}/Price/EstimatePrice`, params); };

//查快递首页
export const getSearchExpress = params => { return axios.post(`${base}/Express/Search`, params); };
//查询快递统计数量
export const getExpressTotal = () => { return axios.get(`${base}/Express/GetExpressTotal`); };
//寄快递首页
export const getMainIndex = () => { return axios.get(`${base}/SysInfo/GetNoticeAndSlideShow`); };
//获取快递公司
export const getExpressCompany = params => { return axios.get(`${base}/ExpressCompany/GetList`, { params: params }); };
//获取物流信息
export const getExpressRoute = params => { return axios.get(`${base}/Express/GetExpressRoute`, { params: params }); };
//下单
export const getExpressPost = params => { return axios.post(`${base}/Express/Post`, params); };

//查询待开票信息
export const getExpressList = params => { return axios.get(`${base}/Invoice/GetExpressList`, { params: params }); };
//申请开票
export const getInvoicePost = params => { return axios.post(`${base}/Invoice/Post`, params); };
//历史发票
export const getGetList = params => { return axios.get(`${base}/Invoice/GetList`, { params: params }); };

//充值
export const Refill = params => { return axios.post(`${base}/Wallet/Refill`, params); };
//提现
export const Cash = params => { return axios.post(`${base}/Wallet/Cash`, params); };
//运费支付
export const Pay = params => { return axios.post(`${base}/Express/Pay`, params); };
//取消订单
export const cancelOrderAjax = params => { return axios.post(`${base}/Express/Cancel`, params); };
//删除运单
export const deleteOrder = params => { return axios.post(`${base}/Express/DeleteExpress`, params); };
//快递明细
export const getExpress = params => { return axios.get(`${base}/Express/Get`, { params: params }); };
//钱包明细
export const getAmountLog = params => { return axios.get(`${base}/Wallet/GetLogDetail`, { params: params }); };
//保险费用计算
export const getInsurancePrice = params => { return axios.post(`${base}/Price/InsurancePrice`, params); };
//获取默认地址
export const getDefaultAddress = params => { return axios.get(`${base}/AddressBook/GetDefault`, { params: params }); };
//获取商品名称
export const getGoodNameList = params => { return axios.get(`${base}/GoodsName/GetGoodsNameList`, { params: params }); };
//获取仪商汇协议
export const getYSHESGInfo = () => { return axios.get(`${base}/ExpressCompany/GetYshESAgree`); };
//获取保价协议
export const getInsuranceAgreeInfo = params => { return axios.get(`${base}/Price/GetInsuranceAgree`, { params: params }); };
//是否完善用户信息
export const getIsFinishUserInfo = () => { return axios.get(`${base}/Account/GetIsFinish`); };
//完善用户信息
export const UpdateUserInfo = params => { return axios.post(`${base}/Account/UpdateUserInfo`, params); };
//获取企业信息
export const getCompanyInfo = params => { return axios.get(`${base}/Account/GetCompanyName`, { params: params }); };

//上传图片
export const UploadFile = params => { return axios.post(`${base}/Account/UploadFile`, params); };
//企业认领
export const CompanyClaim = params => { return axios.post(`${base}/Company/Register`, params); };
//获取企业信息
export const GetCompanyClaimInfo = params => { return axios.get(`${base}/Company/Info`, { params: params }); };
//查询收款账号信息
export const GetCompanyAmount = params => { return axios.get(`${base}/Company/GetCmpyAccountInfo`, { params: params }); };
//企业申请重置
export const CompanyRill = params => { return axios.post(`${base}/Company/Refill`, params); };
//企业充值记录
export const GetRillRecordList = params => { return axios.get(`${base}/Company/GetRefillList`, { params: params }); };
//成员列表
export const GetCompanyUserList = params => { return axios.get(`${base}/CompanyUser/GetList`, { params: params }); };
//添加成员信息
export const AddCompanyUser = params => { return axios.post(`${base}/CompanyUser/AddUser`, params); };
//发送验证码
export const CompanySendCode = () => { return axios.post(`${base}/Company/SendCode`); };
//设置密码
export const SetCompanyBankPass = params => { return axios.post(`${base}/Company/SetPassword`, params); };
//企业资金明细
export const GetCompanyMoneyDetailList = params => { return axios.get(`${base}/Company/GetAmountLog`, { params: params }); };
//企业日志
export const GetCompanyLogList = params => { return axios.get(`${base}/Company/GetOperateLog`, { params: params }); };
//企业快递查询列表
export const GetCompanyExpressList = params => { return axios.get(`${base}/Company/GetExpressList`, { params: params }); };
//企业发票
export const GetCompanyInvoiceList = params => { return axios.get(`${base}/CompanyInvoice/GetRechargeForInvoiceList`, { params: params }); };
//是否已成功认领企业
export const IsClaimCompany = () => { return axios.get(`${base}/Company/IsRegister`); };
//企业历史发票
export const GetCompanyInvoiceLogList = params => { return axios.get(`${base}/CompanyInvoice/GetRechargeForInvoiceLog`, { params: params }); };
//开票信息
export const GetCompanyInvoiceInfo = params => { return axios.post(`${base}/CompanyInvoice/GetInvoiceCmpyInfo`, params); };
//企业申请开票
export const CompanyInvoiceSubimt = params => { return axios.post(`${base}/CompanyInvoice/Post`, params); };
//企业删除员工
export const CompanyEmployeeDelete = params => { return axios.post(`${base}/CompanyUser/DelUser`, params); };
//设置管理员
export const SetCompanyUserAdmin = params => { return axios.post(`${base}/CompanyUser/SetMaster`, params); };
//退出企业
export const ExitCompanyUser = params => { return axios.post(`${base}/CompanyUser/Quit`, params); };
//微信登录
export const WxLoginUserInfo = params => { return axios.post(`${base}/Account/WxLogin`, params); };

//获取推广费用信息
export const GetReferralInfo = () => { return axios.get(`${base}/Referral/GetReferralInfo`); };
//获取推广奖励金明细
export const GetReferralList = params => { return axios.get(`${base}/Referral/GetReferralDetail`, { params: params }); };
//申请提现
export const PostJLJCash = params => { return axios.post(`${base}/Referral/Cash`, params); };
//提现记录
export const GetJLJCashList = params => { return axios.get(`${base}/Referral/GetCashList`, { params: params }); };
//提现申请提示
export const GetCashPrompt = params => { return axios.get(`${base}/Referral/GetCashPrompt`, { params: params }); };
//获取微信信息
export const GetWxUserInfo = () => { return axios.get(`${base}/Account/GetUserWxInfo`); };
//更新用户微信信息
export const UpdateWxUserInfo = params => { return axios.post(`${base}/Account/UpdateUserWxInfo`, params); };
//设置预警金额信息
export const SetWarningAmount = params => { return axios.post(`${base}/Company/SetWarningAmount`, params); };
//获取企业预警金额信息
export const GetCmpyWarningInfo = params => { return axios.get(`${base}/Company/GetCmpyWarningInfo`, { params: params }); };
//导出账单POST 
export const ExcelCompanyCustomer = params => { return axios.get(`${base}/CompanyReconciliation/ExcelCompanyCustomer`, { params: params }); };
//批量导入POST 
export const ImportExpressDraft = params => { return axios.post(`${base}/Express/ImportExpressDraft`, params); };
//获取导入文件的信息GET 
export const GetExpressDraftList = params => { return axios.get(`${base}/Express/GetExpressDraftList`, { params: params }); };
//草稿估价POST
export const EvaluationDraf = params => { return axios.post(`${base}/Express/EvaluationDraf`, params); };
//删除草稿POST /api/Express/DeleteDraf
export const DeleteDraf = params => { return axios.post(`${base}/Express/DeleteDraf`, params); };
//编辑草稿POST /api/Express/UpdateDraf
export const UpdateDraf = params => { return axios.post(`${base}/Express/UpdateDraf`, params); };
//获取草稿详细信息get GET /api/Express/GetDrafInfo/{Id}
export const GetDrafInfo = params => { return axios.get(`${base}/Express/GetDrafInfo`, { params: params }); };
//查询有面单运单列表POST /api/Express/SearchBill
export const SearchBill = params => { return axios.post(`${base}/Express/SearchBill`, params); };
//获取打印命令
export const GetPrintCmd = params => { return axios.get(`${base}/ExpressPrint/GetPrintCommand`, { params: params }); };
//获取打印机配置指令
export const GetPrinterConfig = params => { return axios.get(`${base}/ExpressPrint/GetConfigCommand`, { params: params }); };
//批量下单POST 
export const BatchPost=params=>{ return axios.post(`${base}/Express/BatchPost`,  params ); };



