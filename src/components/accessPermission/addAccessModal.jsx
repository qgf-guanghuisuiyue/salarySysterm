import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import { Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/detailmodal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


export default class AccessModalComponent extends React.Component{
    state = {
        authCorpCode:""
    }
    userInfoRoleSave = () => {
        const {authCorpCode} = this.state;
        const {
            userInfo , 
            hideAddAccessModal, 
            userInfoRoleList, 
            clearTableCheckbox
        } = this.props;
        this.props.userInfoRoleSave(
            {authCorpCode,userID:userInfo.userID},
            hideAddAccessModal,
            userInfoRoleList,
            clearTableCheckbox
        );
        this.setState({
            authCorpCode:""
        })
    }
    onChange = (value) => {
        this.setState({
            authCorpCode:value
        })
    }
    render(){ 
        const {isAddAccessModal, corpData, userInfo} = this.props;
        const { list=[] } = corpData;
        return(
                <Modal
                    title={`新增 ${userInfo.username} 用户权限`}
                    visible={isAddAccessModal}
                    style={{top:"50%",marginTop:-80}}
                    onOk={this.userInfoRoleSave}
                    onCancel={() => this.props.hideAddAccessModal()}
                >
                    <div style={{textAlign:"center"}}>
                        <span>授权公司名称：</span>
                        <Select 
                            style={{width:200,textAlign:"left"}} 
                            placeholder="请选择授权公司名称" 
                            onChange={this.onChange}
                        >
                            {
                                list.map((item,index)=>{
                                    return <Option value={item.corpName}>{item.corpName}</Option>
                                })
                            }
                            
                        </Select>
                    </div> 
                </Modal>
        )
    }
}
