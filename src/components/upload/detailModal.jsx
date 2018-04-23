import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DetailModalComponent extends React.Component{
    
    render(){ 
        const {detailListModal} = this.props;
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            }, {
            title: '姓名',
            dataIndex: 'name',
          }, {
            title: '卡号',
            dataIndex: 'code',
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
            code: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '2',
            code: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '3',
            name: '李大嘴',
            code: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }];
        return(
                <Modal
                    title={<h2>数据对比</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={detailListModal.visible}
                    footer={false}
                    onCancel={() => this.props.hideDetailModal()}
                >
                    <div className="dataSwitch">
                        <ul className="data-info">
                            <li><span>批次号：</span><span>1212121</span></li>
                            <li><span>公司名称：</span><span>121212</span></li>
                            <li><span>代发文件名：</span><span>12121212</span></li>
                            <li><span>总笔数</span><span>12121212</span></li>
                            <li><span>总金额</span><span>12121212</span></li>
                            <li><span>申请日期：</span><span>1212121</span></li>
                        </ul>
                        <div className="File-btn">
                            <Tooltip title="先检查是否已完成数据的转换">
                                <Button type="primary">提交</Button>
                            </Tooltip>
                            
                        </div>
                        <div>
                            <Table 
                                columns={columns} 
                                dataSource={data} 
                                bordered={true}
                                pagination={false}
                            />
                        </div>
                    </div>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    detailListModal: state.Apply.detailListModal,
})
const mapDispatchToProps = dispatch => ({
    hideDetailModal: bindActionCreators(Actions.ApplyActions.hideDetailModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailModalComponent);