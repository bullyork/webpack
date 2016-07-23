import React,{Component} from "react"
import ProductItem from "./common/productItemWithFavoriteAndReviewNumber.jsx"

require("../../../asset/css/bannerWithFourProducts.css");

class BannerWithFourProducts extends Component{
	render(){
		return (
			<div className="bannerWithFourProductsPanel">
				{this.props.data.map((oneBannerAndProducts)=>{
					return <BannerWithFourProductsOneRow {...oneBannerAndProducts} />
				})}
			</div>
		)
	}
}

class BannerWithFourProductsOneRow extends Component{
	render(){
		return (
			<div className="bannerWithFourProductsRowWrapper">
				{this.renderBanner()}
				{this.renderProducts()}
			</div>
		)
	}

	renderBanner(){
		let linkAddress = this.props.banner.linkAddress === "" ? "javascript:void(0)" : this.props.banner.linkAddress;

		return (
			<a className="bannerWrapper" target="_blank" href={linkAddress}>
				<img src={this.props.banner.picture} width="100%" />
			</a>
		)
	}

	renderProducts(){
		return (
			<div className="productsWrapper">
				{this.props.products.map((oneProduct)=>{
					return <ProductItem {...oneProduct} />
				})}
			</div>
		)
	}
}

export default BannerWithFourProducts;