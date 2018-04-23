import * as types from '../constants/apply';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';

// 代发申请列表查询接口 
const APPLY_LIST_START = { type: types.APPLY_LIST_START };
const APPLY_LIST_DONE = { type: types.APPLY_LIST_DONE };
const GET_APPLY_LIST = { type: types.GET_APPLY_LIST };


//代发申请列表查询接口
export const getApplyList = (params) => (dispatch, getState) => {
    dispatch(APPLY_LIST_START);
    AjaxByToken('api/apply/payagent_applylist', {
        head: {
            transcode: 'A000002',
        },
        data: {
            ...params
        }
    }).then(res => {
        dispatch(APPLY_LIST_DONE);
        dispatch({...GET_APPLY_LIST, list: res.data.list});
    }, err => {
        dispatch(APPLY_LIST_DONE);
        console.log(err)
    })
}

//提供批次号 提交代发申请 
export const payAgentCommit = (batchNo) => (ispatch, getState) => {
    AjaxByToken('api/apply/payagent_commit', {
        head: {
            transcode: 'A000003',
        },
        data: {
            batchNo
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}