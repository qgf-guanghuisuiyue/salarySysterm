import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import { Table , Button , Tooltip , Input, DatePicker , Icon ,Spin} from 'antd';

import columns from 'data/table-columns/dataSwitch';
import LoadingComponent from './loading';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DataSwitch extends React.Component{
    constructor(){
        super();
        this.state={
            corpName:"",
            startDate:"",
            endDate:""
        }
    }
    onChange = (e) => {
        this.setState({
            corpName:e.target.value
        })
    }
    dateChange = (field,value,dateString) => {
        this.setState({
            [field]:dateString
        })
    }
    queryList = () => {
        const {corpName , startDate , endDate} = this.state;
        this.props.getDataSwitchList({corpName , startDate , endDate,skip:'0',count:'10'})
    }
    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1}</a>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <a>明细</a>;
        }
        return columns;
    }
    render(){
        const {corpName , startDate , endDate} = this.state;
        const {isLoading} = this.props;
        const data = this.props.dataSwitchList.list;
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
                    <h2 className="File-title">申请受理查询</h2>
                    <ul className="data-info handle-info">
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                className="input" 
                                placeholder="公司名称" 
                                value={corpName}
                                onChange = {this.onChange}
                            />
                        </li>
                        <li className="date handle-date">
                            <span className="date-title">代发申请日期：</span>
                            <DatePicker
                                placeholder="开始日期" 
                                onChange={this.dateChange.bind(this,"startDate")}
                            />
                            <span className="date-to">To</span>
                            <DatePicker
                                placeholder="结束日期"
                                onChange={this.dateChange.bind(this,"endDate")}
                            />
                            <Button 
                                className="query-btn" 
                                type="primary"
                                onClick={this.queryList}
                            >
                                查询
                            </Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button type="primary">
                                <Icon type="retweet" />&nbsp;
                                <Link to="createFile">生成银行代发文件</Link>
                            </Button> 
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                            rowSelection={rowSelection} 
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true} 
                            loading={false}
                        />
                    </div>
                </div>
                {isLoading && <LoadingComponent/>}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataSwitchList: state.DataSwitch.dataSwitchList,
    isLoading: state.DataSwitch.isLoading
})
const mapDispatchToProps = dispatch => ({
    getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSwitch);