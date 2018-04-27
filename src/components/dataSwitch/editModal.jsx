import React from 'react';
import { Modal, Input , notification} from 'antd';
const { TextArea } = Input;
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


export default class EditModal extends React.Component{
     state = {
         remark:"",
         bankName:"",
         bankPlace:"",
     }
     onOk = () => {
         const {title, batchNo,detailID,editRemark,dataResultCheck,hideEditModal,editBankInfo} = this.props;
         const {remark,bankName,bankPlace} = this.state;
         if(title ==="修改个人备注" || title ==="修改所有备注") {
            editRemark({batchNo,detailID,remark},dataResultCheck,hideEditModal)
         }else{
            editBankInfo({detailID,bankName,bankPlace},batchNo,dataResultCheck,hideEditModal)
         }
        //this.props.hideEditModal()
     }
     onCancel = () => {
         this.props.hideEditModal()
     }
     onChange = (e) => {
        this.setState({
            remark:e.target.value
        })
    }
    onChangeBank = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.isEditModal){
            this.setState({
                remark:"",
                bankName:"",
                bankPlace:""
            })
        }
    }
     
    render(){ 
        const { isEditModal ,title } = this.props;
        const {remark , bankName , bankPlace} = this.state;
        return(
                <Modal
                    title={title}
                    wrapClassName="edit-modal refuse-modal"
                    visible={isEditModal}
                    style={{top:"50%",marginTop:"-125px"}}
                    maskClosable={false}
                    onOk = {this.onOk}
                    onCancel = {this.onCancel}
                >
                    {
                        (title ==="修改个人备注" || title ==="修改所有备注") && 
                        <Input type="textarea" value={remark} style={{width:"80%",height:100}} onChange={this.onChange}/>
                    }
                    {
                        title ==="修改人员信息" && 
                        <div className="bankModal">
                            <label>开户行：<Input value={bankName} onChange={this.onChangeBank.bind(this,"bankName")}/></label><br/>
                            <label>开户地：<Input value={bankPlace} onChange={this.onChangeBank.bind(this,"bankPlace")}/></label>
                        </div>
                    }
                </Modal>
            )
    }
}