import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import Components,{BannerMobile,FullPageWidthMobile,ProductCommon,TagsOnProductsMobile,Register,HeaderMobile,FooterMobile,ProductsFourPerGroupMobile,QuickGuildMobile,SmallBannerMobile} from "./bulma-front/mobile"
import {moveUpSection,moveDownSection,removeSection} from "./../../action/bulma.js"
var Frame = require('react-frame-component');

class EditPagePanelMobile extends Component{

	render(){
		var styles = 'iframe{width:100%;height:667px}';
		return (
			<Frame head={<div><link type='text/css' rel='stylesheet' href='./dist/css/mobile/productCommon.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/tagsonproducts.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/fullPageWidthMobile.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/register.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/headerMobile.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/footerMobile.css' />

			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/quickGuild.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/productsFourPerGroupMobile.css' />
			<link type='text/css' rel='stylesheet' href='./dist/css/mobile/smallBannerMobile.css' />
			</div>} styles={styles}
  initialContent='<!DOCTYPE html><html style="font-size:50px"><body><div id="mountHere"></div></body></html>'
  mountTarget='#mountHere'>
  			<div className="editPageWrapper" style={{fontSize:"18px"}}>
				<div className="titleAndUrlWrapper">
					Page:{this.props.title}<br />
					Slug:{this.props.slug}
				</div>
				<div>
					{this.renderSections()}
				</div>
			</div>
</Frame>
		)
	}

	renderSections(){
		if(this.props.sections.length > 0){
			return this.props.sections.map((section,index)=>{
				return this.renderSectionMobile(section,index);
			})
		}
		return (
			<div className="emptyEditPanel">
				Click left modules to start.
			</div>
		)
	}
	componentDidMount(){
		$("iframe").width("100%");
		$("iframe").height(1000);
	}
	renderSectionMobile(section,index){
		let innerComponent = null;

		let sectionContent = {};
		try{
			sectionContent = JSON.parse(section.content);	
		}catch(e){
			sectionContent = {};
		}
		var sectionStyle;
		if(section.type === "BannerMobile"){
			sectionStyle = {position:"relative",width:"375px"};
			innerComponent = <BannerMobile {...sectionContent} />
		}else if(section.type === "ProductCommon"){
			sectionStyle = {position:"relative",width:"395px",height:"667px",overflowY:"auto"};
			innerComponent = <ProductCommon {...sectionContent} />
		}else if(section.type === "FullPageWidthMobile"){
			sectionStyle = {position:"relative",width:"375px",height:"667px",overflowY:"auto"};
			innerComponent = <FullPageWidthMobile {...sectionContent} />
		}else if(section.type === "TagsOnProductsMobile"){

			sectionStyle = {position:"relative",width:"375px",height:"667px",overflowY:"auto"};
			innerComponent = <TagsOnProductsMobile {...sectionContent} />
		}else if(section.type === "RegisterMobile") {
			sectionStyle = {position:"relative",width:"375px",height:"667px",overflowY:"auto"};
			innerComponent = <Register {...sectionContent} />
		}else if(section.type === "HeaderMobile") {
			sectionStyle = {position:"relative",width:"375px",overflowY:"auto"};
			innerComponent = <HeaderMobile {...sectionContent} />
		}else if(section.type === "FooterMobile") {
			sectionStyle = {position:"relative",width:"375px",overflowY:"auto"};
			innerComponent = <FooterMobile {...sectionContent} />
		}else if(section.type === "ProductsFourPerGroupMobile") {
			sectionStyle = {position:"relative",width:"375px",height:"667px",overflowY:"auto"};
			innerComponent = <ProductsFourPerGroupMobile {...sectionContent} />
		}else if(section.type === "QuickGuildMobile") {
			sectionStyle = {position:"relative",width:"375px",height:"667px",overflowY:"auto"};
			innerComponent = <QuickGuildMobile {...sectionContent} />
		}else if(section.type === "SmallBannerMobile") {
			sectionStyle = {position:"relative",width:"375px"};
			innerComponent = <SmallBannerMobile {...sectionContent} />
		}

		if(innerComponent !== null){
			return (
				<div style={sectionStyle}>
					{innerComponent}
					<div className="operatorBtns">
						<div className="btn" onClick={()=>{bulmaStore.dispatch(moveUpSection(index))}}>UP</div>
						<div className="btn" onClick={()=>{bulmaStore.dispatch(moveDownSection(index))}}>DOWN</div>
						<div className="btn" onClick={()=>{bulmaStore.dispatch(removeSection(index))}}>X</div>
					</div>
				</div>
			)
		}
		return null;
	}
}

export default EditPagePanelMobile