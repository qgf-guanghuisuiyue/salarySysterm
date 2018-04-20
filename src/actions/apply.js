import * as types from '../constants/apply';
import {AjaxByPost} from 'utils/ajax';
import store from 'store';

// 代发申请列表查询接口 
const APPLY_LIST_START = { type: types.APPLY_LIST_START };
const APPLY_LIST_DONE = { type: types.APPLY_LIST_DONE };
const GET_APPLY_LIST = { type: types.GET_APPLY_LIST };

export const getApplyList = (params) => (dispatch, getState) => {
    dispatch(APPLY_LIST_START);
    const token = store.get('token');
    AjaxByPost('api/apply/payagent_applylist', {
        head: {
            transcode: 'A000002',
        },
        data: {
            ...token,
            ...params
        }
    }).then(res => {
        console.log(res)
        dispatch(APPLY_LIST_DONE);
        dispatch({...GET_APPLY_LIST,apply_list: res.data.list});
    }, err => {
        dispatch(APPLY_LIST_DONE);
        console.log(err)
    })
}