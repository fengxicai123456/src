/**
 * Created by Administrator on 2017/1/5.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import '../css/login.css'
class Feedback extends Component {
    constructor(props){
        super(props)

    }

    loginInMyXiu(){
       alert('您的意见我们已经收到，谢谢')
        location.hash = 'more'
    }
    render(){
        return (
            <section >
                <div className="f-registerBox">
                    <p className="f-registerMsg f-opinion">
                        <textarea name="opinion" ></textarea>
                    </p>
                    <p className="f-registerMsg">
                        <input type="button" className="f-registerBtn f-changePwdBtn" value="提交" onClick={()=>this.loginInMyXiu()} />
                    </p>
                </div>
            </section>
        )
    }
}



class FeedbackPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return  (
            <div className="page" id="list-page">
                <Header title="意见反馈" hasBack={true}  />
                <Content hasFooter={false} hasSubHeader={false}  >

                    <Feedback />

                </Content>
            </div>
        )
    }
}

export default  FeedbackPage