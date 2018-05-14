import * as types from '../constants/error';
import {AjaxByToken} from 'utils/ajax';
import {Modal, notification} from 'antd';

const SHOW_LEADINGFILE_MODAL = {type:types.SHOW_LEADINGFILE_MODAL};
const HIDE_LEADINGFILE_MODAL = {type:types.HIDE_LEADINGFILE_MODAL};
const ERROR_LIST_QUERY = {type:types.ERROR_LIST_QUERY};

    export const showLeadingFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_LEADINGFILE_MODAL})
    }
    export const hideLeadingFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_LEADINGFILE_MODAL})
    }
    //导入结果列表查询
    export const searchErrorList = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/failure/list',{
            head: {
                transcode: 'C000008',
            },
            data: data
        })
        .then(res=>{
            dispatch({...ERROR_LIST_QUERY,errorList:res.data})
        },err=>{
            console.log(err)
        });
    }
    //手工处理
    export const handleMsg = (data,searchErrorList) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/failure/with',{
            head: {
                transcode: 'C000014',
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message:res.msg
            })
            searchErrorList()
        },err=>{
            console.log(err)
        });
    }
    