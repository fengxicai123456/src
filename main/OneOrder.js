import {Header,Footer,Content,SubHeader} from  "../components/common"
import {ScrollOptions} from "../config/config"
import React, {Component} from  "react"
import ReactIScroll from "react-iscroll"
import "../css/oneorder.css"

/*二级列表数据*/
var dataOneOrder=["全部","待付款","待发货","待收货","待评价"]
/*二级列表标签div*/
class SubList extends Component {
    constructor (props){
        super(props)
    }
    render () {
        return (
            <div className="sub-list">{this.props.children}</div>
        )
    }

}
/*二级列表标签ul*/
class SubUl extends Component　{
	 constructor(props){
        super(props)
    	this.state = {
    		active : 0
    	}
	 }
	 handleClick(i){
        console.log(i);
    	this.setState({
    		active : i
    	})
     
    }
	 render (){
	 	//alert(dataOneOrder)
        return (
            <ul className="class-SubUl">
                {
                    dataOneOrder.map((ele,i)=><li onClick={()=>this.handleClick(i)} className={this.state.active == i ? 'active' : ''} key={i}>{ele}</li>)
                }
            </ul>
        )
    }
}
SubUl.defaultProps={
    classData:[]
};
/*商品栏*/
class OrderList extends Component{
constructor(props){
	super(props);
	
}

	render (){
		console.log(11111111)
		return(
			<ul className="order">
			{
                     this.props.productData.map((ele,i)=><li key={i}>
                         <div className="proimg">
                         <div className="oimg">
                         <img src={ele.goodsListImg}/>
                         </div>
                         <p><span className="left">{ele.goodsName}</span><span className="right"><span className="price">{('￥'+ele.price)}</span>{("*"+ele.number)}</span></p>
                         </div>	
                         <div className="procount"><span className="count">商品实付:<i>￥{(ele.price*1+ele.number*1)}</i></span><span className="count" >共<i>{(ele.number)}</i>件 </span></div>
                             <div className="propay"><span>待付款</span><div><input type="button" id="inp1" value="立即付款"/><input type="button" id="inp2" value="取消订单"/></div></div>
                         
                     </li>)
                 }
			</ul>
		)
		
	}
	
}
/*商品页面的顶层组件*/
class OneOrder extends Component {
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
                <Header title="我的订单" hasSearch={true} rightBtn={" "} hasBack={false}/>           
                <SubList>
                 <SubUl changeClassID={(id)=>this.changeClassID(id)}  />
                </SubList>
               <Content hasFooter={false} hasSubHeader={true}>              
                    <OrderList productData={this.state.productData}/>                     
                </Content>              
            </div>
        )
    }
}
OneOrder.defaultProps= {
    listData:[]
};
export default  OneOrder