import React,{Component} from "react"

export default class MultiPanelWrapper extends Component{
	render(){
		return (
			<div className="multiPanelWrapper">
				{this.renderPanels()}
			</div>
		)
	}

	renderPanels(){
		return this.props.data.map((item)=>{
			let displayStyle = {
				display:"none"
			};
			if(this.props.isActive(item)){
				displayStyle.display = "block";
			}
			return this.props.renderPanel(item,displayStyle);
		})
	}
}