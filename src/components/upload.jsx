import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/upload';
import DetailModalComponent from './upload/detailModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table, Modal, notification, Select} from 'antd';

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
        exptPayDate: null,
        record: {},
        page: 1,
        fileName: '',
        corpCode: ''
    }
     

    params = {
        skip: 0,
        count: 10
    }

    componentDidMount() {
        this.props.getApplyList(this.params);
        this.props.getCorpList()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isUploadSucc){
            this.setState({
                fileList: []
            })
        }
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
        let {fileList, exptPayDate, corpCode} = this.state,
            {payAgentApply, getApplyList} = this.props;
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
        this.setState({
            fileName: data
        })
        payAgentApply({"fileName":data,"exptPayDate":exptPayDate, corpCode}, getApplyList)
    }

    onDateChange = (date, dateString) => {
        this.setState({
            exptPayDate: moment(date).format('YYYYMMDD')
        })
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
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
            return  <span>{record.status===-1?"撤销":record.status===0?"全部成功":record.status===2?"待处理":record.status===3?"处理中":"拒绝处理"}</span>
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
        })
        const {record} = this.state;
        const {batchno} = record;
        const {getApplyList} = this.props;
        this.params.skip = page * 10 - 10;
        getApplyList({batchNo:batchno,count:10,skip:this.params.skip})
    }
    
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let batchNoList = selectedRows.map((item,index) => {
            return item.batchno;
        })
        this.setState({batchNoList})
    }

    handlePayAgentCommit = () => {
        const {batchNoList} = this.state;
        if(batchNoList.length == 0) {
            notification.warning({
                message: '请选择代发申请文件',
                style:{top:40}
            });
        }else {
            this.props.payAgentCommit({"batchNo":batchNoList})
        }    
    }

    handlePayAgentDel = () => {
        const {batchNoList} = this.state;
        const {payAgentDel, getApplyList} = this.props;
        if(batchNoList.length == 0) {
            notification.warning({
                message: '请选择代发申请文件',
                style:{top:40}
            });
        }else {
            payAgentDel({"batchNo":batchNoList}, getApplyList);
        }
    }

    downloadExcel = () => {
        const {fileName} = this.state;
        const {downloadExcel} = this.props;
        // downloadExcel(fileName)
    }

    render(){
        const {fileList,error,errorMsg, record} = this.state;
        const {applyList, detailList, payAgentApplyDetaillist, corpData} = this.props;
        const {applyData} = applyList;
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
           onChange: this.onSelectChange,
        };
        let list = corpData.list?corpData.list:[];
        return(
            <div className="layout common">
                <div className="upLoad">
                    <h2 className="File-title">上传文件</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onHandleChange.bind(this, 'corpCode')}
                            >
                                {
                                    list.map( (item,index)=>{
                                        return <Option key={index} value={item.corpCode}>{item.corpName}</Option>
                                    })
                                }
                            </Select>
                        </div>
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
                                    选择文件
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
                        <Link onClick={this.downloadExcel}>模板.xls</Link>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="delete" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.handlePayAgentDel}
                            >删除</Button>
                            <Button 
                                icon="check-circle"
                                type="primary"
                                onClick={this.handlePayAgentCommit}
                            >确认代发</Button>
                        </div>
                        <Table 
                            loading={applyList.isLoading}
                            rowSelection={rowSelection}
                            columns={this.getColumns()}
                            dataSource={applyData.list}
                            bordered
                            pagination={{
                                defaultPageSize:5,
                                total: applyData.sum,
                                onChange: this.onChangePagination,
                                showTotal:total => `共 ${applyData.sum == 0 ? 0 : applyData.sum} 条数据`
                            }}
                        />
                    </div>
                </div>
                <DetailModalComponent record={record}  payAgentApplyDetaillist={payAgentApplyDetaillist}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isUploadSucc: state.Apply.isUploadSucc,
    applyList: state.Apply.applyList,
    corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
    downloadExcel: bindActionCreators(Actions.UploadActions.downloadExcel, dispatch),
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    payAgentCommit: bindActionCreators(Actions.ApplyActions.payAgentCommit, dispatch),
    payAgentApply: bindActionCreators(Actions.ApplyActions.payAgentApply, dispatch),
    payAgentDel: bindActionCreators(Actions.ApplyActions.payAgentDel, dispatch),
    showDetailModal: bindActionCreators(Actions.ApplyActions.showDetailModal, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch),   
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch), 
    getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPage);