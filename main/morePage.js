/**
 * Created by Administrator on 2017/1/5.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/more.css'
//import  '../img/myXiu/touxiang.jpg'

class More extends Component {
    constructor(props){
        super(props)
    }
    changePwd(){
        let userLoginIn = localStorage.getItem('userName')
        if(userLoginIn){
            location.hash = 'changePwd'
        }else{
            alert('您还没有登录')

        }

    }
    render(){
        return (
            <div className="f-more">
                <p className="moreData" onClick={()=>this.changePwd()} >修改密码<i>&gt;</i></p>
                <p className="moreData" onClick={()=>location.hash='feedback'} >用户反馈<i>&gt;</i></p>
                <p className="moreData" >关于<i>&gt;</i></p>
                <div  className="exitLogin">
                    <button onClick={()=>{localStorage.removeItem("userName");alert('退出登录成功')}}>退出登录</button>
                </div>
            </div>
        )
    }
}

class MorePage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="更多" hasBack={false}  />
                <Content hasFooter={true} hasSubHeader={false}  >

                            <More />

                </Content>
                <Footer active={4} />
            </div>
        )
    }
}
/*
 * {/!*我的秀部分开始*!/}   { /!*用户信息*!/}  {/!*用户头像*!/}{/!*我的订单等信息*!/}
 *
 *
 *
 *
 *
 *
 * */
// let MyXiuPage = function(){
//     console.log(11111111 + '成功')
// }
export default  MorePage