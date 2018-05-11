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


 class DetailModalComponent extends React.Component{
   state = {
       page: 1
   }
   skip=0
   

    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1+(this.state.page-1)*10}</a>
        }
        return columns;
    }

    //页码回调
    onChangePagination = (page) => {
        const {
            record,
            payAgentApplyDetaillist
        } = this.props;
        const {batchno} = record;
        this.setState({
            page
        })
        this.skip = page * 10 - 10;
        payAgentApplyDetaillist({batchNo:batchno,count:10,skip:this.skip})
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.detailList.visible){
            this.skip = 0,
            this.setState({
                page:1
            })
        }
        
    }

    render(){ 
        const {detailList, record} = this.props;
        const {detailData} = detailList;
        const {page} = this.state;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={detailList.visible}
                    width={1000}
                    footer={false}
                    onCancel={() => this.props.hideDetailModal()}
                >
                    <div className="dataSwitch">
                        <ul className="data-info switchFileUl">
                            <li><span>批次号：</span><span>{record.batchno}</span></li>
                            <li><span>公司名称：</span><span>{record.corpname}</span></li>
                            <li><span>代发文件名：</span><span>{record.payapplyfilename}</span></li>
                            <li><span>总笔数：</span><span>{record.totalcount}</span></li>
                            <li><span>总金额：</span><span>{record.totalamount}</span></li>
                            <li><span>申请日期：</span><span>{record.applydate}</span></li>
                        </ul>
                            <Table 
                                columns={this._getColumns()} 
                                dataSource={detailData.list} 
                                bordered={true}
                                scroll={{ y: 400 }} 
                                pagination={{
                                    defaultPageSize:10,
                                    total: detailData.sum,
                                    current:page,
                                    onChange:this.onChangePagination,
                                    showTotal:total => `共 ${detailData.sum == 0 ? 0 : detailData.sum} 条数据`
                                }}
                            />

                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    detailList: state.Apply.detailList,
})
const mapDispatchToProps = dispatch => ({
    hideDetailModal: bindActionCreators(Actions.ApplyActions.hideDetailModal, dispatch),
    payAgentApplyDetaillist: bindActionCreators(Actions.ApplyActions.payAgentApplyDetaillist, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailModalComponent);