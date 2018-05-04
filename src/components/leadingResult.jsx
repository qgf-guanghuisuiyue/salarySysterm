import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import LeadingFileModal from './leadingResult/leadingFileModal';
import { Table , Button , Tooltip , Input , DatePicker ,Icon ,Modal} from 'antd';
const confirm = Modal.confirm;
import {AjaxByToken} from 'utils/ajax';

import columns from 'data/table-columns/leadingResultList'
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingResult extends React.Component{
    state = {
        companyName:"",
        startDate:"",
        endDate:"",
        batchno:""
    }
    componentDidMount(){
        this.leadingResultQuery()
    }
    params ={
        skip:0,
        count:10
    }
    showLeadingFileModal = () => {
        this.props.showLeadingFileModal()
    }
    showConfirm = () => {
        const _this = this;
        confirm({
            title: '是否确认该批次的代发结果',
            style:{top:'30%'},
            onOk() {
                _this.props.resultConfirm()
            },
            onCancel() {},
        });
    }
    leadingResultQuery = () => {
        const {leadingResultQuery} = this.props;
        const { companyName,startDate,endDate} = this.state;
        leadingResultQuery({...this.params,companyName,startDate,endDate})
    }
    onChange = (e) => {
        this.setState({
            companyName:e.target.value
        })
    }
    dateChange = (field,value,dateString) => {
        if(value){
            this.setState({
                [field]:moment(value).format("YYYYMMDD")
            })
        }else{
            this.setState({
                [field]:""
            })
        } 
    }
    rowSelection = () =>{
        const _this = this;
       // 通过 rowSelection 对象表明需要行选择
        return {
           type:'radio',
           onSelect(record, selected, selectedRows) {
                   _this.setState({
                       batchno:record.batchno
                   })
               }
       };
    } 
    render(){
          const data = [];
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
          const { companyName } = this.state;
        return(
            <div className="layout common">
                <div className="error handle">
                    <h2 className="File-title">导入结果处理</h2>
                    <ul className="data-info handle-info">
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                className="input" 
                                value={companyName}
                                placeholder="请输入公司名称" 
                                onChange={this.onChange}
                            />
                        </li>
                        <li className="date handle-date">
                            <span className="date-title">申请日期：</span>
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
                                onClick={this.leadingResultQuery}
                            >
                                查询
                            </Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button 
                                type="primary" 
                                style={{marginRight:30}} 
                                onClick={this.showLeadingFileModal}
                            >
                              <Icon type="upload" />
                              导入代发结果文件
                            </Button> 
                            <Button 
                                type="primary" 
                                onClick={this.showConfirm}
                            >
                              <Icon type="check-circle" />
                              结果确认
                            </Button>  
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                            rowSelection={this.rowSelection()} 
                            columns={columns} 
                            dataSource={data} 
                            bordered={true}
                            pagination={true}
                        />
                    </div>
                </div>
                <LeadingFileModal/>
            </div>
          )
        }
    }
    const mapStateToProps = state => ({
        
    })
    const mapDispatchToProps = dispatch => ({
        showLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.showLeadingFileModal, dispatch),
        hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
        leadingResultQuery: bindActionCreators(Actions.LeadingResultActions.leadingResultQuery, dispatch),
        resultConfirm: bindActionCreators(Actions.LeadingResultActions.resultConfirm, dispatch)
    })

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(LeadingResult);