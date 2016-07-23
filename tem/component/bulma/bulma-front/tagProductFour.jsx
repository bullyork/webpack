import React,{Component} from "react"
import TagSelectorPanel from "./common/tagSelectorPanel.jsx"
import NormalProductItem from "./common/normalProductItem.jsx"
import TagName from "./common/tagName.jsx"
import ProductItem from "./common/productItemWithFavoriteAndReviewNumber.jsx"
import MultiPanelWrapper from "./common/multiPanelWrapper.jsx"

require("../../../asset/css/tagproductfour.css");

export default class TagBannerProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectTag:null
		}
	}

	render(){
		return (
			<div className="tagProductFour">
				<TagSelectorPanel tags={this.getTags()} onChange={(tag)=>this.setState({selectTag:tag})} />
				<TagName name={this.state.selectTag} />
				<MultiPanelWrapper renderPanel={this.renderProductPanel} isActive={this.isPanelActive.bind(this)} data={this.props.data} /> 
			</div>
		)
	}

	getTags(){
		return this.props.data.map((item)=>{
			return item.tag;
		})
	}

	renderProductPanel(item,displayStyle){
		let products = item.products.map((product)=>{
			return <ProductItem {...product} />
		});

		return (
			<div className="productsPanel" style={displayStyle}>
				{products}
			</div>
		)
	}

	isPanelActive(item){
		return this.state.selectTag === item.tag;
	}

}
