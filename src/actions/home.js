import * as types from '../constants/home';
import {AjaxByToken} from 'utils/ajax';
import {Modal} from 'antd';

const NEWS_LIST = {type:types.NEWS_LIST};
const SCROLLTO = {type:types.SCROLLTO};
const CANCELLISTINDEX = {type:types.CANCELLISTINDEX};
const GETPATH = {type:types.GETPATH};
const GETPAGE = {type:types.GETPAGE};
const CANCELCURRENTPAGE = {type:types.CANCELCURRENTPAGE};


//获取banner图片
    export const getBannerList = () => (dispatch,getState) => {
        AjaxByToken('/mobile/api/ad_show/getWxPhotoList',{
            head: {
                transcode: 'F00009',
                type:"h"
            }
        })
        .then(res=>{
            dispatch({...NEWS_LIST,photolist:res.data})
        },err=>{
            Modal.error({
                title: `${err.data.returnMsg}`,
              });
        });
    }

    export const scrollTo = (num,page) => (dispatch,getState) => {
        dispatch({...SCROLLTO,num:num,page:page})
    }
    export const cancelListIndex = () => (dispatch,getState) => {
        dispatch({...CANCELLISTINDEX})
    }
    export const getpath = () => (dispatch,getState) => {
        dispatch({...GETPATH})
    }
    export const getpage = (page) => (dispatch,getState) => {
        dispatch({...GETPAGE,page:page})
    }
    export const cancelCurrentPage = () => (dispatch,getState) => {
        dispatch({...CANCELCURRENTPAGE})
    }