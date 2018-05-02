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

    render(){ 
        const {
            type, value, code
        } = this.state;
        const {saveParameterVisible, hideSaveParameterModal} = this.props;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal"
                    visible={saveParameterVisible}
                    width={500}
                    footer={false}
                    onCancel={() => hideSaveParameterModal()}
                >
                    <ul class="data-list">
                        <li>
                            <span class="data-title">参数类型:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择参数类型'
                                    onChange={this.onHandleChange.bind(this, 'type')}
                            >
                              <Option value="1">公司参数</Option>
                              <Option value="2">系统参数</Option>
                            </Select>
                        </li>
                        <li>
                            <span class="data-title">参数值:</span>
                            <Select  style={{width: 200}}
                                    placeholder='请选择公司'
                                    onChange={this.onHandleChange.bind(this, 'value')}
                            >
                                    {
                                        [
                                            '海银会', 
                                            '银都',
                                            '零点花花',
                                            '西藏新路驰迅'
                                        ].map((item , index)=>{
                                            return <Option key={index} value={item}>{item}</Option>
                                        })
                                    }
                            </Select>
                        </li>
                        <li>
                            <span class="data-title">参数代码:</span>
                            <Select style={{width: 200}}
                                    placeholder='参数值'
                                    onChange={this.onHandleChange.bind(this, 'code')}
                            >
                              <Option value="yd">yd</Option>
                              <Option value="xzxlcx">xzxlcx</Option>
                              <Option value="hyh">hyh</Option>
                              <Option value="ldhh">ldhh</Option>
                            </Select>
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
    parameterSave: bindActionCreators(Actions.SystemActions.parameterSave, dispatch),
    hideSaveParameterModal: bindActionCreators(Actions.SystemActions.hideSaveParameterModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveParameterModalComponent);