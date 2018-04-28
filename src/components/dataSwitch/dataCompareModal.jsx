import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select ,Modal, Icon ,Input , notification} from 'antd';
const confirm = Modal.confirm;
const { TextArea } = Input;
 
import columns from 'data/table-columns/resultData';
import SwitchColumns from 'data/table-columns/switchResultData';
import EditModal from './editModal';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DataCompareModal extends React.Component{
     state = {
         remark:"",
         bankName:"",
         bankPlace:"",
         detailID:""
     }
    getSwitchColumns = () => {
        SwitchColumns[0].render = ( text ,record , index) => {
            return <span>{index + 1}</span>
        }
        SwitchColumns[3].render = ( text ,record , index) => {
            return <a onClick={this.editBankInfo.bind(this,record)}>{record.bankname}</a>
        }
        SwitchColumns[4].render = ( text ,record , index) => {
            return <a onClick={this.editBankInfo.bind(this,record)}>{record.bankplace}</a>
        }  
        SwitchColumns[SwitchColumns.length-1].render = ( text ,record , index) => {
            return <div>{<a>{record.remark}<Icon type="edit" onClick={this.editRemark.bind(this,record)}/></a>}</div>
        } 
        SwitchColumns[SwitchColumns.length-1].title = <span onClick= {this.editRemark}>备注&nbsp;
            <Tooltip title="点击编辑所有备注"><Icon type="edit" style={{cursor:"pointer"}}/></Tooltip></span>
        return SwitchColumns
    }
    getColumns = () => {
        columns[0].render = ( text ,record , index) => {
            return <span>{index + 1}</span>
        }
        return columns
    }
    onChange = (e) => {
        this.setState({
            remark:e.target.value
        })
    }
    onChangeBank = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    //修改开户行
    editBankInfo = (record) => {
        const {showEditModal} = this.props;
        showEditModal("修改人员信息")
        this.setState({
            detailID:record.detailid
        })
    }
    //修改备注
    editRemark = (record) => {
        const { showEditModal} = this.props;
        showEditModal(`修改${record.detailid?"个人":"所有"}备注`);
        if(record){
            this.setState({
                detailID:record.detailid
            })
        }
    }
    render(){ 
        const {
            isFileModal , 
            resultData ,
            isEditModal, 
            hideEditModal,
            title , 
            batchNo ,
            editRemark , 
            dataResultCheck , 
            editBankInfo
        } = this.props;
        const { detailID } = this.state;
        const {
            listApply , 
            listPay , 
            sizeApply , 
            sizePay , 
            sumApply , 
            sumPay , 
            tblPayApplyModel
        } = resultData;
        return(
                <Modal
                    title={<h2>数据对比</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={isFileModal}
                    width={1600}
                    maskClosable={false}
                    footer={false}
                    onCancel={() => this.props.hideFileModal()}
                >
                    <div className="dataSwitch">
                        <ul className="data-info">
                            <li>
                                <span>批次号：</span>
                                <span>{tblPayApplyModel?tblPayApplyModel.batchno:""}</span>
                            </li>
                            <li>
                                <span>公司名称：</span>
                                <span>{tblPayApplyModel?tblPayApplyModel.corpname:""}</span>
                            </li>
                            <li style={{width:600}}>
                                <span>代发文件名：</span>
                                <span style={{display:"inline-block",width:500,textAlign:"left"}}>
                                    {tblPayApplyModel?tblPayApplyModel.payapplyfilename:""}
                                </span>
                            </li>
                            <li>
                                <span>申请日期：</span>
                                <span>{tblPayApplyModel?tblPayApplyModel.applydate:""}</span>
                            </li>
                        </ul>
                        <div className="File-btn">
                            <Tooltip title="先检查是否已完成数据的转换">
                                <Button type="primary">生成代发文件</Button>
                            </Tooltip>   
                        </div>
                        <div className="table-left">
                            <ul className="table-head">
                                <li>原公司提交数据</li>
                                <li><span>总笔数：</span><span>{sizeApply?sizeApply:"暂无"}</span></li>
                                <li><span>总金额：</span><span>{sumApply?sumApply:"暂无"}</span></li>
                            </ul>
                            <Table 
                                columns={this.getColumns()} 
                                dataSource={listApply} 
                                bordered={true}
                                scroll={{y:400}}
                                pagination={false}
                            />
                        </div>
                        <div className="table-right">
                            <ul className="table-head">
                                <li>转换后数据</li>
                                <li><span>总笔数：</span><span>{sizePay?sizePay:"暂无"}</span></li>
                                <li><span>总金额：</span><span>{sumPay?sumPay:"暂无"}</span></li>
                            </ul>
                            <Table 
                                columns={this.getSwitchColumns()} 
                                dataSource={listPay} 
                                bordered={true}
                                scroll={{y:400}}
                                pagination={false}
                            />
                        </div>
                        <EditModal 
                            isEditModal={isEditModal}
                            hideEditModal={hideEditModal}
                            title={title}
                            batchNo ={batchNo}
                            detailID = {detailID}
                            editRemark={editRemark}
                            dataResultCheck={dataResultCheck}
                            editBankInfo={editBankInfo}
                        />
                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    isFileModal: state.DataSwitch.isFileModal,
    resultData: state.DataSwitch.resultData,
    isEditModal: state.DataSwitch.isEditModal,
    title: state.DataSwitch.title
})
const mapDispatchToProps = dispatch => ({
    hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch),
    editRemark: bindActionCreators(Actions.DataSwitchActions.editRemark, dispatch),
    editBankInfo: bindActionCreators(Actions.DataSwitchActions.editBankInfo, dispatch),
    dataResultCheck: bindActionCreators(Actions.DataSwitchActions.dataResultCheck, dispatch),
    showEditModal: bindActionCreators(Actions.DataSwitchActions.showEditModal, dispatch),
    hideEditModal: bindActionCreators(Actions.DataSwitchActions.hideEditModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataCompareModal);