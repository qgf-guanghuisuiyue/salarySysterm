import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import DataCompareModal from './dataCompare'

import { Table , Button , Tooltip , Select} from 'antd';
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
    showFileModal = () => {
      this.props.showFileModal()
    }
    render(){
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            width:50
            }, {
            title: '银行代发文件',
            dataIndex: 'name',
            width:150,
            render: text => <a href="#">{text}</a>,
          }, {
            title: '代发银行',
            dataIndex: 'age',
            width:150,
          }, {
            title: '代发方式',
            dataIndex: 'address',
            width:150,
          }, {
            title: '代发文件生成日期',
            dataIndex: 'bank',
            width:150,
          }, {
            title: '代发结果文件',
            dataIndex: 'sum',
            width:150,
          }, {
            title: '结果文件上传日期',
            dataIndex: 'remark',
            width:150,
          }, {
            title: '代发结果',
            dataIndex: 'result',
            width:150,
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
                <div className="leadingResult">
                    <h2 className="File-title">生成银行代发文件</h2>
                    <ul className="data-info">
                        <li><span>批次号：</span><span>1212121</span></li>
                        <li><span>公司名称：</span><span>海擎金融信息服务有限公司</span></li>
                        <li><span>代发文件名：</span><span>厄齐尔</span></li>
                        <li><span>总笔数：</span><span>123</span></li>
                        <li><span>总金额：</span><span>321</span></li>
                        <li><span>申请日期：</span><span>2018-04-16</span></li>
                        <li><span>处理状态：</span><span>受理中</span></li>
                    </ul>
                    <div className="File-btn switchFile">
                        <div className="switchFile-select">
                            <span className="select-name">银行：</span>
                            <Select defaultValue="招商银行">
                              <Option value="lucy">招商银行</Option>
                            </Select>
                            <span className="select-name selectSecond">代发方式：</span>
                            <Select defaultValue="公对私">
                              <Option value="lucy">公对私</Option>
                              <Option value="lucy">私对私</Option>
                            </Select>
                        </div>
                        <Button type="primary" onClick={this.showFileModal}>数据转换</Button>&nbsp;&nbsp;
                        <Button type="primary">生成代发文件</Button>&nbsp;&nbsp;
                        <Button type="primary">直接退回</Button>
                    </div>
                    <div className="File">
                        <span>银行代发文件：</span>
                        <a>12121212121.xls</a>
                        <a>12121212121.xls</a>
                        <a>12121212121.xls</a>
                    </div>
                    <div className="result-table">
                        <Table 
                            rowSelection={rowSelection} 
                            columns={columns} 
                            dataSource={data} 
                            bordered={true}
                            scroll={{y:400}}
                            pagination={false}
                        />
                    </div>
                </div>
                <DataCompareModal/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
   isFileModal: state.DataSwitch.isFileModal
})
const mapDispatchToProps = dispatch => ({
   showFileModal: bindActionCreators(Actions.DataSwitchActions.showFileModal, dispatch),
   hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingResult);