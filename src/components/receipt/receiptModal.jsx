import React from 'react';
import { Modal, Input , notification, DatePicker, Select} from 'antd';
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
     }
     onCancel = () => {
         this.props.hideReceiptModal()
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
        const { isReceiptModal ,hideReceiptModal} = this.props;
        const {remark , bankName , bankPlace} = this.state;
        return(
                <Modal
                    title={<h2>开票计算</h2>}
                    wrapClassName="receipt-modal"
                    visible={isReceiptModal}
                    width={1000}
                    style={{top:"50%",marginTop:"-300px"}}
                    maskClosable={false}
                    onOk = {this.onOk}
                    onCancel = {this.onCancel}
                    okText="保存"
                    cancelText="关闭"
                >
                    <ul className="left-ul">
                        <li><a>收款日期：</a><a><DatePicker style={{width:240}}/></a></li>
                        <li><a>付款公司：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>收款公司：</a><a><Select style={{width:240}}></Select></a></li>
                        <li><a>税率：</a><a><Select style={{width:240}}></Select></a></li>
                        <li><a>本次代发金额：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>实际缴纳税额：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>开票状态：</a><a><Select style={{width:240}}></Select></a></li>
                    </ul>
                    <ul className="right-ul">
                        <li><a>代发日期：</a><a><DatePicker style={{width:240}}/></a></li>
                        <li><a>本次入账金额：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>收益点数：</a><a><Select style={{width:240}}></Select></a></li>
                        <li><a>本次开票金额：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>税后净收益：</a><a><Input style={{width:240}}/></a></li>
                        <li><a>开票日期：</a><a><Select style={{width:240}}></Select></a></li>
                    </ul>
                </Modal>
            )
    }
}