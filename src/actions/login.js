import * as types from '../constants/login';
import Md5 from 'blueimp-md5';
import {AjaxByPost} from 'utils/ajax';

import store from 'store';
import extend from 'lodash/extend';
import pick from 'lodash/pick';

// Login type
const USER_LOGIN = {type:types.USER_LOGIN};
const LOGIN_START = {type:types.LOGIN_START};
const LOGIN_DONE = {type:types.LOGIN_DONE};

export const getLoginCode = (data) => (dispatch, getState) => {
    AjaxByPost('api/user/getLoginCode',{
        head: {
            transcode: 'S000006',
        },
        data: data
    })
    .then(res=>{
        console.log(res)
    },err=>{
        console.log(err);
    });
}

export const userLogin = (userInfo={},context) => (dispatch,getState) => {
    dispatch(LOGIN_START);
    userInfo.pwd = Md5(userInfo.pwd);
    AjaxByPost('api/user/login',{
        head: {
            transcode: 'S000005',
        },
        data: userInfo
    })
    .then(res=>{
        dispatch(LOGIN_DONE);
        const data = pick(res.data,['token','tokenKey']);
        store.set('token',data);
        context.router.push('/');
    },err=>{
        console.log(err);
        dispatch(LOGIN_DONE);
    });
}

export const hideLoading = () => (dispatch,getState) => {
    dispatch(LOGIN_DONE);
}

export const userLoginout = (context) => (dispatch,getState) => {
    const token = store.get('token');
    console.log(token)
    AjaxByPost('api/user/loginout',{
        head: {
            transcode: 'S000002'
        },
        data: token
    })
    .then(res=>{
        store.remove('token')
        console.log(res, context)
        context.router.push('/login'); 
    });
}

