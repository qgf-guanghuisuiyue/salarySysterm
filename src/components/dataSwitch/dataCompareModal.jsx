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


 class LeadingResult extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    render(){ 
        const {isFileModal} = this.props;
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
        return(
                <Modal
                    title={<h2>数据对比</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={isFileModal}
                    width={1360}
                    footer={false}
                    onCancel={() => this.props.hideFileModal()}
                >
                    <div className="dataSwitch">
                        <ul className="data-info">
                            <li><span>批次号：</span><span>1212121</span></li>
                            <li><span>公司名称：</span><span>121212</span></li>
                            <li><span>代发文件名：</span><span>12121212</span></li>
                            <li><span>申请日期：</span><span>1212121</span></li>
                        </ul>
                        <div className="File-btn">
                            <Tooltip title="先检查是否已完成数据的转换">
                                <Button type="primary">生成代发文件</Button>
                            </Tooltip>
                            
                        </div>
                        <div className="table-left">
                            <ul className="table-head">
                                <li>原公司提交数据</li>
                                <li><span>总笔数：</span><span>222222</span></li>
                                <li><span>总金额：</span><span>222222</span></li>
                            </ul>
                            <Table 
                                columns={columns} 
                                dataSource={data} 
                                bordered={true}
                                pagination={false}
                            />
                        </div>
                        <div className="table-right">
                            <ul className="table-head">
                                <li>转换后数据</li>
                                <li><span>总笔数：</span><span>222222</span></li>
                                <li><span>总金额：</span><span>222222</span></li>
                            </ul>
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
    isFileModal: state.DataSwitch.isFileModal
})
const mapDispatchToProps = dispatch => ({
    hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadingResult);