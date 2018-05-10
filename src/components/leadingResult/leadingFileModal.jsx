import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import columns from 'data/table-columns/leadingFileInfo';
import { Table , Button , Tooltip , Input , DatePicker ,Icon , Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingFile extends React.Component{
    constructor(){
        super();
        this.state={
          
        }
    }
    showUploadFileModal = () => {
      this.props.showUploadFileModal()
    }
    getColumns = () => {
      columns[0].render = (text,record,index)=>{
        return <a>{index+1}</a>;
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
      columns[3].render = (text,record,index)=>{
          return <a>{record.paymode==1?"公对公":record.paymode==2 && "公对私"}</a>;
      }
      return columns;
  }
    render(){
        const {isLeadingFileModal , payFileCreate} = this.props;
        const {tblPayApplyModel, tblPayInfoModel={}} = payFileCreate;        
        var data = [];
        if(tblPayInfoModel.activeflag){
            data.push(tblPayInfoModel)
        }          
        return(
          <Modal
                title={<h2>导入结果代发文件</h2>}
                wrapClassName="vertical-center-modal"
                visible={isLeadingFileModal}
                width={1360}
                footer={false}
                onCancel={() => this.props.hideLeadingFileModal()}
          >
              <div className="leadingResult">
                  <ul className="data-info">
                      <li><span>批次号：</span><span>{tblPayApplyModel?tblPayApplyModel.batchno:""}</span></li>
                      <li><span>公司名称：</span><span>{tblPayApplyModel?tblPayApplyModel.corpname:""}</span></li>
                      <li><span>代发文件名：</span><span>{tblPayApplyModel?tblPayApplyModel.payapplyfilename:""}</span></li>
                      <li><span>总笔数：</span><span>{tblPayApplyModel?tblPayApplyModel.totalcount:""}</span></li>
                      <li><span>总金额：</span><span>{tblPayApplyModel?tblPayApplyModel.totalamount:""}</span></li>
                      <li><span>申请日期：</span><span>{tblPayApplyModel?moment(tblPayApplyModel.applydate).format("YYYY-MM-DD"):""}</span></li>
                      <li><span>处理状态：</span><span>{tblPayApplyModel?tblPayApplyModel.status===0?"全部成功":tblPayApplyModel.status===1?"部分成功":tblPayApplyModel.status===2?"待处理":tblPayApplyModel.status===3?"处理中":tblPayApplyModel.status===4 ? "拒绝处理":tblPayApplyModel.status===5? "待提交":
                      tblPayApplyModel.status===6? "代发失败":
                      tblPayApplyModel.status===-1 && "撤销":""}</span></li>
                  </ul>
                  <div className="File-btn">
                      <Button type="primary" onClick={this.showUploadFileModal}>导入结果文件</Button>
                  </div>
                  <div className="result-table">
                      <Table 
                          columns={this.getColumns()} 
                          dataSource={data} 
                          bordered={true}
                          scroll={{y:500}}
                          pagination={false}
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