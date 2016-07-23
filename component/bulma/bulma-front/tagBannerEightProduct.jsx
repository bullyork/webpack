import React,{Component} from "react"
import TagSelectorPanel from "./common/tagSelectorPanel.jsx"
import NormalProductItem from "./common/normalProductItem.jsx"

require("../../../asset/css/tagbannereightproduct.css");

export default class TagBannerProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectTag:null
		}
	}

	render(){
		return (
			<div className="tagBannerEightProductPanel">
				<TagSelectorPanel tags={this.getTags()} onChange={(tag)=>this.setState({selectTag:tag})} />
				{this.renderBannerAndProductsPanels()}
			</div>
		)
	}

	getTags(){
		return this.props.data.map((item)=>{
			return item.tag;
		})
	}

	renderBannerAndProductsPanels(){
		let bannerAndProductsPanels = this.props.data.map((item)=>{
			let displayStyle = {
				display:"none"
			};
			if(this.state.selectTag === item.tag){
				displayStyle.display = "block";
			}
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
		})
		return (
			<div className="bannerAndProductsPanelWrapper">
				{bannerAndProductsPanels}
			</div>
		)
	}
}
