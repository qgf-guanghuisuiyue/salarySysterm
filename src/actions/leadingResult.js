import * as types from '../constants/leadingResult';
import {AjaxByToken} from 'utils/ajax';
import {Modal, Notification} from 'antd';

const SHOW_LEADINGFILE_MODAL = {type:types.SHOW_LEADINGFILE_MODAL};
const HIDE_LEADINGFILE_MODAL = {type:types.HIDE_LEADINGFILE_MODAL};
const LEADING_RESULT_QUERY = {type:types.LEADING_RESULT_QUERY};
const SHOW_UPLOAD_MODAL = {type:types.SHOW_UPLOAD_MODAL};
const HIDE_UPLOAD_MODAL = {type:types.HIDE_UPLOAD_MODAL};


    export const showLeadingFileModal = (batchno,payFileMakeInfo) => (dispatch,getState) => {
        dispatch({...SHOW_LEADINGFILE_MODAL})
        payFileMakeInfo({batchNo:batchno})
    }
    export const hideLeadingFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_LEADINGFILE_MODAL})
    }
    export const showUploadFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_UPLOAD_MODAL})
    }
    export const hideUploadFileModal = (cancelFile) => (dispatch,getState) => {
        dispatch({...HIDE_UPLOAD_MODAL});
        cancelFile()
    }
    //导入结果列表查询
    export const leadingResultQuery = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_importquery',{
            head: {
                transcode: 'C000005',
            },
            data: data
        })
        .then(res=>{
            console.log(res)
            //dispatch({...LEADING_RESULT_QUERY,payFileCreate:res.data})
        },err=>{
            console.log(err)
        });
    }
    //批次结果确认
    export const resultConfirm = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_confirm',{
            head: {
                transcode: 'C000013',
            },
            data: data
        })
        .then(res=>{
            Notification.success({
                message:res.msg
            })
        },err=>{
            console.log(err)
        });
    }
    export const upLoadFile = (data,hideUploadFileModal) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_importFile',{
            head: {
                transcode: 'C000007',
            },
            data: data
        })
        .then(res=>{
            Notification.success({
                message:res.msg
            })
            hideUploadFileModal()
        },err=>{
            console.log(err)
        });
    }

