/**
 * Created by Administrator on 2017/1/4.
 */
/**
 * Created by Administrator on 2017/1/3.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/login.css'
//import  '../img/myXiu/touxiang.jpg'
class LoginData extends Component {
    constructor(props){
        super(props)
        this.state = {
            showPwd : false ,
            remainPwd : false ,
            userNameBool : true,
            userPwdBool : true,
            userNameWord : '',
            userPwdWord : ''
        }
    }

    changeShowPwd(){

        this.setState({
            showPwd:!this.state.showPwd
        })
    }
    changeremainPwd(){
        this.setState({
            remainPwd:!this.state.remainPwd
        })
    }
    userNameChange(e){
        console.log(e.target.name)
        var targetName = e.target.name;
        var val = e.target.value;
        var regUserName = /^[A-Za-z0-9-_]{4,16}$/
        var regPwd = /^[a-zA-Z0-9_-]{6,16}$/
        if(targetName == 'account'){

            if(!regUserName.test(val)){
                this.setState({
                    userNameBool:false,
                    userNameWord : val

                })
                return false
            }
            this.setState({
                userNameBool:true,
                userNameWord : val
            })
        }
        if(targetName == 'pwd'){
            if(!regPwd.test(val)){
                this.setState({
                    userPwdBool:false,
                    userPwdWord : val
                })
                return false
            }
            this.setState({
                userPwdBool:true,
                userPwdWord : val
            })
        }
        return true
    }
    loginInMyXiu(){
        console.log(this.state.userNameWord)

        if(this.state.userNameWord&&this.state.userPwdWord&&this.state.userPwdBool&&this.state.userNameBool){

            $.ajax({
                type: "GET",
                url: "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID=" + this.state.userNameWord + "&password=" + this.state.userPwdWord ,
                async: true,
                dataType: "json",
                success: (data)=>{
                    console.log(data);
                    if(data == 2){
                        alert("用户名密码不符")
                    }
                    else if(data == 0){
                        alert("用户名不存在")
                    }else{

                        localStorage.setItem("userName",this.state.userNameWord);
                        location.hash = "myXiu";
                        if(this.state.remainPwd){
                            localStorage.setItem("userMsg",[this.state.userNameWord,this.state.userPwdWord]);
                        }else{
                            localStorage.removeItem("userMsg")
                        }
                        console.log(this.state.userPwdWord)
                        //alert('登录成功')
                    }
                },
                error: function(XHR, textStatus) {
                    console.log(XHR);
                    console.log(textStatus);
                },
                complete: function(data){
                }
            })
        }else{
            alert('请完善信息')
        }
    }
    componentDidMount(){
        var userMsg = localStorage.getItem("userMsg");

        if(userMsg){
            var data = userMsg.split(',')
            this.setState({
                userNameWord:data[0] ,
                userPwdWord : data[1]
            })
        }
    }
    render(){
        var userNameStyle ={'display' : this.state.userNameBool ?  'none': 'block'}
        var usesPwdStyle = {'display' : this.state.userPwdBool ?  'none': 'block'}
        return (
            <section >
                <div className="f-registerBox">
                    <p className="f-registerMsg"><input type="text" name="account" onChange={(e)=>this.userNameChange(e)} value={this.state.userNameWord} placeholder="账号" /><i style={userNameStyle}>只能用英文，数字，下划线，4~16字符</i></p>
                    <p className="f-registerMsg"><input type={this.state.showPwd? 'text' : 'password'} name="pwd" value={this.state.userPwdWord} onChange={(e)=>this.userNameChange(e)} placeholder="密码" /><i style={usesPwdStyle}>只能包含字符、数字和下划线,6~16位字符</i></p>
                    <p className="f-registerMsg f-registerAboutPwd">
                        <b className={"f-remindPwd " + (this.state.showPwd ? 'active' : '')} onClick={()=>this.changeShowPwd()}></b>显示密码
                        <a href="#myXiu" className="f-forgetPwd">忘记密码?</a>
                    </p>
                    <p className="f-registerMsg f-registerAboutPwd">
                        <b className={"f-remindPwd " + (this.state.remainPwd ? 'active':'') }  onClick={()=>this.changeremainPwd()}></b>记住密码自动登录

                    </p>

                    <p className="f-registerMsg"><input type="button" className="f-registerBtn" value="登录" onClick={()=>this.loginInMyXiu()} /></p>

                    <p className="f-registerMsg"><input type="button" className="f-registerBtn  f-registerBtn-block" value="注册" onClick={()=>window.location.hash = 'register'} /></p>
                </div>
            </section>
        )
    }
}



class LoginPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="登录" hasBack={true} rightBtn={<a href="#register">注册</a>} has  />
                <Content hasFooter={false} hasSubHeader={false}  >
                    <LoginData />
                </Content>
            </div>
        )
    }
}
export default  LoginPage