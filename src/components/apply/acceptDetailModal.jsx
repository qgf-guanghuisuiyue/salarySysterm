import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/detailmodal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class AcceptDetailModalComponent extends React.Component{

    constructor(){
        super();
        this.state={
            page: 1
        }
    }
    skip='0'

    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1+(this.state.page-1)*10}</a>
        }
        return columns;
    }

    //页码回调
    onChange = (page) => {
        const {
            record,
            getPayagentDetail
        } = this.props;
        const {batchno} = record;
        this.setState({
            page        
        })
        this.skip = (page-1)*10;
        getPayagentDetail({batchNo:batchno,count:'10',skip:this.skip})
    }

    render(){ 
        const {acceptDetailVisible, detailList, record, payagentDetail} = this.props;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={acceptDetailVisible}
                    width={1000}
                    footer={false}
                    onCancel={() => this.props.hideAcceptDetailModal()}
                >
                    <div className="dataSwitch">
                        <ul className="data-info switchFileUl">
                            <li><span>批次号：</span><span>{record.batchno}</span></li>
                            <li><span>公司名称：</span><span>{record.corpname}</span></li>
                            <li><span>代发文件名：</span><span>{record.payapplyfilename}</span></li>
                            <li><span>总笔数</span><span>{record.totalcount}</span></li>
                            <li><span>总金额</span><span>{record.totalamount}</span></li>
                            <li><span>申请日期：</span><span>{record.applydate}</span></li>
                        </ul>
                            <Table 
                                columns={this._getColumns()} 
                                dataSource={payagentDetail.list} 
                                bordered={true}
                                scroll={{ y: 400 }} 
                                pagination={{
                                    defaultPageSize:10,
                                    total: payagentDetail.size,
                                    onChange:this.onChange.bind(this),
                                    showTotal:total => `共 ${payagentDetail.size == 0 ? 0 : payagentDetail.size} 条数据`
                                }}
                            />
                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    acceptDetailVisible: state.Apply.acceptDetailVisible,
    payagentDetail: state.DataSwitch.payagentDetail,
})
const mapDispatchToProps = dispatch => ({
    hideAcceptDetailModal: bindActionCreators(Actions.ApplyActions.hideAcceptDetailModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcceptDetailModalComponent);