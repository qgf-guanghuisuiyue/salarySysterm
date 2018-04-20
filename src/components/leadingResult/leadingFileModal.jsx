import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Input , DatePicker ,Icon , Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingFile extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    render(){
        const {isLeadingFileModal} = this.props;
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
          <Modal
                title={<h2>导入结果代发文件</h2>}
                wrapClassName="vertical-center-modal"
                visible={isLeadingFileModal}
                width={1360}
                footer={false}
                onCancel={() => this.props.hideLeadingFileModal()}
          >
              <div className="leadingResult">
                  <ul className="data-info">
                      <li><span>批次号：</span><span>1212121</span></li>
                      <li><span>公司名称：</span><span>海擎金融信息服务有限公司</span></li>
                      <li><span>代发文件名：</span><span>厄齐尔</span></li>
                      <li><span>总笔数：</span><span>123</span></li>
                      <li><span>总金额：</span><span>321</span></li>
                      <li><span>申请日期：</span><span>2018-04-16</span></li>
                      <li><span>处理状态：</span><span>受理中</span></li>
                  </ul>
                  <div className="File-btn">
                      <Button type="primary">导入结果文件</Button>
                  </div>
                  <div className="result-table">
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
          </Modal>
        )
    }
}
const mapStateToProps = state => ({
  isLeadingFileModal: state.LeadingResult.isLeadingFileModal
})
const mapDispatchToProps = dispatch => ({
  hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingFile);