import React,{Component} from "react"
import bulmaStore from "./../../store/bulma.js"
import Components,{Banner,CountDownClock,TagsOnProducts,BannerProduct,ProductsFourPerGroup,BannerWithFourProducts,TagBannerWithEightProducts, Register,BannerFourPerGroup,LoginDialog,Introduce} from "./bulma-front"
import {moveUpSection,moveDownSection,removeSection} from "./../../action/bulma.js"

class EditPage extends Component{

	render(){
		return (
			<div className="editPageWrapper">
				<div className="titleAndUrlWrapper">
					Page:{this.props.title}<br />
					Slug:{this.props.slug}
				</div>
				<div>
					{this.renderSections()}
				</div>
			</div>
		)
	}

	renderSections(){
		if(this.props.sections.length > 0){
			return this.props.sections.map((section,index)=>{
				return this.renderSection(section,index);
			})
		}

		return (
			<div className="emptyEditPanel">
				Click left modules to start.
			</div>
		)
	}
	renderSection(section,index){
		let innerComponent = null;

		let sectionContent = {};
		try{
			sectionContent = JSON.parse(section.content);
		}catch(e){
			sectionContent = {};
		}

		if(section.type === "Banner"){
			innerComponent = <Banner {...sectionContent} />
		}else if(section.type === "CountDownClock"){
			innerComponent = <CountDownClock {...sectionContent} />
		}else if(section.type === "TagsOnProducts"){
			innerComponent = <TagsOnProducts {...sectionContent} />
		}else if(section.type === "BannerProduct"){
			innerComponent = <BannerProduct {...sectionContent} />
		}else if(section.type === "ProductsFourPerGroup"){
			innerComponent = <ProductsFourPerGroup {...sectionContent} />
		}else if(section.type === "BannerWithFourProducts"){
			innerComponent = <BannerWithFourProducts {...sectionContent} />
		}else if(section.type === "TagBannerWithEightProducts"){
			innerComponent = <TagBannerWithEightProducts {...sectionContent} />
		}else if(section.type === "Register"){
			innerComponent = <Register {...sectionContent} />
		}else if(section.type === "BannerFourPerGroup") {
			innerComponent = <BannerFourPerGroup {...sectionContent} />
		}else if(section.type === "LoginDialog") {
			innerComponent = <LoginDialog {...sectionContent} />
		}else if(section.type === "Introduce") {
			innerComponent = <Introduce {...sectionContent} />
		}

		if(innerComponent !== null){
			return (
				<div className="componentWrapper">
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

export default EditPage