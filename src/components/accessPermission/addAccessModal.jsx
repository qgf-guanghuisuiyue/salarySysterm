import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import { Select ,Modal} from 'antd';
import {AjaxByToken} from 'utils/ajax';
import columns from 'data/table-columns/detailmodal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


export default class AccessModalComponent extends React.Component{


    render(){ 
        const {isAddAccessModal} = this.props;
        return(
                <Modal
                    title="新增用户权限"
                    visible={isAddAccessModal}
                    style={{top:"50%",marginTop:-80}}
                    onCancel={() => this.props.hideAddAccessModal()}
                >
                    <div style={{textAlign:"center"}}>
                        <span>授权公司名称：</span>
                        <Select style={{width:200}}>
                            <Option value="lucy">lucy</Option>
                            <Option value="l">luc</Option>
                            <Option value="l2">luy</Option>
                        </Select>
                    </div> 
                </Modal>
        )
    }
}
