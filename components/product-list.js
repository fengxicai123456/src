/**
 * Created by hasee on 2016/12/30.
 */

import React,{Component} from "react"

/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
     constructor(props){
         super(props)
     }
     render(){
         return (
             <ul className="product-list">
                 {
                     this.props.productData.map((ele,index)=>{
                         return (
                             <li className="pro-item" key={index}>
                                 <a href={'#/detail/'+ele.goodsID} className="pic"><img src={ele.goodsListImg} /></a>
                                 <p className="pro-name">{ele.goodsName}</p>
                                 <p className="price"><em>{ele.price}</em> <del>￥888</del></p>
                             </li>
                         )
                     })
                 }
             </ul>
         )
     }

}
// onClick={()=>{window.location.hash = ("detail/"+ ele.goodsID)}
ProductList.defaultProps={
    productData:[]
};


export default ProductList