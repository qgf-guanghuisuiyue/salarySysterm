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
            panes:[
                { title: '上传文件', key: '1' }
              ],
            activeKey:"1",
        }
    }
    newTabIndex = 0;
    handleClick = (name) => {
        const panes = this.state.panes;
        for(let i=0;i<panes.length;i++){
            if(name===panes[i].title){
                return false
            }
        }
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: name, key: activeKey });
        this.setState({ panes, activeKey });
    }
    onEdit = (targetKey) => {
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
      }
    onChange = (activeKey) => {
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
                    panes:[{ title: '上传文件', key: '1' }]
                });
            break;
            case "/apply":
                this.setState({
                    panes:[{ title: '申请结果查询', key: '1' }]
                });
            break;
            case "/dataSwitch":
                this.setState({
                    panes:[{ title: '数据转换', key: '1' }]
                });
            break;
            case "/leadingResult":
                this.setState({
                    panes:[{ title: '导入结果', key: '1' }]
                });
            break;
            case "/handle":
                this.setState({
                    panes:[{ title: '受理查询', key: '1' }]
                });
            break;
            case "/errorResult":
                this.setState({
                    panes:[{ title: '失败结果查询', key: '1' }]
                });
            break;
            case "/basicManage":
                this.setState({
                    panes:[{ title: '基础管理', key: '1' }]
                });
            break;
            case "/mouldFile":
                this.setState({
                    panes:[{ title: '模板文件', key: '1' }]
                });
            break;
            case "/userManage":
                this.setState({
                    panes:[{ title: '用户管理', key: '1' }]
                });
            break;
            case "/accessPermission":
                this.setState({
                    panes:[{ title: '权限设置', key: '1' }]
                });
            break;
            case "/log":
                this.setState({
                    panes:[{ title: '日志查询', key: '1' }]
                });
            break;
            default:
                this.setState({
                    panes:[{ title: '上传文件', key: '1' }]
                });
            break;
        }
    }
    
    render(){
        const {routes,location} = this.props,
            pathname = location.pathname;
            console.log(pathname)
        return(
            <div>
                {pathname!=='/login' && pathname!=='login' && pathname!=='/forgetPsd' && pathname!=='forgetPsd'&&
                    <NavbarComponent handleClick={this.handleClick.bind(this)}/>
                }
                {pathname!=='/login' && pathname!=='login' &&
                    <div className="breadName layout">{routes[routes.length - 1 ].breadcrumbName} </div>
                }
                {
                    pathname==='/' && !routes[routes.length - 1 ].path &&
                    <div className="breadName layout">{routes[routes.length - 2 ].breadcrumbName} </div>
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
                        >
                            {this.state.panes.map(pane => <TabPane tab={
                                <Link to={pane.title==="上传文件"?"upload":pane.title==="申请结果查询"?"apply":pane.title==="数据转换"?"dataSwitch":pane.title==="导入结果"?"leadingResult":pane.title==="受理查询"?'handle':pane.title==="失败结果查询"?'errorResult':pane.title==="基础管理"?'basicManage':pane.title==="模板文件"?'mouldFile':pane.title==="用户管理"?'userManage':pane.title==='权限设置'?"accessPermission":pane.title==="日志查询" && "log"}>{pane.title}</Link>} key={pane.key}>
                                
                            </TabPane>)}
                        </Tabs>
                    </div>
                }
                {
                    this.props.children
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);