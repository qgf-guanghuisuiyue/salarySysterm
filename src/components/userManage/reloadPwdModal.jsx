import React from 'react';
import axios from 'axios';
import moment from 'moment';
import md5 from 'blueimp-md5';
import {Link} from 'react-router';

import {  Button , Tooltip , Select ,Input, Modal, message} from 'antd';
const Option = Select.Option;
import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class ReloadPwdModalComponent extends React.Component{

    state = {
        new_pwd: '', //新密码MD5 32位小写密码
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.reloadPwdModal.resetForm){
            this.setState({
                new_pwd: '',
            });
            this.props.setResetReloadPwdFalse();
        }
    }

    onHandleInput = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    userInfoReloadpwd = () => {
        const {new_pwd} = this.state;
        const {userInfoReloadpwd, getUserInfoList, user_id} = this.props;
        userInfoReloadpwd({userID: user_id, new_pwd: md5(new_pwd)}, getUserInfoList)
    }
  

    render(){ 
        const { new_pwd} = this.state;
        const {user_name, reloadPwdModal, hideReloadpwdModal, userInfoReloadpwd} = this.props;
        return(
                <Modal
                    title={<h2>列表</h2>}
                    wrapClassName="vertical-center-modal save-param"
                    visible={reloadPwdModal.reloadPwdVisible}
                    width={500}
                    onCancel={hideReloadpwdModal}
                    onOk={this.userInfoReloadpwd}
                >
                    <ul> 
                        <li>
                            <span className="data-title">用户名:</span>
                            <div className="inline-block" style={{fontSize: 16}}>{user_name}</div>
                        </li>
                        <li>
                            <span className="data-title">新密码:</span>
                            <Input 
                                style={{width: 200}}
                                onChange={this.onHandleInput.bind(this, 'new_pwd')}
                                placeholder='请输入新密码'
                                value={new_pwd}
                            ></Input>
                        </li>
                    </ul>
                </Modal>
        )
    }
}
const mapStateToProps = state => ({
    reloadPwdModal: state.System.reloadPwdModal,
})
const mapDispatchToProps = dispatch => ({
    setResetReloadPwdFalse: bindActionCreators(Actions.SystemActions.setResetReloadPwdFalse, dispatch),
    userInfoReloadpwd: bindActionCreators(Actions.SystemActions.userInfoReloadpwd, dispatch),
    hideReloadpwdModal: bindActionCreators(Actions.SystemActions.hideReloadpwdModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReloadPwdModalComponent);