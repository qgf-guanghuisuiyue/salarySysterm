import React from 'react';
import axios from 'axios';
import moment from 'moment';
import md5 from 'blueimp-md5';
import {Link} from 'react-router';

import {  Button , Tooltip , Select ,Input, Modal, message} from 'antd';
const Option = Select.Option;
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class SaveUserManageModalComponent extends React.Component{

    state = {
        usertype: null, //1-申请方；2-受理方  用户类型
        role: null, //0-超级用户；1-财务；2-管理员； 角色
        corpcode: '', //公司名称
        loginname: '', //登录名
        phone: '', //手机号
        pwd: '', //用户登录密码
        username: '' //姓名
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.saveUserInfoModal.resetForm){
            this.setState({
                usertype: null,
                role: null,
                corpcode: '',
                loginname: '',
                phone: '',
                pwd: '',
                username: ''
            });
            this.props.setResetUserInfoFalse();
        }
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onHandleInput = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    userInfoSave = () => {
        const {userInfoSave, getUserInfoList} = this.props;
        const {usertype, role, corpcode, loginname, phone, pwd, username} = this.state;
        if(!usertype){
            message.info('请选择用户类型');
            return ;
        }
        if(!role){
            message.info('请选择角色');
            return ;
        }
        if(!corpcode){
            message.info('请填写公司名称');
            return ;
        }
        if(!loginname){
            message.info('请填写登录名');
            return ;
        }
        if(!phone){
            message.info('请填写手机号');
            return ;
        }
        if(!pwd){
            message.info('请填写密码');
            return ;
        }
        if(!username){
            message.info('请填写姓名');
            return;
        }
        userInfoSave({usertype, role, corpcode, loginname, phone, pwd: md5(pwd), username}, getUserInfoList)
    }

    render(){ 
        const {usertype, role, corpcode, loginname, phone, pwd, username} = this.state;
        const {saveUserInfoModal, hideSaveUserInfoModal, corpData} = this.props;
        let list = corpData.list?corpData.list:[];
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal save-param"
                    visible={saveUserInfoModal.saveUserInfoVisible}
                    width={500}
                    onCancel={hideSaveUserInfoModal}
                    onOk={this.userInfoSave}
                >
                    <ul> 
                        <li>
                            <span className="data-title">用户类型:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择用户类型'
                                    onChange={this.onHandleChange.bind(this, 'usertype')}
                            >
                              <Option value="1">申请方</Option>
                              <Option value="2">受理方</Option>
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">角色:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择角色'
                                    onChange={this.onHandleChange.bind(this, 'role')}
                            >
                              <Option value="0">超级用户</Option>
                              <Option value="1">财务</Option>
                              <Option value="2">管理员</Option>
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">公司名称:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onHandleChange.bind(this, 'corpcode')}
                            >
                                {
                                    list.map( (item,index)=>{
                                        return <Option key={index} value={item.corpName}>{item.corpName}</Option>
                                    })
                                }
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">登录名:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'loginname')}
                                placeholder='请输入登录名'
                                value={loginname}
                            ></Input>
                        </li>
                        <li>
                            <span className="data-title">姓名:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'username')}
                                placeholder='请输入姓名'
                                value={username}
                            ></Input>
                        </li>
                        <li>
                            <span className="data-title">手机号:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'phone')}
                                placeholder='请输入手机号'
                                value={phone}
                            ></Input>
                        </li>
                        <li>
                            <span className="data-title">密码:</span>
                            <Input 
                                style={{width: 200}}
                                type="password"
                                onChange={this.onHandleInput.bind(this, 'pwd')}
                                placeholder='请输入密码'
                                value={pwd}
                            ></Input>
                        </li>
                    </ul>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    saveUserInfoModal: state.System.saveUserInfoModal,
    corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
    getUserInfoList: bindActionCreators(Actions.SystemActions.getUserInfoList, dispatch),
    userInfoSave: bindActionCreators(Actions.SystemActions.userInfoSave, dispatch),
    hideSaveUserInfoModal: bindActionCreators(Actions.SystemActions.hideSaveUserInfoModal, dispatch),
    setResetUserInfoFalse: bindActionCreators(Actions.SystemActions.setResetUserInfoFalse, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveUserManageModalComponent);