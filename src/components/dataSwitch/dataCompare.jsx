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
        return(
            <div className="layout common">
                <Modal
                    title="垂直居中的对话框"
                    wrapClassName="vertical-center-modal"
                    visible={isFileModal}
                    onOk={() => this.props.hideFileModal()}
                    onCancel={() => this.props.hideFileModal()}
                    >
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                </Modal>
            </div>
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