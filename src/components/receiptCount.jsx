import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {Input, Upload, Button, DatePicker, Table, Select, Icon, Modal, notification} from 'antd';

import ReceiptModal from './receipt/receiptModal';
import columns from 'data/table-columns/receiptCount';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class ReceiptCount extends React.Component{
    state = {
        batchNo: "",
        rate: "",
        startDate: "",
        endDate: "",
        corpName:"",
        page:1,
        record:{},
        selectedRowKeys:[]
    };
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        this.searchReceiptList();
        this.props.getCompanyName()
    }

    onChangeSelect = (value) => {
        this.setState({
            rate:value
        })
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*10}</a>
        }
        columns[columns.length-2].render = (text,record,index) => { 
            return  <span>{record.rate==0?"未核算":record.rate==1?"已核算未开票":record.rate==2 && "已开票"}</span>
        }
        columns[columns.length-1].render = (text,record,index) => {
            return  <a onClick={this.showReceiptModal.bind(this,record)}>开票详情</a>
        }
        return columns
    }
    //清空表格选择框
    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.setState({
            selectedRowKeys:[],
        })
    }
    //表格选择框选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys});
    }
    
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.searchLogList();
    }
    dateChange = (field, value) => {
        this.setState({
            [field]: value?moment(value).format("YYYYMMDD"):"",
        });
    }
    onInputChange = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    searchReceiptList = () => {
        const { startDate, endDate, batchNo, corpName ,rate} = this.state;
        this.props.searchReceiptList({startDate, endDate, batchNo, corpName ,rate})
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.searchReceiptList();
    }
    rowSelection = () =>{
        const _this = this;
        const {selectedRowKeys} = this.state;
       // 通过 rowSelection 对象表明需要行选择
        return {
           type:'radio',
           selectedRowKeys,
           onChange: this.onSelectChange,
           onSelect(record, selected, selectedRows) {
                   _this.setState({
                        record
                   })
               }
       };
    } 
    showReceiptModal = (value) => {
        const {record} = this.state;
        if(record.activeflag || value.activeflag){
            if(value.activeflag){
                this.setState({
                    record:value
                })
            }
            this.props.showReceiptModal()
        }else{
            notification.warn({
                message:"请先选择付款公司"
            })
        }
    }
    cancelRecord = () =>{
        this.setState({
            record:{}
        })
        this.clearTableCheckbox()
    }
    render(){
        const { startDate, endDate, batchNo, corpName ,rate, record} = this.state;
        const {
            receiptList, 
            isReceiptModal, 
            hideReceiptModal,
            companyList,
            getCompanyName,
            rateAndEarnList,
            calculateList,
            calculate,
            saveData,
            isCalLoading
        } = this.props;
        return(
            <div className="layout common">
                <div className="receipt">
                    <h2 className="File-title">开票计算</h2>
                    <div className="handle-block">
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
                        <div className="inline-block">
                            <span className="title">开票状态：</span>
                            <Select style={{width: 200}} placeholder="请选择处理状态" onChange={this.onChangeSelect}>
                                <Option value={0}>开票信息未处理</Option>
                                <Option value={1}>开票信息已处理</Option>
                            </Select>
                        </div>  
                    </div>
                    <div className="handle-block">
                        <span className="title">收款日期：</span>
                        <DatePicker
                            placeholder="开始日期"
                            style={{width:200}}
                            onChange={this.dateChange.bind(this,"startDate")}
                        />
                        <span className="title">&nbsp;&nbsp;TO &nbsp;&nbsp;&nbsp;</span>
                        <DatePicker
                            placeholder="开始日期" 
                            style={{width:200}}
                            onChange={this.dateChange.bind(this,"endDate")}
                        />
                        
                        <Button 
                            type="primary" 
                            style={{left:260}}
                            onClick={this.searchReceiptList}
                        >
                            查询
                        </Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="people-select" style={{marginLeft:30}}>
                        <Button 
                            type="primary"
                            style={{marginTop:15}}
                            onClick= {this.showReceiptModal}
                        >
                            <Icon type="retweet" />
                            金额计算及开票
                        </Button> 
                    </div>
                    <div className="table-area">
                        <Table 
                            rowSelection={this.rowSelection()} 
                            columns={this.getColumns()} 
                            dataSource={receiptList.list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: receiptList.count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${receiptList.count} 条数据`
                            }}
                        />
                    </div>
                </div>
                <ReceiptModal 
                    isReceiptModal={isReceiptModal} 
                    hideReceiptModal={hideReceiptModal}
                    record= {record}
                    companyList= {companyList}
                    getCompanyName= {getCompanyName}
                    rateAndEarnList= {rateAndEarnList}
                    calculateList = {calculateList}
                    calculate={calculate}
                    saveData= {saveData}
                    isCalLoading= {isCalLoading}
                    cancelRecord = {this.cancelRecord}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    receiptList: state.Receipt.receiptList,
    isReceiptModal: state.Receipt.isReceiptModal,
    companyList: state.Receipt.companyList,
    rateAndEarnList: state.Receipt.rateAndEarnList,
    calculateList: state.Receipt.calculateList,
    isCalLoading: state.Receipt.isCalLoading
})
const mapDispatchToProps = dispatch => ({
    searchReceiptList: bindActionCreators(Actions.ReceiptActions.searchReceiptList, dispatch),
    showReceiptModal: bindActionCreators(Actions.ReceiptActions.showReceiptModal, dispatch),
    hideReceiptModal: bindActionCreators(Actions.ReceiptActions.hideReceiptModal, dispatch),
    getCompanyName: bindActionCreators(Actions.ReceiptActions.getCompanyName, dispatch),
    calculate: bindActionCreators(Actions.ReceiptActions.calculate, dispatch),
    saveData: bindActionCreators(Actions.ReceiptActions.saveData, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceiptCount);