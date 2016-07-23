import React,{Component} from "react"

require("../../../asset/css/bannerFourPerGroup.css");
export default class ProductsFourPerGroupMobileComponent extends Component{
	render(){
		let banners = this.props.banners;
		let productBanner = banners.map((item)=>{
			let linkAddress = item.linkAddress === ""? "javascript:void(0)" : item.linkAddress;
			return (
				<div className="ProductsFourPerGroupBanner">
					<a href={linkAddress}>
						<img src={item.picture} />
					</a>
					<div className="name">
						<div className="name-detail1">{item.name1}</div>
						<div className="name-detail2">{item.name2}</div>
					</div>
				</div>
				)
		})
		return (
			<div className="ProductsFourPerGroup">
				{productBanner}
			</div>
		)
	}
}

