import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class MouldFile extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    render(){
        return(
            <div className="mouldFile layout common">
                模板文件
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MouldFile);