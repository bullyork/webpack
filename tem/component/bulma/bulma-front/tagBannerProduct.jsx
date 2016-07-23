import React,{Component} from "react"
import TagSelectorPanel from "./common/tagSelectorPanel.jsx"
import NormalProductItem from "./common/normalProductItem.jsx"
import TagName from "./common/tagName.jsx"
import MultiPanelWrapper from "./common/multiPanelWrapper.jsx"

require("../../../asset/css/tagbannerproduct.css");

export default class TagBannerProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectTag:null
		}
	}

	render(){
		return (
			<div className="tagBannerProductPanel">
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

	isPanelActive(item){
		return this.state.selectTag === item.tag;
	}

	renderProductPanel(item,displayStyle){
		let linkAddress = item.banner.linkAddress === "" ? "javascript:void(0)" : item.linkAddress;	
		let products = item.products.map((product)=>{
			return (
				<NormalProductItem {...product} />
			)
		})

		return (
			<div className="bannerAndProductsPanel" style={displayStyle}>
				<a className="banner" href={linkAddress} target="_blank">
					<img src={item.banner.picture} />
				</a>
				<div className="productItemsWrapper">{products}</div>
			</div>
		)
	}
}
