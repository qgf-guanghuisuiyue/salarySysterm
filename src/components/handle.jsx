import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import { Table , Button , Input , DatePicker , Icon , Select} from 'antd';

 class Handle extends React.Component{
    constructor(){
        super();
        this.state={
          batchNo:"",
          companyName:"",
          status:"",
          startDate:"",
          endDate:""
        }
    }
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        NProgress.start()
        NProgress.done()
    }
    onChange = (field,e) => {
        this.setState({
          [field]:e.target.value
        })
    }
    onSelectChange = (value) => {
        this.setState({
            status:value
        })
    }
    onDateChange = (date, dateString) => {
        this.setState({
            [date]:moment(dateString).format("YYYYMMDD")
        })
    }
    Option = [
        {value:"-1",text:"撤销"},
        {value:"0",text:"全部成功"},
        {value:"1",text:"部分成功"},
        {value:"2",text:"待处理"},
        {value:"3",text:"处理中"},
        {value:"4",text:"拒绝处理"}
    ]
    searchHandleList = () => {
      const { batchNo , companyName , status , startDate , endDate } = this.state;
      this.props.searchHandleList({...this.params,...this.state})
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
                <div className="error handle">
                    <h2 className="File-title">受理查询</h2>
                    <ul className="data-info handle-info" >
                        <li style={{marginLeft:100}}>
                            <span>批次号：</span>
                            <Input 
                                onChange = {this.onChange.bind(this,"batchNo")}
                            />
                        </li>
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                className="input" 
                                onChange = {this.onChange.bind(this,"companyName")}
                            />
                        </li>
                        <li>
                            <span className="select-name">处理结果：</span>
                            <Select 
                                className="resultSelect" 
                                defaultValue="选择" 
                                style={{width:180}}
                                onChange = {this.onSelectChange}
                            >
                              {
                                this.Option.map((item,index)=>{
                                    return (<Option value={item.value}>{item.text}</Option>)
                                })
                              } 
                            </Select>
                        </li>
                        <li className="date handle-date">
                            <span className="date-title">申请日期：</span>
                            <DatePicker onChange={this.onDateChange.bind(this,"startDate")}/>
                            <span className="date-to">To</span>
                            <DatePicker onChange={this.onDateChange.bind(this,"endDate")}/>
                            <Button 
                                className="query-btn" 
                                type="primary" 
                                style={{left:288}} 
                                onClick= {this.searchHandleList}
                            >
                              查询
                            </Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                        {/* <div className="people-select">
                            <Icon type="retweet" />&nbsp;&nbsp;生成银行代发文件
                        </div> */}
                    </div>
                    <div className="err-table" style={{marginTop:20}}>
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
  searchHandleList: bindActionCreators(Actions.HandleActions.searchHandleList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Handle);