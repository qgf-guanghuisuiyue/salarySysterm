import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table} from 'antd';

import columns from 'data/table-columns/log'
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Log extends React.Component{
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
        userName:"",
        corpName:"",
        page:1
    };
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        this.searchLogList()
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
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*10}</a>
        }
        columns[4].render = (text,record,index) => { 
            return  <a>{record.logindate?moment(record.logindate).format("YYYY/MM/DD  h:mm:ss  a"):""}</a>
        }
        columns[5].render = (text,record,index) => {           
            return  <a>{record.logoutdate?moment(record.logoutdate).format("YYYY/MM/DD  h:mm:ss  a"):""}</a>
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
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    onInputChange = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    searchLogList = () => {
        const {startValue, endValue, userName, corpName} = this.state;
        const startDate =startValue? moment(startValue).format("YYYYMMDD"):"";
        const endDate = endValue?moment(endValue).format("YYYYMMDD"):"";
        this.props.userInfoRoleLogList({...this.params,startDate,endDate,userName,corpName})
    }
    render(){
        const { startValue, endValue, endOpen, userName, corpName } = this.state;
        const { isLogLoading , logList } = this.props;
        return(
            <div className=" layout common">
                {/* 日志查询 */}
                <div className="log">
                    <h2 className="File-title">日志查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">姓名:</span>
                            <Input 
                                style={{width: 200}} 
                                value={userName} 
                                placeholder="请输入姓名"
                                onChange={this.onInputChange.bind(this,"userName")}
                            />
                        </div>
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Input 
                                style={{width: 200}} 
                                value={corpName}
                                placeholder="请输入公司名称"
                                onChange={this.onInputChange.bind(this,"corpName")}
                            />
                        </div>  
                    </div>
                    <div className="handle-block">
                        <span className="title">申请日期：</span>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            //showTime
                            //format="YYYY-MM-DD HH:mm:ss"
                            value={startValue}
                            placeholder="开始时间"
                            onChange={this.onChange.bind(this,"startValue")}
                            //onOpenChange={this.handleStartOpenChange}
                        />
                        <span className="title">To&nbsp;&nbsp;&nbsp;</span>
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            //showTime
                            //format="YYYY-MM-DD HH:mm:ss"
                            value={endValue}
                            placeholder="结束时间"
                            onChange={this.onChange.bind(this,"endValue")}
                            //open={endOpen}
                            //onOpenChange={this.handleEndOpenChange}
                        />
                        <Button 
                            type="primary" 
                            style={{left:50}}
                            onClick={this.searchLogList}
                        >
                            查询
                        </Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={logList.list} 
                            bordered={true}
                            loading={isLogLoading}
                            size={"middle"}
                            pagination={{
                                defaultPageSize: 10,
                                total: logList.sum,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${logList.sum} 条数据`
                            }}
                        />
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLogLoading: state.System.isLogLoading,
    logList: state.System.logList
})
const mapDispatchToProps = dispatch => ({
    userInfoRoleLogList: bindActionCreators(Actions.SystemActions.userInfoRoleLogList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Log);