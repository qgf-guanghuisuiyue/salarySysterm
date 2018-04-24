import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/apply';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, DatePicker, Table, Select } from 'antd';
const Option = Select.Option;


//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Apply extends React.Component{
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    params = {
        skip: 0,
        count: 10
    }

    componentDidMount() {
        this.props.getApplyList(this.params)
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <Link>{index+1}</Link>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <Link>明细</Link>;
        }
        return columns;
    }

    render(){
        const { startValue, endValue, endOpen } = this.state;
        const {applyList} = this.props;
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
                            <span className="title">批次号:</span>
                            <Input style={{width: 200}}/>
                            
                        </div>
                        <div className="inline-block">
                            <span className="title">申请日期：</span>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={startValue}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                            <span className="title">To</span>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={endValue}
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                        </div>  
                    </div>
                    <div className="handle-block">
                        <span className="title">处理结果：</span>
                        <Select defaultValue="option1" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="option1">option1</Option>
                            <Option value="option2">option2</Option>
                            <Option value="option3">option3</Option>
                        </Select>
                    </div>
                    <div className="handle-block" style={{textAlign: "right"}}>
                        <Button type="primary">查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <Table 
                            loading={applyList.isLoading}
                            rowSelection={rowSelection}
                            columns={this.getColumns()}
                            dataSource={applyList.list}
                            bordered={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    applyList: state.Apply.applyList,
})
const mapDispatchToProps = dispatch => ({
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Apply);