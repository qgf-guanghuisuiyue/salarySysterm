import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/upload';
import DetailModalComponent from './upload/detailModal';
import pickBy from'lodash/pickBy';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table, Modal, notification, Select, message} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UploadPage extends React.Component{
    state = {
        fileList: [],
        batchNoList: [],
        recordList: [],
        selectedRowKeys: [],        
        error: false,
        errorMsg: '',
        exptPayDate: null,
        record: {},
        page: 1,
        fileName: '',
        cropCode: '',
        corpName: '',
        templateList: [],
        companyData: [], 
        templateData: {},
        templateName:'',
        firstCorp: ''
    }

    params = {
        skip: 0,
        count: 10,
        apply: 'Y'
    }

    componentDidMount() {
        const {getApplyList, getCompanytemplate, fileNameData} = this.props;
        getApplyList(this.params);
        let that = this;
        new Promise(getCompanytemplate).then((fileNameData)=>{
            that.getCompanytemplate(fileNameData)
        })
        
    }

    componentWillReceiveProps(nextProps) {//清空数组    
        if(nextProps.isUploadSucc){
            this.setState({
                fileList: []
            })
        }
        if(nextProps.resetPayagent){
            this.setState({
                batchNoList: [],
                recordList: [],
                selectedRowKeys: []
            });
            this.props.resetPayagentFalse()
        }
    }

    getCompanytemplate = (fileNameData) => {
        let fileNameList = fileNameData.companylist?fileNameData.companylist:[];
        let companyData = [], templateData = {}, firstCorp='';
        fileNameList.forEach((item, index) => {
            companyData.push({
                brief: item.corpcode,
                name: item.corpname
            });
            templateData[item.corpcode] = item.templatelist
        })
        this.setState({
            companyData,
            templateData,
            firstCorp: fileNameList[0].corpname
        })
    }

    onCorpChange = (value) => {
        const {companyData, templateData} = this.state;
        // let name = '';
        // companyData.forEach((item,key)=>{
        //     if(item.brief == value){
        //         name = item.name
        //     }
        // })
        this.setState({
            corpName: value.split('&')[1],
            templateList: templateData[value.split('&')[0]],
            templateName: ""
        })
        console.log(value)
        
    }

    onTempChange = (value) => {
        this.setState({
            templateName: value.split('&')[0],
            fileName: value.split('&')[1],
        })
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.xls|\.xlsx|\.xlsm|.zip)$/i,
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
        if(size > 100*1024*1024){
            this.triggerError(true,'文件大小不能超过100MB！');
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

    uploadDemo = () => {
        let {fileList, exptPayDate, corpName,templateName} = this.state,
            {payAgentApply, getApplyList} = this.props;
        // 判断是否上传了文件
        if(fileList.length === 0){
            this.triggerError(true,'请选择上传文件！');
            return ;
        }
        // 判断文件是否上传成功,上传失败fileList中的response为undefined
        const {name,response} = fileList[0];
        if(!response){
            this.triggerError(true,'上传失败！');
            return ;
        }
        if(!corpName||!templateName){
            this.triggerError(true,'请选择模板类型！');
            return ;
        }
        const {data} = response;
        payAgentApply({"fileName":data,"exptPayDate":exptPayDate, corpName, templateName}, getApplyList)
    }

    onDateChange = (date, dateString) => {
        this.setState({
            exptPayDate: moment(date).format('YYYYMMDD')
        })
    }
    
    showDetailModal = (record) => {
        const {payAgentApplyDetaillist} = this.props;
        this.props.showDetailModal({...this.params,
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
        });
        const {getApplyList} = this.props;
        this.params.skip = page * 10 - 10;
        getApplyList({apply: 'Y', count:10, skip:this.params.skip})
    }
    
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let batchNoList = selectedRows.map((item,index) => {
            return item.batchno;
        });
        this.setState({
            batchNoList,
            recordList: selectedRows,
            selectedRowKeys
        })
    }

    showPayAgentCommitModal = () => {
        this.props.showPayAgentCommitModal();
    }

    handleOk = () => {
        const {payAgentCommit, hidePayAgentCommitModal, getApplyList} = this.props;
        const {batchNoList, recordList} = this.state;
        hidePayAgentCommitModal()       
        if(batchNoList.length == 0) {
            notification.warning({
                message: '请选择代发申请文件',
                style:{top:40}
            });
        }else{
            recordList.map((item, index) => {
                item.status == 2 ? 
                notification.warning({
                    message: '待处理不可提交',
                    style:{top:40}
                })
                :
                payAgentCommit({"batchNo":batchNoList}, getApplyList)
            })
        }    
    }

    showPayAgentDelModal = () => {
        this.props.showPayAgentDelModal();
    }

    handlePayAgentDel = () => {
        const {batchNoList, recordList} = this.state;
        const {payAgentDel,hidePayAgentDelModal, getApplyList} = this.props;
        hidePayAgentDelModal()  
        if(batchNoList.length == 0) {
            notification.warning({
                message: '请选择代发申请文件',
                style:{top:40}
            });
        }else {
            recordList.map((item, index) => {
                item.status == 2 ? 
                notification.warning({
                    message: '待处理不可提交',
                    style:{top:40}
                })
                :
                payAgentDel({"batchNo":batchNoList}, getApplyList)
            })    
        }
    }

    downloadExcel = () => {
        const {fileName} = this.state;
        if(!fileName){
            notification.warning({
                message: '请选择模板文件',
                style:{top:40}
            });
        }else {
            const {downloadExcel} = this.props;
            downloadExcel(fileName)
        }
        
    }

    render(){
        const {
            fileList,
            error,
            errorMsg, 
            record,
            corpName, 
            combineName, 
            companyData=[], 
            templateData,
            templateName,
            templateList,
            firstCorp
        } = this.state;
        const {
            applyList, 
            detailList, 
            payAgentApplyDetaillist,
            fileNameData
        } = this.props;
        const {applyData} = applyList;
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
           onChange: this.onSelectChange,
           selectedRowKeys: this.state.selectedRowKeys
        };
        return(
            <div className="layout common">
                <div className="upLoad">
                    <h2 className="File-title">上传文件</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title" style={{width: 100}}>公司名称：</span>
                            <Select style={{width: 300}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onCorpChange}
                            >
                                {
                                    companyData.map((item,index) => {
                                    
                                    return <Option value={`${item.brief}&${item.name}`}>{item.name}</Option>}
                                
                                )}
                            </Select>
                        </div>
                        <div className="inline-block">
                            <span className="title" style={{width: 165}}>选择所使用的模板：</span>
                            <span></span>
                            <Select style={{width: 300}}
                                    placeholder='选择模版文件'
                                    value={templateName}
                                    onChange={this.onTempChange}
                                    disabled={corpName?false:true}
                            >
                                {
                                    templateList.map((item,index)=>{
                                        return(<Option value={`${item.templatename}&${item.templatefilename}`} >{item.templatefilename}</Option>)
                                    })
                                    
                                }
                            </Select>
                            <Button 
                                type="primary"
                                style={{marginLeft: 20}}
                                onClick={this.downloadExcel}
                            >下载模板文件</Button>
                        </div>
                    </div>
                    <div className="handle-block">
                       <div className="inline-block">
                            <span className="title" style={{width: 100}}>文件名：</span>
                            <Upload 
                                className="upLoad-btn"
                                name='file'
                                fileList={fileList}
                                action={`${prefixUri}/api/web/file/uploadFile`} 
                                onChange={this.onFileChange}
                                onRemove={this.onFileRemove}
                                beforeUpload={this.onFilebeforeUpload}
                            >
                                <Button type="primary">
                                    选择文件
                                </Button>
                            </Upload>
                        </div>
                        <div className="inline-block">
                            <span className="title" style={{width: 165}}>期望代发日期：</span>
                            <DatePicker 
                                format='YYYY-MM-DD'
                                onChange={this.onDateChange}
                            />
                            <Button 
                                type="primary"
                                onClick={this.uploadDemo}
                                style={{marginLeft: 20}}
                            >
                                上传  
                            </Button>
                        </div> 
                        {error &&
                            <span className="error-text" style={{
                                verticalAlign: 'bottom',
                                marginLeft: 5,
                                color: 'red',
                                fontSize: 12
                            }}>
                                {errorMsg}
                            </span>
                        }
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="delete" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.showPayAgentDelModal}
                            >删除</Button>
                            <Button 
                                icon="check-circle"
                                type="primary"
                                onClick={this.showPayAgentCommitModal}
                            >代为提交</Button>
                        </div>
                        <Table 
                            loading={applyList.isLoading}
                            rowSelection={rowSelection}
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
                <Modal
                    title={<h2>确认提交</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={this.props.isPayAgentCommitModalVisiable}
                    onCancel={() => this.props.hidePayAgentCommitModal()}
                    onOk={this.handleOk}
                >
                  <p>请确认是否提交？</p>
                </Modal>
                <Modal
                    title={<h2>确认删除</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={this.props.isPayAgentDelModalVisiable}
                    onCancel={() => this.props.hidePayAgentDelModal()}
                    onOk={this.handlePayAgentDel}
                >
                  <p>请确认是否删除？</p>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isUploadSucc: state.Apply.isUploadSucc,
    applyList: state.Apply.applyList,
    resetPayagent: state.Apply.resetPayagent,
    isPayAgentCommitModalVisiable: state.Upload.isPayAgentCommitModalVisiable,
    isPayAgentDelModalVisiable: state.Upload.isPayAgentDelModalVisiable,
    fileNameData: state.Upload.fileNameData,
})
const mapDispatchToProps = dispatch => ({
    downloadExcel: bindActionCreators(Actions.UploadActions.downloadExcel, dispatch),
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    payAgentCommit: bindActionCreators(Actions.ApplyActions.payAgentCommit, dispatch),
    resetPayagentFalse: bindActionCreators(Actions.ApplyActions.resetPayagentFalse, dispatch),
    payAgentApply: bindActionCreators(Actions.ApplyActions.payAgentApply, dispatch),
    payAgentDel: bindActionCreators(Actions.ApplyActions.payAgentDel, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),    
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch), 
    showPayAgentCommitModal: bindActionCreators(Actions.UploadActions.showPayAgentCommitModal, dispatch),
    hidePayAgentCommitModal: bindActionCreators(Actions.UploadActions.hidePayAgentCommitModal, dispatch),
    showPayAgentDelModal: bindActionCreators(Actions.UploadActions.showPayAgentDelModal, dispatch),
    hidePayAgentDelModal: bindActionCreators(Actions.UploadActions.hidePayAgentDelModal, dispatch),
    getCompanytemplate: bindActionCreators(Actions.UploadActions.getCompanytemplate, dispatch),  
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPage);