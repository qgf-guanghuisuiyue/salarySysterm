import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import { Table , Button , Tooltip , Input, DatePicker , Icon} from 'antd';

import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DataSwitch extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    
    render(){
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            }, {
            title: '姓名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '卡号',
            dataIndex: 'age',
          }, {
            title: '银行名称',
            dataIndex: 'address',
          }, {
            title: '开户行',
            dataIndex: 'bank',
          }, {
            title: '金额',
            dataIndex: 'sum',
          }, {
            title: '备注',
            dataIndex: 'remark',
          }];
        const data = [{
            key: '1',
            name: '胡彦斌',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '2',
            name: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '3',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
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
            <div className=" layout common">
                <div className="error handle">
                    <h2 className="File-title">代发薪申请受理查询</h2>
                    <ul className="data-info handle-info">
                        <li><span>公司名称：</span><Input className="input"/></li>
                        <li className="date handle-date">
                            <span className="date-title">代发申请日期：</span>
                            <DatePicker/>
                            <span className="date-to">To</span>
                            <DatePicker/>
                            <Button className="query-btn" type="primary">查询</Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Icon type="retweet" />&nbsp;&nbsp;生成银行代发文件
                        </div>
                    </div>
                    <div className="err-table">
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered={true}/>
                    </div>
                </div>
                {/* <div className="dataSwitch">
                    <h2 className="File-title">数据对比</h2>
                    <ul className="data-info">
                        <li><span>批次号：</span><span>1212121</span></li>
                        <li><span>公司名称：</span><span>121212</span></li>
                        <li><span>代发文件名：</span><span>12121212</span></li>
                        <li><span>申请日期：</span><span>1212121</span></li>
                    </ul>
                    <div className="File-btn">
                        <Tooltip title="先检查是否已完成数据的转换">
                            <Button type="primary">生成代发文件</Button>
                        </Tooltip>
                        
                    </div>
                    <div className="table-left">
                        <ul className="table-head">
                            <li>原公司提交数据</li>
                            <li><span>总笔数：</span><span>222222</span></li>
                            <li><span>总金额：</span><span>222222</span></li>
                        </ul>
                        <Table columns={columns} dataSource={data} bordered={true}/>
                    </div>
                    <div className="table-right">
                        <ul className="table-head">
                            <li>转换后数据</li>
                            <li><span>总笔数：</span><span>222222</span></li>
                            <li><span>总金额：</span><span>222222</span></li>
                        </ul>
                        <Table columns={columns} dataSource={data} bordered={true}/>
                    </div>
                </div> */}

            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSwitch);