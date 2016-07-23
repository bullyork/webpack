import React,{Component} from "react"
import {priceWithSymbol} from "./../helpers/price.js";
import TagSelectorPanel from "./tagSelectorPanel.jsx"
import LazyLoad from "./../common/lazyLoad.js";
import URLMaker from "./../helpers/urlmake.js";


require("../../../../asset/css/mobile/tagsonproducts.css");

export default class TagsOnProducts extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectTag:this.props.data[0].Tag,
		}
	}

	render(){
		return (
			<div className="tagsonproducts">
				<TagSelectorPanel tags={this.getTags()} onChange={(tag)=>this.setState({selectTag:tag})} />
				<ProductWaterfall data={this.props.data} tag={this.state.selectTag}/>
			</div>
		)
	}

	getTags(){
		return this.props.data.map((item)=>{
			return item.Tag;
		})
	}

	isPanelActive(item){
		return this.state.selectTag === item.Tag;
	}
}

class ProductWaterfall extends Component {
	constructor(props){
		super(props);
	}
	render(){
		let waterList = this.props.data.map((item)=>{
			if(item.Tag === this.props.tag){
				return item.products.map((item2,index)=>{
						return (
							<div className="productItem">
								<img className="tagsonproductsImg" data-orms="imglazy" data-original={item2.picture} onClick={this.toMobileWebDetail(item.linkAddress)} />
								<div className="tagsonproductsName">{item2.name}</div>
								<div className="tagsonproductPrice">{priceWithSymbol(item2.price)}</div>
							</div>
						)
				})
			}
		},this)
		return (
			<div className="tagsProducts">{waterList}</div>
			)
	}
	componentDidMount(){
        LazyLoad.init("tagsonproductsImg");
    }
    componentDidUpdate(){
    	LazyLoad.init("tagsonproductsImg");
    }
    toMobileWebDetail(url){
        return function(){
            window.open(URLMaker.product.detail("http://m.ezbuy.sg/",url));
        }
    }
}

