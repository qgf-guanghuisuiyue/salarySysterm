import * as types from '../constants/dataSwitch';
import {AjaxByToken} from 'utils/ajax';
import {Modal} from 'antd';

const SHOW_FILE_MODAL = {type:types.SHOW_FILE_MODAL};
const HIDE_FILE_MODAL = {type:types.HIDE_FILE_MODAL};
const GET_DATASWITCH_LIST = {type:types.GET_DATASWITCH_LIST};
const SHOW_LOADING = {type:types.SHOW_LOADING};
const HIDE_LOADING = {type:types.HIDE_LOADING};


    export const showFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_FILE_MODAL})
    }
    export const hideFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_FILE_MODAL})
    }

    export const getDataSwitchList = (data) => (dispatch,getState) => {
        dispatch({...SHOW_LOADING})
        AjaxByToken('api/accept/payagent_query',{
            head: {
                transcode: 'C000001',
            },
            data: data
        })
        .then(res=>{
            dispatch({...HIDE_LOADING})
            dispatch({...GET_DATASWITCH_LIST,dataSwitchList:res.data})
        },err=>{
            console.log(err)
        });
    }