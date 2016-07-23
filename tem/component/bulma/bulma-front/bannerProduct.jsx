import React,{Component} from "react"
import SwipePanel from "./common/swipepanel.jsx"
import ProductItem from "./common/productItemWithFavoriteAndReviewNumber.jsx"

require("../../../asset/css/bannerproduct.css");

export default class BannerProduct extends Component{
	render(){
		return (
			<div className="bannerProductsWrapper">
				{this.props.data.map((bannerWithProduct)=>{
					return <BannerProductOneRow {...bannerWithProduct} />
				})}
			</div>
		)
	}
}

class BannerProductOneRow extends Component{
	render(){
		return (
			<div className="bannerProductPanel">
				{this.renderBanner()}
				<ProductSwipePanel products={this.props.products} />
			</div>
		)
	}

	renderBanner(){
		let linkAddress = this.props.banner.linkAddress === "" ? "javascript:void(0)" : this.props.banner.linkAddress;

		return (
			<a  className="bannerWrapper" target="_blank" href={linkAddress}>
				<img src={this.props.banner.picture} width="100%" />
			</a>
		)
	}
}

class ProductSwipePanel extends Component{
	render(){
		return (
			<div className="productSwipePanel">
				<SwipePanel 
					ref="productsSwipe" 
					showData={this.props.products} 
					isAutoSwipe={true} numberOfPerGroup={3} 
					renderView={this.renderViewFunction} size={this.getSize}
					isReloadOnWindowResize={false} />
				<div className="prevButton" onClick={this._onPrevAndNextChangeHandler.bind(this,"prev")}><i className="icon-arrow_left"></i></div>
				<div className="nextButton" onClick={this._onPrevAndNextChangeHandler.bind(this,"next")}><i className="icon-arrow_right"></i></div>
			</div>
		)	
	}

	getSize(){
		return 285*3-15;
	}

	renderViewFunction(dataForRender,isAnimation,style){
		if(typeof dataForRender !== "undefined"){
			let productsWipeContent = dataForRender.map((dataArray,idx)=>{
				let products = dataArray.map((product)=>{
					return (
						<ProductItem {...product} />
					)
				});

				return (
					<div className="productsWrapper">
						{products}
					</div>
				)
			});
			let animationClass = isAnimation ? "_banner-animation":"";
			return (
				<div style={style.container} className={"productsSwipeWrapper "+animationClass}>
					{productsWipeContent}
				</div>
			);
		}
		return null;
	}


	_onPrevAndNextChangeHandler(key){
		if(key === "prev"){
			this.refs.productsSwipe.prev();
		}else if(key === "next"){
			this.refs.productsSwipe.next();
		}
	}
}
