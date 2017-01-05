import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"
import "../css/indexPage.css"


class Index_incon extends Component{
	constructor(props){
		super(props)	
	}
	render(){
		return(
			<ul className="iconf-list-index">
				<li><em className="iconfont" style={{color:"#f12954"}}>&#xe646;</em><p><a href="###">京东超市</a></p></li>
				<li><em className="iconfont" style={{color:"#972bcf"}}>&#xe603;</em><p><a href="###">全球购</a></p></li>
				<li><em className="iconfont" style={{color:"#f5357e"}}>&#xe62e;</em><p><a href="###">服装城</a></p></li>
				<li><em className="iconfont" style={{color:"#43c93d"}}>&#xe655;</em><p><a href="###">京东生鲜</a></p></li>
				<li><em className="iconfont" style={{color:"#17b64f"}}>&#xe63e;</em><p><a href="###">京东到家</a></p></li>
				<li><em className="iconfont" style={{color:"#00a0e8"}}>&#xe61e;</em><p><a href="###">充值中心</a></p></li>
				<li><em className="iconfont" style={{color:"#ee3a02"}}>&#xe616;</em><p><a href="###">惠赚钱</a></p></li>
				<li><em className="iconfont" style={{color:"#ffb21a"}}>&#xe618;</em><p><a href="###">领劵</a></p></li>
				<li><em className="iconfont" style={{color:"#0aca98"}}>&#xe61a;</em><p><a href="###">物流查询</a></p></li>
				<li><em className="iconfont" style={{color:"#f15536"}}>&#xe63c;</em><p><a href="###">我的关注</a></p></li>
				<li className="index-banner"></li>
			</ul>
		)
	}
}

class ClassList extends Component　{
    constructor(props){
        super(props)
        this.state={
        	 	indexDatalist:[],
        	 	bannerList:[]
        	 }
      $.getJSON("http://datainfo.duapp.com/shopdata/getBanner.php?callback=?",(data)=>{
        	console.log(data)
       		this.setState({
       			indexDatalist:data,
       			bannerList:JSON.parse(data[1].goodsBenUrl)
       		})
       	
        	 
        })
      
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
    	console.log(this.state.bannerList)
    	
        return (
            <div className="page" id="detail-page">
               <Header title="首页" hasBack={false} />
               <Content hasFooter={true} hasSubHeader={false} >
				
					<div className="swiper-wrapper indexWapper" ref="swiper-container" style={{width:"100vw"}}>
						<div className="swiper-wrapper">
							{
								this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
						
									<img src={ele} />
								</div>)
							}
						</div>
					</div>
				
						
				
               		<Index_incon/>		
               </Content>
               
               <Footer></Footer>
            </div>
        )
    }
     componentDidMount(){
        this.swiper = new Swiper(this.refs["swiper-container"],{
            pagination:  this.refs.pagination,
            slidesPerView: '1',
            loop:true
        })
    }
         componentDidUpdate(){
        //让swiper更新
        this.swiper.update();
        this.swiper.reLoop();
        /*更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。
         可选参数：updateTranslate，默认false，设置为true则重新计算Wrapper的位移。*/
        //this.swiper.update()*/
        /*reLoop重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，这个方法是mySwiper.destroyLoop()和 mySwiper.createLoop()的结合体。*/
    }
}
export  default  ClassList