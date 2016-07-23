import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import {addSection,setPlatform} from "./../../action/bulma.js"
import {getMockupDataByType} from "./mockupdata.js"

let componentKeys = [
	"Banner",
	"CountDownClock",
	"TagsOnProducts",
	"BannerProduct",
	"ProductsFourPerGroup",
	"BannerWithFourProducts",
	"TagBannerWithEightProducts",
	"Register",
	"BannerFourPerGroup",
	"LoginDialog",
	"Introduce"
];
let componentKeysMobile = [
	"BannerMobile",
	"ProductCommon",
	"TagsOnProductsMobile",
	"FullPageWidthMobile",
	"RegisterMobile",
	"HeaderMobile",
	"FooterMobile",
	"ProductsFourPerGroupMobile",
	"QuickGuildMobile",
	"SmallBannerMobile"
];

class ComponentsList extends Component{
	render(){
		let components = componentKeys.map((key,index)=>{
			return <ComponentItem index={index+1} sectionKey={key} />
		});
		if(this.props.platform === "Mobile"){
			components = componentKeysMobile.map((key,index)=>{
				return <ComponentItem index={index+1} sectionKey={key} platform={this.props.platform} />
			});
		}
		return (
			<div>
				<div className="title">MODULE</div>
				<div className="componentItemWrapper" onClick={this.changePlatForm.bind(this)}>{this.props.platform}</div>
				{components}
			</div>
		)
	}
	changePlatForm(){
		if(this.props.platform === "Mobile"){
			bulmaStore.dispatch(setPlatform("PC"));
		}else if(this.props.platform === "PC"){
			bulmaStore.dispatch(setPlatform("Mobile"));
		}
	}
}

class ComponentItem extends Component{
	render(){
		return (
			<div onClick={()=>{bulmaStore.dispatch(addSection(getMockupDataByType(this.props.sectionKey,this.props.platform)))}} className="componentItemWrapper">
				<div className="name">{this.props.index}.{this.props.sectionKey}</div>
				<div className="previewWrapper">
					<img src={`dist/images/${this.props.sectionKey}.png`} width="100%" />
				</div>
			</div>
		)
	}
}


export default ComponentsList