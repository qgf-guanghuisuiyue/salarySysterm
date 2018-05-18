import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/leadingResultDetail';
import leadingColumns from 'data/table-columns/leadingFileInfo';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class LeadingDetailModalComponent extends React.Component{
     state = {
         page:1
     }

    params = {
        skip:0,
        count:10
    }
    leadingColumns = () => {
        leadingColumns[0].render = (text,record,index)=>{
          return <a>{index+1}</a>;
      }
      leadingColumns[leadingColumns.length-1].render = (text,record,index) => {
            return  <span>
                        {
                            record.status===0?"成功":
                            record.status===1 && "失败"
                        }
                    </span>
        }
        leadingColumns[3].render = (text,record,index)=>{
            return <a>{record.paymode==1?"公对私":record.paymode==2 && "公对私"}</a>;
        }
        return leadingColumns;
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*10}</a>
        }
        
        columns[columns.length-2].render = (text,record,index) => {
            return  <span>
                        {
                            record.status===0?"成功":
                            record.status===1?"未处理":
                            record.status===2?"处理中":
                            record.status===3 && "失败"
                        }
                    </span>
        }
        columns[columns.length-3].render = (text,record,index) => {
            return  <span>{record.transdate?moment(record.transdate).format("YYYY-MM-DD"):""}</span>
        }
        
        return columns;
    }
    hideDetailModal= () => {
        this.props.hideDetailModal()
    }
    //页码回调
    onChangePagination = (page) => {
        const {record, payAgentApplyDetaillist} = this.props;
        this.setState({
            page
        })
        this.params.skip = page * 10 - 10;
        payAgentApplyDetaillist({...this.params,batchNo: record.batchno});
        this.refs.dataSwitch.scrollTop = 0
    }
    render(){ 
        const {isDetailModal, record, detailList, payFileCreate} = this.props,
            {tblPayApplyModel, tblPayInfoModel={}} = payFileCreate,  
            {detailData} = detailList;     
            var data = [];
            if(tblPayInfoModel){
                data.push(tblPayInfoModel)
            } 
        return(
                <Modal
                    title={<h2>导入结果明细</h2>}
                    wrapClassName = "leadingDetail"
                    visible={isDetailModal}
                    width={1350}
                    footer={false}
                    maskClosable={false}
                    onCancel={ this.hideDetailModal}
                    maskClosable={false}
                >
                    <div className="dataSwitch" ref="dataSwitch">
                        <ul className="data-info switchFileUl">
                            <li><span>批次号：</span><span>{record.batchno}</span></li>
                            <li><span>公司名称：</span><span>{record.corpname}</span></li>
                            <li ><span>处理状态：</span>
                                <span>{
                                    record.status===0?"全部成功":
                                    record.status===1?"部分成功":
                                    record.status===2?"待处理":
                                    record.status===3?"处理中":
                                    record.status===4? "拒绝处理":
                                    record.status===5? "待提交":
                                    record.status===6? "代发失败":
                                    record.status===-1 && "撤销"}
                                </span>
                            </li>
                            <li><span>总笔数：</span><span>{record.totalcount}</span></li>
                            <li style={{marginTop: 0}}><span>总金额：</span><span>{record.totalamount}</span></li>
                            <li style={{marginTop: 0}}><span>申请日期：</span><span>{record.applydate}</span></li>
                            
                            <li style={{marginTop: 0,width:600}}>
                                <span>代发文件名：</span>
                                <span style={{marginTop: 0,width:500}}>{record.payapplyfilename}</span>
                            </li>
                        </ul>
                        <h2 style={{background:"#EEF1F6",marginTop:10,marginBottom:10}}>代发及结果文件</h2>
                        <Table 
                            columns={this.leadingColumns()} 
                            dataSource={data} 
                            bordered={true}
                            pagination={false}
                        />
                        <h2 style={{background:"#EEF1F6",marginTop:10,marginBottom:10}}>代发明细</h2>
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={detailData.list} 
                            bordered={true}
                            pagination={{
                                defaultPageSize: 10,
                                total: detailData.sum,
                                onChange:this.onChangePagination,
                                showTotal:total => `共 ${detailData.sum} 条数据`
                            }}
                        />

                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingDetailModalComponent);