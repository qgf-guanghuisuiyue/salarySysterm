//系统管理相关接口
import * as types from '../constants/system';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';
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
const USERINFO_LIST_START = {type: types.USERINFO_LIST_START};
const USERINFO_LIST_DONE = {type: types.USERINFO_LIST_DONE};
const GET_USERINFO_LIST = {type: types.GET_USERINFO_LIST};

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
        dispatch({...GET_PARAMETER_LIST, list: res.data.list})
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
    AjaxByToken('api/system/parameter/delete', {
        head: {
            transcode: 'S000009',
        },
        data: data
    }).then(res => {
        getParameterList({skip: 0,count: 10})
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统模板数据列表查询
export const getTempList = (data) => (dispatch, getState) => {
    dispatch(TEMP_LIST_START)
    AjaxByToken('api/system/template/list', {
        head: {
            transcode: 'S000010',
        },
        data: data
    }).then(res => {
        dispatch(TEMP_LIST_DONE)
        dispatch({...GET_TEMP_LIST, list: res.data.list})
        console.log(res)
    }, err => {
        dispatch(TEMP_LIST_DONE)
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
        console.log(res),
        getTempList()
    }, err => {
        console.log(err)
    })
}

export const showSaveTempModal = () => (dispatch,getState) => {
    dispatch(SHOW_SAVE_TEMP);
}
export const hideSaveTempModal = () => (dispatch,getState) => {
    dispatch(HIDE_SAVE_TEMP)
}

//系统模板数据停用
export const tempStop = () => (dispatch, getState) => {
    AjaxByToken('api/system/template/stop', {
        head: {
            transcode: 'S000012',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
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
        dispatch({...GET_USERINFO_LIST, list: res.data.list})
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统管理-用户添加
export const userInfoSave = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/save', {
        head: {
            transcode: 'S000014',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统管理-用户删除
export const userInfoDelete = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/delete', {
        head: {
            transcode: 'S000015',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统管理-用户密码重置
export const userInfoReloadpwd = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/reloadpwd', {
        head: {
            transcode: 'S000016',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
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
export const userInfoRoleSave = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/save', {
        head: {
            transcode: 'S000018',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统管理-用户权限-删除
export const userInfoRoleDel = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/del', {
        head: {
            transcode: 'S000019',
        }
    }).then(res => {
        console.log(res)
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
