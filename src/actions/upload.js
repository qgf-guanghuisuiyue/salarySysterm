import * as types from '../constants/upload';
import {AjaxByPost} from 'utils/ajax';
import axios from 'axios';
import store from 'store';

//模板下载
export const downloadExcel = (fileName) => (dispatch, getState) => {
    const token = store.get('token');
    axios({
        url: `/api/web/file/downloadExcel`,
        method: 'get',
        responseType: 'arraybuffer',
        params: {
            token,
            fileName: fileName
        }
    })
    .then(res=>{
        const blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        FileSaver.saveAs(blob,'模板.xlsx');
    }).catch(error=>{
        console.log(error)
    });
}