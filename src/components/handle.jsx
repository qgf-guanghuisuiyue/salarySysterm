import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/handle';
import DetailModalComponent from './upload/detailModal';
import store from 'store';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import { Table , Button , Input , DatePicker , Icon , Select} from 'antd';

 class Handle extends React.Component{
    constructor(){
        super();
        this.state={
            batchNo:"",
            companyName:"",
            status:"",
            startDate:"",
            endDate:"",
            page:1,
            record:{}
        }
    }
    params = {
        skip:0,
        count:10
    }
    componentDidMount(){
        this.searchHandleList();
    }
    onChange = (field,e) => {
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
    searchHandleList = () => {
        const { batchNo , companyName , status , startDate , endDate } = this.state;
        this.props.getDataSwitchList({...this.params,...this.state})
    }
    getColumns = () => {
        const {page} = this.state;
        const token = store.get('token'),
            origin = window.location.origin,
            url = `/PayAgent/api/web/file/downloadFile?token=${token.token}&tokenKey=${token.tokenKey}&fileName=`;

        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*10}</a>
        }
        columns[3].render = (text,record,index) => { 
            return  <a href={`${origin + url + record.payapplyfilename}`} title="点击下载文件">{record.payapplyfilename}</a>
        }
        columns[columns.length-2].render = (text,record,index) => {
            return  <span>
                        {
                            record.status===0?"全部成功":
                            record.status===1?"部分成功":
                            record.status===2?"待处理":
                            record.status===3?"处理中":
                            record.status===4? "拒绝处理":
                            record.status===5? "待提交":
                            record.status===6? "代发失败":
                            record.status===-1 && "撤销"
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
        this.params.skip = page * 10 - 10;
        this.searchHandleList();
    }
    render(){
        const {record} = this.state;
        const { isUpLoadModal, dataSwitchList, payFileCreate} = this.props,
            data = dataSwitchList.list?dataSwitchList.list:[],//列表数据
            count = dataSwitchList.count;//总条数 
        return(
            <div className="layout common">
                <div className="error handle">
                    <h2 className="File-title">受理查询</h2>
                    <ul className="data-info handle-info" >
                        <li style={{marginLeft:100}}>
                            <span>批次号：</span>
                            <Input 
                                placeholder="请输入批次号"
                                onChange = {this.onChange.bind(this,"batchNo")}
                            />
                        </li>
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                className="input"
                                placeholder="请输入公司名称" 
                                onChange = {this.onChange.bind(this,"companyName")}
                            />
                        </li>
                        <li>
                            <span className="select-name">处理结果：</span>
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
                        <li className="date handle-date">
                            <span className="date-title">申请日期：</span>
                            <DatePicker
                                placeholder="请选择开始日期"
                                onChange={this.onDateChange.bind(this,"startDate")}
                            />
                            <span className="date-to">To</span>
                            <DatePicker 
                                placeholder="请选择结束日期"
                                onChange={this.onDateChange.bind(this,"endDate")}
                            />
                            <Button 
                                className="query-btn" 
                                type="primary" 
                                style={{left:288}} 
                                onClick= {this.searchHandleList}
                            >
                                查询
                            </Button>
                        </li>
                    </ul>
                    
                    <div className="list">
                        <h2>列表</h2>
                    </div>
                    <div 
                        className="err-table" 
                        style={{marginTop:20}}
                    >
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true}
                            pagination={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${count} 条数据`
                            }}
                        />
                    </div>
                </div>
                <DetailModalComponent record={record}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataSwitchList: state.DataSwitch.dataSwitchList,
})
const mapDispatchToProps = dispatch => ({
    getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Handle);