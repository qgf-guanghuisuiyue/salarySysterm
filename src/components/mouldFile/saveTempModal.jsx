import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {  Button , Tooltip , Select ,Input, Modal, Upload, message} from 'antd';
const Option = Select.Option;
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/detailmodal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class SaveTempModalComponent extends React.Component{

    state = {
        type: [],   //1-公司模版；2-银行模版 模版类型
        corpCode: [],   //公司名称
        templateName: '',    //模版名称
        templateFileName: '', //模板文件
        error: false,
        errorMsg: '',
        fileList: [],
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.saveTempModal.resetForm){
            this.setState({
                type: [],
                corpCode: [],
                templateName: '',
                templateFileName: '',
                fileList: []
            });
            this.props.setResetTempFalse();
        }
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onHandleInput = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.xls|\.xlsx|\.xlsm|\.zip)$/i,
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
    onFileRemove = file => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle({fileName: response.data});
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }

    uploadTemp = () => {
        let {fileList, type, corpCode, templateName } = this.state,
            {getTempList,tempSave} = this.props;
        
        if(!type) {
            message.info('请选择文件类型');
            return ;
        }
        if(!corpCode) {
            message.info('请填写公司名称');
            return ;
        }
        if(!templateName) {
            message.info('请填写模板名称');
            return ;
        }
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
        tempSave({type, corpCode, templateName, templateFileName: name, fileName:response.data},getTempList);
    }


    render(){ 
        const {
            type, corpCode, templateName, templateFileName, fileList,error,errorMsg
        } = this.state;
        const {saveTempModal, hideSaveTempModal, corpData} = this.props;
        let list = corpData.list?corpData.list:corpCode;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal save-param"
                    visible={saveTempModal.saveTempVisible}
                    width={500}
                    onCancel={hideSaveTempModal}
                    onOk={this.uploadTemp}
                >
                    <ul> 
                        <li>
                            <span className="data-title">参数类型:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择参数类型'
                                    onChange={this.onHandleChange.bind(this, 'type')}
                            >
                              <Option value="1">公司模版</Option>
                              <Option value="2">银行模版</Option>
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">公司名称:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onHandleChange.bind(this, 'corpCode')}
                            >
                                {
                                    list.map( (item,index)=>{
                                        return <Option key={index} value={item.corpName}>{item.corpName}</Option>
                                    })
                                }
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">模版名称:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'templateName')}
                                placeholder='请输入模版名称'
                                value={templateName}
                            ></Input>
                        </li>
                        <li>
                            <span className="data-title">模板文件:</span>
                            <Upload 
                                className="upLoad-btn upLoad-choose"
                                name='file'
                                fileList={fileList}
                                action={`${prefixUri}/api/web/file/uploadtemplate`} 
                                onChange={this.onFileChange}
                                onRemove={this.onFileRemove}
                                beforeUpload={this.onFilebeforeUpload}
                            >
                                <Button className="upLoad-btn upLoad-submit" type="primary">
                                    选择文件
                                </Button>
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
                            </Upload>
                        </li>
                    </ul>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    saveTempModal: state.System.saveTempModal,
    corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
    tempSave: bindActionCreators(Actions.SystemActions.tempSave, dispatch),
    hideSaveTempModal: bindActionCreators(Actions.SystemActions.hideSaveTempModal, dispatch),
    setResetTempFalse: bindActionCreators(Actions.SystemActions.setResetTempFalse, dispatch),
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveTempModalComponent);