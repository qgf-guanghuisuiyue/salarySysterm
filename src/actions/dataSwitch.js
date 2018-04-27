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
const DATA_RESULT_CHECK = {type:types.DATA_RESULT_CHECK};
const CREATE_FILE_START = {type:types.CREATE_FILE_START};
const CREATE_FILE_DONE = {type:types.CREATE_FILE_DONE};
    export const showFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_FILE_MODAL})
    }
    export const hideFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_FILE_MODAL})
    }
    //获取数据文件转换列表
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
            dispatch({...HIDE_LOADING})
        });
    }
    //文件明细
    export const getDetail = (data) => (dispatch,getState) => {
        AjaxByToken('api/apply/payagent_applydetaillist',{
            head: {
                transcode: 'A000005',
            },
            data: data
        })
        .then(res=>{
            // dispatch({...GET_DATASWITCH_LIST,dataSwitchList:res.data})
        },err=>{
            dispatch({...HIDE_LOADING})
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
            dispatch({...HIDE_LOADING})
        });
    }
    //数据转换
    export const dataSwitch = (data , getPayagentDetail) => (dispatch,getState) => {
        dispatch({...SHOW_SWITCH_LOADING})
        AjaxByToken('api/accept/payagent_conversion',{
            head: {
                transcode: 'C000003',
            },
            data: data
        })
        .then(res=>{
            getPayagentDetail({batchNo:data.batchNo,count:"10",skip:"0"})
            dispatch({...HIDE_SWITCH_LOADING})
            notification.success({
                message:res.msg
            })   
        },err=>{
            dispatch({...HIDE_SWITCH_LOADING})
        });    
    }
    //数据转换结果核对
    export const dataResultCheck = (data) => (dispatch,getState) => {
        //dispatch({...SHOW_LOADING})
        AjaxByToken('api/accept/payagent_contrast',{
            head: {
                transcode: 'C000004',
            },
            data: data
        })
        .then(res=>{
            //dispatch({...HIDE_LOADING})
            dispatch({...DATA_RESULT_CHECK,resultData:res.data})
        },err=>{
            console.log(err)
            //dispatch({...HIDE_LOADING})
        });
    }

    //生成银行代发文件
    export const createPayFile = (data) => (dispatch,getState) => {
        dispatch({...CREATE_FILE_START})
        AjaxByToken('api/accept/payagent_genfile',{
            head: {
                transcode: 'C000009',
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message:res.msg
            }) 
            dispatch({...CREATE_FILE_DONE})
        },err=>{
            dispatch({...CREATE_FILE_DONE})
        });
    }