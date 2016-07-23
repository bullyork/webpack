import { CATEGORY_LIST,PRODUCTS_LIST } from "../action/seedAction.js";
import { combineReducers } from 'redux'

const initialState = {
    categoryId:0,
    categoryList:[],
}

const initialStateProducts = {
    boostType:"",
    total:0,
    products:[]
}

function Category(state=initialState,action){
    switch(action.type){
        case "CATEGORY_LIST":
            return Object.assign({},state, {
                  categoryList:action.categorys  
                })
        case "SET_CATEGORY":
            return Object.assign({},state, {
                  categoryId:action.categoryId
                })
        default:
            return state;
    }
}

function Product(state=initialStateProducts,action){
    switch(action.type){
        case "PRODUCTS_LIST":
            return Object.assign({},state, {
                  products:action.products.products,
                  total: action.products.total
                })
        case "SET_BOOSTTYPE":
            return Object.assign({},state, {
                  boostType:action.boostType
                })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    Category,
    Product,
})

export default rootReducer