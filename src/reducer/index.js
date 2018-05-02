import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';
import Upload from './upload';
import Apply from './apply';
import DataSwitch from './dataSwitch';
import LeadingResult from './leadingResult';
import Handle from './handle';
import System from './system';

const rootReducer = combineReducers({
    DataSwitch,
    LeadingResult,
    Login,
    Home,
    Upload,
    Apply,
    DataSwitch,
    Handle,
    System
});

export default rootReducer;