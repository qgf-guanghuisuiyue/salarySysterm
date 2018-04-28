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
        console.log(res)
    }, err => {
        dispatch(PARAMETER_LIST_DONE)
        console.log(err)
    })
}

//系统参数添加
export const parameterSave = (data) => (dispatch, getState) => {
    AjaxByToken('api/system/parameter/save', {
        head: {
            transcode: 'S000008',
        }
    }).then(res => {
        console.log(res)
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
export const parameterDelete = () => (dispatch, getState) => {
    AjaxByToken('api/system/parameter/delete', {
        head: {
            transcode: 'S000009',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统模板数据列表查询
export const tempList = () => (dispatch, getState) => {
    AjaxByToken('api/system/templete/list', {
        head: {
            transcode: 'S000010',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统模板数据新增
export const tempSave = () => (dispatch, getState) => {
    AjaxByToken('api/system/templete/save', {
        head: {
            transcode: 'S000011',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//系统模板数据停用
export const tempStop = () => (dispatch, getState) => {
    AjaxByToken('api/system/templete/stop', {
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
export const userInfoList = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/list', {
        head: {
            transcode: 'S000013',
        }
    }).then(res => {
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
export const userInfoRoleList = () => (dispatch, getState) => {
    AjaxByToken('api/system/userinfo/role/list', {
        head: {
            transcode: 'S000017',
        }
    }).then(res => {
        console.log(res)
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
export const userInfoRoleLogList = () => (dispatch, getState) => {
    AjaxByToken('api/system/log/list', {
        head: {
            transcode: 'S000020',
        }
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}