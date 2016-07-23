import React,{Component} from "react"

require("../../../asset/css/banner.css");

export default class Banner extends Component{
	render(){
		let linkAddress = this.props.linkAddress === ""? "javascript:void(0)" : this.props.linkAddress;
		return (
			<div className="bannerHeight320Wrapper">
				<a href={linkAddress}>
					<img src={this.props.picture} />
				</a>
			</div>
		)
	}
}