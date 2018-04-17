import React, {Component,PropTypes} from 'react';
import {Input,Button,Icon} from 'antd';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import {Link} from 'react-router';
import store from 'store';

export default class LoginPage extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        telphone: '',
        password: '',
        yzm: '',
        errMsg: '',
    }
    onChange = (field,e)=> {
        this.setState({
            [field]:e.target.value
        })
    }
    //登录
    toLogin = () => {
        const {telphone,password,yzm} = this.state;
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
        }else if(password.length == 0) {
            this.setState({
                errMsg: '密码不能为空！'
            });
            return ;
        }else if(yzm.length == 0) {
            this.setState({
                errMsg: '验证码不能为空！'
            });
            return ;
        }
        
        this.context.router.push("apply")
        //window.location.hash = "upload"
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
    componentWillUpdate(nextProps,nextState) {
        if(nextState.errMsg !== ''){
            setTimeout(()=>{
                this.setState({ 
                    errMsg: ''
                });
            },1500);
        }
    }
componentDidMount(){
    console.log(this.context)
}

    render() {
        const {telphone,password,yzm ,errMsg} = this.state;
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
                                    value={telphone}
                                    onChange={this.onChange.bind(this,'telphone')}
                                    onPressEnter={this.toLogin}
                                />
                            </label><br/>
                            <label>
                                <span>登录密码：</span>
                                <Input 
                                    style={{width:"60%"}} 
                                    placeholder="请输入密码"
                                    value={password}
                                    onChange={this.onChange.bind(this,'password')}
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
                            <div className="forgetpsd"><Link to = "forgetPsd" style={{color:"#0271BC"}}>忘记密码？</Link></div>
                            <Button 
                                style={{width:"80%",height:45,fontSize:18}} 
                                onClick={this.toLogin}
                            >
                                安全登录
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