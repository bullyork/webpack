import {OPEN_DIALOG,CLOSE_DIALOG} from "./../action/dialog.js"
const {assign} = Object




const dialogReducer = function(state={},action){
	switch(action.type){
		case OPEN_DIALOG:
			return assign({},state,{
				[action.dialogKey]:true
			});
		case CLOSE_DIALOG:
			return assign({},state,{
				[action.dialogKey]:false
			});
		default:
			return state;
	}	
}

export default dialogReducer
