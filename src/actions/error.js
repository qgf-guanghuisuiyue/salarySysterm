import * as types from '../constants/error';
import {AjaxByToken} from 'utils/ajax';
import {Modal} from 'antd';

const SHOW_LEADINGFILE_MODAL = {type:types.SHOW_LEADINGFILE_MODAL};
const HIDE_LEADINGFILE_MODAL = {type:types.HIDE_LEADINGFILE_MODAL};
const LEADING_RESULT_QUERY = {type:types.LEADING_RESULT_QUERY};

    export const showLeadingFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_LEADINGFILE_MODAL})
    }
    export const hideLeadingFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_LEADINGFILE_MODAL})
    }
    //导入结果列表查询
    export const searchErrorList = (data) => (dispatch,getState) => {
        AjaxByToken('api/accept/payagent/failure/list',{
            head: {
                transcode: 'C000008',
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
    