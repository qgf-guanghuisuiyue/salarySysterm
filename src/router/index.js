
import {requireAuthHook , onLeavePage} from '../hook';



//引入登陆路由组件
const LoginPage = {
    path:"login",
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('components/login').default)
        }, 'LoginPage') 
    }
}
// 引入上传文件路由组件
const UpLoadPage = {
    path: 'upload',
    breadcrumbName: '代发申请 ＞ 上传文件',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/upload').default)
        }, 'UpLoadPage')
    } 
}
// 引入申请结果查询路由组件
const ApplyPage = {
    path: 'apply',
    breadcrumbName: '代发申请 ＞ 申请结果查询',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/apply').default)
        }, 'ApplyPage')
    } 
}
// 引入数据转换路由组件
const DataSwitchPage = {
    path: 'dataSwitch',
    breadcrumbName: '代发薪受理 ＞ 数据转换',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/dataSwitch').default)
        }, 'DataSwitchPage')
    } 
}
// 引入受理查询路由组件
const Handle = {
    path: 'handle',
    breadcrumbName: '代发薪受理 ＞ 受理查询',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/handle').default)
        }, 'Handle')
    } 
}
// 引入导入结果路由组件
const LeadingResult = {
    path: 'leadingResult',
    breadcrumbName: '代发薪受理 ＞ 导入结果',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/leadingResult').default)
        }, 'LeadingResult')
    } 
}
// 引入失败结果路由组件
const ErrorResult = {
    path: 'errorResult',
    breadcrumbName: '代发薪受理 ＞ 失败结果',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/error').default)
        }, 'ErrorResult')
    } 
}
// 引入基础管理路由组件
const BasicManage = {
    path: 'basicManage',
    breadcrumbName: '系统管理 ＞ 基础管理',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/basicManage').default)
        }, 'BasicManage')
    } 
}
// 引入模板文件路由组件
const MouldFile = {
    path: 'mouldFile',
    breadcrumbName: '系统管理 ＞ 模板文件',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/mouldFile').default)
        }, 'MouldFile')
    } 
}
// 引入用户管理路由组件
const UserManage = {
    path: 'userManage',
    breadcrumbName: '系统管理 ＞ 用户管理',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/userManage').default)
        }, 'UserManage')
    } 
}
// 引入权限设置路由组件
const AccessPermission = {
    path: 'accessPermission',
    breadcrumbName: '系统管理 ＞ 权限设置',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/accessPermission').default)
        }, 'AccessPermission')
    } 
}
// 引入日志查询路由组件
const Log = {
    path: 'log',
    breadcrumbName: '系统管理 ＞ 日志查询',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/log').default)
        }, 'Log')
    } 
}
// 引入忘记密码路由组件
const ForgetPsd = {
    path: 'forgetPsd',
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/forgetPsd').default)
        }, 'ForgetPsd')
    } 
}
// 引入生成银行代发文件路由组件
const CreateFile = {
    path: 'createFile',
    breadcrumbName: '代发薪受理 ＞ 数据转换 ＞ 生成银行代发文件',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/dataSwitch/switchFile').default)
        }, 'SwitchFile')
    } 
}

/*路由配置*/
const RouteConfig = {
    path: '/',
    breadcrumbName:'代发申请 ＞ 上传文件',
    component: require('components/Home').default,
    indexRoute: {
        onEnter:requireAuthHook,
        getComponent(nextState,cb){
            require.ensure([], (require) => {
                cb(null, require('components/upload').default)
            }, 'UpLoadPage')
        } 
    },
    childRoutes: [
        LoginPage,
        ForgetPsd,
        UpLoadPage,
        ApplyPage,
        DataSwitchPage,
        Handle,
        LeadingResult,
        ErrorResult,
        BasicManage,
        MouldFile,
        UserManage,
        AccessPermission,
        Log,
        CreateFile
    ]
}

module.exports = RouteConfig;