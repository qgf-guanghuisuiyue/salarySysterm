import axios from 'axios';
import store from 'store';
// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import {notification } from 'antd';

const CancelToken = axios.CancelToken;
let cancel = [];

export const cancelRequest = function() {
    cancel = [];
}


export const AjaxByPost = (uri, data) => {
    NProgress.start()
    return new Promise(function(resolve, reject) {
        axios({
            url: `PayAgent/${uri}`,
            method: 'post',
            data: merge(data,{
                head:{
                    type:'web'
                }
            }),
            header: {
                contentType: 'application/json;charset=utf-8'
            },
            cancelToken: new CancelToken(function (c) {
                cancel.push({
                    [uri]: c
                });
            })
        })
        .then(response => {
            NProgress.done()
            const {data} = response;
            const { code, msg } = data;
            if (code !== 'AAAAAA') {
                if(msg === '登录已失效,请重新登录' && code === '0000005'){
                    store.remove('token');
                    location.href = `${location.origin}/#/login`; 
                    notification.error({
                        message:"错误信息",
                        description:msg,
                        style:{top:40}
                    });
                }else{
                    notification.error({
                        message:"错误信息",
                        description:msg,
                        style:{top:40}
                    });
                }
                reject(response);
            }else {
                resolve(omit(data,['code']));
            }
        })
        .catch(function(response,e) {
            NProgress.done()
            console.log('网络错误',response);
        })
    });
    
}
export const AjaxByToken = (uri, data) => {
    // 获取本地存储的token
    const token = store.get('token');
    return AjaxByPost(uri, merge(data, { data: token }));
}

