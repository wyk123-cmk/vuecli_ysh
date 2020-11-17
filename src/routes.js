import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import YSDjkd from './views/jkd/index.vue'
import YSDckd from './views/ckd/index.vue'
import YSDyfgs from './views/yfgs/index.vue'
import YSDme from './views/me/index.vue'
import AddressList from './views/me/addressList.vue'
import AddressAdd from './views/me/AddressAdd.vue'
import AddressEdit from './views/me/AddressEdit.vue'
import MyWallet from './views/me/myWallet.vue'
import MyCash from './views/me/myCash.vue'
import MyRefill from './views/me/myRefill.vue'
import MyWalletDetail from './views/me/MyWalletDetail.vue'
import MyWalletInfo from './views/me/MyWalletInfo.vue'
import Express from './views/jkd/express.vue'
import GoodsInfo from './views/jkd/goodsInfo.vue'
import InsuredPrice from './views/jkd/InsuredPrice.vue'
import LogisticsInfo from './views/ckd/logisticsInfo.vue'
import Payment from './views/ckd/payment.vue'
import ApplicationInvoice from './views/me/applicationInvoice.vue'
import InvoiceSubmit from './views/me/invoiceSubmit.vue'
import HistoricalInvoice from './views/me/historicalInvoice.vue'
import OrderInfo from './views/jkd/OrderInfo.vue'
import InvoiceNotice from './views/me/invoiceNotice.vue'
import Wxpay from './views/wx/wxpay.vue'
import OrderDetail from './views/jkd/orderDetail.vue'
import peopleInfo from './views/me/peopleInfo.vue'
import RefillContent from './views/me/RefillContent.vue'
import Claim from './views/company/claim.vue'
import MyCompany from './views/company/myCompany.vue'
import LogInfo from './views/company/LogInfo.vue'
import EmployeeList from './views/company/employeeList.vue'
import AddEmployee from './views/company/addEmployee.vue'
import ComRill from './views/company/comRill.vue'
import SearchInfo from './views/company/SearchInfo.vue'
import RillRecord from './views/company/RillRecord.vue'
import SetPass from './views/company/setPass.vue'
import BalanceAlert from './views/company/balanceAlert.vue'
import MoneyDetail from './views/company/MoneyDetail.vue'
import Examine from './views/company/examine.vue'
import ExamineFail from './views/company/examineFail.vue'
import ComInvoice from './views/company/comInvoice.vue'
import ApplyInvoice from './views/company/applyInvoice.vue'
import InvoiceHistory from './views/company/InvoiceHistory.vue'
import YSDjlj from './views/jlj/index.vue'
import JLJCashRecord from './views/jlj/jljCashRecord.vue'
import JLJCash from './views/jlj/jljCash.vue'
import CashExplain from './views/jlj/cashExplain.vue'
import CashApply from './views/jlj/cashApply.vue'
import Cancel from './views/jkd/cancel.vue'
import Yhq from './views/yhq/index.vue'
import MyYhq from './views/yhq/myyhq.vue'
import ShareYhq from './views/yhq/shareyhq.vue'
import YhqInfo from './views/yhq/yhqInfo.vue'
import AddService from './views/jkd/addservice.vue'
import ExportBill from './views/company/exportbill.vue'
import BulkExpress from './views/jkd/bulkexpress.vue'
import JkdExecl from './views/jkd/jkdexecl.vue'
let routes = [{
        path: '/Login',
        component: Login,
        name: '登录',
        hidden: true,
        meta: {
            anonymous: true
        }
    },
    {
        path: '/404',
        component: NotFound,
        name: '错误',
        meta: {
            anonymous: true
        }
    },
    {
        path: '/wxpay',
        component: Wxpay,
        name: '微信支付',
        hidden: true,
        meta: {
            anonymous: true
        }
    },
    {
        path: '/',
        component: Home,
        redirect: '/jkd',
        name: 'jkd',
        iconCls: 'el-icon-message', //图标样式class
        children: [{
            path: '/jkd',
            component: YSDjkd,
            name: '寄快递',
            hidden: true,
            meta: {
                anonymous: true
            },
        }]
    },
    {
        path: '/orderInfo',
        component: OrderInfo,
        name: '下订单',
        meta: {
            anonymous: true
        }
    },
    {
        path: '/',
        component: Home,
        name: 'ckd',
        iconCls: 'fa fa-id-card-o',
        children: [{
                path: '/ckd',
                component: YSDckd,
                name: '查快递',
                meta: {
                    anonymous: true
                }
            },
            {
                path: '/logisticsInfo',
                component: LogisticsInfo,
                name: '物流信息',
                meta: {
                    anonymous: true
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'yfgs',
        iconCls: 'fa fa-id-card-o',
        children: [{
            path: '/yfgs',
            component: YSDyfgs,
            name: '运费估算',
            meta: {
                anonymous: true
            }
        }]
    },
    {
        path: '/',
        component: Home,
        name: 'me',
        iconCls: 'fa fa-id-card-o',
        children: [{
            path: '/me',
            component: YSDme,
            name: '我',
            meta: {
                anonymous: true
            }
        }]
    },
    {
        path: '/addressList',
        component: AddressList,
        name: '地址簿'
    },
    {
        path: '/addressAdd',
        component: AddressAdd,
        name: '添加地址簿'
    },
    {
        path: '/addressEdit',
        component: AddressEdit,
        name: '编辑地址簿'
    },
    {
        path: '/myWallet',
        component: MyWallet,
        name: '我的钱包'
    },
    {
        path: '/myRefill',
        component: MyRefill,
        name: '充值'
    },
    {
        path: '/myCash',
        component: MyCash,
        name: '提现'
    },
    {
        path: '/myWalletDetail',
        component: MyWalletDetail,
        name: '钱包明细'
    },
    {
        path: '/myWalletInfo',
        component: MyWalletInfo,
        name: '钱包明细'
    },
    {
        path: '/express',
        component: Express,
        name: '寄快递'
    },
    {
        path: '/goodsInfo',
        component: GoodsInfo,
        name: '物品信息'
    },
	{
	    path: '/addservice',
	    component:AddService,
	    name: '增值服务'
	},
    {
        path: '/insuredPrice',
        component: InsuredPrice,
        name: '保价信息'
    },
    {
        path: '/payment',
        component: Payment,
        name: '支付'
    },
    {
        path: '/applicationInvoice',
        component: ApplicationInvoice,
        name: '申请发票'
    },
    {
        path: '/invoiceSubmit',
        component: InvoiceSubmit,
        name: '申请发票'
    },
    {
        path: '/historicalInvoice',
        component: HistoricalInvoice,
        name: '历史开票'
    },
    {
        path: '/invoiceNotice',
        component: InvoiceNotice,
        name: '发票须知'
    },
    {
        path: '/orderDetail',
        component: OrderDetail,
        name: '订单详情'
    },
    {
        path: '/peopleInfo',
        component: peopleInfo,
        name: '完善信息'
    },
    {
        path: '/RefillContent',
        component: RefillContent,
        name: '充值说明'
    },
    {
        path: '/Claim',
        component: Claim,
        name: '认领企业'
    },
    {
        path: '/MyCompany',
        component: MyCompany,
        name: '我的企业'
    },
    {
        path: '/LogInfo',
        component: LogInfo,
        name: '企业日志'
    },
    {
        path: '/EmployeeList',
        component: EmployeeList,
        name: '成员'
    },
    {
        path: '/addEmployee',
        component: AddEmployee,
        name: '添加成员'
    },
    {
        path: '/comRill',
        component: ComRill,
        name: '企业充值'
    },
    {
        path: '/SearchInfo',
        component: SearchInfo,
        name: '企业快递'
    },
    {
        path: '/RillRecord',
        component: RillRecord,
        name: '充值记录'
    },
    {
        path: '/setPass',
        component: SetPass,
        name: '支付密码设置'
    },
    {
        path: '/BalanceAlert',
        component: BalanceAlert,
        name: '余额预警'
    },
    {
        path: '/moneyDetail',
        component: MoneyDetail,
        name: '资金明细'
    },
    {
        path: '/examine',
        component: Examine,
        name: '审核中'
    },
    {
        path: '/examineFail',
        component: ExamineFail,
        name: '认领失败'
    },
    {
        path: '/comInvoice',
        component: ComInvoice,
        name: '企业发票'
    },
    {
        path: '/applyInvoice',
        component: ApplyInvoice,
        name: '开票信息'
    },
    {
        path: '/InvoiceHistory',
        component: InvoiceHistory,
        name: '历史发票'
    },
    {
        path: '/jlj',
        component: YSDjlj,
        name: '我的奖励金'
    },
    {
        path: '/jljCashRecord',
        component: JLJCashRecord,
        name: '提现记录'
    },
    {
        path: '/jljCash',
        component: JLJCash,
        name: '奖励金提现'
    },
    {
        path: '/cashExplain',
        component: CashExplain,
        name: '提现说明'
    },
    {
        path: '/cashApply',
        component: CashApply,
        name: '提现说明'
    },
	{
	    path: '/yhq',
	    component: Yhq,
	    name: '优惠券'
	},
	{
	    path: '/myyhq',
	    component: MyYhq,
	    name: '我的优惠券'
	},
	{
	    path: '/shareyhq',
	    component: ShareYhq,
	    name: '分享助力优惠券',
		meta: {
		    anonymous: true
		}
	},
	{
	    path: '/yhqInfo',
	    component: YhqInfo,
	    name: '优惠券说明'
	},
    {
        path: '/cancel',
        component: Cancel,
        name: '取消订单'
    },
	{
	    path: '/exportbill',
	    component: ExportBill,
	    name: '导出账单'
	},
	{
	    path: '/bulkexpress',
	    component: BulkExpress,
	    name: '批量寄快递'
	},
	{
	    path: '/jkdexecl',
	    component: JkdExecl,
	    name: '批量寄快递表格上传'
	}
	

];

export default routes;