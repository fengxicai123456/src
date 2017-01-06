import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"
import {Router,Route,hashHistory} from "react-router"
import '../css/detail.css'
import {Action} from '../tools/tools'

class GoodsDetail extends Component {
    constructor(props){
        super(props)
        //需要的数据
        this.state={
            bannerList:[],
            goodsName:"",
            price:"",
            number:"",
            goodsID:1,
            loading: false
        };
        console.log(location.href.split('/'))
        var goodsId =  location.href.split('/')
       // console.log(location.search)
         console.log(this.props.params)
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
            goodsID: goodsId[goodsId.length-1]
        },(data)=>{
 
            //如果有数据的话
            if(data){
               // console.log(data);
                this.setState({
                    bannerList:JSON.parse(data[0].imgsUrl),
                    goodsName:data[0].goodsName,
                    goodsID:data[0].goodsID,
                    price : data[0].price
                })
                //存储历史记录
                var goodsData = {
                                    "goodsID"  : data[0].goodsID ,
                                    "goodsName" : data[0].goodsName,
                                    "goodsListImg" : data[0].goodsListImg,
                                    "price" : data[0].price
                                }
                //console.log(goodsData)
                var userLog = localStorage.getItem('userLog')
                if(userLog){
                    //console.log(userLog)
                    var hasUserLogArr = JSON.parse(userLog)
                    console.log(hasUserLogArr)
                    for(var i in hasUserLogArr){
                        //检测是否已经有该数据
                        if(hasUserLogArr[i].goodsID == data[0].goodsID){
                            hasUserLogArr.splice(i,1)
                        }
                    }
                    hasUserLogArr.unshift(goodsData)
                    //var newSetUserLog = new Set(hasUserLogArr)
                    //var newSetUserLog = Array.from(newSetUserLog)
                    localStorage.setItem('userLog',JSON.stringify(hasUserLogArr))
                    console.log(hasUserLogArr)
                }else{
                    var pidData = []
                    pidData.unshift(goodsData)
                    console.log(pidData)
                    localStorage.setItem('userLog',JSON.stringify(pidData) )
                }
            }

        })
    }
    addCart(){
        this.setState({
            loading : true
        })
        setTimeout(()=>{
            this.setState({
                loading : false
            })
        },3000)
        console.log(Action.userName())
        let userName = Action.userName()
        let number = 1;
        let goodsID = this.state.goodsID
        $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID : userName},function(data){
            for(var i in data){
                if(data[i].goodsID == goodsID){
                    number = +data[i].number + 1
                    break;
                }
            }

            let sendData = {"userID":userName,"goodsID":goodsID,"number":number};
            $.get("http://datainfo.duapp.com/shopdata/updatecar.php",sendData,function (data) {
                console.log(data)
            },"json")
          //  console.log(data)
        })

    }
    render(){
        var loadingStyle = {'display': this.state.loading ? 'block' : 'none'}
        return (
            <div className="goodsDetail">
                <div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
                    <div className="swiper-wrapper">
                        {
                            this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
                                <img src={ele} />
                            </div>)
                        }
                    </div>
                </div>
                <div className="swiper-self-pagination">
                    <p  ref="pagination"></p>
                </div>
                <div className="text-info">
                    <div className="p-name">{this.state.goodsName}</div>
                    <div className="p-price">￥{this.state.price}</div>
                    <div className="p-number">购买人数：666</div>


                    <div style={{textAlign:'center'}}>----------商品详情----------</div>
                </div>
                <div className="goodsBigImg">
                    {
                        this.state.bannerList.map((ele,i)=>
                            <img style={{width:"100%"}} src={ele}  key={i} />
                        )
                    }
                </div>
                <div className="text-info" style={{'display': (window.onLoad = function(){return true} ?'block':'none') }}>
                    <div style={{textAlign:'center'}}>----------买家评论----------</div>
                    <p>大黄： 衣服质量很棒，穿上萌萌哒</p>
                    <p>小明： 我穿xxxxl号正好</p>
                    <p>希才： 楼上变态两只，鉴定完毕</p>
                </div>
                <div className="cartLoading" style={loadingStyle}>
                    <img src="img/detail/gwcloading.gif" alt=""/>
                    <p>正在加入购物车。。。</p>
                </div>
                <div><button onClick={()=>this.addCart()} className="add-cart">添加到购物车</button></div>
            </div>
        )
    }
    componentDidMount(){
        var goodsId =  location.href.split('/')
        var pid = goodsId[goodsId.length-1]


    }
    componentDidUpdate(){
        //让swiper更新
        this.swiper = new Swiper(this.refs["swiper-container"],{
            pagination:  this.refs.pagination,
            slidesPerView: '3',
            loop:true
        })
        this.swiper.update();
       // this.swiper.reLoop();
        /*更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。
         可选参数：updateTranslate，默认false，设置为true则重新计算Wrapper的位移。*/
        //this.swiper.update()*/
        /*reLoop重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，这个方法是mySwiper.destroyLoop()和 mySwiper.createLoop()的结合体。*/
    }
}





class DeatailPage extends Component　{
    constructor(props){
        super(props)
        console.log(this.props.params.goodsID)
        this.state = {
            goodsID : this.props.params.goodsID
        }
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div className="page" id="list-page">
                <Header title="商品详情" hasBack={true}  rightBtn={<a className="iconfont icon-gouwuche1"></a>}   />
                <Content hasFooter={true} hasSubHeader={false}  >

                    <GoodsDetail />

                </Content>

            </div>
        )
    }
}
export  default  DeatailPage