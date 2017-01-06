/**
 * Created by hasee on 2017/1/3.
 */
import React, {Component} from  "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory} from "react-router"
import IndexPage from "./main/indexPage"
import ListPage from "./main/listPage"
import DetailPage from "./main/detailPage"
import LoginPage from './main/loginPage'
import MyXiuPage from './main/myXiuPage'
import registerPage from './main/register'
import MorePage from './main/morePage'
import ChangePwdPage from './main/changePwdPage'
import FeedbackPage from './main/feedbackPage'
import Hyk from'./main/cs-hyk'
ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail(:goodsID)" component={DetailPage} />
    <Route path="detail" component={DetailPage} />
    <Route path="myXiu" component={MyXiuPage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={registerPage} />
    <Route path="more" component={MorePage} />
    <Route path="changePwd" component={ChangePwdPage} />
    <Route path="feedback" component={FeedbackPage} />
    <Route path="hyk" component={Hyk} />
</Router>,document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}