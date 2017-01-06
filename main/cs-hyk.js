import {Header,Footer,Content,SubHeader} from  "../components/common"
import "../css/cs-hyk.css"
import React, {Component} from  "react"



class Sublists extends Component{
	constructor(props){
		super(props)
	}
	fn(){
		console.log(1)
	}
	render(){ 
		var data = this.props.subData||[];
		console.log(data)
		return(
			<ul touchStart="fn()">
				{
					data.map((ele,i)=><li key={i} dataIndex={i}>
						{ele.className}
					</li>)
				}
			</ul>
		)
	}
}





class Hykindex extends Component{
	constructor(props){
		super(props)
		this.state={
				subList:[]
		};
		$.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{

			this.setState({
				subList:data
			})
			
		},"json")
	}
	
	render(){
		//console.log(this.state.subList)
		return(
			<div className="page" id="detail-page">
				<Header title="新品上市" hasSearch={false} rightBtn={<span className="iconfont" style={{fontSize:"30px"}}>&#xe62e;</span>} />
				<SubHeader>
					<Sublists  subData={this.state.subList} />
				</SubHeader>
				<Content hasFooter={true} hasSubHeader={true}></Content>
				<Footer/>
			</div>
		)
	}
}
export  default  Hykindex