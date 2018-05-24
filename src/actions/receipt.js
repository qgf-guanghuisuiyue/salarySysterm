import * as types from '../constants/receipt';
import {AjaxByToken} from 'utils/ajax';
import {Modal, notification} from 'antd';

const SHOW_RECEIPT_MODAL = {type:types.SHOW_RECEIPT_MODAL};
const HIDE_RECEIPT_MODAL = {type:types.HIDE_RECEIPT_MODAL};
const RECEIPT_QUERY_LIST = {type:types.RECEIPT_QUERY_LIST};
const COMPANY_LIST = {type:types.COMPANY_LIST};
const RATEANDEARN_LIST = {type:types.RATEANDEARN_LIST};
const CALCULATE = {type:types.CALCULATE};
const CALCULATE_START = {type:types.CALCULATE_START};
//const CANCEL_CAL_LIST = {type:types.CANCEL_CAL_LIST}

    export const showReceiptModal = (getCompanyName, searchReceiptList) => (dispatch,getState) => {
        dispatch(SHOW_RECEIPT_MODAL);
        if(getCompanyName){
            getCompanyName();
        }
        if(searchReceiptList){
            searchReceiptList()
        }
    }
    export const hideReceiptModal = () => (dispatch,getState) => {
        dispatch({...HIDE_RECEIPT_MODAL})
    }
    //开票计算列表查询
    export const searchReceiptList = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/rate/list',{
            head: {
                transcode: 'C000015',
            },
            data: data
        })
        .then(res=>{
            dispatch({...RECEIPT_QUERY_LIST,receiptList:res.data})
        },err=>{
            console.log(err)
        });
    }
    //获取收款公司
    export const getCompanyName = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/rate/query',{
            head: {
                transcode: 'C000016',
            },
            data: data
        })
        .then(res=>{
            if(data){
                dispatch({...RATEANDEARN_LIST,rateAndEarnList:res.data})
            }else{
                dispatch({...COMPANY_LIST,companyList:res.data})
            }
            
        },err=>{
            console.log(err)
        });
    }
    //计算
    export const calculate = (data) => (dispatch,getState) => {
        dispatch({...CALCULATE_START})
        AjaxByToken('api/accept/payagent/rate/toCalculate',{
            head: {
                transcode: 'C000017',
            },
            data: data
        })
        .then(res=>{
            dispatch({...CALCULATE,calculateList:res.data})  
        },err=>{
            console.log(err)
        });
    }
    //保存数据
    
    export const saveData = (data,hideReceiptModal,searchReceiptList) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/rate/invoice',{
            head: {
                transcode: 'C000018',
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message:"保存成功"
            })
            if(hideReceiptModal){
                hideReceiptModal()
            }
            if(searchReceiptList){
                searchReceiptList()
            } 
        },err=>{
            console.log(err)
        });
    }
    