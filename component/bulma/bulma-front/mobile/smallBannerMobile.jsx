import React,{Component} from "react"

require("../../../../asset/css/mobile/smallBannerMobile.css");
export default class SmallBannerMobile extends Component{
	render(){
		let linkAddress = this.props.linkAddress;
		let anchorHref = linkAddress.map((linkAddressItem)=>{
			return(
				<a href={linkAddressItem} className="anchorHref" />	
				)
		})
		return (
			<div className="smallBannerMobile">
				<div className="_container">
				{anchorHref}
				</div>
			</div>
		)
	}
}

