import {QUICKBUY_LIST,QUICKBUY_PRODUCT_DIALOG,QUICKBUY_PRODUCT_INPUT,QUICKBUY_PRODUCT_ADD,QUICKBUY_FlashSales_LIST} from "../action/quickBuyAction.js";
import {START_EDIT_PRODUCT,END_EDIT_PRODUCT,EDIT_PRODUCT} from "../action/quickBuyAction.js";
import {STATUS_START_PROCESS,STATUS_PROCESS_SUCCESS,STATUS_PROCESS_FAILURE} from "./../action/constant.js";

import { combineReducers } from 'redux'

import qiniuReducer from "./qiniu.js"

const {assign} = Object;

const initialState = {
    flashSales:[],
    selectedProduct:{
        productUrl:"",
        productPrice:0,
        productStock:100,
        productOriginPrice:0,
        productImage:"",
        rebateProductUrl:"",
    },
    editingProductIdx:-1,
    visible:false,
    flashSalesList:[],
}

function QuickBuy(state=initialState,action){
    switch(action.type){
        case QUICKBUY_LIST:
            return Object.assign({},state, {
                flashSales:action.flashSales,
            })
        case QUICKBUY_PRODUCT_DIALOG:
            if(action.visible){
                return Object.assign({},state, {
                    visible:true,
                })
            }else {
                return Object.assign({},state, {
                    visible:false,
                })
            }
        case QUICKBUY_PRODUCT_INPUT:
            var newselectedProduct = state.selectedProduct;
            newselectedProduct[action.keys] = action.values;
            return Object.assign({},state, {
                    selectedProduct:newselectedProduct,
                })
        case QUICKBUY_PRODUCT_ADD:
            var newflashSales = state.flashSales;
            newflashSales.push(action.product);
            return Object.assign({},state, {
                flashSales:newflashSales,
            })
        case QUICKBUY_FlashSales_LIST:
            return Object.assign({},state, {
                flashSalesList:action.flashSalesList
            })
        case START_EDIT_PRODUCT:
            return Object.assign({},state,{
                editingProductIdx:action.index  
            })
        case END_EDIT_PRODUCT:
            return assign({},state,{
                editingProductIdx:-1  
            });
        case EDIT_PRODUCT:
            switch(action.status){
                case STATUS_PROCESS_SUCCESS:
                    return assign({},state,{
                        flashSales:[
                            ...state.flashSales.slice(0,state.editingProductIdx),
                            action.product,
                            ...state.flashSales.slice(state.editingProductIdx+1)
                        ]  
                    });
            }
        default:
            return state;
    }

}


const rootReducer = combineReducers({
    QuickBuy,
    qiniu:qiniuReducer,
})

export default rootReducer