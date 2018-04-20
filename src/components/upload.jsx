import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UploadPage extends React.Component{
     state = {
        fileList: [],
     }

     onFileChange = (info) => {
        let fileList = info.fileList;
        this.setState({fileList})
     }

     onFileRemove = (file) => {
        let {response} = file;
        console.log(file)
     }
    
    render(){
        const {fileList} = this.state;
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            }, {
            title: '姓名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '卡号',
            dataIndex: 'age',
          }, {
            title: '银行名称',
            dataIndex: 'address',
          }, {
            title: '开户行',
            dataIndex: 'bank',
          }, {
            title: '金额',
            dataIndex: 'sum',
          }, {
            title: '备注',
            dataIndex: 'remark',
          }];
        const data = [{
            key: '1',
            name: '胡彦斌',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '2',
            name: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '3',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }];

          // 通过 rowSelection 对象表明需要行选择
          const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
              console.log(selected, selectedRows, changeRows);
            },
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
                            <Button icon="check-circle">提交</Button>
                        </div>
                        <Table rowSelection={rowSelection}  columns={columns} dataSource={data} bordered={true}/>
                    </div>
                    
                </div>
                    
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
    // showFileModal: bindActionCreators(Actions.UploadActions.showFileModal, dispatch),
    // hideFileModal: bindActionCreators(Actions.UploadActions.hideFileModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPage);