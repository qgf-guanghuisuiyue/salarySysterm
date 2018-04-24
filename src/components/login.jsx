import React, {Component,PropTypes} from 'react';
import {Input,Button,Icon,Spin} from 'antd';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import {Link} from 'react-router';
import store from 'store';

export class LoginPage extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        phone: '',
        pwd: '',
        code: '',
        errMsg: '',
        loaddone:false
    }
    onChange = (field,e)=> {
        this.setState({
            [field]:e.target.value
        })
    }
    //登录
    toLogin = () => {
        const {phone,pwd,code} = this.state;
        const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(phone.length == 0){
            this.setState({
                errMsg: '手机号不能为空！'
            });
            return ;
        } else if (!myreg.test(phone)){
            this.setState({
                errMsg: '手机号格式错误！'
            });
            return ;
        }else if(pwd.length == 0) {
            this.setState({
                errMsg: '密码不能为空！'
            });
            return ;
        }else if(code.length == 0) {
            this.setState({
                errMsg: '验证码不能为空！'
            });
            return ;
        }
        this.props.userLogin({phone,pwd,code},this.context);
    }
    //获取验证码
    getYzm = () => {
        const {code, phone} = this.state;
        const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(phone.length == 0){
            this.setState({
                errMsg: '手机号不能为空！'
            });
            return ;
        } else if (!myreg.test(phone)){
            this.setState({
                errMsg: '手机号格式错误！'
            });
            return ;
        }
        this.props.getLoginCode({phone: phone});
    }
    componentWillUpdate(nextProps,nextState) {
        if(nextState.errMsg !== ''){
            setTimeout(()=>{
                this.setState({ 
                    errMsg: ''
                });
            },1500);
        }
    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.msg){
        //     this.setState({
        //         errMsg: nextProps.msg
        //     })
        // }
        this.setState({
            loaddone:nextProps.loaddone
        })
    }

    render() {
        const {phone,pwd,code ,errMsg , loaddone} = this.state;
        return (
            <div style={{width:"100%",height:"100%",background: 'linear-gradient( #176B90, #52A6C8)'}}>
                <div className="login-page">
                        <h1>91薪宝管理系统</h1>
                        <div className="login">
                            <div className="login-top">
                                用户登录
                            </div>
                            <div className="login-content">
                                <label>
                                    <span>手机号：</span>
                                    <Input 
                                        style={{width:"60%"}} 
                                        placeholder="请输入手机号"
                                        value={phone}
                                        onChange={this.onChange.bind(this,'phone')}
                                        onPressEnter={this.toLogin}
                                    />
                                </label><br/>
                                <label>
                                    <span>登录密码：</span>
                                    <Input 
                                        style={{width:"60%"}} 
                                        placeholder="请输入密码"
                                        value={pwd}
                                        onChange={this.onChange.bind(this,'pwd')}
                                        onPressEnter={this.toLogin}
                                    />
                                </label><br/>
                                <label>
                                    <span>手机验证码：</span>
                                    <Input  
                                        style={{width:"35%"}}
                                        placeholder="请输入验证码"
                                        value={code}
                                        onChange={this.onChange.bind(this,'code')}
                                        onPressEnter={this.toLogin}
                                    />
                                    <a 
                                        className="yzm"
                                        onClick={this.getYzm}
                                    >
                                        获取验证码
                                    </a>
                                </label>
                                <div className="forgetpsd">
                                    <Link to = "forgetPsd" style={{color:"#0271BC"}}>忘记密码？</Link>
                                </div>
                                <Button 
                                    style={{width:"80%",height:45,fontSize:18}} 
                                    onClick={this.toLogin}
                                    loading={loaddone}
                                >
                                    安全登录
                                </Button>
                            </div>
                        </div>
                    <div 
                        className="tips bounceIn" 
                        style={{display: errMsg !== '' ? '' : 'none'}}
                    >
                        {errMsg}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loaddone: state.Login.loaddone,
    msg: state.Login.msg 
})
const mapDispatchToProps = dispatch => ({
    getLoginCode: bindActionCreators(Actions.loginActions.getLoginCode, dispatch),
    userLogin: bindActionCreators(Actions.loginActions.userLogin, dispatch),
    hideLoading: bindActionCreators(Actions.loginActions.hideLoading, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);