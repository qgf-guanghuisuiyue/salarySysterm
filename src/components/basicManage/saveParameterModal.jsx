import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {  Button , Tooltip , Select ,Input, Modal} from 'antd';
const Option = Select.Option;
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/detailmodal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class SaveParameterModalComponent extends React.Component{

    state = {
        type: '',
        value: '',
        code: ''
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onHandleInput = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    parameterSave = () => {
        const {parameterSave, getParameterList} = this.props;
        const {type, value, code} = this.state;
        parameterSave({type, value, code}, getParameterList)
    }

    render(){ 
        const {
            type, value, code
        } = this.state;
        const {saveParameterVisible, hideSaveParameterModal} = this.props;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal save-param"
                    visible={saveParameterVisible}
                    width={500}
                    onCancel={hideSaveParameterModal}
                    onOk={this.parameterSave}
                >
                    <ul> 
                        <li>
                            <span className="data-title">参数类型:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择参数类型'
                                    onChange={this.onHandleChange.bind(this, 'type')}
                            >
                              <Option value="1">公司参数</Option>
                              <Option value="2">系统参数</Option>
                            </Select>
                        </li>
                        <li>
                            <span className="data-title">参数值:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'value')}
                                placeholder='请输入公司名称'
                                value={value}
                            ></Input>
                        </li>
                        <li>
                            <span className="data-title">代码:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'code')}
                                placeholder='请输入公司名称首字母缩写'
                                value={code}
                            ></Input>
                        </li>
                    </ul>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    saveParameterVisible: state.System.saveParameterVisible,
})
const mapDispatchToProps = dispatch => ({
    getParameterList: bindActionCreators(Actions.SystemActions.getParameterList, dispatch),
    parameterSave: bindActionCreators(Actions.SystemActions.parameterSave, dispatch),
    hideSaveParameterModal: bindActionCreators(Actions.SystemActions.hideSaveParameterModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveParameterModalComponent);