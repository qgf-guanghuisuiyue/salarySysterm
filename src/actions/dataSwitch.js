import * as types from '../constants/dataSwitch';
import {AjaxByToken} from 'utils/ajax';
import axios from 'axios';
import store from 'store';
import FileSaver from 'file-saver';
import {Modal , notification , message} from 'antd';

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
const SHOW_REFUSE_MODAL = {type:types.SHOW_REFUSE_MODAL};
const HIDE_REFUSE_MODAL = {type:types.HIDE_REFUSE_MODAL};
const SHOW_EDIT_MODAL = {type:types.SHOW_EDIT_MODAL};
const HIDE_EDIT_MODAL = {type:types.HIDE_EDIT_MODAL};
const PAY_FILE_CREATE = {type:types.PAY_FILE_CREATE};




    export const showFileModal = (batchno, dataResultCheck) => (dispatch,getState) => {
        dispatch({...SHOW_FILE_MODAL});
        dataResultCheck({batchNo:batchno,skip:0,count:50})
    }
    export const hideFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_FILE_MODAL})
    }
    export const showRefuseModal = () => (dispatch,getState) => {
        dispatch({...SHOW_REFUSE_MODAL});
    }
    export const hideRefuseModal = () => (dispatch,getState) => {
        dispatch({...HIDE_REFUSE_MODAL});
    }
    export const showEditModal = (title) => (dispatch,getState) => {
        dispatch({...SHOW_EDIT_MODAL,title});
    }
    export const hideEditModal = () => (dispatch,getState) => {
        dispatch({...HIDE_EDIT_MODAL});
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
    //拒绝代发
    export const refusePay = (data,hideRefuseModal) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_refused',{
            head: {
                transcode: 'C000012',
            },
            data: data
        })
        .then(res=>{

            notification.success({
                message:res.msg
            }) 
            hideRefuseModal()
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
            message.success(res.msg); 
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
    export const createPayFile = (data,payFileMakeInfo) => (dispatch,getState) => {
        dispatch({...CREATE_FILE_START})
        AjaxByToken('api/accept/payagent_genfile',{
            head: {
                transcode: 'C000009',
            },
            data: data
        })
        .then(res=>{
            message.success(res.msg);
            payFileMakeInfo({batchNo:data.batchNo})
            dispatch({...CREATE_FILE_DONE})
        },err=>{
            console.log(err.data.msg)
            dispatch({...CREATE_FILE_DONE})
        });
    }

    //修改备注
    export const editRemark = (data , dataResultCheck ,hideEditModal) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_remark',{
            head: {
                transcode: 'C000011',
            },
            data: data
        })
        .then(res=>{
            message.success(res.msg);
            dataResultCheck({batchNo:data.batchNo,skip:0,count:50});
            hideEditModal()
        },err=>{
            console.log(err)
        });
    }
    //编辑银行信息
    export const editBankInfo = (data,batchNo,dataResultCheck , hideEditModal) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_update',{
            head: {
                transcode: 'C000010',
            },
            data: data
        })
        .then(res=>{
            message.success(res.msg);
            dataResultCheck({batchNo,skip:0,count:50});
            hideEditModal()
        },err=>{
            console.log(err)
        });
    }
    //代发受理文件生成信息
    export const payFileMakeInfo = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent_info',{
            head: {
                transcode: 'C000006',
            },
            data: data
        })
        .then(res=>{
            dispatch({...PAY_FILE_CREATE,payFileCreate:res.data})
        },err=>{
            console.log(err)
        });
    }
    //下载代发生成文件
    export const downLoadPayFile = (name) =>(dispatch,getState) => {
        const token = store.get('token');
        axios({
            url: "PayAgent/api/web/file/downloadExcel",
            method: 'get',
            responseType: 'arraybuffer',
            params:{
                token:token.token,
                tokenKey:token.tokenKey,
                fileName:name
            }
        })
        .then(res=>{
            const blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            FileSaver.saveAs(blob, `${name}.xls`);
        }).catch(error=>{
            console.log(error)
        });
    }