import React,{Component} from "react"

require("../../../asset/css/productseller.css");

export default class ProductSeller extends Component{
	render(){
		var sellerCollections = this.props.data.map((item)=>{
			return (
				<SellerCollection {...item} />
			)
		});
		return (
			<div className="productSellerPanel">
				{sellerCollections}
			</div>
		)
	}
}

class SellerCollection extends Component{
	render(){
		let linkAddress = typeof this.props.cover.linkAddress === "undefined" ? "javascript:void(0)":this.props.cover.linkAddress;
		let sellers = this.props.sellers.map((seller)=>{
			return (
				<div className="sellerWrapper">
					<div className="avatarWrapper">
						<img src={seller.picture} width="100%" height="100%" />
					</div>
					<div className="nameAndDescriptionWrapper">
						<div className="name">{seller.name}</div>
						<div className="description">{seller.description}</div>
					</div>
				</div>
			)
		});

		return (
			<div className="sellerCollectionWrapper">
				<a className="collectionCoverWrapper" href={linkAddress}>
					<img src={this.props.cover.picture} />
				</a>
				<div className="sellersWrapper">
					{sellers}
				</div>
			</div>
		)
	}
}