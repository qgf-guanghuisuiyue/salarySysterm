import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';

import { Menu, Icon ,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 export default class Home extends React.Component{
    handleClick = (name) => {
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
        {name:'失败结果查询',path:'errorResult'}
    ];
    systemManage = [
        {name:'基础管理',path:'basicManage'},
        {name:'模板文件',path:'mouldFile'},
        {name:'用户管理',path:'userManage'},
        {name:'权限设置',path:'accessPermission'},
        {name:'日志查询',path:'log'}
    ]
    render(){
        const {page , article } = this.props
        return(
                <div className="homeContent">
                    <div className="header">
                        <div className="top layout">
                            <h1>代发薪管理</h1>
                            <Menu
                                mode="horizontal"
                                theme="light"
                                style={{width:400,height:'61px',position:"absolute",left:200,background:"#2B579A",top:0}}
                            >
                                <SubMenu key="apply" title="代发申请&nbsp;&nbsp;∨">
                                {
                                    this.apply.map((item,index)=>{
                                        const {path,name} = item;
                                        return <Menu.Item key={index+1}>
                                                    <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                            </Menu.Item>
                                    })
                                }
                                </SubMenu>
                                <SubMenu key="handle" title="代发薪受理&nbsp;&nbsp;∨">
                                    {
                                        this.salaryHandle.map((item,index)=>{
                                            const {path,name} = item;
                                            return <Menu.Item key={index+3}>
                                                        <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                                </Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="manage" title="系统管理&nbsp;&nbsp;∨">
                                    {
                                        this.systemManage.map((item,index)=>{
                                            const {path,name} = item;
                                            return <Menu.Item key={index+7}>
                                                        <Link to={path} style={{fontSize:14}} onClick={this.handleClick.bind(this,item.name)} >{item.name}</Link>
                                                </Menu.Item>
                                        })
                                    }
                                </SubMenu>
                            </Menu>
                            <ul className="userInfo">
                                <li>用户名：邱光飞</li>
                                <li>所属机构：上海分公司</li>
                                <li>
                                    <img src="static/images/u57.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
