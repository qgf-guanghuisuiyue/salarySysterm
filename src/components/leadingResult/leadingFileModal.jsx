import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import store from 'store';
import columns from 'data/table-columns/leadingResultFileInfo';
import columnsDetail from 'data/table-columns/leadingResultDetail';
import { Table , Button , Tooltip , Input , DatePicker ,Icon , Modal} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingFile extends React.Component{
    state= {
        page:1
    }

    params = {
        skip:0,
        count:10
    }
    showUploadFileModal = () => {
      this.props.showUploadFileModal()
    }
    getColumns = () => {
        const token = store.get('token'),
        origin = window.location.origin,
        url = `/PayAgent/api/web/file/downloadFile?token=${token.token}&tokenKey=${token.tokenKey}&fileName=`;

      columns[0].render = (text,record,index)=>{
        return <a>{index+1}</a>;
      }
      columns[1].render = (text,record,index)=>{
        return <a href={`${origin + url + record.payfilename}`} title="点击下载文件">{record.payfilename}</a>;
      }
      columns[4].render = (text,record,index)=>{
        return <span>{record.payfiledate?moment(record.payfiledate).format("YYYY-MM-DD"):record.payfiledate}</span>;
      }
      columns[columns.length-1].render = (text,record,index) => {
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
      columns[columns.length-2].render = (text,record,index) => {
        return  <span>{record.payretfiledate?moment(record.payretfiledate).format("YYYY-MM-DD"):record.payretfiledate}</span>
      }
      columns[columns.length-3].render = (text,record,index) => {
          var fileName = record.payretfilename?record.payretfilename.split(',')[record.payretfilename.split(',').length-1]:"";
        return  <a href={`${origin + url + fileName }`} title="点击下载文件">
                    {fileName}
                </a>
      }
      columns[3].render = (text,record,index)=>{
          return <a>{record.paymode==1?"公对私":record.paymode==2 && "私对私"}</a>;
      }
      return columns;
  }
  columnsDetail = () => {
    const {page} = this.state;
    columnsDetail[0].render = (text,record,index) => {           
        return  <a>{(index+1)+(page-1)*10}</a>
    }
    
    columnsDetail[columnsDetail.length-3].render = (text,record,index) => {
        return  <span>
                    {
                        record.status===0?"成功":
                        record.status===1?"未处理":
                        record.status===2?"处理中":
                        record.status===3 && "失败"
                    }
                </span>
    }
    columnsDetail[columnsDetail.length-4].render = (text,record,index) => {
        return  <span>{record.updatedate?moment(record.updatedate).format("YYYY-MM-DD"):""}</span>
    }
    
    return columnsDetail;
  }
  //页码回调
  onChangePagination = (page) => {
    const {batchno, leadingResultDetail} = this.props;
    this.setState({
        page
    })
    this.params.skip = page * 10 - 10;
    leadingResultDetail({...this.params,batchNo:batchno});
    this.refs.dataSwitch.scrollTop = 0
}
    render(){
        const {isLeadingFileModal,resultDetailList , payFileCreate, clearTableCheckbox} = this.props;
        const {tblPayApplyModel, tblPayInfoModel={}} = payFileCreate;        
        var data = [];
        if(tblPayInfoModel){
            data.push(tblPayInfoModel)
        } 
        return(
          <Modal
                title={<h2>导入结果代发文件</h2>}
                wrapClassName="vertical-center-modal"
                visible={isLeadingFileModal}
                width={1360}
                footer={false}
                maskClosable={false}
                onCancel={() => this.props.hideLeadingFileModal(clearTableCheckbox)}
          >
              <div className="leadingResult">
                  <ul className="data-info switchFileUl">
                      <li><span>批次号：</span><span>{tblPayApplyModel?tblPayApplyModel.batchno:""}</span></li>
                      <li><span>公司名称：</span><span>{tblPayApplyModel?tblPayApplyModel.corpname:""}</span></li>
                      <li><span>总笔数：</span><span>{tblPayApplyModel?tblPayApplyModel.totalcount:""}</span></li>
                      <li><span>总金额：</span><span>{tblPayApplyModel?tblPayApplyModel.totalamount:""}</span></li>
                      <li><span>申请日期：</span><span>{tblPayApplyModel?moment(tblPayApplyModel.applydate).format("YYYY-MM-DD"):""}</span></li>
                      <li><span>处理状态：</span><span>{tblPayApplyModel?tblPayApplyModel.status===0?"全部成功":tblPayApplyModel.status===1?"部分成功":tblPayApplyModel.status===2?"待处理":tblPayApplyModel.status===3?"处理中":tblPayApplyModel.status===4 ? "拒绝处理":tblPayApplyModel.status===5? "待提交":
                      tblPayApplyModel.status===6? "代发失败":
                      tblPayApplyModel.status===-1 && "撤销":""}</span></li>
                      <li style={{width:680}}>
                          <span>代发文件名：</span>
                          <span style={{width:550}}>{tblPayApplyModel?tblPayApplyModel.payapplyfilename:""}</span>
                      </li>
                  </ul>
                  <div className="File-btn">
                      <Button type="primary" onClick={this.showUploadFileModal}>导入结果文件</Button>
                  </div>
                  <div className="result-table">
                        <h2 style={{background:"#EEF1F6",marginTop:10,marginBottom:10}}>代发及结果文件</h2>
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true}
                            pagination={false}
                        />
                        <h2 style={{background:"#EEF1F6",marginTop:10,marginBottom:10}}>代发明细</h2>
                        <Table 
                            columns={this.columnsDetail()} 
                            dataSource={resultDetailList.list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: resultDetailList.count,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${resultDetailList.count} 条数据`
                            }}
                        />
                  </div>
              </div>
          </Modal>
        )
    }
}
const mapStateToProps = state => ({
  isLeadingFileModal: state.LeadingResult.isLeadingFileModal
})
const mapDispatchToProps = dispatch => ({
  hideLeadingFileModal: bindActionCreators(Actions.LeadingResultActions.hideLeadingFileModal, dispatch),
  showUploadFileModal: bindActionCreators(Actions.LeadingResultActions.showUploadFileModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingFile);