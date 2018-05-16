import React, {PropTypes}from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import store from 'store';
import {AjaxByToken} from 'utils/ajax';

import { Menu, Icon ,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 export default class Home extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    }

     state = {
        systemBackground:"",
        applyBackground:"",
        handleBackground:"",
        name:"",
        role:""
     }
    handleClick = (name) => { //cn
        this.props.handleClick(name)
    }
    apply = [
        {name:'上传文件',path:'upload'},
        {name:'申请结果查询',path:'/apply'}
    ];
    salaryHandle = [
        {name:'数据转换',path:'dataSwitch'},
        {name:'导入结果',path:'leadingResult'},
        {name:'受理查询',path:'handle'},
        {name:'开票查询',path:'receiptQuery'},
        {name:'开票计算',path:'receiptCount'},
        {name:'失败结果查询',path:'errorResult'}
    ];
    systemManage = [
        {name:'基础管理',path:'basicManage'},
        {name:'模板文件',path:'mouldFile'},
        {name:'用户管理',path:'userManage'},
        {name:'权限设置',path:'accessPermission'},
        {name:'日志查询',path:'log'}
    ]
    //navbar点击事件
    onClick = (item) => {
        this.makeBackground(item.keyPath[1])
    }
    //navbar修改背景色
    makeBackground = (path) =>{
        if(path==="upload" || path==="apply" ){
            this.setState({
                applyBackground:'rgb(0, 105, 159)',
                handleBackground:"",
                systemBackground:""
            })
        }else if(path==="dataSwitch" || path==="leadingResult" ||path==="handle" || path==="errorResult" ||path==="receiptQuery" || path==="receiptCount"){
            this.setState({
                handleBackground:'rgb(0, 105, 159)',
                systemBackground:"",
                applyBackground:""
            })
        }else if(path==="basicManage" || path==="mouldFile" ||path==="userManage" || path==="accessPermission" || path==="log"){
            this.setState({
                systemBackground:"rgb(0, 105, 159)",
                applyBackground:"",
                handleBackground:""
            })
        }
    }

    userLoginout = () => { //cn
        this.props.userLoginout(this.context);
    }

    componentDidMount(){
        const {routes} = this.props;
        const path = routes[routes.length-1].path;
        this.makeBackground(path);
        const userInfo = store.get('userInfo');
        this.setState({
            name:userInfo.name,
            role:userInfo.role
        })
    }
    render(){
        const {page , article } = this.props;
        const {applyBackground, handleBackground, systemBackground, name, role} = this.state;
        return(
                <div className="homeContent">
                    <div className="header">
                        <div className="top layout">
                            <h1>代发薪管理</h1>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                onClick= {this.onClick}
                                className="menu"
                            >
                                {
                                    //(role ==="1" || role ==="2") &&
                                    <SubMenu key="apply" title={<a className="subMenuBk" style={{background:`${applyBackground}`}}>代发申请&nbsp;&nbsp;∨</a>}>
                                    {
                                        this.apply.map((item,index)=>{
                                            const {path,name} = item;
                                            return <Menu.Item key={index+1}>
                                                        <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                                </Menu.Item>
                                        })
                                    }
                                    </SubMenu>
                                }
                                {
                                    (role ==="0" || role ==="2") &&
                                    <SubMenu key="handle" title={<a className="subMenuBk" style={{background:`${handleBackground}`}}>代发薪受理&nbsp;&nbsp;∨</a>}>
                                        {
                                            this.salaryHandle.map((item,index)=>{
                                                const {path,name} = item;
                                                return <Menu.Item key={index+3} >
                                                            <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                                    </Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                }
                                {
                                    (role ==="0" || role ==="2") &&
                                    <SubMenu key="basicManage" title={<a className="subMenuBk" style={{background:`${systemBackground}`}}>系统管理&nbsp;&nbsp;∨</a>}>
                                        {
                                            this.systemManage.map((item,index)=>{
                                                const {path,name} = item;
                                                return <Menu.Item key={index+9}>
                                                            <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                                    </Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                }
                            </Menu>
                            <ul className="userInfo">
                                <li>用户名：<span>{name}</span></li>
                                <li>所属部门：<span>{role==="0"?"超级用户":role==="1"?"财务":role==="2" && "管理员"}</span></li>
                                <li onClick={this.userLoginout}>
                                    注销
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
