import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/apply';
import DetailModalComponent from './upload/detailModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table, Modal} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UploadPage extends React.Component{
    state = {
        fileList: [],
        batchNoList: [],
        error: false,
        errorMsg: '',
        exptPayDate: null
     }

    params = {
        skip: 0,
        count: 10
    }

    componentDidMount() {
        this.props.getApplyList(this.params)
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|.zip|.mht|.htm|.docx|.doc)$/i,
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
    onFileRemove = () => {
        this.triggerError(false);
    }

    uploadDemo = () => {
        let {fileList, exptPayDate} = this.state,
            {payAgentApply, isUploadSucc, getApplyList} = this.props;
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
        payAgentApply({"fileName":data,"exptPayDate":exptPayDate}, getApplyList);
        console.log(isUploadSucc)
        if(isUploadSucc){
            this.setState({
                fileList: []
            })
        }
    }

    onDateChange = (date, dateString) => {
        this.setState({
            exptPayDate: moment(date).format('yyyyMMdd')
        })
    }
    
    showDetailModal = () => {
        this.props.showDetailModal()
    }
 
    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <Link>{index+1}</Link>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <Link onClick={this.showDetailModal}>明细</Link>;
        }
        return columns;
    }
    
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let batchNoList = selectedRows.map((item,index) => {
            return item.batchno;
        })
        console.log(batchNoList)        
        this.setState({batchNoList})
    }

    handlePayAgentCommit = () => {
        const {batchNoList} = this.state;
        this.props.payAgentCommit({"batchNo":batchNoList})
    }

    handlePayAgentDel = () => {
        const {batchNoList} = this.state;
        const {getApplyList} = this.props;
        this.props.payAgentDel({"batchNo":batchNoList}, getApplyList);
    }

    handleOk = () => {

    }
    
    handleCancel = () => {

    }

    render(){
        const {fileList,error,errorMsg, payAgentApplyDetaillist} = this.state;
        const {applyList, detailListModal} = this.props;
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
           onChange: this.onSelectChange,
           // onSelect(record, selected, selectedRows) {
           //     console.log(record, selected, selectedRows);
           // },
           // onSelectAll(selected, selectedRows, changeRows) {
           //     console.log(selected, selectedRows, changeRows);
           // },
       };
        return(
            <div className="layout common">
                <div className="upLoad">
                    <h2 className="File-title">上传文件</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">文件名:</span>
                            <Upload 
                                className="upLoad-btn upLoad-choose"
                                name='file'
                                fileList={fileList}
                                action={`${prefixUri}/api/web/file/uploadFile`} 
                                onChange={this.onFileChange}
                                onRemove={this.onFileRemove}
                                beforeUpload={this.onFilebeforeUpload}
                            >
                                <Button className="upLoad-btn upLoad-submit" type="primary">
                                    上传
                                </Button>
                            </Upload>
                        </div>
                        <div className="inline-block">
                            <span className="title">期望代发日期：</span>
                            <DatePicker 
                                format='YYYY-MM-DD'
                                onChange={this.onDateChange}
                            />
                            <Button 
                                className="upLoad-btn upLoad-submit" type="primary"
                                onClick={this.uploadDemo}
                            >
                                提交
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
                    <div className="handle-block">
                        <span className="title">模版文件下载：</span>
                        <Link>模板.xls</Link>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="delete" 
                                style={{marginRight: 50}}
                                onClick={this.handlePayAgentDel}
                            >删除</Button>
                            <Button 
                                icon="check-circle"
                                onClick={this.handlePayAgentCommit}
                            >提交</Button>
                        </div>
                        <Table 
                            loading={applyList.isLoading}
                            rowSelection={rowSelection}
                            columns={this.getColumns()}
                            dataSource={applyList.list}
                            bordered
                        />
                    </div>
                </div>
                <DetailModalComponent/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isUploadSucc: state.Apply.isUploadSucc,
    applyList: state.Apply.applyList
})
const mapDispatchToProps = dispatch => ({
    // showFileModal: bindActionCreators(Actions.UploadActions.showFileModal, dispatch),
    // hideFileModal: bindActionCreators(Actions.UploadActions.hideFileModal, dispatch),
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    payAgentCommit: bindActionCreators(Actions.ApplyActions.payAgentCommit, dispatch),
    payAgentApply: bindActionCreators(Actions.ApplyActions.payAgentApply, dispatch),
    payAgentDel: bindActionCreators(Actions.ApplyActions.payAgentDel, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPage);