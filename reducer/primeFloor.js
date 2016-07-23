import {GET_FLOOR,GET_CATEGORY,SET_CATEGORY} from "../action/primeFloorAction.js";
import { combineReducers } from 'redux'

const initialState = {
    floorList:[],
    categoryId:0,
}

const initialStateCategory = {
    category:[],
    categoryId:0,
}

function Floor(state=initialState,action){
    switch(action.type){
        case GET_FLOOR:
            var categoryIds;
            if(state.categoryId === 0){
                categoryIds = action.floorList[0].categoryId;
                return Object.assign({},state, {
                    floorList:action.floorList,
                    categoryId:categoryIds
                })
            }else {
                return Object.assign({},state, {
                    floorList:action.floorList,
                })
            }
        case SET_CATEGORY:
            return Object.assign({},state, {
                categoryId:action.CateogryId,
            })
        default:
            return state;
        }
}

function Category(state=initialStateCategory,action){
    switch(action.type){
        case GET_CATEGORY:
            console.info(action.Cateogry);
            return Object.assign({},state, {
                category:action.Cateogry,
            })
        case SET_CATEGORY:
            return Object.assign({},state, {
                categoryId:action.CateogryId,
            })
        default:
            return state;
        }
}


var rootReducer = combineReducers({
    Floor,
    Category
});

export default rootReducer