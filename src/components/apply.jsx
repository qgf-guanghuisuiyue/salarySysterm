import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/upload';
import AcceptDetailModalComponent from './apply/acceptDetailModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, DatePicker, Table, Select } from 'antd';
const Option = Select.Option;


//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Apply extends React.Component{
    state = {
        startDate: null,
        endDate: null,
        endOpen: false,
        corpName: '',
        record: {}
    };

    params = {
        skip: 0,
        count: 10
    }

    componentDidMount() {
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
        const skip = this.skip;
        this.props.getDataSwitchList({...this.params, corpName , startDate , endDate})
    }

    showAcceptDetailModal = (record) => {
        const {getPayagentDetail} = this.props;
        this.props.showAcceptDetailModal({...this.params,
            batchNo: record.batchno
        }, getPayagentDetail);
        this.setState({record})
    }

    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <Link>{index+1}</Link>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <a onClick={this.showAcceptDetailModal.bind(this,record)}>明细</a>;
        }
        return columns;
    }

    render(){
        const { startDate, endDate, endOpen, corpName, record } = this.state;
        const {applyList} = this.props;
        const {isLoading , dataSwitchList={}} = this.props,
        data = dataSwitchList.list?dataSwitchList.list:[],//列表数据
        count = dataSwitchList.count;//总条数   
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
                                showTime
                                format="YYYY-MM-DD"
                                value={startDate}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                            <span className="title">To</span>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
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
                            loading={isLoading}
                            rowSelection={rowSelection}
                            columns={this.getColumns()}
                            dataSource={data}
                            bordered
                            pagination={{
                                defaultPageSize:5,
                                count: count
                            }}
                        />
                    </div>
                </div>
                <AcceptDetailModalComponent  record={record}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataSwitchList: state.DataSwitch.dataSwitchList,
    isLoading: state.DataSwitch.isLoading,
    applyList: state.Apply.applyList,
})
const mapDispatchToProps = dispatch => ({
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch),
    showAcceptDetailModal: bindActionCreators(Actions.ApplyActions.showAcceptDetailModal, dispatch),
    getPayagentDetail: bindActionCreators(Actions.DataSwitchActions.getPayagentDetail, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Apply);