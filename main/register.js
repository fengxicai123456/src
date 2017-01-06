/**
 * Created by Administrator on 2017/1/3.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/login.css'
class ResgisterData extends Component {
    constructor(props){
        super(props)
        this.state = {
            showPwd : false ,
            remainPwd : false ,
            userNameBool : true,
            userPwdBool : true,
            userPwdRepeatBool : true,
            userNameWord : '',
            userPwdWord : '',
            userPwdRepeat : ''
        }
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
        if(targetName == 'repetPwd'){
            if(val != this.state.userPwdWord){
                this.setState({
                    userPwdRepeatBool:false,
                    userPwdRepeat : val
                })
                return false
            }
            this.setState({
                userPwdRepeatBool:true,
                userPwdRepeat : val
            })
        }
        return true
    }
    loginInMyXiu(){
        console.log(this.state.userNameWord)

        if(this.state.userNameWord&&this.state.userPwdWord&&this.state.userPwdRepeat&&this.state.userPwdRepeatBool&&this.state.userPwdBool&&this.state.userNameBool){
            $.ajax({
                type: "GET",
                url: "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID=" + this.state.userNameWord + "&password=" + this.state.userPwdWord ,
                async: true,
                dataType: "json",
                success: (data)=>{
                    console.log(data)
                    if(data == 1){
                        alert("注册成功")
                        //localStorage
                        localStorage.setItem("userName",this.state.userNameWord);
                        location.hash = "myXiu";
                    }
                    if(data == 2){
                        alert("数据库报错，重新注册")
                    }
                    if(data == 0){
                        alert("用户名已存在")
                    }
                },
                error: function(XHR, textStatus) {
                    console.log(XHR);
                    console.log(textStatus);
                },
                complete: function(data){
                    //console.log(data)
                }
            })
        }else{
            alert('请完善信息')
        }
    }
    render(){
        var userNameStyle ={'display' : this.state.userNameBool ?  'none': 'block'}
        var usesPwdStyle = {'display' : this.state.userPwdBool ?  'none': 'block'}
        var usesrepeatPwdStyle = {'display' : this.state.userPwdRepeatBool ?  'none': 'block'}
        return (
            <section >
                <div className="f-registerBox">
                    <p className="f-registerMsg">
                        <input type="text" name="account" onChange={(e)=>this.userNameChange(e)} value={this.state.userNameWord} placeholder="账号" />
                        <i style={userNameStyle}>只能中英文，数字，下划线，减号，4~16字符</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type='password' name="pwd" value={this.state.userPwdWord} onChange={(e)=>this.userNameChange(e)} placeholder="密码" />
                        <i style={usesPwdStyle}>只能包含字符、数字和下划线,6~16位字符</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type="password" name="repetPwd" value={this.state.userPwdRepeat} onChange={(e)=>this.userNameChange(e)} placeholder="重复密码" />
                        <i style={usesrepeatPwdStyle}>两次输入密码不一致</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type="button" className="f-registerBtn" value="确定注册" onClick={()=>this.loginInMyXiu()} />
                    </p>
                </div>
            </section>
        )
    }
}


class registerPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="用户注册" hasBack={true} rightBtn={<a href="#login">登录</a>} has  />
                <Content hasFooter={false} hasSubHeader={false}  >
                    <ResgisterData />
                </Content>
            </div>
        )
    }
}

export default  registerPage