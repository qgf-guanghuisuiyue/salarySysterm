import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {Input, Upload, Button, DatePicker, Table, Select} from 'antd';
const Option = Select.Option;
import columns from 'data/table-columns/receiptQuery';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class ReceiptQuery extends React.Component{
    state = {
        batchNo: "",
        startDate: "",
        endDate: "",
        corpName:"",
        page:1
    };
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        this.props.searchReceiptList()
    }

    disabledStartDate = (startDate) => {
        const endDate = this.state.endDate;
        if (!startDate || !endDate) {
            return false;
        }
        return startDate.valueOf() > endDate.valueOf();
    }

    disabledEndDate = (endDate) => {
        const startDate = this.state.startDate;
        if (!endDate || !startDate) {
            return false;
        }
        return endDate.valueOf() <= startDate.valueOf();
    }
   
    dateChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <span>{(index+1)+(page-1)*10}</span>
        }
        
        columns[columns.length-5].render = (text,record,index) => {           
            return  <span>{`${text*100}%`}</span>
        }
        columns[columns.length-4].render = (text,record,index) => {           
            return  <span>{`${text*100}%`}</span>
        }
        columns[columns.length-7].render = (text,record,index) => {           
            return  <span>{`${text*100}%`}</span>
        }
        return columns
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.searchLogList();
    }
   
    onInputChange = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    searchReceiptList = () => {
        const { startDate, endDate, batchNo, corpName } = this.state;
        let startTime = startDate ? moment(startDate).format("YYYYMMDD") : '';
        let endTime = endDate ? moment(endDate).format("YYYYMMDD") : '';
        console.log(startTime, endTime)
        this.props.searchReceiptList({startDate: startTime, endDate: endTime, batchNo, corpName })
    } 
    render(){
        const { startDate, endDate, batchNo, corpName } = this.state;
        const {receiptList} = this.props;
        return(
            <div className=" layout common">
                <div className="receipt">
                    <h2 className="File-title">开票查询</h2>
                    <div className="handle-block" style={{width:"80%"}}>
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Input 
                                style={{width: 200}} 
                                value={corpName} 
                                placeholder="请输入公司名称"
                                onChange={this.onInputChange.bind(this,"corpName")}
                            />
                        </div>
                        <div className="inline-block">
                            <span className="title">批次号：</span>
                            <Input 
                                style={{width: 200}} 
                                value={batchNo}
                                placeholder="请输入批次号"
                                onChange={this.onInputChange.bind(this,"batchNo")}
                            />
                        </div>
                         
                    </div>
                    <div className="handle-block" style={{width:"80%"}}>
                        <span className="title">收款日期：</span>
                        <DatePicker
                            placeholder="开始日期"
                            disabledDate={this.disabledStartDate}
                            style={{width:200}}
                            onChange={this.dateChange.bind(this,"startDate")}
                        />
                        <span className="title">&nbsp;&nbsp;TO &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <DatePicker
                            placeholder="结束日期"
                            disabledDate={this.disabledEndDate}
                            style={{width:200}} 
                            onChange={this.dateChange.bind(this,"endDate")}
                        />
                        <Button 
                            type="primary" 
                            style={{left:50}}
                            onClick={this.searchReceiptList}
                        >
                            查询
                        </Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={receiptList.list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize:10,
                                total: receiptList.count,
                                onChange: this.onChangePagination,
                                showTotal:total => `共 ${receiptList.count == 0 ? 0 : receiptList.count} 条数据`
                            }}
                        />
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    receiptList: state.Receipt.receiptList
})
const mapDispatchToProps = dispatch => ({
    searchReceiptList: bindActionCreators(Actions.ReceiptActions.searchReceiptList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceiptQuery);