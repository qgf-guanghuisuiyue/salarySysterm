import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Input , DatePicker , Checkbox , Icon , Modal} from 'antd';
const confirm = Modal.confirm;
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Error extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    onChange = (e) => {
      console.log(e.target.value)
    }
    handle = () => {
        confirm({
            title:"手工处理" ,
            content:<label>处理备注：<Input onChange={this.onChange}/></label>,
            className:"handWork",
            okText:"保存",
            onOk() {
                console.log('确定');
              },
        });
    }
    render(){
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            }, {
            title: '批次号',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '代发申请日期',
            dataIndex: 'age',
          }, {
            title: '公司名称',
            dataIndex: 'address',
          }, {
            title: '姓名',
            dataIndex: 'bank',
          }, {
            title: '卡号',
            dataIndex: 'sum',
          }, {
            title: '开户行',
            dataIndex: 'remark',
          }, {
            title: '交易日期',
            dataIndex: 'date',
          }, {
            title: '交易金额',
            dataIndex: 'money',
          }, {
            title: '交易备注',
            dataIndex: 'explain',
          }, {
            title: '后续处理备注',
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
            date:"2018-04-16",
            money:"234",
            explain:"121212",
            result:"成功"
          }, {
            key: '2',
            name: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            date:"2018-04-16",
            money:"234",
            explain:"121212",
            result:"成功"
          }, {
            key: '3',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666",
            date:"2018-04-16",
            money:"234",
            explain:"121212",
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
                <div className="error">
                    <h2 className="File-title">失败交易查询</h2>
                    <ul className="data-info err-info">
                        <li>
                            <span>批次号：</span>
                            <Input/>
                        </li>
                        <li>
                            <span>公司名称：</span>
                            <Input/>
                        </li>
                        <li>
                            <span>姓名：</span>
                            <Input/>
                        </li>
                    </ul>
                    <div className="date">
                        <span className="date-title">代发申请日期：</span>
                        <DatePicker/>
                        <span className="date-to">To</span>
                        <DatePicker/>
                        <Button className="query-btn" type="primary">查询</Button>
                    </div>
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button type="primary" onClick= {this.handle}><Icon type="check-circle" />手工处理</Button>
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
)(Error);