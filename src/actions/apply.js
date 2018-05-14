import * as types from '../constants/apply';
import {AjaxByToken} from 'utils/ajax';
import {notification} from 'antd'; 

// 代发申请列表查询接口 
const APPLY_LIST_START = { type: types.APPLY_LIST_START };
const APPLY_LIST_DONE = { type: types.APPLY_LIST_DONE };
const GET_APPLY_LIST = { type: types.GET_APPLY_LIST };
const UPLOAD_START = { type: types.UPLOAD_START };
const UPLOAD_DONE = { type: types.UPLOAD_DONE };
const SHOW_DETAIL_MODAL = { type: types.SHOW_DETAIL_MODAL };
const HIDE_DETAIL_MODAL = { type: types.HIDE_DETAIL_MODAL };
const DETAIL_LIST_START = { type: types.DETAIL_LIST_START };
const DETAIL_LIST_DONE = { type: types.DETAIL_LIST_DONE };
const GET_DETAIL_LIST = { type: types.GET_DETAIL_LIST };
const RESET_PAYAGENTDATA_TRUE = { type: types.RESET_PAYAGENTDATA_TRUE };
const RESET_PAYAGENTDATA_FALSE = { type: types.RESET_PAYAGENTDATA_FALSE };

//api/apply/payagent_apply
export const payAgentApply = (data, getApplyList) => (dispatch, getState) => {
    dispatch(UPLOAD_START);
    AjaxByToken('api/apply/payagent_apply', {
        head: {
            transcode: 'A000001',
        },
        data: data
    }).then(res => {
        dispatch({...UPLOAD_DONE,isUploadSucc:true});
        getApplyList({skip: 0, count: 10, apply: 'Y'})
    }, err => {
        dispatch(UPLOAD_DONE);
        console.log(err)
    })
}

//代发申请列表查询接口
export const getApplyList = (params) => (dispatch, getState) => {
    console.log('代发申请列表查询接口')
    dispatch(APPLY_LIST_START);
    AjaxByToken('api/apply/payagent_applylist', {
        head: {
            transcode: 'A000002',
        },
        data: params
    }).then(res => {
        dispatch(APPLY_LIST_DONE);
        dispatch({...GET_APPLY_LIST, applyData: res.data});
    }, err => {
        dispatch(APPLY_LIST_DONE);
        console.log(err)
    })
}

//提供批次号 提交代发申请 
export const payAgentCommit = (batchNoList, getApplyList) => (dispatch, getState) => {
    AjaxByToken('api/apply/payagent_commit', {
        head: {
            transcode: 'A000003',
        },
        data: batchNoList
    }).then(res => {
        notification.success({
           message: "提交成功"
        })
        getApplyList({skip: 0,count: 10, apply: 'Y'});
        dispatch(RESET_PAYAGENTDATA_TRUE);
    }, err => {
        console.log(err)
    })
}

//提供批次号 删除该次申请
export const payAgentDel = (batchNoList, getApplyList) => (dispatch, getState) => {
    AjaxByToken('api/apply/payagent_del', {
        head: {
            transcode: 'A000004',
        },
        data: batchNoList
    }).then(res => {
        notification.success({
           message: "删除成功"
        })
        getApplyList({skip: 0,count: 10, apply: 'Y'});
        dispatch(RESET_PAYAGENTDATA_TRUE);
    }, err => {
        console.log(err)
    })
}

//代发申请明细查询接口
export const payAgentApplyDetaillist = (data) => (dispatch, getState) => {
    dispatch(DETAIL_LIST_START)
    AjaxByToken('api/apply/payagent_applydetaillist', {
        head: {
            transcode: 'A000005',
        },
        data: data
    }).then(res => {
        dispatch(DETAIL_LIST_DONE);
        dispatch({...GET_DETAIL_LIST, detailData:res.data})
    }, err => {
        dispatch(DETAIL_LIST_DONE)
        console.log(err)
    })
};

export const resetPayagentFalse = () => (dispatch, getState) => {
    dispatch(RESET_PAYAGENTDATA_FALSE);
}

export const showDetailModal = (data, payAgentApplyDetaillist) => (dispatch,getState) => {
    dispatch(SHOW_DETAIL_MODAL);
    payAgentApplyDetaillist(data)
}
export const hideDetailModal = () => (dispatch,getState) => {
    dispatch(HIDE_DETAIL_MODAL)
}
