import {Header,Footer,Content,SubHeader} from  "../components/common"
import {ScrollOptions} from "../config/config"
import React, {Component} from  "react"
import ReactIScroll from "react-iscroll"
import "../css/twoorder.css"

/*二级列表数据*/
var dataTowOrder=["全部","待付款","待发货","待收货","待评价"]
/*标签div*/
class User extends Component {
    constructor (props){
        super(props)
       
    }
    render () {
        return (
            <div className="user-name">
            <div className="box">
            <p className="massage">
            <span className="name">{"冯希才"}</span>
            <span className="icon iconfont icon-fenlei dianhua"></span><span className="phone">{"电话:"+1384381438}</span>
            </p>
            <p className="address"><span>{"地址:琉球岛"}</span></p>
            </div>
            </div>
        )
    }

}
/*尾*/
class Balance extends Component {
    constructor (props){
        super(props)
         this.state = {
        	checked : true
        }
    }
    render () {
    	console.log(this.state.checked)
    	//onChange={()=>{this.setState({checked:true})}}
        return (
            <div className="balance">
            <div className="remark">
            <div><span className="left1">运费:</span><span className="right1">￥0</span></div>
            <div><span className="left2">实付款(含运费):</span ><span className="right2">0.04</span></div>
            <textarea placeholder="信息备注">
            </textarea>
            </div>
            <div className="ticket">
	            <span className="ticketleft"><i className="icon iconfont icon-fenlei"></i>是否使用发票</span>
	            <section title=".slideOne">
		        <div className="slideOne">
			    <input type="checkbox" value="None" id="slideOne" name="check"  onChange={()=>{this.setState({checked:!this.state.checked})}} checked={this.state.checked?'checked':''}/>
			    <label htmlFor="slideOne"></label>
			    </div>
			    </section>
            </div>
            <div className="balance-count">
            <span className="balanceleft">共<span className="balancenumber">4</span>件,总金额<span className="balancenumber">￥0.0.4</span></span>
            <input type="button" value="提交订单"/>
            </div>
            </div>
        )
    }
}
/*商品栏*/
class TwoOrderList extends Component{
constructor(props){
	super(props);
	
}
	render (){
		console.log(11111111)
		return(
			
			<ul className="ordertwo">
			{
                     this.props.productData.map((ele,i)=><li key={i}>
                         <div className="proimg">
                         <div className="oimg">
                         <img src={ele.goodsListImg}/>
                         </div>
                         <p><span className="left">{ele.goodsName}</span><span className="right"><span className="price">{('￥'+ele.price)}</span>{("*"+ele.number)}</span></p>
                         </div>	
                   
                         
                     </li>)
                 }
			</ul>
		)
		
	}
	
}
/*商品页面的顶层组件*/
class TwoOrder extends Component {
    constructor(props){
        super(props) ;//让react 的Component 帮你实现组件的方法
        this.state= {
            
            productData:[],
        };
       
        //设置默认的数据请求选
        this.classID = 1;
        this.linenumber = 5;
        this.pageCode = 0;
        this.refresh = false;
        this.refresh = true;
      /*this.setState({
                 productData:data
            })*/
        //请求商品数据
          this.getProductData();
    }
    changeClassID(id){
        console.log(id);
        console.log(this)
        this.classID = id;
        //滚动条回到顶部
        
    }
      getProductData(){
        $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?userID=fengxicai&callback=?",{
        	"classID":this.classID,
            "linenumber":this.linenumber,
            "pageCode":this.pageCode
        },(data)=>{
            //刷新需要覆盖之前的数据，加载需要和之前的数据合并
            if(data){
                this.setState({
                    productData:this.pageCode==0?data:this.state.productData.concat(data)
                });
                //如果this.pageCode==0证明需要刷新，覆盖之前的数据，否则和之前的数据合并
            }
        })
    }
    render() {
        console.log("render");
        return (
            <div className="page" id="list-page">
                <Header title="确认订单" hasSearch={true} rightBtn={" "} hasBack={true}/>           
               <Content hasFooter={false} hasSubHeader={false}> 
                   < User/>
                    <TwoOrderList productData={this.state.productData}/>                     
                   <Balance/>
               </Content>
            </div>
        )
    }
}
TwoOrder.defaultProps= {
    listData:[]
};
export default  TwoOrder