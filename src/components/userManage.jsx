import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/userManage';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UserManage extends React.Component{
    state = {
      userName: '',
      phone: '',
      corpCode: '',
      page: 1
    }

    params = {
      skip: 0,
      count: 5
    }

    componentDidMount() {
      this.props.getUserInfoList(this.params)
    }

    _getColumns() {
      columns[0].render = (text,record,index) => {           
          return  <a>{index+1+(this.state.page-1)*5}</a>
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
      this.params.skip = page * 5 - 5;
      getUserInfoList({count:5,skip:this.params.skip, userName, phone, corpCode})
    }
    
    render(){
        const {userInfoList} = this.props;

        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
          onChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          onSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
          },
          onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
          },
        };
        return(
            <div className=" layout common">
                {/* 用户管理 */}
                <div className="userManage">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Input style={{width: 200}}/>
                        </div>
                        <Button type="primary" style={{marginLeft: 20}}>查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button icon="plus-square" style={{marginRight: 50}}>新增</Button>
                            <Button icon="delete" style={{marginRight: 50}}>删除</Button>
                            <Button icon="retweet" style={{marginRight: 50}}>重置密码</Button>
                        </div>
                        <Table 
                          rowSelection={rowSelection} 
                          columns={this._getColumns()} 
                          dataSource={userInfoList.list} 
                          bordered={true}
                          pagination={{
                            defaultPageSize:5,
                            total: userInfoList.sum,
                            onChange: this.onChangePagination
                          }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
  userInfoList: state.System.userInfoList,
})
const mapDispatchToProps = dispatch => ({
  getUserInfoList: bindActionCreators(Actions.SystemActions.getUserInfoList, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManage);