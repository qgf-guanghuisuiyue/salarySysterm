import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';

import { Menu, Icon ,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

import NavbarComponent from 'components/navbar.jsx';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Home extends React.Component{
    constructor(){
        super();
        this.state={
            panes:[{ title: '上传文件', key: 'upload' }],
            activeKey:"upload", //当前激活 tab 面板的 key
        }
    }
    newTabIndex = 0;

    handleClick = (name) => { //pn
        const panes = this.state.panes;
        for(let i=0;i<panes.length;i++){
            if(name===panes[i].title){
                return false
            }
        }
        const activeKey = name==="上传文件"?"upload":name==="申请结果查询"?"apply":name==="数据转换"?"dataSwitch":name==="导入结果"?"leadingResult":name==="受理查询"?'handle':name==="失败结果查询"?'errorResult':name==="基础管理"?'basicManage':name==="模板文件"?'mouldFile':name==="用户管理"?'userManage':name==='权限设置'?"accessPermission":name==="日志查询" && "log";
        panes.push({ title: name, key: activeKey });
        this.setState({ panes, activeKey });
    }

    onEdit = (targetKey) => { //新增和删除页签的回调，在 type="editable-card" 时有效
        this.remove(targetKey);
    }

    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
        //关闭tab后切换
        if(panes.length===0){
            window.location.hash = "upload";
            return false
        }
        var isRoutePath =false;//tab是否存在已经打开的路由
        for(let i=0;i<panes.length;i++){
            if(this.props.routes[this.props.routes.length-1].path===panes[i].key){
                isRoutePath=true
            }
        }
        if(!isRoutePath){
            window.location.hash = `${panes[panes.length-1].key}`
        }
    }

    onChange = (activeKey) => {//切换面板的回调
        this.setState({
            activeKey
        })
    }
    componentDidMount(){
        const {location} = this.props,
        pathname = location.pathname;
        switch (pathname) {
            case "/upload":
                this.setState({
                    panes:[{ title: '上传文件', key: 'upload' }]
                });
            break;
            case "/apply":
                this.setState({
                    panes:[{ title: '申请结果查询', key: 'apply' }]
                });
            break;
            case "/dataSwitch":
                this.setState({
                    panes:[{ title: '数据转换', key: 'dataSwitch' }]
                });
            break;
            case "/leadingResult":
                this.setState({
                    panes:[{ title: '导入结果', key: 'leadingResult' }]
                });
            break;
            case "/handle":
                this.setState({
                    panes:[{ title: '受理查询', key: 'handle' }]
                });
            break;
            case "/errorResult":
                this.setState({
                    panes:[{ title: '失败结果查询', key: 'errorResult' }]
                });
            break;
            case "/basicManage":
                this.setState({
                    panes:[{ title: '基础管理', key: 'basicManage' }]
                });
            break;
            case "/mouldFile":
                this.setState({
                    panes:[{ title: '模板文件', key: 'mouldFile' }]
                });
            break;
            case "/userManage":
                this.setState({
                    panes:[{ title: '用户管理', key: 'userManage' }]
                });
            break;
            case "/accessPermission":
                this.setState({
                    panes:[{ title: '权限设置', key: 'accessPermission' }]
                });
            break;
            case "/log":
                this.setState({
                    panes:[{ title: '日志查询', key: 'log' }]
                });
            break;
            case "/createFile":
                this.setState({
                    panes:[{ title: '数据转换', key: 'dataSwitch' }]
                });
            break;
            
            default:
                this.setState({
                    panes:[{ title: '上传文件', key: 'upload' }]
                });
            break;
        }    
    }
   componentWillReceiveProps(nextProps,nextState){
        const {pathname} = nextProps.location;
        const panes = this.state.panes;
        switch (pathname) {
            case "/createFile":
                 panes.push({ title: '数据转换', key: 'dataSwitch' })
                this.setState({
                    panes
                });
            break;
        }    
   }
    
    render(){
        const {routes,location, userLoginout} = this.props,
            pathname = location.pathname;
        return(
            <div>
                {pathname!=='/login' && pathname!=='login' && pathname!=='/forgetPsd' && pathname!=='forgetPsd' &&
                    <NavbarComponent 
                        handleClick={this.handleClick.bind(this)} 
                        routes={routes} 
                        userLoginout={userLoginout}
                    />
                }
                {pathname!=='/login' && pathname!=='login' &&
                    <div className="breadName layout">
                        {routes[routes.length - 1 ].breadcrumbName} 
                    </div>
                }
                {
                    pathname==='/' && !routes[routes.length - 1 ].path &&
                    <div className="breadName layout">
                        {routes[routes.length - 2 ].breadcrumbName} 
                    </div>
                } 
                {
                    pathname!=='/login' && pathname!=='login'  && pathname!=='/forgetPsd' && pathname!=='forgetPsd' &&
                    <div className="content">
                        <Tabs
                            hideAdd
                            onChange={this.onChange}
                            type="editable-card"
                            activeKey={this.state.activeKey}
                            onEdit={this.onEdit}
                            onTabClick={this.onTabClick}
                        >
                            {
                                this.state.panes.map(pane => <TabPane 
                                    tab={
                                        <Link to={pane.title==="上传文件"?"upload"
                                            :pane.title==="申请结果查询"?"apply"
                                            :pane.title==="数据转换"?"dataSwitch"
                                            :pane.title==="导入结果"?"leadingResult"
                                            :pane.title==="受理查询"?'handle'
                                            :pane.title==="失败结果查询"?'errorResult'
                                            :pane.title==="基础管理"?'basicManage'
                                            :pane.title==="模板文件"?'mouldFile'
                                            :pane.title==="用户管理"?'userManage'
                                            :pane.title==='权限设置'?"accessPermission"
                                            :pane.title==="日志查询"&& "log"} 
                                            activeClassName='active'>
                                            {pane.title}
                                        </Link>
                                    } 
                                        key={pane.key}
                                    >
                                </TabPane>)
                            }
                        </Tabs>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
    userLoginout: bindActionCreators(Actions.loginActions.userLoginout, dispatch)    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);