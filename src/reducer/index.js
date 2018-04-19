import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';

const rootReducer = combineReducers({
    Login,
    Home
});

export default rootReducer;