import * as types from '../constants/dataSwitch';
import {AjaxByToken} from 'utils/ajax';
import {Modal , notification} from 'antd';

const SHOW_FILE_MODAL = {type:types.SHOW_FILE_MODAL};
const HIDE_FILE_MODAL = {type:types.HIDE_FILE_MODAL};
const GET_DATASWITCH_LIST = {type:types.GET_DATASWITCH_LIST};
const SHOW_LOADING = {type:types.SHOW_LOADING};
const HIDE_LOADING = {type:types.HIDE_LOADING};
const DATA_SWITCH = {type:types.DATA_SWITCH};
const PAYAGENT_DETAIL = {type:types.PAYAGENT_DETAIL};
const SHOW_SWITCH_LOADING = {type:types.SHOW_SWITCH_LOADING};
const HIDE_SWITCH_LOADING = {type:types.HIDE_SWITCH_LOADING};

    export const showFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_FILE_MODAL})
    }
    export const hideFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_FILE_MODAL})
    }
    //获取数据转换列表
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
    //数据转换
    export const dataSwitch = (data) => (dispatch,getState) => {
        dispatch({...SHOW_SWITCH_LOADING})
        AjaxByToken('api/accept/payagent_conversion',{
            head: {
                transcode: 'C000003',
            },
            data: data
        })
        .then(res=>{
            //console.log(res)
            //if(res.msg === "转换成功"){
                dispatch({...HIDE_SWITCH_LOADING})
           // }
            notification.warn({
                message:res.msg
            })
            
            // dispatch({...FILE_INFO,fileInfo:data}) 
        },err=>{
            console.log(err)
        });
          
    }
    //代发申请人员信息
    export const getPayagentDetail = (data) => (dispatch,getState) => {
        dispatch({...SHOW_LOADING})
        AjaxByToken('api/accept/payagent_detail',{
            head: {
                transcode: 'C000002',
            },
            data: data
        })
        .then(res=>{
            dispatch({...HIDE_LOADING})
            dispatch({...PAYAGENT_DETAIL,payagentDetail:res.data})
        },err=>{
            console.log(err)
        });
    }