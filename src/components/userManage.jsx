import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/userManage';
import SaveUserManageModalComponent from './userManage/saveUserManageModal';
import ReloadPwdModalComponent from './userManage/reloadPwdModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table,notification} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UserManage extends React.Component{
    state = {
      userName: '',
      phone: '',
      corpCode: '',
      page: 1,
      selectedRowList: [],
      user_id: '',
      user_name: ''
    }

    params = {
      skip: 0,
      count: 10
    }

    componentDidMount() {
      this.props.getUserInfoList(this.params)
    }

    _getColumns() {
      columns[0].render = (text,record,index) => {           
          return  <a>{index+1+(this.state.page-1)*10}</a>
      }
      columns[columns.length-3].render = (text,record,index) => {           
          return  <span>{record.createdate == null ? '': moment(record.createdate).format('YYYYMMDD')}</span>
      }
      columns[columns.length-2].render = (text,record,index) => {           
          return  <span>{record.role==0?'超级用户':record.role==1?"财务":"管理员"}</span>
      }
      columns[columns.length-1].render = (text,record,index) => { 
          return  <span>{record.activeflag ==1 ? "有效":"无效"}</span> 
      }
      return columns;
    }

    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    handleQuery = () => {
        const {
            userName,
            phone,
            corpCode,
          } = this.state;
        const {getUserInfoList} = this.props;
        getUserInfoList({count:10,skip:this.params.skip, userName, phone, corpCode})
    }

    showSaveUserInfoModal = () => {
        const {showSaveUserInfoModal, getCorpList} = this.props;
        showSaveUserInfoModal(getCorpList);
    }

    userInfoDelete = () => {
        const {selectedRowList} = this.state;
        const {userInfoDelete, getUserInfoList} = this.props;
        if(selectedRowList.length == 0) {
            notification.warning({
                message: '警告',
                description: '请选择参数',
                style:{top:40}
            });
        }else if(selectedRowList.length > 1) {
            notification.warning({
                message: '警告',
                description: '一次只能删除一个用户',
                style:{top:40}
            });
        } else {
            userInfoDelete({userID: selectedRowList[0].userid}, getUserInfoList)
        }
    }

    rowSelection = (selectedRowKeys, selectedRows) => {
        let selectedRowList = selectedRows.map((item,index) => {
            return item;
        })
        this.setState({selectedRowList})
    }

    showReloadpwdModal = () => {
        const {selectedRowList} = this.state;
        const {showReloadpwdModal, getUserInfoList} = this.props;
        if(selectedRowList.length == 0) {
            notification.warning({
                message: '警告',
                description: '请选择参数',
                style:{top:40}
            });
        }else if(selectedRowList.length > 1) {
            notification.warning({
                message: '警告',
                description: '一次只能更改一个用户',
                style:{top:40}
            });
        } else {
            this.setState({
                user_name: selectedRowList[0].username,
                user_id: selectedRowList[0].userid,
            })
            showReloadpwdModal(getUserInfoList);
        }    
    }

    //页码回调
    onChangePagination = (page) => {
      this.setState({
          page
      });
      const {
        userName,
        phone,
        corpCode,
      } = this.state;
      const {getUserInfoList} = this.props;
      this.params.skip = (page -1)*10;
      this.handleQuery()
    }
    
    render(){
        const {userInfoList} = this.props;
        const {userInfoData} = userInfoList;
        const {
            userName,
            phone,
            corpCode,
            user_id,
            user_name
          } = this.state;
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
          onChange: this.rowSelection
        };
        return(
            <div className=" layout common">
                {/* 用户管理 */}
                <div className="userManage">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">姓名：</span>
                            <Input 
                                style={{width: 200}}
                                value={userName}
                                onChange={this.handleChange.bind(this, 'userName')}
                            />
                        </div>
                        <div className="inline-block">
                            <span className="title">手机：</span>
                            <Input 
                                style={{width: 200}}
                                value={phone}
                                onChange={this.handleChange.bind(this, 'phone')}
                            />
                        </div>
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Input 
                                style={{width: 200}}
                                value={corpCode}
                                onChange={this.handleChange.bind(this, 'corpCode')}
                            />
                        </div>
                        <Button 
                            type="primary" 
                            style={{marginLeft: 20}}
                            onClick={this.handleQuery}
                        >查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="plus-square" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.showSaveUserInfoModal}
                            >新增</Button>
                            <Button 
                                icon="delete" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.userInfoDelete}
                            >删除</Button>
                            <Button 
                                icon="retweet" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.showReloadpwdModal}
                            >重置密码</Button>
                        </div>
                        <Table 
                          rowSelection={rowSelection} 
                          columns={this._getColumns()} 
                          dataSource={userInfoData.list} 
                          bordered={true}
                          size={"middle"}
                          pagination={{
                            defaultPageSize:10,
                            total: userInfoData.sum,
                            onChange: this.onChangePagination,
                            showTotal:total => `共 ${userInfoData.sum == 0 ? 0 : userInfoData.sum} 条数据`
                          }}
                        />
                    </div>
                </div>
                <SaveUserManageModalComponent></SaveUserManageModalComponent>
                <ReloadPwdModalComponent 
                   user_id={user_id}
                   user_name={user_name}
                ></ReloadPwdModalComponent>
            </div>
        )
    }
}
const mapStateToProps = state => ({
  userInfoList: state.System.userInfoList,
})
const mapDispatchToProps = dispatch => ({
  getUserInfoList: bindActionCreators(Actions.SystemActions.getUserInfoList, dispatch),
  showSaveUserInfoModal: bindActionCreators(Actions.SystemActions.showSaveUserInfoModal, dispatch),
  getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
  userInfoDelete: bindActionCreators(Actions.SystemActions.userInfoDelete, dispatch),
  showReloadpwdModal: bindActionCreators(Actions.SystemActions.showReloadpwdModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManage);