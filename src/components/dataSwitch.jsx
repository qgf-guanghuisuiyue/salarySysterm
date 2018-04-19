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
                            <Button><Icon type="retweet" />&nbsp;<Link to="createFile">生成银行代发文件</Link></Button> 
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