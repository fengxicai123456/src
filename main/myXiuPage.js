/**
 * Created by Administrator on 2017/1/3.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/myXiu.css'

class UserMsg extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginIn : false ,
            loginInName : '未知'
        }

    }
    componentDidMount(){
        let loginName = localStorage.getItem("userName");
        console.log(loginName)
        if(loginName){
            this.setState({
                loginIn: true ,
                loginInName : loginName
            })
        }
    }
    render(){
        var none = {'display':(this.state.loginIn ? 'none': 'block')}
        var block = {'display':(this.state.loginIn ? 'block': 'none'),color:'red'}
        return (
            <div className="f-userMsg">

                <div className="f-userImg"><img src="img/myXiu/touxiang.jpg"/></div>
                <dl className="f-userName">
                    <dt>昵称：<i>{this.state.loginInName}</i></dt>
                    <dd style={none}><span id="dengLu"><a href="#login">登录</a></span><span id="zhuCe"><a href="#register">注册</a></span></dd>
                    <dd style={block}>余额：0</dd>
                </dl>
            </div>
        )
    }
}

class UserOrder extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="f-myOrder">
                <p className="f-myOrder-list" onClick={()=>window.location.hash = 'order'}>我的订单<b>></b></p>
                <p className="f-myOrder-list">我的优惠券<b>></b></p>
                <p className="f-myOrder-list">浏览记录<b>></b></p>
                <p className="f-myOrder-list">我的收藏<b>></b></p>
            </div>
        )
    }
}

class MyXiuPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="我的秀" hasBack={false} rightBtn={<a>充值</a>} has  />
                <Content hasFooter={true} hasSubHeader={false}  >


                    <section >

                        <div className="f-myXiuBox">

                            <UserMsg />

                            <UserOrder />
                        </div>
                    </section>



                </Content>
                <Footer active={3} />
            </div>
        )
    }
}

export default  MyXiuPage