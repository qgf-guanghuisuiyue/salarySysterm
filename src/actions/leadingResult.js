import * as types from '../constants/leadingResult';
import {AjaxByToken} from 'utils/ajax';
import {Modal, notification} from 'antd';

const SHOW_LEADINGFILE_MODAL = {type:types.SHOW_LEADINGFILE_MODAL};
const HIDE_LEADINGFILE_MODAL = {type:types.HIDE_LEADINGFILE_MODAL};
const LEADING_RESULT_QUERY = {type:types.LEADING_RESULT_QUERY};
const SHOW_UPLOAD_MODAL = {type:types.SHOW_UPLOAD_MODAL};
const HIDE_UPLOAD_MODAL = {type:types.HIDE_UPLOAD_MODAL};
const SHOW_DETAIL_MODAL = {type:types.SHOW_DETAIL_MODAL};
const HIDE_DETAIL_MODAL = {type:types.HIDE_DETAIL_MODAL};


    export const showLeadingFileModal = (batchno,payFileMakeInfo) => (dispatch,getState) => {
        dispatch({...SHOW_LEADINGFILE_MODAL})
        payFileMakeInfo({batchNo:batchno})
    }
    export const hideLeadingFileModal = (clearTableCheckbox) => (dispatch,getState) => {
        dispatch({...HIDE_LEADINGFILE_MODAL});
        if(clearTableCheckbox){
            clearTableCheckbox()
        } 
    }
    export const showUploadFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_UPLOAD_MODAL})
    }
    export const hideUploadFileModal = (cancelFile) => (dispatch,getState) => {
        dispatch({...HIDE_UPLOAD_MODAL});
        cancelFile()
    }

    export const showDetailModal = (data,payAgentApplyDetaillist,payFileMakeInfo) => (dispatch,getState) => {
        dispatch({...SHOW_DETAIL_MODAL})
        payAgentApplyDetaillist(data);
        payFileMakeInfo({batchNo:data.batchNo})
    }
    export const hideDetailModal = () => (dispatch,getState) => {
        dispatch({...HIDE_DETAIL_MODAL})
    }
    //批次结果确认
    export const resultConfirm = (data,leadingResultQuery) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_confirm',{
            head: {
                transcode: 'C000013',
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message:res.msg
            })
            leadingResultQuery()
        },err=>{
            console.log(err)
        });
    }
    export const upLoadFile = (data,hideUploadFileModal,hideLeadingFileModal) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_importFile',{
            head: {
                transcode: 'C000007',
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message:res.msg
            })
            hideUploadFileModal();
            hideLeadingFileModal()
        },err=>{
            console.log(err)
        });
    }

