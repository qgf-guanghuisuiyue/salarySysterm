import * as types from '../constants/receipt';
import {AjaxByToken} from 'utils/ajax';
import {Modal, notification} from 'antd';

const SHOW_RECEIPT_MODAL = {type:types.SHOW_RECEIPT_MODAL};
const HIDE_RECEIPT_MODAL = {type:types.HIDE_RECEIPT_MODAL};
const RECEIPT_QUERY_LIST = {type:types.RECEIPT_QUERY_LIST};

    export const showReceiptModal = () => (dispatch,getState) => {
        dispatch({...SHOW_RECEIPT_MODAL})
    }
    export const hideReceiptModal = () => (dispatch,getState) => {
        dispatch({...HIDE_RECEIPT_MODAL})
    }
    //导入结果列表查询
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
    