import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"




class ClassList extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div>
                详情页面
            </div>
        )
    }
}
export  default  ClassList