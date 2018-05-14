import React from 'react';
import ReactDom from 'react-dom';

// css文件
import './scss/main.scss';

import routes from './router';

// react-router
import { Router , hashHistory } from 'react-router';
// redux
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import 'static/css/nprogress.css';

NProgress.configure({
    className: 'top60'
})

window.prefixUri = 'PayAgent';

// 创建一个store
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}>
        </Router>
    </Provider>
,document.getElementById('app'));
