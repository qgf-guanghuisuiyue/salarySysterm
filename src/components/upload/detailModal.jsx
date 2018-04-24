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

    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1}</a>
        }
        return columns;
    }

    render(){ 
        const {detailList, record} = this.props;
        console.log(detailList)
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
                        <ul className="data-info">
                            <li><span>批次号：</span><span>{record.batchno}</span></li>
                            <li><span>公司名称：</span><span>{record.corpname}</span></li>
                            <li><span>代发文件名：</span><span>{record.payapplyfilename}</span></li>
                            <li><span>总笔数</span><span>{record.totalcount}</span></li>
                            <li><span>总金额</span><span>{record.totalamount}</span></li>
                            <li><span>申请日期：</span><span>{record.applydate}</span></li>
                        </ul>
                            <Table 
                                columns={this._getColumns()} 
                                dataSource={detailList.list} 
                                bordered={true}
                                pagination={{
                                    defaultPageSize:5,
                                    count: detailList.count
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailModalComponent);