import * as types from '../constants/upload';
import {AjaxByPost} from 'utils/ajax';

const SHOW_FILE_MODAL  = {type: types.SHOW_FILE_MODAL};
const HIDE_FILE_MODAL = {type: types.HIDE_FILE_MODAL};
const UPLOAD_FILE_START = {type: types.UPLOAD_FILE_START};
const UPLOAD_FILE_DONE = {type: types.UPLOAD_FILE_DONE};


export const showFileModal = () => (dispatch,getState) => {
    dispatch({...SHOW_FILE_MODAL})
}
export const hideFileModal = () => (dispatch,getState) => {
    dispatch({...HIDE_FILE_MODAL})
}

//上传文件
export const uploadFile = (data, props) => (dispatch, getState) => {
    dispatch(UPLOAD_FILE_START);
    AjaxByPost('/api/web/file/uploadFile', {
        data: data,
    })
    .then(res=>{
        dispatch(UPLOAD_FILE_DONE)
    })
}