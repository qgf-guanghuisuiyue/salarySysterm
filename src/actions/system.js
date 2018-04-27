//系统管理相关接口
import * as types from '../constants/system';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';
import {notification} from 'antd'; 

const PARAMETER_LIST_START = {type: types.PARAMETER_LIST_START};
const PARAMETER_LIST_DONE = {type: types.PARAMETER_LIST_DONE};
const GET_PARAMETER_LIST = {type: types.GET_PARAMETER_LIST};

// 系统参数列表查询
export const getParameterList = (data) => (dispatch, getState) => {
    dispatch(PARAMETER_LIST_START)
    AjaxByToken('api/system/parameter/list', {
        head: {
            transcode: 'S000007',
        },
        data: data
    }).then(res => {
        dispatch(PARAMETER_LIST_DONE)
        dispatch({...GET_PARAMETER_LIST, list: res.data.list})
        console.log(res)
    }, err => {
        dispatch(PARAMETER_LIST_DONE)
        console.log(err)
    })
}

//系统参数添加
export const parameterSave = (data) => (dispatch, getState) => {
    AjaxByToken('api/system/parameter/save', {
        head: {
            transcode: 'S000008',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}