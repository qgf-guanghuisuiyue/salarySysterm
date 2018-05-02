import React from 'react';
import moment from 'moment';
import { Table , Button , Tooltip , Input, DatePicker , Icon ,notification } from 'antd';

import columns from 'data/table-columns/dataSwitch';
import LoadingComponent from './loading';
import DetailModalComponent from './upload/detailModal';

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
            endDate:"",
            batchno:"",
            page:1,
            record:{}
        }
    }
    componentDidMount(){
        NProgress.start()
        NProgress.done()
    }
    skip = 0;
    params = {
        skip: 0,
        count: 10
    }
    onChange = (e) => {
        this.setState({
            corpName:e.target.value
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
    queryList = () => {
        const {corpName , startDate , endDate} = this.state;
        //const skip = this.skip;
        this.props.getDataSwitchList({corpName , startDate , endDate,...this.params})
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*5}</a>
        }
        columns[columns.length-2].render = (text,record,index) => {
            return  <span>
                        {
                            record.status===0?"全部成功":
                            record.status===1?"部分成功":
                            record.status===2?"待处理":
                            record.status===3?"处理中":
                            record.status===4 ? "拒绝处理":
                            record.status===-1 ? "撤销":"暂无"
                        }
                    </span>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <a onClick = {this.showDetailModal.bind(this,record)}>明细</a>;
        }
        return columns;
    }
    //明细查询
    showDetailModal = (record) => {
        const {payAgentApplyDetaillist} = this.props;
        this.props.showDetailModal({...this.params,
            batchNo: record.batchno
        }, payAgentApplyDetaillist);
        this.setState({record})
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 5 - 5;
        this.queryList();
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
    createFile = () => {
         const {batchno} = this.state;
         if(!batchno){
            notification.warning({
                message: '请选择代发申请文件'
            });
         }else{
            window.location.hash = `#/createFile?batchno=${batchno}`
            NProgress.done()
         }
    }
    render(){
        const {corpName , startDate , endDate  ,batchno , record} = this.state;
        const {isLoading , dataSwitchList={}} = this.props,
                data = dataSwitchList.list?dataSwitchList.list:[],//列表数据
                count = dataSwitchList.count;//总条数 
        return(
            <div className=" layout common">
                <div className="error handle">
                    <h2 className="File-title">数据转换列表查询</h2>
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
                            <Button 
                                type="primary"
                                onClick= {this.createFile}
                            >
                                <Icon type="retweet" />
                                生成银行代发文件
                            </Button> 
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                            rowSelection={this.rowSelection()} 
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true} 
                            loading={isLoading}
                            pagination={{
                                defaultPageSize: 5,
                                total: count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${count} 条数据`
                            }}
                        />
                    </div>
                </div>
                {isLoading && <LoadingComponent/>}
                <DetailModalComponent record={record}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataSwitchList: state.DataSwitch.dataSwitchList,
    isLoading: state.DataSwitch.isLoading
})
const mapDispatchToProps = dispatch => ({
    getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSwitch);