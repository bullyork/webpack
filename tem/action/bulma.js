import {getMockupDataByType} from "./../component/bulma/mockupdata.js"
import PageService from "./../component/bulma/services/PageService.js"
import {changeCountry} from "./country.js"

export const LOAD_PAGE_INDEXES = "LOAD_PAGE_INDEXES"
export const START_ADD_NEW_PAGE = "START_ADD_NEW_PAGE"
export const ADD_NEW_PAGE = "ADD_NEW_PAGE"
export const EDIT_PAGE = "EDIT_PAGE"
export const UPDATE_PAGE_NAME = "UPDATE_PAGE_NAME"
export const PAGE_SAVED = "PAGE_SAVED"
export const SAVE_PAGE = "SAVE_PAGE"
export const ADD_SECTION = "ADD_SECTION"
export const REMOVE_SECTION = "REMOVE_SECTION"
export const MOVE_UP_SECTION = "MOVE_UP_SECTION"
export const MOVE_DOWN_SECTION = "MOVE_DOWN_SECTION"
export const PAGE_INDEXES_LOADED = "PAGE_INDEXES_LOADED"
export const EDITING_PAGE_LOADED = "EDITING_PAGE_LOADED"
export const PAGE_ADDED = "PAGE_ADDED"
export const PAGE_REMOVED = "PAGE_REMOVED"
export const PAGE_PUBLISHED = "PAGE_PUBLISHED"
export const CHANGE_PANEL = "CHANGE_PANEL"
export const SHOW_IMPORT_EXCEL_DIALOG = "SHOW_IMPORT_EXCEL_DIALOG"
export const HIDE_IMPORT_EXCEL_DIALOG = "HIDE_IMPORT_EXCEL_DIALOG"
export const END_EDIT_PAGE = "END_EDIT_PAGE"

export const PLAT_FORM = "PLAT_FORM"

const {assign} = Object; 

export var setPlatform = function(platform){
	return (dispatch,getState)=>{
		dispatch({type:PLAT_FORM,platform});
		dispatch(endEditPanel());
		dispatch(loadPageIndexes());
	}
}

export var startAddNewPage = function(){
	return {type:START_ADD_NEW_PAGE}
}

export var addNewPage = function(pageName,slug,pageTitle){
	return (dispatch,getState)=>{
		let {platform,country} = getState();
		return PageService.NewPage({title:pageName,slug,pageTitle,platform,countryCode:country}).then((flag)=>{
			if(flag === true){
				dispatch(newPageAdded(pageName,slug,pageTitle));
				dispatch(editPage(slug,platform));
			}
		})
	}
}

var newPageAdded = function(pageName,slug,pageTitle){
	return {type:PAGE_ADDED,pageName,slug,pageTitle}
}

export var editPage = function(slug){
	return (dispatch,getState)=>{
		let {platform,country} = getState();
		return PageService.GetPageDetailBySlug(slug,platform,country).then((pageDetail)=>{
			dispatch(editingPageLoaded(pageDetail));
		})
	}
}

var editingPageLoaded = function(pageDetail){
	return {type:EDITING_PAGE_LOADED,pageDetail}
}

export var udpatePageName = function(slug,newPageName){
	return (dispatch,getState)=>{
		return PageService.PageReTitle(newPageName,slug).then((flag)=>{
			dispatch({type:UPDATE_PAGE_NAME,slug,newPageName})
		})
	}
}

export var addSection = function(sectionData){
	return (dispatch,getState)=>{
		let {editingPageDetail} = getState();
		if(editingPageDetail !== null){
			dispatch({type:ADD_SECTION,sectionData:assign({},sectionData,{
				content:JSON.stringify(sectionData.content)
			})});
		}
	}
}

export var removeSection = function(sectionIndex){
	return {type:REMOVE_SECTION,sectionIndex}
}

export var moveUpSection = function(sectionIndex){
	return {type:MOVE_UP_SECTION,sectionIndex}
}

export var moveDownSection = function(sectionIndex){
	return {type:MOVE_DOWN_SECTION,sectionIndex}
}

export var loadPageIndexes = function(){
	return (dispatch,getState)=>{
		let {platform,country} = getState();
		return PageService.GetIndex(0,999,platform,country).then((result)=>{
			let pageIndexes = result.pages;
			dispatch({type:PAGE_INDEXES_LOADED,pageIndexes})	
		})
	}
}

export var savePage = function(){
	return (dispatch,getState)=>{
		let {editingPageDetail} = getState();
		if(editingPageDetail !== null){
			let newSections = editingPageDetail.sections.map((oneSection)=>{
				return assign({},oneSection,{
					content:JSON.stringify(oneSection.content),
				})
			})
			let saveData = assign({},editingPageDetail,{
				sections:newSections
			});
			return PageService.UpdatePage(editingPageDetail).then((flag)=>{
				dispatch({type:PAGE_SAVED,pageDetail:editingPageDetail})
				return flag;
			})
		}
	}
}

export var removePage = function(slug){
	return (dispatch,getState)=>{
		let {platform,country} = getState();
		return PageService.RemovePage(slug,platform,country).then((flag)=>{
			if(flag === true){
				let {editingPageDetail} = getState();
				if(editingPageDetail !== null && editingPageDetail.slug === slug){
					dispatch(changePanel("Normal"));
				}
				dispatch({type:PAGE_REMOVED,slug});
			}
		})
	}
}

export var publishPage = function(){
	return (dispatch,getState)=>{
		let {editingPageDetail,platform,country} = getState();
		if(editingPageDetail !== null){
			return PageService.PublishPage(editingPageDetail.slug,platform,country).then((flag)=>{
				if(flag === true){
					dispatch({type:PAGE_PUBLISHED,slug:editingPageDetail.slug})	
				}
				return flag;
			})
		}
	}
}

export var showImportExcelDialog = function(){
	return (dispatch,getState)=>{
		let {editingPageDetail} = getState();
		if(editingPageDetail !== null){
			dispatch({type:SHOW_IMPORT_EXCEL_DIALOG});
		}
	}
}

export var hideImportExcelDialog = function(){
	return {type:HIDE_IMPORT_EXCEL_DIALOG}
}

export var excelFileImported = function(){
	return (dispatch,getState)=>{
		let {editingPageDetail,platform,country} = getState();
		if(editingPageDetail !== null){
			dispatch(editPage(editingPageDetail.slug,platform,country));
			dispatch(loadPageIndexes())
			dispatch(hideImportExcelDialog());
		}
	}
}

const changePanel = function changePanel(panel){
	return {type:CHANGE_PANEL,panel:panel}
}

const endEditPanel = function endEditPanel(){
	return (dispatch,getState)=>{
		dispatch(changePanel("Normal"));
		dispatch({type:END_EDIT_PAGE});
	}
}

export const changeCountryCode = function(newCountryCode){
	return (dispatch,getState)=>{
		let {country} = getState();
		if(country!==newCountryCode){
			dispatch(changeCountry(newCountryCode));
			dispatch(endEditPanel());
			dispatch(loadPageIndexes());
			window.currentCountryCode = newCountryCode;
		}
	}
}
