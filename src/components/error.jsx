import React from 'react';
import moment from 'moment';

import columns from 'data/table-columns/error'

import { Table , Button , Input , DatePicker , Checkbox , Icon , Modal , Select,notification} from 'antd';
const confirm = Modal.confirm;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Error extends React.Component{
    constructor(){
        super();
        this.state={
            batchNo:"",
            companyName:"",
            status:"",
            startDate:"",
            endDate:"",
            page:1,
            msg:"",
            detailID:"",
            selectedRowKeys:[],
        }
    }
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        this.searchErrorList()
    }
    onChange = (e) => {
        this.setState({
            msg:e.target.value
        })
    }
    handle = () => {
        const {detailID} = this.state;
        const _this = this;
        if(detailID){
            confirm({
                title:"手工处理" ,
                content:<label>处理备注：<Input onChange={this.onChange}/></label>,
                className:"handWork",
                okText:"保存",
                onOk() {
                    const {detailID, msg} = _this.state;
                    _this.props.handleMsg({detailID, msg},_this.searchErrorList);
                    _this.setState({
                        selectedRowKeys:[],
                        detailID:""
                    })
                  },
            });
        }else{
            notification.warning({
                message:"请先选择失败文件"
            })
        }
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*10}</a>
        }
        columns[columns.length-4].render = (text,record,index) => {           
            return  <span>{record.updatedate?moment(record.updatedate).format("YYYY-MM-DD"):""}</span>
        }
        return columns
    }
    onInputChange = (field,e) => {
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
    searchErrorList = () => {
        this.props.searchErrorList({...this.params,...this.state})
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.searchErrorList();
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
    rowSelection = () =>{
        const {selectedRowKeys} = this.state;
        const _this = this;
       // 通过 rowSelection 对象表明需要行选择
        return {
           type:'radio',
           selectedRowKeys,
           onChange: this.onSelectChange,
           onSelect(record, selected, selectedRows) {
                   _this.setState({
                        detailID:record.detailID
                   })
               }
       };
    } 
    render(){
        const { errorList } = this.props,
            {count , list} = errorList;
        return(
            <div className="layout common">
                <div className="error">
                    <h2 className="File-title"  style={{marginBottom:20}}>失败查询</h2>
                    <ul className="data-info err-info">
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                placeholder="请输入公司名称"
                                onChange = {this.onInputChange.bind(this,"companyName")}
                            />
                        </li>
                        <li>
                            <span>批次号：</span>
                            <Input 
                                placeholder="请输入批次号"
                                onChange = {this.onInputChange.bind(this,"batchNo")}
                            />
                        </li>
                        
                        <li>
                            <span>处理结果：</span>
                            <Select 
                                className="resultSelect"
                                placeholder="请选择" 
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
                    </ul>
                    <div className="date" style={{width:"86.5%"}}>
                        <span className="date-title">申请日期：</span>
                        <DatePicker 
                            placeholder="请选择开始日期"
                            style={{width:180}}
                            onChange={this.onDateChange.bind(this,"startDate")}
                        />
                        <span className="date-to">To</span>
                        <DatePicker 
                            placeholder="请选择结束日期"
                            style={{width:180}}
                            onChange={this.onDateChange.bind(this,"endDate")}
                        />
                        <Button 
                            className="query-btn" 
                            type="primary"
                            onClick= {this.searchErrorList}
                        >
                            查询
                        </Button>
                    </div>
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button 
                                type="primary" 
                                onClick= {this.handle}>
                                <Icon type="check-circle" 
                            />
                                手工处理
                            </Button>
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                            rowSelection={this.rowSelection()}
                            columns={this.getColumns()} 
                            dataSource={list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${count} 条数据`
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    errorList: state.Error.errorList
})
const mapDispatchToProps = dispatch => ({
    searchErrorList: bindActionCreators(Actions.ErrorActions.searchErrorList, dispatch),
    handleMsg: bindActionCreators(Actions.ErrorActions.handleMsg, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Error);