import LazyLoad from "./../common/lazyLoad.js";
import React,{Component} from "react"
import {priceWithSymbol} from "./../helpers/price.js"


require("../../../../asset/css/mobile/fullPageWidthMobile.css");
export default class fullPageWidthMobile extends Component{
	renderItem(){
		var Item = this.props.products.map((item)=>{
			return (
				<div className="fullPageItem" onClick={this.toMobileWebDetail(item.linkAddress)}>
					<a href={item.linkAddress}>
						<div className="itemLeft">
							<img className="productImg" data-orms="imglazy" data-original={item.picture} />
						</div>
						<div className="itemRight">
							<p className="fullPageName">{item.name}</p>
							<p className="fullPageNamePrice">{priceWithSymbol(item.price)}</p>
						</div>
					</a>
				</div>
				)
		},this)
		return Item;
	}

	render(){
		return (
			<div className="fullPageWidthMobile">{this.renderItem()}</div>
		)
	}
	componentDidMount(){
        LazyLoad.init("productImg");
    }
	toMobileWebDetail(url){
        return function(){
            window.open(URLMaker.product.detail("http://m.ezbuy.sg/",url));
        }
    }
}

