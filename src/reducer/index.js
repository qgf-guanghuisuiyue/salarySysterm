import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';
import DataSwitch from './dataSwitch';

const rootReducer = combineReducers({
    Login,
    Home,
    DataSwitch
});

export default rootReducer;