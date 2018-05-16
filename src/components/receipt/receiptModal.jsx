import React from 'react';
import { Modal, Input , notification, DatePicker, Select, Button,Tooltip } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


export default class EditModal extends React.Component{
     state = {
         oftheCompany:"",
         issuingamount:"",
         invoicedate:"",
         therate:"",
         earn:"",
         isUse:true
     }
     componentWillReceiveProps(nextProps){
        const {record} = nextProps;
        //console.log(record)
     }
     saveData = () => {
         const {searchReceiptList, calculateList, hideReceiptModal, record} = this.props,
            {batchNo,corpName,totalAmount,paymentTime,rate, netamount} = record,
            {invoiceAmount,grossAmount,actualAmount} = calculateList,
            {oftheCompany,issuingamount,earn,invoicedate,therate} = this.state;
         this.props.saveData({
            batchno:batchNo,//批次号
            paymentCompany:corpName,//付款公司
            oftheCompany,//收款公司
            netamount,//入账金额
            totalamount:issuingamount,//代发总金额
            rateamount:invoiceAmount,//开票金额
            paytax:actualAmount,//纳税税额
            profits:grossAmount,//本次利益
            yieldpoints:earn,//收益点数
            invoicedate,//开票日期
            rate,//状态
            therate,//税率
            paymentTime:moment(paymentTime).format("YYYYMMDD")//收款日期
         },hideReceiptModal, searchReceiptList)
     }
     onCancel = () => {
         this.props.hideReceiptModal()
         this.props.cancelRecord()
         this.setState({
            issuingamount:""
         })
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
    
    companySelect = (field,value) => {
        const {netamount} = this.props.record
        if(field=="oftheCompany"){
            this.setState({
                therate:"",
                earn:"",
                isUse:false
            })
            this.props.getCompanyName({id:value})
        }
        if(field=="earn"){
            this.setState({
                issuingamount:netamount/(1+value)
            })
        }
        this.setState({
            [field]:value
        })
    }
    dateChange = (field,value,dateString) => {
        if(value){
            this.setState({
                [field]:moment(value).format("YYYY-MM-DD")
            })
        }else{
            this.setState({
                [field]:""
            })
        }
    }
    onChangeInput = (e) => {
        this.setState({
            issuingamount:e.target.value
        })
    }
    calculate= () => {
        const {therate,earn,issuingamount, invoicedate} = this.state;
        const {netamount}= this.props.record;
        if(!issuingamount){
            notification.warning({
                message:"请计算本次代发金额"
            })
            return false
        }else if(!netamount){
            notification.warning({
                message:"请输入入账金额"
            })
            return false
        }else if(!therate){
            notification.warning({
                message:"请选择税率"
            })
            return false
        }else if(!earn){
            notification.warning({
                message:"请选择收益点数"
            })
            return false
        }else{
            this.props.calculate({issuingamount,netamount,rate:therate,yieldpoint:earn})
        }
        
    }
    render(){ 
        const { 
            isReceiptModal ,
            hideReceiptModal,
            record, 
            companyList,
            rateAndEarnList,
            calculateList,
            isCalLoading,
            isDisabled
        } = this.props,
            {invoiceAmount,grossAmount,actualAmount} = calculateList,
            {batchNo,corpName,totalAmount,applyDate,paymentTime,rate, netamount} = record;
        const {list=[]} = companyList;
        const {listEarn,listRate}= rateAndEarnList;
        const {therate,earn,issuingamount,oftheCompany,isUse} = this.state;
        return(
                <Modal
                    title={<h2>开票计算</h2>}
                    wrapClassName="receipt-modal"
                    visible={isReceiptModal}
                    width={1000}
                    style={{top:"50%",marginTop:"-300px"}}
                    maskClosable={false}
                    onOk = {this.saveData}
                    onCancel = {this.onCancel}
                    okText="保存"
                    cancelText="关闭"
                >
                    <ul className="left-ul">
                        <li><a>收款日期：</a><a><Input style={{width:240}} value={paymentTime} disabled/></a></li>
                        <li><a>付款公司：</a><a><Input style={{width:240}} value={corpName} disabled/></a></li>
                        <li>
                            <a><span style={{color:"red"}}>*</span>收款公司：</a>
                            <a>
                                <Select 
                                    style={{width:240}} 
                                    placeholder="请选择收款公司"
                                    value={oftheCompany} 
                                    onChange={this.companySelect.bind(this,"oftheCompany")}
                                    disabled={isDisabled}
                                >
                                    <Option value='' disabled selected style={{color:"#CCCCCC"}}>请选择收款公司</Option>
                                    {
                                        list && list.map((item,index)=>{
                                            return(<Option value={item.id}>{item.corpname}</Option>)
                                        })
                                    }
                                </Select>
                            </a>
                        </li>
                        <li>
                            <a>税率：</a>
                            <Tooltip title="请先选择收款公司">
                                <a>
                                    <Select 
                                        style={{width:240}} 
                                        value={therate} 
                                        disabled={isUse}
                                        placeholder="请先选择收款公司"
                                        onChange={this.companySelect.bind(this,"therate")}
                                    >
                                        {
                                            listRate && listRate.map((item,index)=>{
                                                return(<Option value={item.rate}>{item.rate}</Option>)
                                            })
                                        }
                                    </Select>
                                </a>
                            </Tooltip>
                        </li>
                        <li>
                            <a>本次代发金额：</a>
                            <a>
                                <Input 
                                    ref="issuingamount"
                                    style={{width:240}} 
                                    placeholder="请先选择收益点数获得"
                                    value={issuingamount}
                                    disabled
                                />
                            </a>
                        </li>
                        <li>
                            <a>实际缴纳税额：</a>
                            <a>
                                <Input 
                                    style={{width:240}} 
                                    value={actualAmount} 
                                    disabled
                                    placeholder="通过计算获得"
                                />
                            </a>
                        </li>
                        <li>
                            <a>开票状态：</a>
                            <a>
                                <Input style={{width:240}} value={rate==0?"未核算":rate==1?"已核算未开票":rate==2 && "已开票"} disabled/>
                            </a>
                        </li>
                    </ul>
                    <ul className="right-ul">
                        <li>
                            <a>代发日期：</a>
                            <a>
                                <Input style={{width:240}} value={applyDate} disabled/>
                            </a>
                        </li>
                        <li>
                            <a><span style={{color:"red"}}>*</span>本次入账金额：</a>
                            <a>
                                <Input style={{width:240}} value={netamount} disabled/>
                            </a>
                        </li>
                        <li>
                            <a>收益点数：</a>
                            <Tooltip title="请先选择收款公司">
                                <a>
                                    <Select 
                                        style={{width:240}}
                                        placeholder="请先选择收款公司" 
                                        value={earn} 
                                        disabled={isUse}
                                        onChange={this.companySelect.bind(this,"earn")}
                                    >
                                        {
                                            listEarn && listEarn.map((item,index)=>{
                                                return(<Option value={item.yieldpoint}>{item.yieldpoint}</Option>)
                                            })
                                        }
                                    </Select>
                                </a>
                            </Tooltip>
                        </li>
                        <li>
                            <a>本次开票金额：</a>
                            <a>
                                <Input style={{width:240}} value={invoiceAmount} disabled placeholder="通过计算获得"/>
                            </a>
                        </li>
                        <li>
                            <a>税后净收益：</a>
                            <a>
                                <Input style={{width:240}} value={grossAmount} disabled placeholder="通过计算获得"/>
                            </a>
                        </li>
                        <li>
                            <a><span style={{color:"red"}}>*</span>开票日期：</a>
                            <a>
                                <DatePicker 
                                    style={{width:240}} 
                                    disabled={isDisabled}
                                    onChange={this.dateChange.bind(this,"invoicedate")}
                                />
                            </a>
                        </li>
                        <li>
                            {
                                !isDisabled &&
                                <Button 
                                    style={{marginLeft:50,width:80}} 
                                    onClick={this.calculate}
                                    loading={isCalLoading}
                                    type="primary"
                                >
                                    计算
                                </Button>
                            }
                        </li>
                    </ul>
                </Modal>
            )
    }
}