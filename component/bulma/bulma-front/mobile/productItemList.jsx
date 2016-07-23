import React,{Component} from "react"
import {formatPriceWithPoint} from "./../helpers/price.js"


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
							<span>{this.props.name}</span>
						</a>
						<div className="priceAndNumbers">
							{this.renderPrice()}
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
				<span className="real">S$ {formatPriceWithPoint(this.props.price,2)}</span>
			)
		}
	}

	renderOriginPrice(){
		if(typeof this.props.originPrice !== "undefined" && this.props.originPrice !== "" && parseFloat(this.props.originPrice) !== 0 ){
			return (<span className="origin">S$ {this.props.originPrice}</span>)
		}
		return null
	}
}