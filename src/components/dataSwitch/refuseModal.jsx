import React from 'react';
import { Modal, Input , notification} from 'antd';
const { TextArea } = Input;
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


export default class RefuseModal extends React.Component{
     state = {
         remark:""
     }
     onChange = (e) => {
        this.setState({
            remark:e.target.value
        })
     }
     onOk = () => {
         const {hideRefuseModal, batchNo , refusePay} = this.props;
         const {remark} = this.state;
         refusePay({remark,batchNo},hideRefuseModal)
     }
     onCancel = () => {
         this.props.hideRefuseModal()
         this.setState({
             remark:""
         })
     }
     
    render(){ 
        const { isRefuseModal } = this.props;
        const {remark} =this.state;
        return(
                <Modal
                    title={<h3>拒绝代发</h3>}
                    wrapClassName="refuse-modal"
                    visible={isRefuseModal}
                    style={{top:"50%",marginTop:"-125px"}}
                    maskClosable={false}
                    onOk = {this.onOk}
                    onCancel = {this.onCancel}
                >
                    <label>
                        <span 
                            style={{
                                display:"inline-block",
                                height:100,
                                fontWeight:"bold",
                                fontSize:"14px"
                            }}
                        >
                            拒绝原因：
                        </span>
                        <Input 
                            type="textarea" 
                            value={remark} 
                            style={{width:"80%",height:100}} 
                            onChange={this.onChange}
                        />
                    </label>
                </Modal>
            )
    }
}