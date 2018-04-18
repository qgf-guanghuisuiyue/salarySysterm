import * as types from '../constants/dataSwitch';
import {AjaxByToken} from 'utils/ajax';
import {Modal} from 'antd';

const SHOW_FILE_MODAL = {type:types.SHOW_FILE_MODAL};
const HIDE_FILE_MODAL = {type:types.HIDE_FILE_MODAL};

    export const showFileModal = () => (dispatch,getState) => {
        dispatch({...SHOW_FILE_MODAL})
    }
    export const hideFileModal = () => (dispatch,getState) => {
        dispatch({...HIDE_FILE_MODAL})
    }