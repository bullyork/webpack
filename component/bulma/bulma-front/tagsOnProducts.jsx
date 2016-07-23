import React,{Component} from "react"
import {splitVerticalArray} from "./helpers/array.js"
import TagSelectorPanel from "./common/tagSelectorPanel.jsx"
import ProductItem from "./common/productItemWithFavoriteAndReviewNumber.jsx"
import MultiPanelWrapper from "./common/multiPanelWrapper.jsx"

require("../../../asset/css/tagsonproducts.css");

export default class TagsOnProducts extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectTag:null
		}
	}

	render(){
		return (
			<div className="tagsOnProductsPanel">
				<TagSelectorPanel tags={this.getTags()} onChange={(tag)=>this.setState({selectTag:tag})} />
				<MultiPanelWrapper renderPanel={this.renderProductPanel} isActive={this.isPanelActive.bind(this)} data={this.props.data} />
			</div>
		)
	}

	renderProductPanel(item,displayStyle){
		return (
			<div style={displayStyle}>
				<ProductsPanel products={item.products} />
			</div>
		)
	}

	getTags(){
		return this.props.data.map((item)=>{
			return item.tag;
		})
	}

	isPanelActive(item){
		return this.state.selectTag === item.tag;
	}
}

class ProductsPanel extends Component{
	render(){
		let productColums = splitVerticalArray(this.props.products,4).map((productArray)=>{
			let items = productArray.map((product)=>{
				return (
					<ProductItem {...product} />
				)
			})
			return (
				<div className="productsWrapper">
					{items}
				</div>
			)
		})
		return (
			<div className="productColumnsWrapper">
				{productColums}
			</div>
		)
	}
}