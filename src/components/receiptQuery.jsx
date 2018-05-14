import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {Input, Upload, Button, DatePicker, Table} from 'antd';

import columns from 'data/table-columns/receiptCount';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class ReceiptQuery extends React.Component{
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
   
    onInputChange = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    searchLogList = () => {
        
    }
    render(){
        const { startValue, endValue, endOpen, userName, corpName } = this.state;
        return(
            <div className=" layout common">
                <div className="receipt">
                    <h2 className="File-title">开票查询</h2>
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
                            <span className="title">收款公司：</span>
                            <Input 
                                style={{width: 200}} 
                                value={corpName}
                                placeholder="请输入公司名称"
                                onChange={this.onInputChange.bind(this,"corpName")}
                            />
                        </div>  
                    </div>
                    <div className="handle-block">
                        <span className="title">收款日期：</span>
                        <DatePicker
                            placeholder="开始日期" 
                            //onChange={this.dateChange.bind(this,"startDate")}
                        />
                        <span className="title">收款日期：</span>
                        <DatePicker
                            placeholder="开始日期" 
                            //onChange={this.dateChange.bind(this,"startDate")}
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
                            dataSource={[]} 
                            bordered={true}
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
)(ReceiptQuery);