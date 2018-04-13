import React from 'react'
import {Router,hashHistory,Route,IndexRoute,Redirect} from 'react-router'

import Home from './components/Home'

const RouterConfig=()=>{
    return(<Router history={hashHistory}>
        {/* <Redirect from="/" to="home" /> */}
        <Route path="/" component={Home}> 
            <IndexRoute component={Home}/>
        </Route>
    </Router>)
}
export default RouterConfig


