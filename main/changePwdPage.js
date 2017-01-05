/**
 * Created by Administrator on 2017/1/5.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/login.css'
class ChangePwd extends Component {
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
           alert('服务器错误暂时无法修改密码')
            location.hash = 'myxiu'
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
                        <input type="password" name="account" onChange={(e)=>this.userNameChange(e)} value={this.state.userNameWord} placeholder="请输入原始密码" />
                        <i style={userNameStyle}>只能中英文，数字，下划线，减号，6~16字符</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type='password' name="pwd" value={this.state.userPwdWord} onChange={(e)=>this.userNameChange(e)} placeholder="请输入新密码" />
                        <i style={usesPwdStyle}>只能包含字符、数字和下划线,6~16位字符</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type="password" name="repetPwd" value={this.state.userPwdRepeat} onChange={(e)=>this.userNameChange(e)} placeholder="请再次输入新密码密码" />
                        <i style={usesrepeatPwdStyle}>两次输入密码不一致</i>
                    </p>
                    <p className="f-registerMsg">
                        <input type="button" className="f-registerBtn f-changePwdBtn" value="保存" onClick={()=>this.loginInMyXiu()} />
                    </p>
                </div>
            </section>
        )
    }
}



class ChangePwdPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="修改密码" hasBack={true}  />
                <Content hasFooter={false} hasSubHeader={false}  >

                    <ChangePwd />

                </Content>
            </div>
        )
    }
}

export default  ChangePwdPage