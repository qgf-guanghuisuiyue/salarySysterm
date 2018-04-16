import store from 'store';

// 权限验证
export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    // if(!token) replace({pathname:'/login'});  
}