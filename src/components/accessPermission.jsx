import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import { Button, Table, notification} from 'antd';

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
          ID:"",
          page:1
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
        const { ID } = this.state;
        if(ID){
            this.props.userInfoRoleDel({ID})
        }else{
            notification.warn({
                message:"请先选择用户"
            })
        } 
    }
    rowSelection = () =>{
         const _this = this;
        // 通过 rowSelection 对象表明需要行选择
         return {
            type:'radio',
            onSelect(record, selected, selectedRows) {
                    _this.setState({
                      ID:record.ID
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
        this.props.showAddAccessModal()
     }
    render(){
        const { roleList ,isAddAccessModal, hideAddAccessModal} = this.props;
        return(
            <div className=" layout common">
                <div className="accessPermission">
                    <h2 className="File-title">列表</h2>
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
                <AddAccessModal isAddAccessModal={isAddAccessModal} hideAddAccessModal={hideAddAccessModal}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    roleList: state.System.roleList,
    isAddAccessModal: state.System.isAddAccessModal
})
const mapDispatchToProps = dispatch => ({
   userInfoRoleList: bindActionCreators(Actions.SystemActions.userInfoRoleList, dispatch),
   userInfoRoleDel: bindActionCreators(Actions.SystemActions.userInfoRoleDel, dispatch),
   showAddAccessModal:bindActionCreators(Actions.SystemActions.showAddAccessModal, dispatch),
   hideAddAccessModal:bindActionCreators(Actions.SystemActions.hideAddAccessModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccessPermission);