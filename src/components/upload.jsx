import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/apply';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UploadPage extends React.Component{
     state = {
        fileList: [],
        batchNoList: []
     }

     params = {
        skip: 0,
        count: 10
    }

     componentDidMount() {
        this.props.getApplyList(this.params)
    }

     onFileChange = (info) => {
        let fileList = info.fileList;
        this.setState({fileList})
     }

     onFileRemove = (file) => {
        let {response} = file;
        console.log(file)
     }
     

     getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <Link>{index+1}</Link>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <Link>明细</Link>;
        }
        return columns;
    }
    
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
    }

    render(){
        const {fileList} = this.state;
        const {applyList} = this.props;
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
                            <Input style={{width: 200}}/>
                            <Upload className="upLoad-btn upLoad-choose"
                                    name='file'
                                    action={`${prefixUri}/api/web/file/uploadFile`} 
                                    onChange={this.onFileChange}
                                    onRemove={this.onFileRemove}
                                    fileList={fileList}
                            >
                                <Button className="upLoad-btn upLoad-submit" type="primary">
                                    上传
                                </Button>
                            </Upload>
                        </div>
                        <div className="inline-block">
                            <span className="title">期望代发日期：</span>
                            <DatePicker />
                        </div>  
                    </div>
                    <div className="handle-block">
                        <span className="title">模版文件下载：</span>
                        <Link>模板.xls</Link>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button icon="delete" style={{marginRight: 50}}>删除</Button>
                            <Button 
                                icon="check-circle"
                                onClick={this.payAgentCommit}
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
                    
            </div>
        )
    }
}
const mapStateToProps = state => ({
    applyList: state.Apply.applyList,
})
const mapDispatchToProps = dispatch => ({
    // showFileModal: bindActionCreators(Actions.UploadActions.showFileModal, dispatch),
    // hideFileModal: bindActionCreators(Actions.UploadActions.hideFileModal, dispatch),
    getApplyList: bindActionCreators(Actions.ApplyActions.getApplyList, dispatch),
    payAgentCommit: bindActionCreators(Actions.ApplyActions.payAgentCommit, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPage);