import React from 'react';
import moment from 'moment';

import store from 'store';
import LeadingFileModal from './leadingResult/leadingFileModal';
import { Table , Button , Tooltip , Input , DatePicker ,Icon ,Modal, Upload, notification} from 'antd';
const confirm = Modal.confirm;
import DetailModalComponent from './leadingResult/leadingDetail';
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
        batchno:"",
        fileList:[],
        page:1,
        record:{},
        selectedRowKeys:[]
    }
    componentDidMount(){
        this.leadingResultQuery()
    }
    params ={
        skip:0,
        count:10,
        status:["1","3","6"]
    }
    showLeadingFileModal = () => {
        const {batchno} = this.state;
        const {payFileMakeInfo,payAgentApplyDetaillist} = this.props;
        if(!batchno){
           notification.warning({
               message: '请先选择下列选项'
           });
        }else{
           this.props.showLeadingFileModal(batchno,payFileMakeInfo,payAgentApplyDetaillist)
           NProgress.done()
        }
    }
    showConfirm = () => {
        const _this = this;
        const {batchno} = this.state;
        if(batchno){
            confirm({
                title: '是否确认该批次的代发结果',
                style:{top:'30%'},
                onOk() {
                    _this.props.resultConfirm({batchNo:batchno},_this.leadingResultQuery)
                    _this.clearTableCheckbox()
                },
                onCancel(){
                    _this.clearTableCheckbox()
                }
            });
        }else{
            notification.warning({
                message:"请选择下列代发受理结果文件"
            })
        }
        
    }
    leadingResultQuery = () => {
        const {getDataSwitchList} = this.props;
        const { companyName,startDate,endDate} = this.state;
        getDataSwitchList({...this.params,companyName,startDate,endDate})
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
        columns[columns.length-1].render = (text,record,index) => {
            return  <a onClick = {this.showDetailModal.bind(this,record)}>明细</a>;
        }
        return columns;
    }
    //明细查询
    showDetailModal = (record) => {
        const {showDetailModal,payAgentApplyDetaillist, payFileMakeInfo} = this.props;
        showDetailModal({skip:0,count:10,batchNo: record.batchno}, payAgentApplyDetaillist, payFileMakeInfo);
        this.setState({record})
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
    //清空表格选择框
    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.setState({
            selectedRowKeys:[],
            batchno:""
        })
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        this.leadingResultQuery();
        this.clearTableCheckbox()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    //表格选择框选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys});
    }
    rowSelection = () =>{
        const _this = this;
        const {selectedRowKeys} = this.state;
       // 通过 rowSelection 对象表明需要行选择
        return {
           type:'radio',
           selectedRowKeys,
           onChange: this.onSelectChange,
           onSelect(record, selected, selectedRows) {
                   _this.setState({
                       batchno:record.batchno
                   })
               }
       };
    } 
    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.xls|\.xlsx|\.xlsm|\.csv)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
        // 判断是否已经上传过文件(单次只能上传一个文件)
        if(fileList.length === 1){
            this.triggerError(true,'单次只能上传一个文件！');
            return false;
        }
        // 匹配文件类型
        if(!matchName.test(name)){
            this.triggerError(true);
            return false;
        }
        // 判断文件大小最大支持100M的文件
        if(size > 10*1024*1024){
            this.triggerError(true,'文件大小不能超过10MB！');
            return false;
        }
        if(error){
            this.triggerError(false);
        }
        return true;
    } 

    // 上传文件改变时的状态
    onFileChange = info =>{
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            this.triggerError(true,'文件上传失败！');
        }
        this.setState({fileList});
    }

    // 文件移除
    onFileRemove = (file) => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle({fileName: response.data});
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }
    onChangeDate = (date) => {
        console.log(moment(date).format("YYYY-MM-DD"))
    }
    upLoadFile = () => {
        let {fileList, exptPayDate, batchno} = this.state,
            {upLoadFile, hideUploadFileModal,hideLeadingFileModal} = this.props;
        // 判断是否上传了文件
        if(fileList.length === 0){
            this.triggerError(true,'请选择上传文件！');
            return ;
        }
        // 判断文件是否上传成功,上传失败fileList中的response为undefined
        const {name,response} = fileList[0];
        if(!response){
            return ;
        }
        const {data} = response;
        upLoadFile({fileName:data,batchNo:batchno},hideUploadFileModal,hideLeadingFileModal,this.leadingResultQuery)
    }
    //清空文件
    cancelFile = () => {
        this.setState({
            fileList:[],
            error:false
        })
    }
    render(){
          const { companyName, fileList, error, errorMsg, record,batchno } = this.state;
          const { 
              isUpLoadModal, 
              dataSwitchList, 
              payFileCreate,
              isDetailModal, 
              hideDetailModal, 
              detailList, 
              payAgentApplyDetaillist
            } = this.props,
                 data = dataSwitchList.list?dataSwitchList.list:[],//列表数据
                count = dataSwitchList.count;//总条数 
        return(
            <div className="layout common">
                <div className="error handle"> 
                    <h2 className="File-title">结果查询</h2>
                    <ul className="data-info handle-info">
                        <li style={{marginLeft:100,marginRight:20}}>
                            <span>公司名称：</span>
                            <Input 
                                className="input" 
                                value={companyName}
                                placeholder="请输入公司名称" 
                                onChange={this.onChange}
                            />
                        </li>
                        <li className="date handle-date" style={{width:800,paddingLeft:0}}>
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
                                style={{left:120}}
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
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${count} 条数据`
                            }}
                        />
                    </div>
                </div>

                <LeadingFileModal 
                    payFileCreate={payFileCreate}
                    clearTableCheckbox = {this.clearTableCheckbox}
                    detailList = {detailList}
                    payAgentApplyDetaillist={payAgentApplyDetaillist}
                    batchno={batchno}
                />

                <DetailModalComponent 
                    record={record}
                    isDetailModal={isDetailModal}
                    hideDetailModal = {hideDetailModal}
                    detailList = {detailList}
                    payAgentApplyDetaillist= {payAgentApplyDetaillist}
                    payFileCreate = {payFileCreate}
                />

                <Modal
                    title="代发结果文件"
                    wrapClassName="vertical-center-modal"
                    visible={isUpLoadModal}
                    style={{top:300}}
                    okText="上传"
                    maskClosable={false}
                    onCancel={() => this.props.hideUploadFileModal(this.cancelFile)}
                    onOk={this.upLoadFile}
                >
                    <div style={{marginBottom:20}}>
                        <span>代发日期：</span>
                        <DatePicker 
                            style={{width:240}}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="fileName">文件名：</div>
                    <Upload 
                        className="upLoadFile-btn"
                        name='file'
                        fileList={fileList}
                        action={`${prefixUri}/api/web/file/uploadFile`} 
                        onChange={this.onFileChange}
                        onRemove={this.onFileRemove}
                        beforeUpload={this.onFilebeforeUpload}
                    >
                        <Button>选择文件</Button>
                        
                    </Upload>
                    {
                        error &&
                        <span className="error-text" 
                            style={{
                            verticalAlign: 'bottom',
                            marginLeft: 5,
                            color: 'red',
                            fontSize: 12,
                            display:"block",
                            width:200,
                            marginLeft:60
                        }}>
                            {errorMsg}
                        </span>
                    }
                </Modal>
            </div>
          )
        }
    }
    const mapStateToProps = state => ({
        isUpLoadModal: state.LeadingResult.isUpLoadModal,
        dataSwitchList: state.DataSwitch.dataSwitchList,
        payFileCreate: state.DataSwitch.payFileCreate,
        isDetailModal:state.LeadingResult.isDetailModal,
        detailList: state.Apply.detailList,
    })
    const mapDispatchToProps = dispatch => ({
        showLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.showLeadingFileModal, dispatch),
        hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
        resultConfirm: bindActionCreators(Actions.LeadingResultActions.resultConfirm, dispatch),
        hideUploadFileModal: bindActionCreators(Actions.LeadingResultActions.hideUploadFileModal, dispatch),
        upLoadFile: bindActionCreators(Actions.LeadingResultActions.upLoadFile, dispatch),
        removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
        getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch),
        payFileMakeInfo: bindActionCreators(Actions.DataSwitchActions.payFileMakeInfo, dispatch),
        payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),
        showDetailModal: bindActionCreators(Actions.LeadingResultActions.showDetailModal, dispatch),
        hideDetailModal: bindActionCreators(Actions.LeadingResultActions.hideDetailModal, dispatch),
    })

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(LeadingResult);