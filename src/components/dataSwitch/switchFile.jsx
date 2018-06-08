import React, {Component,PropTypes} from 'react';
import moment from 'moment';
import store from 'store';

import { Table , Button , Tooltip , Select, Menu, Dropdown, Icon} from 'antd';

import DataCompareModal from './dataCompareModal';
import RefuseModal from './refuseModal';
import LoadingComponent from '../loading';

import columns from 'data/table-columns/createFile';
import bank from 'data/bank';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class SwitchFile extends React.Component{
    constructor(){
        super();
        this.state={
            batchNo:"",
            bankName:"",
            pay_way:"1",
            page:1
        }
    }
    static contextTypes = {
        router: PropTypes.object
    };
    showFileModal = () => {
        const {dataResultCheck} = this.props;
        const {batchno} = this.props.location.query;
        this.props.showFileModal(batchno, dataResultCheck)
    }
    goBack = () => {
      this.props.showRefuseModal()
    }
    back = () => {
        this.context.router.push('dataSwitch')
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (record , text , index) =>{
            return <span>{(index + 1)+(page-1)*10}</span>
        }
        return columns
    }
    componentDidMount(){
        const {payFileMakeInfo , getPayagentDetail} = this.props;
        const {batchno} = this.props.location.query;
        this.setState({
            batchNo:batchno
        })
        //调取代发申请人员信息接口
        getPayagentDetail({batchNo:batchno,count:"10",skip:"0"});
        //获取受理文件生成信息
        payFileMakeInfo({batchNo:batchno})
    }
    //页码回调
    onChangePagination = (page) => {
        const {batchno} = this.props.location.query;
        const skip = page*10-10;
        this.setState({
            page
        })
        this.props.getPayagentDetail({batchNo:batchno,count:"10",skip})
    }
    handleChange = (field,value) => {
        this.setState({
            [field]:value
        })
    }
    dataSwitch = () => {
        const {batchNo , bankName , pay_way} = this.state;
        const {getPayagentDetail} = this.props;
        this.props.dataSwitch({batchNo , bankName , pay_way},getPayagentDetail);
    }
    createPayFile = () => {
        const {payFileMakeInfo , getPayagentDetail} = this.props;
        const {batchno} = this.props.location.query;
        this.props.createPayFile({batchNo:batchno},payFileMakeInfo)
    }
    downLoadFile = (filename) => {
        this.props.downLoadPayFile(filename)
    }
    render(){
        const { 
            isLoading , 
            payagentDetail,
            isSwitchLoading ,
            isFileModal ,
            createFileLoading,
            hideRefuseModal,
            isRefuseModal,//拒绝代发Modal
            refusePay,//拒绝代发
            payFileCreate//代发受理文件生成
        } = this.props;
        const {tblPayApplyModel , tblPayInfo={} , list , size} = payagentDetail;
        const { tblPayInfoModel } = payFileCreate;
        const {batchno} = this.props.location.query;
        const token = store.get('token'),
              origin = window.location.origin,
              url = `/PayAgent/api/web/file/downloadExcel?token=${token.token}&tokenKey=${token.tokenKey}&fileName=`;
        return(
            <div className="layout common">
                <div className="leadingResult">
                    <h2 className="File-title">生成银行代发文件</h2>
                    <ul className="data-info switchFileUl" style={{paddingTop:20}}>
                        <li><span>批次号：</span><span>{tblPayApplyModel?tblPayApplyModel.batchno:""}</span></li>
                        <li><span>公司名称：</span><span>{tblPayApplyModel?tblPayApplyModel.corpname:""}</span></li>
                        <li><span>总笔数：</span><span>{tblPayApplyModel?tblPayApplyModel.totalcount:""}</span></li>
                        <li><span>总金额：</span><span>{tblPayApplyModel?tblPayApplyModel.totalamount:""}</span></li>
                        <li>
                            <span>申请日期：</span>
                            <span>{tblPayApplyModel?moment(tblPayApplyModel.applydate).format("YYYY-MM-DD"):""}</span>
                        </li>
                        <li><span>处理状态：</span><span>{tblPayApplyModel?tblPayApplyModel.status===0?"全部成功":tblPayApplyModel.status===1?"部分成功":tblPayApplyModel.status===2?"待处理":tblPayApplyModel.status===3?"处理中":tblPayApplyModel.status===4 ? "拒绝处理":"暂无":""}</span></li>
                        <li style={{width:700}}>
                            <span>代发文件名：</span>
                            <span style={{width:600}}>{tblPayApplyModel?tblPayApplyModel.payapplyfilename:""}</span>
                        </li>
                    </ul>
                    <div className="File-btn switchFile">
                        <div className="switchFile-select">
                            <span className="select-name">银行：</span>
                            <Select defaultValue="招商银行" onChange={this.handleChange.bind(this,"bankName")}>
                                {
                                    ["招商银行"].map((item, index)=>{
                                        return (<Option value={item}>{item}</Option>)
                                    })
                                }
                            </Select>
                            <span className="select-name selectSecond">代发方式：</span>
                            <Select defaultValue="公对私" onChange={this.handleChange.bind(this,"pay_way")}>
                              <Option value="1">公对私</Option>
                              <Option value="2">私对私</Option>
                            </Select>
                        </div>
                        {
                            !tblPayInfo.activeflag && 
                            <Button 
                                type="primary" 
                                loading={isSwitchLoading} 
                                onClick={this.dataSwitch}
                            >
                                数据转换
                            </Button>
                        }
                        {
                            tblPayInfo.activeflag && 
                            <Button 
                                type="primary" 
                                onClick={this.showFileModal}
                            >
                                数据转换结果核对
                            </Button>
                        }
                        &nbsp;&nbsp;

                        <Tooltip title="先检查是否已完成数据的转换">
                            <Button 
                                type="primary" 
                                loading={createFileLoading} 
                                onClick={this.createPayFile}
                            >
                                生成代发文件
                            </Button>
                        </Tooltip> 
                        &nbsp;&nbsp;
                        <Button type="primary" onClick= {this.goBack}>直接退回</Button>
                        &nbsp;&nbsp;
                        <Button icon="rollback" type="primary" onClick={this.back}>返回</Button>
                    </div>
                    <div className="File">
                        <span style={{display:"inline-block",float:'left'}}>银行代发文件：</span>
                        <div className="fileList">
                            {
                                tblPayInfoModel && tblPayInfoModel.payfilename && tblPayInfoModel.payfilename.split(",").length>2 &&<Icon className="icon" type="down"/>
                            }
                            {
                                tblPayInfoModel && tblPayInfoModel.payfilename ? tblPayInfoModel.payfilename.split(",").map((item,index)=>{
                                    return (<Tooltip title="点击下载银行代发文件">
                                            <a href={`${origin + url + item}`}>{item}</a>
                                            {/* <a onClick={this.downLoadFile.bind(this,item)}>{item}</a>  */}
                                        </Tooltip>)
                                        
                                    }):<a>暂未生成代发文件</a>
                            } 
                        </div>
                    </div>
                    <div className="result-table">
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={list?list:[]} 
                            bordered={true}
                            loading={isLoading}
                            pagination={{
                                total:size,
                                defaultPageSize: 10,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${size} 条数据`
                            }}
                        />
                    </div>
                </div>
                {isLoading && <LoadingComponent/>}
                <DataCompareModal batchNo={batchno}/>
                <RefuseModal 
                    isRefuseModal = {isRefuseModal} 
                    hideRefuseModal = {hideRefuseModal} 
                    refusePay = {refusePay}
                    batchNo = {batchno}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
   isFileModal: state.DataSwitch.isFileModal,
   isRefuseModal: state.DataSwitch.isRefuseModal,
   isLoading: state.DataSwitch.isLoading,
   payagentDetail: state.DataSwitch.payagentDetail,
   isSwitchLoading:state.DataSwitch.isSwitchLoading,
   createFileLoading: state.DataSwitch.createFileLoading,
   payFileCreate: state.DataSwitch.payFileCreate
})
const mapDispatchToProps = dispatch => ({
   showFileModal: bindActionCreators(Actions.DataSwitchActions.showFileModal, dispatch),
   hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch),
   getPayagentDetail: bindActionCreators(Actions.DataSwitchActions.getPayagentDetail, dispatch),
   dataSwitch: bindActionCreators(Actions.DataSwitchActions.dataSwitch, dispatch),
   createPayFile: bindActionCreators(Actions.DataSwitchActions.createPayFile, dispatch),
   dataResultCheck: bindActionCreators(Actions.DataSwitchActions.dataResultCheck, dispatch),
   showRefuseModal: bindActionCreators(Actions.DataSwitchActions.showRefuseModal, dispatch),
   hideRefuseModal: bindActionCreators(Actions.DataSwitchActions.hideRefuseModal, dispatch),
   refusePay: bindActionCreators(Actions.DataSwitchActions.refusePay, dispatch),
   payFileMakeInfo: bindActionCreators(Actions.DataSwitchActions.payFileMakeInfo, dispatch),
   downLoadPayFile: bindActionCreators(Actions.DataSwitchActions.downLoadPayFile, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SwitchFile);