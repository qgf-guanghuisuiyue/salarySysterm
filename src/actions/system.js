//系统管理相关接口
import * as types from '../constants/system';
import {AjaxByToken} from 'utils/ajax';
import {notification} from 'antd'; 

const PARAMETER_LIST_START = {type: types.PARAMETER_LIST_START};
const PARAMETER_LIST_DONE = {type: types.PARAMETER_LIST_DONE};
const GET_PARAMETER_LIST = {type: types.GET_PARAMETER_LIST};
const SHOW_SAVE_PARAMETER = {type: types.SHOW_SAVE_PARAMETER};
const HIDE_SAVE_PARAMETER = {type: types.HIDE_SAVE_PARAMETER};
const TEMP_LIST_START = {type: types.TEMP_LIST_START};
const TEMP_LIST_DONE = {type: types.TEMP_LIST_DONE};
const GET_TEMP_LIST = {type: types.GET_TEMP_LIST};
const LOG_LIST = {type: types.LOG_LIST};
const LOG_LIST_START = {type: types.LOG_LIST_START};
const LOG_LIST_DONE = {type: types.LOG_LIST_DONE}
const ROLE_LIST = {type: types.ROLE_LIST}
const SHOW_SAVE_TEMP = {type: types.SHOW_SAVE_TEMP};
const HIDE_SAVE_TEMP = {type: types.HIDE_SAVE_TEMP};
const SET_RESETTEMP_TRUE = {type: types.SET_RESETTEMP_TRUE};
const SET_RESETTEMP_FALSE = {type: types.SET_RESETTEMP_FALSE};
const GET_CORP_LIST = {type: types.GET_CORP_LIST};
const RESET_TEMPSTATUS_TRUE = {type: types.RESET_TEMPSTATUS_TRUE};
const RESET_TEMPSTATUS_FALSE = {type: types.RESET_TEMPSTATUS_FALSE};
const USERINFO_LIST_START = {type: types.USERINFO_LIST_START};
const USERINFO_LIST_DONE = {type: types.USERINFO_LIST_DONE};
const GET_USERINFO_LIST = {type: types.GET_USERINFO_LIST};
const SHOW_ADDACCESS_MODAL = {type: types.SHOW_ADDACCESS_MODAL};
const HIDE_ADDACCESS_MODAL = {type: types.HIDE_ADDACCESS_MODAL}
const SHOW_SAVE_USERINFO = {type: types.SHOW_SAVE_USERINFO};
const HIDE_SAVE_USERINFO = {type: types.HIDE_SAVE_USERINFO};
const SET_RESETUSERINFO_TRUE = {type: types.SET_RESETUSERINFO_TRUE};
const SET_RESETUSERINFO_FALSE = {type: types.SET_RESETUSERINFO_FALSE};
const SET_RELOADPWD_TRUE = {type: types.SET_RELOADPWD_TRUE};
const SET_RELOADPWD_FALSE = {type: types.SET_RELOADPWD_FALSE};
const SHOW_RELOADPWD = {type: types.SHOW_RELOADPWD};
const HIDE_RELOADPWD = {type: types.HIDE_RELOADPWD};

// 系统参数列表查询
export const getParameterList = (data) => (dispatch, getState) => {
    dispatch(PARAMETER_LIST_START)
    AjaxByToken('api/system/parameter/list', {
        head: {
            transcode: 'S000007',
        },
        data: data
    }).then(res => {
        dispatch(PARAMETER_LIST_DONE)
        dispatch({...GET_PARAMETER_LIST, parameterData: res.data})
    }, err => {
        dispatch(PARAMETER_LIST_DONE)
        console.log(err)
    })
}

//系统参数添加
export const parameterSave = (data, getParameterList) => (dispatch, getState) => {
    AjaxByToken('api/system/parameter/save', {
        head: {
            transcode: 'S000008',
        },
        data: data
    }).then(res => {
        // console.log(res)
        dispatch(HIDE_SAVE_PARAMETER);
        notification.success({
            message: '提示',
            description: res.msg
        });
        getParameterList({skip: 0,count: 10})
    }, err => {
        console.log(err)
    })
}

export const showSaveParameterModal = () => (dispatch,getState) => {
    dispatch(SHOW_SAVE_PARAMETER);
}
export const hideSaveParameterModal = () => (dispatch,getState) => {
    dispatch(HIDE_SAVE_PARAMETER)
}

//系统参数删除
export const parameterDelete = (data, getParameterList) => (dispatch, getState) => {
    dispatch(TEMP_LIST_START)
    AjaxByToken('api/system/parameter/delete', {
        head: {
            transcode: 'S000009',
        },
        data: data
    }).then(res => {
        dispatch(TEMP_LIST_DONE);
        getParameterList({skip: 0,count: 10})
        console.log(res)
    }, err => {
        dispatch(TEMP_LIST_DONE);
        console.log(err)
    })
}

//系统模板数据列表查询
export const getTempList = (data) => (dispatch, getState) => {
    AjaxByToken('api/system/template/list', {
        head: {
            transcode: 'S000010',
        },
        data: data
    }).then(res => {
        dispatch({...GET_TEMP_LIST, tempData: res.data})
    }, err => {
        console.log(err)
    })
}

//系统模板数据新增
export const tempSave = (data, getTempList) => (dispatch, getState) => {
    AjaxByToken('api/system/template/save', {
        head: {
            transcode: 'S000011',
        },
        data: data
    }).then(res => {
        dispatch(SET_RESETTEMP_TRUE);
        setTimeout(()=>{
            dispatch(HIDE_SAVE_TEMP);
        },500);
        getTempList({skip: 0,count: 10})   
    }, err => {
        console.log(err)
    })
}

export const setResetTempFalse = () => (dispatch,getState) => {
    dispatch(SET_RESETTEMP_FALSE);
}

export const showSaveTempModal = () => (dispatch,getState) => {
    dispatch(SHOW_SAVE_TEMP);
}
export const hideSaveTempModal = () => (dispatch,getState) => {
    dispatch(HIDE_SAVE_TEMP);
    dispatch(SET_RESETTEMP_TRUE);
}



//系统管理-授权及模板公司选项列表 
export const getCorpList = () => (dispatch, getState) => {
    AjaxByToken('api/system/parameter/companylist', {
        head: {
            transcode: 'S000021',
        }
    }).then(res => {
        dispatch({...GET_CORP_LIST, corpData: res.data});
    }, err => {
        console.log(err)
    })
}

//系统模板数据停用
export const tempStop = (data, getTempList) => (dispatch, getState) => {
    AjaxByToken('api/system/template/changestatus', {
        head: {
            transcode: 'S000012',
        },
        data: data
    }).then(res => {
        dispatch(RESET_TEMPSTATUS_TRUE)
        getTempList()
        console.log(res)
    }, err => {
        console.log(err)
    })
}

export const resetTempStatusFalse = () => (dispatch, getState) => {
    dispatch(RESET_TEMPSTATUS_FALSE)
}

//系统管理-用户列表查询
export const getUserInfoList = (data) => (dispatch, getState) => {
    dispatch(USERINFO_LIST_START);
    AjaxByToken('api/system/userinfo/list', {
        head: {
            transcode: 'S000013',
        },
        data: data
    }).then(res => {
        dispatch(USERINFO_LIST_DONE);
        dispatch({...GET_USERINFO_LIST, userInfoData: res.data})
            }, err => {
        console.log(err)
    })
}

//系统管理-用户添加
export const userInfoSave = (data, getUserInfoList) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/save', {
        head: {
            transcode: 'S000014',
        },
        data: data
    }).then(res => {
        dispatch(SET_RESETUSERINFO_TRUE);
        setTimeout(()=>{
            dispatch(HIDE_SAVE_USERINFO);
        },500);
        getUserInfoList({skip: 0,count: 5});
        console.log(res)
    }, err => {
        console.log(err)
    })
}

export const setResetUserInfoFalse = () => (dispatch,getState) => {
    dispatch(SET_RESETUSERINFO_FALSE);
}


export const showSaveUserInfoModal = (getCorpList) => (dispatch,getState) => {
    dispatch(SHOW_SAVE_USERINFO);
    getCorpList();
}
export const hideSaveUserInfoModal = () => (dispatch,getState) => {
    dispatch(HIDE_SAVE_USERINFO);
    dispatch(SET_RESETUSERINFO_TRUE);
}

//系统管理-用户删除
export const userInfoDelete = (data, getUserInfoList) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/delete', {
        head: {
            transcode: 'S000015',
        },
        data: data
    }).then(res => {
        getUserInfoList({skip: 0,count: 5});
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统管理-用户密码重置
export const userInfoReloadpwd = (data) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/reloadpwd', {
        head: {
            transcode: 'S000016',
        },
        data: data
    }).then(res => {
        dispatch(SET_RELOADPWD_FALSE);
        dispatch(HIDE_RELOADPWD);
        console.log(res)
    }, err => {
        console.log(err)
    })
}

export const setResetReloadPwdFalse = () => (dispatch,getState) => {
    dispatch(SET_RELOADPWD_FALSE);
}

export const showReloadpwdModal = (getUserInfoList) => (dispatch,getState) => {
    dispatch(SHOW_RELOADPWD);
    getUserInfoList({skip: 0,count: 5});
}
export const hideReloadpwdModal = () => (dispatch,getState) => {
    dispatch(HIDE_RELOADPWD);
    dispatch(SET_RELOADPWD_TRUE);
}

//系统管理-用户权限列表查询
export const userInfoRoleList = (data) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/list', {
        head: {
            transcode: 'S000017',
        },
        data:data
    }).then(res => {
        dispatch({...ROLE_LIST,roleList:res.data})
    }, err => {
        console.log(err)
    })
}

//系统管理-用户权限-新增
export const userInfoRoleSave = (data,hideAddAccessModal,userInfoRoleList,clearTableCheckbox) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/save', {
        head: {
            transcode: 'S000018',
        },
        data:data
    }).then(res => {
        notification.success({
            message:res.msg
        });
        hideAddAccessModal();
        userInfoRoleList({skip:0,count:10});
        clearTableCheckbox()
    }, err => {
        console.log(err)
    })
}

//系统管理-用户权限-删除
export const userInfoRoleDel = (data,userInfoRoleList) => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/del', {
        head: {
            transcode: 'S000019',
        },
        data:data
    }).then(res => {
        notification.success({
            message:res.msg
        });
        userInfoRoleList({skip:0,count:10})
    }, err => {
        console.log(err)
    })
}

//系统管理-系统日记查询
export const userInfoRoleLogList = (data) => (dispatch, getState) => {
    dispatch(LOG_LIST_START)
    AjaxByToken('api/system/log/list', {
        head: {
            transcode: 'S000020',
        },
        data:data
    }).then(res => {
        dispatch(LOG_LIST_DONE);
        dispatch({...LOG_LIST,logList:res.data});
    }, err => {
        dispatch(LOG_LIST_DONE)
        console.log(err)
    })
}
export const showAddAccessModal = (getCorpList) => (dispatch,getState) => {
    dispatch(SHOW_ADDACCESS_MODAL);
    getCorpList()
}
export const hideAddAccessModal = () => (dispatch,getState) => {
    dispatch(HIDE_ADDACCESS_MODAL)
}
