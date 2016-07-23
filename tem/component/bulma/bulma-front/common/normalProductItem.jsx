import React,{Component} from "react"
import {priceWithSymbol} from "./../helpers/price.js"

export default class NormalProductItem extends Component{
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
						<a className="name" {...linkProps}><nobr>{this.props.name}</nobr></a>
						<div className="priceAndNumbers">
							<div className="price">
								{this.renderPrice()}
								{this.renderOriginPrice()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderOriginPrice(){
		let {originPrice} = this.props;
		if(typeof originPrice !== "undefined" && originPrice !== "" && parseFloat(originPrice) !== 0 ){
			return (<span className="origin">{priceWithSymbol(originPrice)}</span>)
		}
		return null
	}

	renderPrice(){
		if(typeof this.props.price !== "undefined" && this.props.price !== "" && parseFloat(this.props.price) !== 0){
			return (<span className="real">{priceWithSymbol(this.props.price,2)}</span>)
		}
		return null;
	}
}