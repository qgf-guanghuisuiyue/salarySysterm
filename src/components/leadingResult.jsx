import React from 'react';
import moment from 'moment';

import LeadingFileModal from './leadingResult/leadingFileModal';
import { Table , Button , Tooltip , Input , DatePicker ,Icon ,Modal, Upload} from 'antd';
const confirm = Modal.confirm;

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
        fileList:[]
    }
    componentDidMount(){
        this.leadingResultQuery()
    }
    params ={
        skip:0,
        count:10
    }
    showLeadingFileModal = () => {
        this.props.showLeadingFileModal()
    }
    showConfirm = () => {
        const _this = this;
        confirm({
            title: '是否确认该批次的代发结果',
            style:{top:'30%'},
            onOk() {
                _this.props.resultConfirm()
            },
            onCancel() {},
        });
    }
    leadingResultQuery = () => {
        const {leadingResultQuery} = this.props;
        const { companyName,startDate,endDate} = this.state;
        leadingResultQuery({...this.params,companyName,startDate,endDate})
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
    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.xls|\.xlsx|\.xlsm)$/i,
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
    upLoadFile = () => {
        let {fileList, exptPayDate} = this.state,
            {upLoadFile, hideUploadFileModal} = this.props;
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
        upLoadFile({"fileName":data,"batchNo":""},hideUploadFileModal)
    }
    //清空文件
    cancelFile = () => {
        this.setState({
            fileList:[],
            error:false
        })
    }
    render(){
          const data = [];
          const { companyName, fileList, error, errorMsg } = this.state;
          const { isUpLoadModal } = this.props;
        return(
            <div className="layout common">
                <div className="error handle">
                    <h2 className="File-title">导入结果处理</h2>
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
                            columns={columns} 
                            dataSource={data} 
                            bordered={true}
                            pagination={true}
                        />
                    </div>
                </div>

                <LeadingFileModal/>

                <Modal
                    title="代发结果文件"
                    wrapClassName="vertical-center-modal"
                    visible={isUpLoadModal}
                    style={{top:300}}
                    okText="上传"
                    onCancel={() => this.props.hideUploadFileModal(this.cancelFile)}
                    onOk={this.upLoadFile}
                >
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
        isUpLoadModal: state.LeadingResult.isUpLoadModal
    })
    const mapDispatchToProps = dispatch => ({
        showLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.showLeadingFileModal, dispatch),
        hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
        leadingResultQuery: bindActionCreators(Actions.LeadingResultActions.leadingResultQuery, dispatch),
        resultConfirm: bindActionCreators(Actions.LeadingResultActions.resultConfirm, dispatch),
        hideUploadFileModal: bindActionCreators(Actions.LeadingResultActions.hideUploadFileModal, dispatch),
        upLoadFile: bindActionCreators(Actions.LeadingResultActions.upLoadFile, dispatch),
        removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
    })

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(LeadingResult);