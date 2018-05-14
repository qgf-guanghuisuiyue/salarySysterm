import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import {Input, Upload, Button, DatePicker, Table} from 'antd';

import columns from 'data/table-columns/receiptCount';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class ReceiptCount extends React.Component{
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
            <div className="layout common">
                <div className="receipt">
                    <h2 className="File-title">开票计算</h2>
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
)(ReceiptCount);