import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';
 
import columns from 'data/table-columns/resultData';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DataCompareModal extends React.Component{
    componentDidMount(){
        const {dataResultCheck , batchNo} = this.props;
        dataResultCheck({batchNo,skip:'0',count:'50'})
    }
    getColumns = () => {
        columns[0].render = (record , text , index) => {
            return <span>{index + 1}</span>
        }
        return columns
    }
    render(){ 
        const {isFileModal , resultData} = this.props;
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
                    wrapClassName="resultData"
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
                                columns={columns} 
                                dataSource={listPay} 
                                bordered={true}
                                scroll={{y:400}}
                                pagination={false}
                            />
                        </div>
                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    isFileModal: state.DataSwitch.isFileModal,
    resultData: state.DataSwitch.resultData
})
const mapDispatchToProps = dispatch => ({
    hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch),
    dataResultCheck: bindActionCreators(Actions.DataSwitchActions.dataResultCheck, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataCompareModal);