import React,{Component} from "react"
import {priceWithSymbol} from "./../helpers/price.js"


export default class ProductItemWithFavoriteAndReviewNumber extends Component {
	render(){
		let linkProps = {
			href:this.props.linkAddress,
			target:"_blank",
		}
		return (
			<div className="productItemWrapper">
				<a className="imgWrapper" {...linkProps}>
					<img src={this.props.picture} width="100%" />
				</a>
				<div className="productInfoWrapper">
					<div className="productInfo">
						<a className="name" {...linkProps}>
							<nobr>{this.props.name}</nobr>
						</a>
						<div className="priceAndNumbers">
							{this.renderPrice()}
							{this.renderFavoritesAndReviews()}
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderPrice(){
		if(this.props.price > 0){
			return (
				<div className="price">
					{this.renderRealPrice()}
					{this.renderOriginPrice()}
				</div>
			)
		}
		return null
	}

	renderRealPrice(){
		if(this.props.price > 0){
			return (
				<span className="real">{priceWithSymbol(this.props.price)}</span>
			)
		}
	}

	renderOriginPrice(){
		if(typeof this.props.originPrice !== "undefined" && this.props.originPrice !== "" && parseFloat(this.props.originPrice) !== 0 ){
			return (<span className="origin">{priceWithSymbol(this.props.originPrice)}</span>)
		}
		return null
	}

	renderFavoritesAndReviews(){
		let numberAndIcons = [];

		if(this.props.favoriteCount > 0){
			numberAndIcons.push(<span className="favorites">{this.props.favoriteCount}</span>);
			numberAndIcons.push(<i className="icon-heart"></i>);
		}

		if(this.props.reviewCount > 0){
			numberAndIcons.push(<span className="reviews">{this.props.reviewCount}</span>);
			numberAndIcons.push(<i className="icon-comment"></i>);
		}

		return (
			<div className="numbers">
				{numberAndIcons}
			</div>
		)
	}
}