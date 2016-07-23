import React,{Component} from "react"
import {priceWithSymbol} from "./../helpers/price.js";
import LazyLoad from "./../common/lazyLoad.js";
import URLMaker from "./../helpers/urlmake.js";

require("../../../../asset/css/mobile/productCommon.css");
export default class ProductCommon extends Component{
	render(){
        var itemStyle,nameDiv;
        var pruductList = this.props.products.map(function(item,i){
            if(i%2 === 1){
                itemStyle = "ProductItemRight";
            }else {
                itemStyle = "ProductItemLeft";
            }
     
            if(item.name === ""){
            	nameDiv = "";
            }else {
            	nameDiv = (<div className="productname">{item.name}</div>)
            }
            return (
                <div className={itemStyle} onClick={this.toMobileWebDetail(item.linkAddress)}>
                    <div className="imgdiv">
                        <img className="productImg" data-orms="imglazy" data-original={item.picture} />
                    </div>
                    <div className="presentprice">
                    	{nameDiv}
                    	<div className="productPrice">{priceWithSymbol(item.price)}</div>
                    </div>
                </div>
                )
        },this)
        return (
            <div className="productCommonBanner">{pruductList}</div>
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