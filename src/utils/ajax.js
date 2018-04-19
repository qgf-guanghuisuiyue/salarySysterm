import axios from 'axios';

// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';


const CancelToken = axios.CancelToken;
let cancel = [];

export const AjaxByPost = (uri, data) => {
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
            const {data} = response;
            const { code, msg } = data;
            if (code === 'AAAAAA' && msg==="成功"||"登出成功") {
                resolve(omit(data,['code','msg']));
            }else{
                reject(response);
            }
        })
        .catch(function(response,e) {
            console.log('网络错误',response.message);
        })
    });
    
}
export const AjaxByToken = (uri, data) => {
    return AjaxByPost(uri,data);
}

