import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import {Input, Upload, Button, DatePicker} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class UploadPage extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    render(){
        return(
            <div className="upLoad layout common">
                    <span style={{fontSize: 16}}>文件名: </span>
                    <Input className="upLoad-input"></Input>
                    <Upload>
                        <Button>
                        upload
                        </Button>
                    </Upload>
                    <span style={{fontSize: 16}}>期望代发日期：</span>
                    <DatePicker />
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
)(UploadPage);