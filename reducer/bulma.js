import {
	START_ADD_NEW_PAGE,ADD_NEW_PAGE,ADD_SECTION,MOVE_UP_SECTION,MOVE_DOWN_SECTION,PAGE_INDEXES_LOADED,EDIT_PAGE,UPDATE_PAGE_NAME,END_EDIT_PAGE,
	EDITING_PAGE_LOADED,REMOVE_SECTION,PAGE_ADDED,PAGE_REMOVED,CHANGE_PANEL,PAGE_SAVED,PAGE_PUBLISHED,SHOW_IMPORT_EXCEL_DIALOG,HIDE_IMPORT_EXCEL_DIALOG,PLAT_FORM
} from "./../action/bulma.js"
import { combineReducers } from 'redux'
import countryReducer from "./country.js"


const initialState = {
	pageIndexes:[],
	editPageSlug:null,
	editingPageDetail:null,
	panelMode:"Normal",
	isImportExcelDialogOpen:false,
	platform:"PC"
}

function platform(state="PC",action){
	switch(action.type){
		case PLAT_FORM:
			return action.platform;
		default:
			return state;
	}
}

function pageIndexes(state=[],action){
	switch(action.type){
		case PAGE_INDEXES_LOADED:
			return [...action.pageIndexes];
		case UPDATE_PAGE_NAME:
			let resultState = [].concat(state);
			resultState.forEach((onePageIndex)=>{
				if(onePageIndex.slug === action.slug){
					onePageIndex.title = action.newPageName;
				}
			})
			return resultState;
		case PAGE_ADDED:
			return [{title:action.pageName,slug:action.slug,pageTitle:action.pageTitle}].concat(state);
		case PAGE_REMOVED:
			return state.filter((item)=>{return item.slug !== action.slug});
		case PAGE_SAVED:
			let resultStateForPageSaved = [].concat(state);
			resultStateForPageSaved.forEach((item)=>{
				if(item.slug === action.pageDetail.slug){
					let newSectionTypes = [];
					action.pageDetail.sections.forEach((sectionItem)=>{
						newSectionTypes.push(sectionItem.type);
					});
					item.sectionTypes = newSectionTypes;
				}
			})
			return resultStateForPageSaved;
		case PAGE_PUBLISHED:
			let index = -1;
			state.forEach((item,idx)=>{
				if(item.slug === action.slug){
					index = idx;
				}
			});
			return [
				...state.slice(0,index),
				Object.assign({},state[index],{
					isPublish:true
				}),
				...state.slice(index+1)
			];
		default:
			return state;
	}
}

function editPageSlug(state = null,action){
	switch(action.type){
		case EDITING_PAGE_LOADED:
			return action.pageDetail.slug;
		case START_ADD_NEW_PAGE:
			return null;
		case PAGE_REMOVED:
			return action.slug === state ? null : state;
		case END_EDIT_PAGE:
			return null;
		default:
			return state;
	}
}

function editingPageDetail(state=null,action){
	switch(action.type){
		case START_ADD_NEW_PAGE:
			return {};
		case EDITING_PAGE_LOADED:
			return Object.assign({},state,action.pageDetail);
		case ADD_SECTION:
			let sections = [].concat(state.sections);
			sections.push(action.sectionData);
			return Object.assign({},state,{sections:sections});
		case REMOVE_SECTION:
			let sectionsForRemove = [].concat(state.sections);
			sectionsForRemove.splice(action.sectionIndex,1);
			return Object.assign({},state,{sections:sectionsForRemove});
		case MOVE_UP_SECTION:
			return Object.assign({},state,{sections:moveArrayElementPosition(state.sections,action.sectionIndex,action.sectionIndex - 1)});
		case MOVE_DOWN_SECTION:
			return Object.assign({},state,{sections:moveArrayElementPosition(state.sections,action.sectionIndex,action.sectionIndex + 1)});
		case END_EDIT_PAGE:
			return null;
		case PAGE_REMOVED:
			if(action.slug && state !== null && state.slug === action.slug){
				return null;
			}
		case UPDATE_PAGE_NAME:
			if(state !== null && state.slug === action.slug){
				console.log(Object.assign({},state,{
					title:action.newPageName
				}));
				return Object.assign({},state,{
					title:action.newPageName
				})
			}
			return state;
		default:
			return state;
	}
}

function panelMode(state="Normal",action){
	switch(action.type){
		case START_ADD_NEW_PAGE:
			return "NewPage";
		case EDITING_PAGE_LOADED:
			return "EditPage";
		case CHANGE_PANEL:
			return action.panel;
		default:
			return state;
	}
}

function moveArrayElementPosition(arr,fromIndex,toIndex){
	var elems = [].concat(arr);
	var elem = elems[fromIndex];
	elems.splice(fromIndex,1);
	elems.splice(toIndex,0,elem);
	return elems;
}

function isImportExcelDialogOpen(state=false,action){
	switch(action.type){
		case SHOW_IMPORT_EXCEL_DIALOG:
			return true;
		case HIDE_IMPORT_EXCEL_DIALOG:
			return false;
		default:
			return state;

	}
}

var bulmaReducer = combineReducers({
	pageIndexes,
	editPageSlug,
	editingPageDetail,
	panelMode,
	isImportExcelDialogOpen,
	platform,
	...countryReducer,
});

export default bulmaReducer;
