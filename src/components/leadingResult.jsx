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
    constructor(){
        super();
        this.state={
            
        }
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
            }, {
            title: '银行代发文件',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '代发银行',
            dataIndex: 'age',
          }, {
            title: '代发方式',
            dataIndex: 'address',
          }, {
            title: '代发文件生成日期',
            dataIndex: 'bank',
          }, {
            title: '代发结果文件',
            dataIndex: 'sum',
          }, {
            title: '结果文件上传日期',
            dataIndex: 'remark',
          }, {
            title: '代发结果',
            dataIndex: 'result',
          }];
        const data = [{
            key: '1',
            name: '胡彦斌',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            result:"成功"
          }, {
            key: '2',
            name: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            result:"成功"
          }, {
            key: '3',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            result:"成功"
          }, {
            key: '4',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            result:"成功"
          }, {
            key: '5',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            result:"成功"
          }];
          
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
                          scroll={{y:500}}
                          pagination={false}
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