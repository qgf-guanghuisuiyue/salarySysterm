import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';
import Upload from './upload';
import Apply from './apply';
import DataSwitch from './dataSwitch';

const rootReducer = combineReducers({
    Login,
    Home,
    Upload,
    Apply,
    DataSwitch
});

export default rootReducer;