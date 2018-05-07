import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import { Button, Table, notification, Modal} from 'antd';
const confirm = Modal.confirm;

import columns from 'data/table-columns/accessPermission';
import AddAccessModal from './accessPermission/addAccessModal';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class AccessPermission extends React.Component{
    constructor(){
        super();
        this.state={
          userInfo:{},
          page:1,
          selectedRowKeys:[]
        }
    }
    componentDidMount(){
        this.props.userInfoRoleList(this.params)
    }
    params = {
        skip:0,
        count:10
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.props.userInfoRoleList(this.params);
    }
    userInfoRoleDel = () => {
        const { userInfo } = this.state;
        const {userInfoRoleList} = this.props;
        const _this = this;
        if(userInfo.ID){
            confirm({
                title: `确定要删除 ${userInfo.username} 的用户权限吗?`,
                style:{top:"50%",marginTop:-100},
                onOk() {
                    _this.props.userInfoRoleDel({ID:userInfo.ID},userInfoRoleList);
                    _this.setState({
                      selectedRowKeys:[],
                      userInfo:{}
                    }) 
                }
              });  
        }else{
            notification.warn({
                message:"请先选择用户"
            })
        } 
    }
    //清空表格选择框
    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.setState({
            selectedRowKeys:[],
            userInfo:{}
        })
    }
    //表格选择框选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({selectedRowKeys});
  }
    rowSelection = () =>{
      const {selectedRowKeys} = this.state;
         const _this = this;
        // 通过 rowSelection 对象表明需要行选择
         return {
            type:'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect(record, selected, selectedRows) {
                    _this.setState({
                        userInfo:record
                    })
                }
          }
     } 
     getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text , record , index) => {
            return <span>{index+1 + page*10 -10}</span>
        }
        return columns
     }
     showAddAccessModal = () => {
        const {getCorpList, showAddAccessModal} = this.props;
        const {userInfo} = this.state;
        if(userInfo.ID){
            showAddAccessModal(getCorpList)
        }else{
            notification.warn({
                message:"请先选择用户"
            })
        } 
        
     }
    render(){
        const { roleList ,isAddAccessModal, hideAddAccessModal,corpData,userInfoRoleSave, userInfoRoleList} = this.props;
        const { userInfo, selectedRowKeys} = this.state;
        return(
            <div className=" layout common">
                <div className="accessPermission">
                    <h2 className="File-title">权限设置</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="plus-square" 
                                type="primary" 
                                style={{marginRight: 50}}
                                onClick={this.showAddAccessModal}
                            >
                              新增
                            </Button>
                            <Button 
                                icon="delete" 
                                type="primary" 
                                style={{marginRight: 50}}
                                onClick={this.userInfoRoleDel}
                            >
                              删除
                            </Button>
                        </div>
                        <Table 
                            rowSelection={this.rowSelection()} 
                            columns={this.getColumns()} 
                            dataSource={roleList.list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: roleList.sum,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${roleList.sum} 条数据`
                            }}
                        />
                    </div>
                </div>
                <AddAccessModal 
                    isAddAccessModal={isAddAccessModal} 
                    hideAddAccessModal={hideAddAccessModal} 
                    corpData={corpData}
                    userInfoRoleSave={userInfoRoleSave}
                    userInfo = {userInfo}
                    hideAddAccessModal={hideAddAccessModal}
                    userInfoRoleList={userInfoRoleList}
                    clearTableCheckbox={this.clearTableCheckbox}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    roleList: state.System.roleList,
    isAddAccessModal: state.System.isAddAccessModal,
    corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
   userInfoRoleList: bindActionCreators(Actions.SystemActions.userInfoRoleList, dispatch),
   userInfoRoleDel: bindActionCreators(Actions.SystemActions.userInfoRoleDel, dispatch),
   showAddAccessModal:bindActionCreators(Actions.SystemActions.showAddAccessModal, dispatch),
   hideAddAccessModal:bindActionCreators(Actions.SystemActions.hideAddAccessModal, dispatch),
   getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
   userInfoRoleSave: bindActionCreators(Actions.SystemActions.userInfoRoleSave, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessPermission);