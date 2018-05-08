import React, {Component,PropTypes} from 'react';
import {Input,Button,Icon} from 'antd';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import {Link} from 'react-router';
import store from 'store';

export default class LoginPage extends Component {
    state = {
        telphone: '',
        username: '',
        newpassword:"",
        newpasswordToo:"",
        yzm: '',
        errMsg: '',
    }
    onChange = (field,e)=> {
        this.setState({
            [field]:e.target.value
        })
    }
    //提交
    toLogin = () => {
        const {telphone,username,newpassword,newpasswordToo,yzm} = this.state;
        const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(telphone.length == 0){
            this.setState({
                errMsg: '手机号不能为空！'
            });
            return ;
        } else if (!myreg.test(telphone)){
            this.setState({
                errMsg: '手机号格式错误！'
            });
            return ;
        }else if(username.length == 0) {
            this.setState({
                errMsg: '用户名不能为空！'
            });
            return ;
        }else if(newpassword.length == 0) {
            this.setState({
                errMsg: '新密码不能为空！'
            });
            return ;
        }else if(newpasswordToo.length == 0) {
            this.setState({
                errMsg: '请确认新密码！'
            });
            return ;
        }else if(newpasswordToo!==newpassword) {
            this.setState({
                errMsg: '请重新确认新密码！'
            });
            return ;
        }else if(yzm.length == 0) {
            this.setState({
                errMsg: '验证码不能为空！'
            });
            return ;
        }
    }
    //获取验证码
    getYzm = () => {
        const {telphone} = this.state;
        const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(telphone.length == 0){
            this.setState({
                errMsg: '手机号不能为空！'
            });
            return ;
        } else if (!myreg.test(telphone)){
            this.setState({
                errMsg: '手机号格式错误！'
            });
            return ;
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextState.errMsg !== ''){
            setTimeout(()=>{
                this.setState({ 
                    errMsg: ''
                });
            },1500);
        }
    }
    render() {
        const {telphone,username,newpassword,newpasswordToo,yzm ,errMsg} = this.state;
        return (
            <div style={{width:"100%",height:"100%",background: 'linear-gradient( #176B90, #52A6C8)'}}>
            <div className="login-page" style={{height:530}}>
                    <h1>91薪宝管理系统</h1>
                    <div className="login" style={{height:500}}>
                        <div className="login-top">
                            找回密码
                        </div>
                        <div className="login-content" style={{height:450}}>
                            <label>
                                <span>手机号：</span>
                                <Input 
                                    style={{width:"60%"}} 
                                    placeholder="请输入手机号"
                                    value={telphone}
                                    onChange={this.onChange.bind(this,'telphone')}
                                    onPressEnter={this.toLogin}
                                />
                            </label><br/>
                            <label>
                                <span>姓名：</span>
                                <Input 
                                    style={{width:"60%"}} 
                                    placeholder="请输入姓名"
                                    value={username}
                                    onChange={this.onChange.bind(this,'username')}
                                    onPressEnter={this.toLogin}
                                />
                            </label><br/>
                            <label>
                                <span>新密码：</span>
                                <Input 
                                    style={{width:"60%"}} 
                                    placeholder="请输入新密码"
                                    value={newpassword}
                                    onChange={this.onChange.bind(this,'newpassword')}
                                    onPressEnter={this.toLogin}
                                />
                            </label><br/>
                            <label>
                                <span>新密码确认：</span>
                                <Input 
                                    style={{width:"60%"}} 
                                    placeholder="请再次输入新密码"
                                    value={newpasswordToo}
                                    onChange={this.onChange.bind(this,'newpasswordToo')}
                                    onPressEnter={this.toLogin}
                                />
                            </label><br/>
                            <label>
                                <span>手机验证码：</span>
                                <Input  
                                    style={{width:"35%"}}
                                    placeholder="请输入验证码"
                                    value={yzm}
                                    onChange={this.onChange.bind(this,'yzm')}
                                    onPressEnter={this.toLogin}
                                />
                                <a
                                className="yzm"
                                    onClick={this.getYzm}
                                >
                                    获取验证码
                                </a>
                            </label>
                            <div className="forgetpsd">已有账号&nbsp;&nbsp;<Link to = "login" style={{color:"#0271BC"}}>登录</Link></div>
                            <Button 
                                style={{width:"80%",height:45,fontSize:18,marginTop:10}} 
                                onClick={this.toLogin}
                            >
                                提交
                            </Button>
                        </div>
                    </div>
                <div className="tips bounceIn" style={{
                    display: errMsg !== '' ? '' : 'none'
                }}>
                    {errMsg}
                </div>
            </div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
    
// })
// const mapDispatchToProps = dispatch => ({
   
// })

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginPage);