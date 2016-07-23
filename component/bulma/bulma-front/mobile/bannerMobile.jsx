import React,{Component} from "react"



export default class Banner extends Component{
	render(){
		let linkAddress = this.props.linkAddress === ""? "javascript:void(0)" : this.props.linkAddress;
		return (
			<div style={{paddingBottom:"0.08rem"}}>
				<a href={linkAddress} style={{display:"block",lineHeight:"0px"}}>
					<img src={this.props.picture} style={{width:"100%",height:"1.8rem"}}/>
				</a>
			</div>
		)
	}
}

