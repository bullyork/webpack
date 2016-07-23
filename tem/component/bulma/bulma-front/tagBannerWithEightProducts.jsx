import React,{Component} from "react"
import TagSelectorPanel from "./common/tagSelectorPanel.jsx"
import NormalProductItem from "./common/normalProductItem.jsx"
import TagName from "./common/tagName.jsx"
import MultiPanelWrapper from "./common/multiPanelWrapper.jsx"

require("../../../asset/css/tagBannerWithEightProductsPerGroup.css");

export default class TagBannerWithEightProductsPerGroup extends Component{
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
		return (
			<div style={displayStyle}>
				{item.data.map((oneDataGroup)=>{
					return <TagBannerWithEightProductsOneRow {...oneDataGroup} />
				})}
			</div>
		)
	}
}


class TagBannerWithEightProductsOneRow extends Component{
	render(){
		let {banner} = this.props;
		let linkAddress = banner.linkAddress === "" ? "javascript:void(0)" : banner.linkAddress;	

		return (
			<div className="bannerAndProductsPanel">
				<a className="bannerWrapper" href={linkAddress} target="_blank">
					<img src={banner.picture} />
				</a>
				<div className="productItemsWrapper">
					{this.props.products.map((product)=>{
						return (
							<NormalProductItem {...product} />
						)
					})}
				</div>
			</div>
		)
	}
}