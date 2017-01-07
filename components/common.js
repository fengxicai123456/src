/**
 * Created by hasee on 2016/12/29.
 */

import "../css/common.css"
import React,{Component} from "react"
//import 'http://at.alicdn.com/t/font_2h3snnwm1zcl3di.css'



class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {

        return <div className="header">
            <ul className="header-list">
                <li className="header-btn">
                    {this.props.hasBack?<a onClick={()=>history.back()} href={()=>window.history.go(-1)}>{"<"}</a>:""}

                </li>
                <li className="header-tit">{this.props.title}</li>
                <li className="header-btn">
                    {this.props.rightBtn||(this.props.hasSearch?<a>搜索</a>:"")}
                </li>
            </ul>
        </div>
    }
}

Header.defaultProps={
    hasBack:true
};


class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return <footer className="footer">
            {
                this.props.footerData.map((ele,i)=>
                    <p onClick={()=>location.hash= ele.hash } className={"footer-list " + (this.props.active == i? 'active':'')}  key={i}><i className={'icon iconfont ' + ele.icon}></i><b className="footlist-name">{ele.title}</b></p>
                )
            }

        </footer>
    }
}
Footer.defaultProps={
    footerData:[{icon : 'icon-shouye-copy' , title : '首页' , hash : '/'},
                {icon : 'icon-fenlei' , title : '分类' , hash : 'list'},
                {icon : 'icon-gouwuche1' , title : '购物车' , hash : 'car'},
                {icon : 'icon-wode5' , title : '我的秀' , hash : 'myXiu'},
                {icon : 'icon-gengduo' , title : '更多' , hash : 'more'}
                ]
};
/*





<footer class="childPage">  // <a className={i==this.props.active?"active":""}>{ele}</a>
    <p class="footer-list"><i class="iconfont icon-shouyeshouye"></i><b class="footlist-name">首页</b></p>
    <p class="footer-list"><i class="iconfont icon-wefill"></i><b class="footlist-name">分类</b></p>
    <p class="footer-list"><i class="iconfont icon-cart"></i><b class="footlist-name">购物车</b></p>
    <p class="footer-list active"><i class="iconfont icon-peoplelist"></i><b class="footlist-name">我的秀</b></p>
    <p class="footer-list"><i class="iconfont icon-faxian2-copy"></i><b class="footlist-name">更多</b></p>
</footer>

*/


class Content extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let contentStyle = {
            "overflowY":this.props.hasIScroll?"hidden":"auto"
        };
        let contentClass = "content"
            +(this.props.hasFooter?" has-footer":"")
            +(this.props.hasSubHeader?" has-sub-header":"");

        //this.props.hasIScroll  如果需要iscroll就必须引入iscroll的结构

        return <div className={contentClass} style={contentStyle}>
            {this.props.hasIScroll?
                <div className="scroll-wrap" ref="scrollWrap">
                    <div className="scroller">
                        {this.props.children}
                    </div>
                </div>:this.props.children}
        </div>
    }
    componentDidMount() {

        //react-iscroll 插件

        //组件渲染完成以后，获取scroll-wrap，创建iscroll
        //如果需要iscroll再创建
        this.props.hasIScroll && (this.myScroll = new IScroll(this.refs.scrollWrap))
        //console.log(this.refs.scrollWrap)
       // console.log(this.myScroll)

    }
    componentDidUpdate() {
        //组件更新的时候，也更新iscroll
        this.props.hasIScroll && this.myScroll.refresh()
    }
}



class SubHeader extends Component {
    constructor (props){
        super(props)
    }
    render () {
        return (
            <div className="sub-header">{this.props.children}</div>
        )
    }

}




export { Header,Footer,Content,SubHeader}