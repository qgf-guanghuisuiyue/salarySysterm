import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/upload';
import DetailModalComponent from './upload/detailModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, DatePicker, Table, Select } from 'antd';
const Option = Select.Option;


//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Apply extends React.Component{
    state = {
        startDate: '',
        endDate: '',
        endOpen: false,
        corpName: '',
        record: {},
        page: 1
    };

    params = {
        skip: 0,
        count: 10,
        apply: 'N'
    }

    componentDidMount(){
        this.props.getApplyList(this.params)
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

    onHandleChange = (e) => {
        this.setState({
            corpName:e.target.value
        })
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startDate', value);
    }

    onEndChange = (value) => {
        this.onChange('endDate', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    queryList = () => {
        const {corpName , startDate , endDate} = this.state;
        let startTime = startDate ? moment(startDate).format('YYYYMMDD') : '';
        let endTime = endDate ? moment(endDate).format('YYYYMMDD') : '';
        this.props.getApplyList({...this.params, 'companyname':corpName, 'startDate':startTime, 'endDate':endTime})
    }

    showDetailModal = (record) => {
        const {showDetailModal, payAgentApplyDetaillist} = this.props;
        showDetailModal({...this.params,
            batchNo: record.batchno
        }, payAgentApplyDetaillist);
        this.setState({record})
    }

    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <Link>{index+1+(this.state.page-1)*10}</Link>
        }
        columns[columns.length-2].render = (text,record,index) => {
            return  <span>{record.status===-1?"撤销":record.status===0?"全部成功":record.status===1?"部分处理":record.status===2?"待处理":record.status===3?"处理中":record.status===4?"拒绝处理":record.status===5?"待提交":record.status===6&&"代发失败"}</span>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <a onClick={this.showDetailModal.bind(this,record)}>明细</a>;
        }
        return columns;
    }

    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.queryList()
    }

    render(){
        const { startDate, endDate, endOpen, corpName, record } = this.state;
        const {applyList, payAgentApplyDetaillist} = this.props;
        const {applyData} = applyList;
        return(
            <div className="layout common">
                {/* 申请结果查询 */}
                <div className="apply">
                    <h2 className="File-title">代发结果查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">公司名称:</span>
                            <Input 
                                style={{width: 200}}
                                value={corpName}
                                onChange = {this.onHandleChange}
                            />
                            
                        </div>
                        <div className="inline-block">
                            <span className="title">申请日期：</span>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                format="YYYY-MM-DD"
                                value={startDate}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                            <span className="title">To</span>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                format="YYYY-MM-DD"
                                value={endDate}
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                        </div>  
                        <Button 
                           type="primary" 
                           style={{marginLeft: 100}}
                           onClick={this.queryList}
                        >查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                    <Table 
                        loading={applyList.isLoading}
                        columns={this.getColumns()}
                        dataSource={applyData.list}
                        bordered
                        pagination={{
                            defaultPageSize:10,
                            total: applyData.sum,
                            onChange: this.onChangePagination,
                            showTotal:total => `共 ${applyData.sum == 0 ? 0 : applyData.sum} 条数据`
                        }}
                    />
                    </div>
                </div>
                <DetailModalComponent record={record}  payAgentApplyDetaillist={payAgentApplyDetaillist}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    applyList: state.Apply.applyList,
})
const mapDispatchToProps = dispatch => ({
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Apply);