import store from 'store';
import {cancelRequest} from 'utils/ajax';
// 权限验证
export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(!token) replace({pathname:'/login'});  
}
// 离开页面触发此钩子
export const onLeavePage = (nextState,replace) => {
    cancelRequest();
}