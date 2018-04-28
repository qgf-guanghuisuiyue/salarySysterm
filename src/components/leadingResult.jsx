import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import LeadingFileModal from './leadingResult/leadingFileModal';
import { Table , Button , Tooltip , Input , DatePicker ,Icon ,Modal} from 'antd';
const confirm = Modal.confirm;
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingResult extends React.Component{
    componentDidMount(){
        NProgress.start()
        NProgress.done()
    }
    showLeadingFileModal = () => {
      this.props.showLeadingFileModal()
    }
    showConfirm = () => {
      confirm({
        title: '是否确认该批次的代发结果',
        style:{top:'30%'},
        onOk() {
          console.log('确定');
        },
        onCancel() {},
      });
    }
    render(){
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            width:50
            }, {
            title: '批次号',
            dataIndex: 'batchno',
            width:100
          }, {
            title: '公司名称',
            dataIndex: 'corpname',
            width:150
          }, {
            title: '代发申请文件名称',
            dataIndex: 'payapplyfilename',
            width:150
          }, {
            title: '总笔数',
            dataIndex: 'totalcount',
            width:100
          }, {
            title: '总金额',
            dataIndex: 'totalamount',
            width:100
          }, {
            title: '申请时间',
            dataIndex: 'applytime',
            width:100
          }, {
            title: '成功笔数',
            dataIndex: 'succcount',
            width:100
          }, {
            title: '失败笔数',
            dataIndex: 'failcount',
            width:100
          }, {
            title: '失败金额',
            dataIndex: 'result',
            width:100
          }, {
            title: '处理状态',
            dataIndex: 'status',
            width:100
          }, {
            title: '',
            dataIndex: 'detail',
            width:100
          }];
        const data = [];
          
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
            <div className="layout common">
                <div className="error handle">
                    <h2 className="File-title">导入结果处理</h2>
                    <ul className="data-info handle-info">
                        <li><span>公司名称：</span><Input className="input"/></li>
                        <li className="date handle-date">
                            <span className="date-title">申请日期：</span>
                            <DatePicker/>
                            <span className="date-to">To</span>
                            <DatePicker/>
                            <Button className="query-btn" type="primary">查询</Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button type="primary" style={{marginRight:30}} onClick={this.showLeadingFileModal}>
                              <Icon type="upload" />
                              导入代发结果文件
                            </Button> 
                            <Button type="primary" onClick={this.showConfirm}>
                              <Icon type="check-circle" />
                              结果确认
                            </Button>  
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                          rowSelection={rowSelection} 
                          columns={columns} 
                          dataSource={data} 
                          bordered={true}
                          pagination={true}
                        />
                    </div>
                </div>
                <LeadingFileModal/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
  showLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.showLeadingFileModal, dispatch),
  hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingResult);