import axios from 'axios';

// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';


const CancelToken = axios.CancelToken;
let cancel = [];

export const AjaxByPost = (uri, data) => {
    return new Promise(function(resolve, reject) {
        axios({
            url: `${uri}`,
            method: 'post',
            data: merge(data,{
                head:{
                    type:'h'
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
            const { returnCode, returnMsg } = data;
            if (returnCode === 'AAAAAAA' && returnMsg==="查询成功!") {
                resolve(omit(data,['returnCode','returnMsg']));
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

