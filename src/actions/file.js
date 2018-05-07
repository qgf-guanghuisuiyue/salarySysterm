//文件删除相关接口
import * as types from '../constants/system';
import {AjaxByToken} from 'utils/ajax';
import {notification} from 'antd'; 

const REMOVE_UPLOAD_FILE = {type: types.REMOVE_UPLOAD_FILE};

export const removeUploadFIle = (data) => (dispatch,getState) => {
    AjaxByToken('/api/web/file/delFile', {
        head: {
            transcode: 'S000003',
        },
        data: data
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}