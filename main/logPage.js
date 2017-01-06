/**
 * Created by Administrator on 2017/1/6.
 */
import {Header,Footer,Content,SubHeader} from  "../components/common"
import ProductList from "../components/product-list"
import {ScrollOptions} from "../config/config"
import React, {Component} from  "react"
import ReactIScroll from "react-iscroll"
import '../css/list.css'
import {Action} from '../tools/tools'
/*import iScroll from "iscroll/build/iscroll-probe"

 console.log(iScroll);*/
console.log(ScrollOptions)

/*var myScroll = new IScroll("#wrap",{
 probeType:2,
 scrollBar:true
 });*/





/*商品页面的顶层组件*/
class LogPage extends Component {
    constructor(props){
        super(props) ;//让react 的Component 帮你实现组件的方法
        this.state= {
            productData:[],
            title : '浏览历史'
        };
        //改变this的指向
        this.onScrollEnd = this.onScrollEnd.bind(this)

    }
    changeClassID(id){
        //console.log(id);
        // console.log(this)
        this.classID = id;
        this.pageCode = 0; //重置页面

        //滚动条回到顶部
    }
   
    onScrollEnd(myScroll){
        //myScroll 是ReactIScroll 提供的操作滚动条的对象
        console.log("end");
        if(this.refresh){
            
        }else if(myScroll.y-myScroll.maxScrollY<=20){//需要当 前的滚动位置 和 最大的滚动数值(加载更多)
           
        }
    }
    onScroll(myScroll){
        console.log("scroll");
        if(myScroll.y>60){
           
        }
    }
    clearUserlog(){
        Action.clearLog()
        this.setState({
            productData: []
        })
    }
    render() {
        console.log("render");
        return (
            <div className="page" id="list-page">
                <Header title={this.state.title} hasBack={true} rightBtn={<a onClick={()=>this.clearUserlog()}>清空</a>}  />
                <Content hasFooter={false} hasSubHeader={false}  >

                    <ReactIScroll iScroll={IScroll}
                                  options={ScrollOptions}
                                  onScroll={(myScroll)=>this.onScroll(myScroll)}
                                  onScrollEnd={this.onScrollEnd}>
                        <ProductList productData={this.state.productData} />
                    </ReactIScroll>

                </Content>
                
            </div>
        )
    }
    componentDidMount(){
        console.log(Action.userWatchLog())
        this.setState({
            productData: Action.userWatchLog()
        })
        console.log(location.hash)
        var hash = location.hash
        if(hash == '#/collect'){
            this.setState({
                title : '我的收藏'
            })
        }else{
            this.setState({
                title : '浏览历史'
            })
        }
    }
}




export default  LogPage


